#!/usr/bin/env node
import { createServer } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
loadEnv(join(root, ".env.local"));

const PORT = Number(process.env.PORT || 8787);
const HOST = process.env.HOST || "127.0.0.1";
const MODEL = process.env.DEEPSEEK_MODEL || "deepseek-v4-flash";
const API_KEY = String(process.env.DEEPSEEK_API_KEY || "").trim();
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
const GEMINI_API_KEY = String(process.env.GEMINI_API_KEY || "").trim();
const MAX_BODY_BYTES = Number(process.env.MAX_BODY_BYTES || 10 * 1024 * 1024);
const EXTRA_ALLOWED = String(process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);

const DEFAULT_ALLOWED_ORIGINS = [
  /^http:\/\/127\.0\.0\.1(?::\d+)?$/i,
  /^http:\/\/localhost(?::\d+)?$/i,
  /^https:\/\/[a-z0-9-]+\.github\.io$/i,
];

const REL_TYPES = ["", "Key contact", "Client", "Partner", "Investor", "Mentor", "Friend", "Collaborator", "Acquaintance"];

const EMPTY_EXTRACTION = {
  name: "",
  relationshipType: "",
  company: "",
  department: "",
  title: "",
  currentCity: "",
  birthday: "",
  email: "",
  phone: "",
  website: "",
  languages: [],
  hobbies: [],
  interests: [],
  businessTopics: [],
  introducedBy: "",
  firstMetPlace: "",
  followUpWhat: "",
  promises: [],
  notes: "",
  duplicateHintName: "",
  duplicateHintReason: "",
  unmappedFacts: [],
};

function loadEnv(file) {
  if (!existsSync(file)) return;
  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const eq = trimmed.indexOf("=");
    if (eq < 1) return;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, "");
    if (key && !Object.prototype.hasOwnProperty.call(process.env, key)) process.env[key] = value;
  });
}

function normalizeOrigin(origin) {
  return String(origin || "").trim();
}

function isAllowedOrigin(origin) {
  const clean = normalizeOrigin(origin);
  if (!clean) return false;
  if (EXTRA_ALLOWED.includes(clean)) return true;
  return DEFAULT_ALLOWED_ORIGINS.some((pattern) => pattern.test(clean));
}

function corsHeaders(origin) {
  const clean = normalizeOrigin(origin);
  if (!isAllowedOrigin(clean)) return {};
  return {
    "Access-Control-Allow-Origin": clean,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    Vary: "Origin",
  };
}

function writeJson(res, status, payload, headers = {}) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...headers,
  });
  res.end(JSON.stringify(payload));
}

async function readBody(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) {
      const err = new Error("Body too large");
      err.status = 413;
      throw err;
    }
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  try {
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    err.status = 400;
    err.message = "Invalid JSON body";
    throw err;
  }
}

function cleanString(value, max = 240) {
  return String(value == null ? "" : value).trim().slice(0, max);
}

function cleanList(value, maxItems = 8, maxLen = 80) {
  const list = Array.isArray(value) ? value : [];
  const seen = new Set();
  const out = [];
  list.forEach((item) => {
    const clean = cleanString(item, maxLen);
    const key = clean.toLocaleLowerCase();
    if (!clean || seen.has(key)) return;
    seen.add(key);
    out.push(clean);
  });
  return out.slice(0, maxItems);
}

function normalizeRelationshipType(value) {
  const clean = cleanString(value, 40);
  if (!clean) return "";
  const exact = REL_TYPES.find((item) => item.toLocaleLowerCase() === clean.toLocaleLowerCase());
  if (exact) return exact;
  const map = [
    ["investor", "Investor"],
    ["mentor", "Mentor"],
    ["friend", "Friend"],
    ["client", "Client"],
    ["partner", "Partner"],
    ["collaborator", "Collaborator"],
    ["contact", "Key contact"],
    ["acquaintance", "Acquaintance"],
  ];
  const hit = map.find(([needle]) => clean.toLocaleLowerCase().includes(needle));
  return hit ? hit[1] : "";
}

function normalizeExtraction(payload, requestText) {
  const data = payload && typeof payload === "object" ? payload : {};
  const out = { ...EMPTY_EXTRACTION };
  out.name = cleanString(data.name, 120);
  out.relationshipType = normalizeRelationshipType(data.relationshipType);
  out.company = cleanString(data.company, 120);
  out.department = cleanString(data.department, 120);
  out.title = cleanString(data.title, 120);
  out.currentCity = cleanString(data.currentCity, 120);
  out.birthday = cleanString(data.birthday, 60);
  out.email = cleanString(data.email, 160);
  out.phone = cleanString(data.phone, 60);
  out.website = cleanString(data.website, 160);
  out.languages = cleanList(data.languages);
  out.hobbies = cleanList(data.hobbies);
  out.interests = cleanList(data.interests);
  out.businessTopics = cleanList(data.businessTopics);
  out.introducedBy = cleanString(data.introducedBy, 120);
  out.firstMetPlace = cleanString(data.firstMetPlace, 120);
  out.followUpWhat = cleanString(data.followUpWhat, 200);
  out.promises = cleanList(data.promises, 6, 120);
  out.notes = cleanString(data.notes, 400) || cleanString(requestText, 400);
  out.duplicateHintName = cleanString(data.duplicateHintName, 120);
  out.duplicateHintReason = cleanString(data.duplicateHintReason, 200);
  out.unmappedFacts = cleanList(data.unmappedFacts, 8, 160);
  if (out.followUpWhat && !out.promises.length) out.promises = [out.followUpWhat];
  return out;
}

function normalizeMimeType(value) {
  const clean = cleanString(value, 80).toLowerCase();
  if (["image/png", "image/jpeg", "image/webp", "image/heic", "image/heif"].includes(clean)) return clean;
  return "image/jpeg";
}

function parseImageDataUrl(value) {
  const dataUrl = cleanString(value, MAX_BODY_BYTES);
  const match = dataUrl.match(/^data:(image\/(?:png|jpeg|jpg|webp|heic|heif));base64,([A-Za-z0-9+/=\s]+)$/i);
  if (!match) {
    const err = new Error("imageDataUrl must be a base64 image data URL");
    err.status = 400;
    throw err;
  }
  return {
    mimeType: normalizeMimeType(match[1].toLowerCase() === "image/jpg" ? "image/jpeg" : match[1]),
    data: match[2].replace(/\s/g, ""),
  };
}

function buildCardOcrPrompt(existingPeople) {
  const people = Array.isArray(existingPeople) ? existingPeople.slice(0, 20) : [];
  const contactHints = people.map((person) => ({
    name: cleanString(person && person.name, 80),
    company: cleanString(person && person.company, 80),
    currentCity: cleanString(person && person.currentCity, 80),
  })).filter((person) => person.name);

  return JSON.stringify({
    task: "read_japanese_business_card_and_extract_contact_fields",
    instructions: [
      "Read the card image directly. Japanese namecards are the primary case.",
      "Return one JSON object only. Never add markdown.",
      "Set ocrText to the raw readable text, preserving line breaks as much as possible.",
      "Only fill fields supported by the card image. If unknown, use empty string or empty array.",
      "For Japanese names, prefer the person's printed primary name over company names, departments, or slogans.",
      "Use currentCity/address for postal address or location text. Put website into website.",
      "If this probably matches an existing person, fill duplicateHintName and duplicateHintReason conservatively.",
    ],
    existingPeople: contactHints,
    schema: {
      ocrText: "",
      extraction: EMPTY_EXTRACTION,
    },
  });
}

async function extractCardWithGemini(input) {
  if (!GEMINI_API_KEY) {
    const err = new Error("GEMINI_API_KEY is missing");
    err.status = 503;
    throw err;
  }
  const image = parseImageDataUrl(input.imageDataUrl);
  const upstream = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/" +
      encodeURIComponent(GEMINI_MODEL) + ":generateContent?key=" + encodeURIComponent(GEMINI_API_KEY),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          role: "user",
          parts: [
            { text: buildCardOcrPrompt(input.existingPeople) },
            { inlineData: { mimeType: image.mimeType, data: image.data } },
          ],
        }],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: "application/json",
        },
      }),
    },
  );
  const raw = await upstream.text();
  if (!upstream.ok) {
    const err = new Error("Gemini upstream error");
    err.status = upstream.status;
    err.details = raw.slice(0, 500);
    throw err;
  }
  let payload = {};
  try {
    payload = JSON.parse(raw);
  } catch (err) {
    err.status = 502;
    err.message = "Gemini returned invalid JSON envelope";
    throw err;
  }
  const parts = payload && payload.candidates && payload.candidates[0] && payload.candidates[0].content
    ? payload.candidates[0].content.parts || []
    : [];
  const content = parts.map((part) => part.text || "").join("").trim();
  let parsed = {};
  try {
    parsed = content ? JSON.parse(content) : {};
  } catch (err) {
    err.status = 502;
    err.message = "Gemini returned invalid JSON content";
    throw err;
  }
  const ocrText = cleanString(parsed.ocrText, 5000);
  const sourceExtraction = parsed.extraction && typeof parsed.extraction === "object" ? parsed.extraction : parsed;
  return {
    ocrText,
    extraction: normalizeExtraction(sourceExtraction, ocrText),
  };
}

function buildMessages(input) {
  const people = Array.isArray(input.existingPeople) ? input.existingPeople.slice(0, 20) : [];
  const contactHints = people.map((person) => ({
    name: cleanString(person && person.name, 80),
    company: cleanString(person && person.company, 80),
    currentCity: cleanString(person && person.currentCity, 80),
  })).filter((person) => person.name);

  return [
    {
      role: "system",
      content:
        "You extract contact facts from noisy CRM capture notes. " +
        "Return one JSON object only. Never add markdown. " +
        "Only fill fields supported by evidence in the text. If unknown, return empty string or empty array. " +
        "Keep birthday flexible as free-form text like '22/11', 'tháng 11', or 'around 1990'. " +
        "Pick relationshipType only from: Key contact, Client, Partner, Investor, Mentor, Friend, Collaborator, Acquaintance. " +
        "If the note probably refers to an existing person, set duplicateHintName and duplicateHintReason conservatively. " +
        "Do not invent coordinates, timelines, or unsupported facts.",
    },
    {
      role: "user",
      content: JSON.stringify({
        task: "extract_contact_fields",
        mode: cleanString(input.mode, 20) || "text",
        locale: cleanString(input.locale, 10) || "vi",
        existingPeople: contactHints,
        schema: EMPTY_EXTRACTION,
        text: cleanString(input.text, 4000),
      }),
    },
  ];
}

async function extractWithDeepSeek(input) {
  if (!API_KEY) {
    const err = new Error("DEEPSEEK_API_KEY is missing");
    err.status = 503;
    throw err;
  }
  const upstream = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.1,
      response_format: { type: "json_object" },
      messages: buildMessages(input),
    }),
  });
  const raw = await upstream.text();
  if (!upstream.ok) {
    const err = new Error("DeepSeek upstream error");
    err.status = upstream.status;
    err.details = raw.slice(0, 500);
    throw err;
  }
  let payload = {};
  try {
    payload = JSON.parse(raw);
  } catch (err) {
    err.status = 502;
    err.message = "DeepSeek returned invalid JSON envelope";
    throw err;
  }
  const content = payload && payload.choices && payload.choices[0] && payload.choices[0].message
    ? payload.choices[0].message.content
    : "";
  let parsed = {};
  try {
    parsed = content ? JSON.parse(content) : {};
  } catch (err) {
    err.status = 502;
    err.message = "DeepSeek returned invalid JSON content";
    throw err;
  }
  return normalizeExtraction(parsed, input.text);
}

const server = createServer(async (req, res) => {
  const origin = req.headers.origin || "";
  const headers = corsHeaders(origin);
  if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  if (req.url === "/health") {
    writeJson(res, 200, {
      ok: true,
      providers: {
        deepseek: { model: MODEL, configured: !!API_KEY },
        gemini: { model: GEMINI_MODEL, configured: !!GEMINI_API_KEY },
      },
    }, headers);
    return;
  }

  if (req.method === "POST" && (req.url === "/card-ocr" || req.url === "/api/ai/card-ocr")) {
    if (origin && !isAllowedOrigin(origin)) {
      writeJson(res, 403, { error: "Origin not allowed" });
      return;
    }
    try {
      const body = await readBody(req);
      const result = await extractCardWithGemini({
        imageDataUrl: body.imageDataUrl,
        mimeType: body.mimeType,
        existingPeople: Array.isArray(body.existingPeople) ? body.existingPeople : [],
      });
      writeJson(res, 200, {
        ok: true,
        provider: "gemini",
        model: GEMINI_MODEL,
        ocrText: result.ocrText,
        extraction: result.extraction,
      }, headers);
    } catch (err) {
      writeJson(
        res,
        err && err.status ? err.status : 500,
        {
          ok: false,
          error: err && err.message ? err.message : "Unexpected proxy error",
          details: err && err.details ? err.details : "",
        },
        headers,
      );
    }
    return;
  }

  if (req.method === "POST" && (req.url === "/extract" || req.url === "/api/ai/extract")) {
    if (origin && !isAllowedOrigin(origin)) {
      writeJson(res, 403, { error: "Origin not allowed" });
      return;
    }
    try {
      const body = await readBody(req);
      const input = {
        mode: cleanString(body.mode, 20) || "text",
        locale: cleanString(body.locale, 10) || "vi",
        text: cleanString(body.text, 4000),
        existingPeople: Array.isArray(body.existingPeople) ? body.existingPeople : [],
      };
      if (!input.text) {
        writeJson(res, 400, { error: "text is required" }, headers);
        return;
      }
      const extraction = await extractWithDeepSeek(input);
      writeJson(res, 200, {
        ok: true,
        provider: "deepseek",
        model: MODEL,
        extraction,
      }, headers);
    } catch (err) {
      writeJson(
        res,
        err && err.status ? err.status : 500,
        {
          ok: false,
          error: err && err.message ? err.message : "Unexpected proxy error",
          details: err && err.details ? err.details : "",
        },
        headers,
      );
    }
    return;
  }

  writeJson(res, 404, { error: "Not found" }, headers);
});

server.listen(PORT, HOST, () => {
  console.log("AI proxy listening on http://" + HOST + ":" + PORT);
});
