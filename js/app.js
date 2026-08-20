/* ============================================================
   Network Management — mock prototype app logic
   (2 views: web + mobile, one set of screens)
   ============================================================ */

/* ---------- helpers ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

function icon(name, size = 16) {
  const I = {
    mic: '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2.5" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3.5"/></svg>',
    card: '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6.5 15h4"/></svg>',
    text: '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h10M4 18h13"/></svg>',
    plus: '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    back: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    chev: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 5 7 7-7 7"/></svg>',
    spark: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.1 6.2L20 10l-5.9 1.8L12 18l-2.1-6.2L4 10l5.9-1.8L12 2zM19 15l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z"/></svg>',
    cake: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21h16M5 21V11a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10"/><path d="M12 9V6M12 6c-1.2 0-2-1-2-2 0-1 2-2 2-2s2 1 2 2c0 1-.8 2-2 2z"/><path d="M8 11c1.5 1.2 2.5 1.2 4 0s2.5-1.2 4 0"/></svg>',
    hand: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 17a5 5 0 0 0 10 0c0-3-1.5-6-3.5-8L15 5"/><path d="M13 3l3 2-2 3-3-2 2-3zM8 6l-4 4 3 3 4-4-3-3z"/></svg>',
    cal: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>',
    pin: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    mail: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3 7 9 6 9-6"/></svg>',
    phone: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.45c.9.34 1.84.57 2.8.7A2 2 0 0 1 22 16.9z"/></svg>',
    alert: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 2.5 20h19L12 3Z"/><path d="M12 10v5M12 17.5v.5"/></svg>',
    check: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5L20 7"/></svg>',
    meeting: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M8 3v4M16 3v4M3 10h18M8 15h.01M12 15h.01M16 15h.01"/></svg>',
    refresh: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z"/><path d="M14 3v6h6M9 13h6M9 17h4"/></svg>',
    link: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg>',
    users: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.4"/><path d="M2.8 20c.7-3.4 3.2-5 6.2-5s5.5 1.6 6.2 5"/><circle cx="17.4" cy="9.2" r="2.6"/><path d="M16.4 15.4c2.2.3 4 1.5 4.8 4.1"/></svg>',
    msg: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/></svg>',
    book: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15Z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>',
    target: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/></svg>',
    gear: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34h.09a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55h.09a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.09a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1Z"/></svg>',
    tag: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.6 13.4 12 22l-9-9V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z"/><circle cx="7.5" cy="7.5" r="1.3"/></svg>',
    trash: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>',
    merge: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M6 8.5V15a3 3 0 0 0 3 3h3M18 8.5V12"/></svg>',
    globe: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z"/></svg>',
    monitor: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4" width="19" height="13" rx="2.5"/><path d="M8 21h8M12 17v4"/></svg>',
    home: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>',
    search: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
    bell: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a2 2 0 0 0 3.4 0"/></svg>',
    graph: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="8" r="2.4"/><circle cx="10" cy="18" r="2.4"/><circle cx="17" cy="17" r="2.4"/><path d="M8.2 6.8 15.6 7.4M7 8.2l2 7.4M18.7 10l-2.4 4.8M12.2 17l3.2-1"/></svg>',
    userplus: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.4"/><path d="M2.8 20c.7-3.4 3.2-5 6.2-5s5.5 1.6 6.2 5"/><path d="M19 8v6M16 11h6"/></svg>',
    image: '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2.5"/><circle cx="8.5" cy="8.5" r="1.6"/><path d="m21 15-5-5L5 21"/></svg>',
    camera: '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l2-3h6l2 3h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z"/><circle cx="12" cy="13" r="3.5"/></svg>',
    lock: '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>'
  };
  return I[name] || "";
}

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function avatarHTML(p, px) {
  px = px || 40;
  if (p && p.photo) {
    return '<div class="avatar photo" style="width:' + px + 'px;height:' + px + 'px;background:' + (p.color || "#8D867C") + '"><img src="' + esc(p.photo) + '" alt="' + esc(p.name || "") + '" /></div>';
  }
  const fs = Math.round(px * 0.32);
  return '<div class="avatar" style="width:' + px + 'px;height:' + px + 'px;font-size:' + fs + 'px;background:' + p.color + '">' + esc(p.initials || p.name.slice(0, 2)) + "</div>";
}

function toast(msg, iconName) {
  const t = $("#toast");
  t.innerHTML = (iconName ? icon(iconName, 16) : icon("check", 16)) + "<span>" + esc(msg) + "</span>";
  t.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove("show"), 2600);
}

function daysAgo(n) {
  if (n <= 0) return t("days_today");
  if (n === 1) return t("days_yesterday");
  return t("days_ago", { n });
}

const MONTHS = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 };
function dateKey(s) {
  const ts = String(s || "").toLowerCase();
  if (ts.includes("today")) return 99999999999;
  const m = ts.match(/([a-z]{3})\s*(\d{1,2})?,?\s*(\d{4})?/);
  if (!m) return 0;
  const mo = MONTHS[m[1][0].toUpperCase() + m[1].slice(1)] || 0;
  const d = m[2] ? parseInt(m[2], 10) : 15;
  const y = m[3] ? parseInt(m[3], 10) : 2000;
  return y * 10000 + mo * 100 + d;
}

/* ============================================================
   VIEW (mobile / web) + THEME
   ============================================================ */
let view = "mobile";

function isCompactViewport() {
  return typeof window !== "undefined" && window.matchMedia && window.matchMedia("(max-width: 560px)").matches;
}

function setView(v) {
  const requested = v === "web" ? "web" : "mobile";
  view = isCompactViewport() ? "mobile" : requested;
  document.body.classList.toggle("view-mobile", view === "mobile");
  document.body.classList.toggle("view-web", view === "web");
  try { if (!isCompactViewport() || requested === "mobile") localStorage.setItem("nm-view", requested); } catch (e) {}
}

/* ============================================================
   ROUTER (+ back / history stack)
   ============================================================ */
let currentScreen = "home", profileId = null, profileTab = "overview";
const navStack = [];

function go(screen, opts = {}, isBack = false) {
  // Route guard: Firebase đã bật mà chưa đăng nhập → mọi màn hình về login
  if (fbEnabled() && !fbUser && screen !== "login") {
    screen = "login";
  }
  const prevScreen = currentScreen, prevProfile = profileId;

  if (!isBack) {
    if (screen === "profile" || screen === "refresh") {
      // entering a sub-screen: remember where we came from
      navStack.push({ screen: prevScreen, personId: prevProfile, map: Object.assign({}, mapState) });
    } else {
      // top-level navigation resets history
      navStack.length = 0;
    }
  }

  if (screen === "profile" && opts.personId && opts.personId !== profileId && !opts.profileTab) profileTab = "overview";
  currentScreen = screen;
  profileId = opts.personId || null;
  if (opts.profileTab) profileTab = opts.profileTab;

  $$(".screen").forEach((s) => s.classList.remove("active"));
  const el = $("#screen-" + screen);
  if (!el) { screen = "home"; }
  $("#screen-" + screen).classList.add("active");

  const navKey = screen === "profile" ? "people" : screen === "refresh" || screen === "ask" || screen === "care" ? "home" : screen;
  $$(".nav-item, .tabbar .t").forEach((b) => b.classList.toggle("active", b.dataset.screen === navKey));
  const main = $(".main");
  if (main) main.scrollTop = 0;
  window.scrollTo({ top: 0 });

  if (screen === "profile") renderProfile(profileId);
  if (screen === "refresh") renderRefresh(opts.personId || "");
  if (screen === "settings") renderSettings();
  if (screen === "people") renderPeople();
  if (screen === "map") { if (opts.map) Object.assign(mapState, opts.map); renderMap(); }

  // deep-link hash
  let hash = "#/";
  if (screen === "home") hash = "#/";
  else if (screen === "profile") hash = "#/people/" + profileId;
  else if (screen === "refresh") hash = "#/refresh/" + (opts.personId || "");
  else if (screen === "people") hash = "#/people";
  else hash = "#/" + screen;
  if (location.hash !== hash) history.replaceState(null, "", hash);

  updateFab();
}

function goBack() {
  const frame = navStack.pop();
  if (!frame) return go("people");
  go(frame.screen, { personId: frame.personId, tab: frame.tab, map: frame.map }, true);
}

function routeFromHash() {
  const h = location.hash.replace(/^#\/?/, "");
  const parts = h.split("/");
  const s = parts[0], v1 = parts[1], v2 = parts[2];
  if (s === "people" && v1 && PEOPLE.some((p) => p.id === v1)) return go("profile", { personId: v1 });
  if (s === "refresh" && v1) return go("refresh", { personId: v1 });
  if (s === "brief" && v1) return go("refresh", { personId: v1 }); // v0.1 alias
  if (s === "capture") { go("home"); setTimeout(() => openCapture(null), 80); return; }
  if (s === "map") {
    if (v1 === "lens" && LENSES[v2]) { mapState.lens = v2; mapState.focusId = null; mapState.city = null; }
    else if (v1 === "topic") { mapState.lens = "people"; mapState.topic = decodeURIComponent(v2 || ""); }
    return go("map");
  }
  if (s === "addinfo" && v1 && byId(v1)) { go("profile", { personId: v1 }); setTimeout(() => openCapture(null, { personId: v1, addInfo: true }), 80); return; }
  if (["home", "people", "care", "ask", "map", "settings"].includes(s)) return go(s);
  go("home");
}

/* ============================================================
   HOME
   ============================================================ */
function personRow(p, extra) {
  const when = extra && extra.when !== undefined ? extra.when : (p.last ? p.last.when : "");
  const ctx = (extra && extra.ctx) || "";
  const side = (extra && extra.side) || "";
  return (
    '<button class="person-row" data-id="' + p.id + '">' +
    avatarHTML(p, 40) +
    '<span class="meta"><b>' + esc(p.name) + "</b><span>" + esc(p.company) + " · " + esc(p.title) + "</span></span>" +
    '<span class="side">' + (side || '<span class="when">' + esc(when) + "</span>") + (ctx ? '<span class="ctx">' + esc(ctx) + "</span>" : "") + "</span>" +
    icon("chev") +
    "</button>"
  );
}

function renderHome() {
  $("#home-date").textContent = TODAY_LABEL;
  $("#home-sub").textContent = t("home_sub_dynamic", { n: activePeople().length });

  // Chưa có người nào → welcome + Load sample (app thật bắt đầu rỗng)
  if (!PEOPLE.length) {
    $("#home-care").innerHTML = "";
    $("#home-upcoming").innerHTML = "";
    $("#home-dates").innerHTML = "";
    $("#home-recent").innerHTML = "";
    $("#home-memories").innerHTML =
      '<div class="card" style="padding:26px 18px;text-align:center">' +
      '<div style="font-size:32px;margin-bottom:6px">👋</div>' +
      "<b>" + t("home_welcome") + "</b>" +
      '<p style="font-size:13px;color:var(--ink-2);margin:6px 0 16px">' + t("home_welcome_sub") + "</p>" +
      '<div style="display:flex;gap:9px;justify-content:center;flex-wrap:wrap">' +
      '<button class="btn accent" id="first-person">' + icon("plus", 13) + " " + t("btn_add_person") + "</button>" +
      '<button class="btn ghost" id="load-sample">' + t("btn_load_sample") + "</button>" +
      "</div></div>";
    $("#first-person").addEventListener("click", () => openCapture(null));
    $("#load-sample").addEventListener("click", () => { Store.loadSample(); renderAll(); toast(t("toast_sample_loaded")); });
    bindHome();
    return;
  }

  // care snapshot (tính động từ data)
  const care = homeCareSnapshot().map((c) => {
    const p = byId(c.personId);
    if (!p) return "";
    let reasonTxt, detailTxt;
    if (c.reason === "birthday") {
      reasonTxt = t("care_birthday_in", { n: c.days });
      detailTxt = p.birthday;
    } else if (c.reason === "birthday_month") {
      reasonTxt = t("care_birthday_month_in", { n: c.days });
      detailTxt = c.detail || p.birthday;
    } else if (c.reason === "date") {
      reasonTxt = c.date ? t("care_date_in", { label: c.date.label, n: c.days }) : t("reason_date");
      detailTxt = c.date ? c.date.when : "";
    } else if (c.reason === "silence") {
      reasonTxt = t("care_silence_days", { n: c.days });
      detailTxt = t("care_last", { v: (p.last && p.last.when) || "—" });
    } else {
      reasonTxt = c.reason === "promise" ? t("reason_promise") : t("reason_follow_up");
      detailTxt = c.followUp ? c.followUp.what : "";
    }
    const action = c.actions[0] || "dismiss";
    const actionLabel = { refresh: t("btn_refresh"), profile: t("btn_view") }[action] || t("btn_view");
    return (
      '<div class="card" style="border-left:3px solid ' + (c.urgency === "high" ? "var(--accent)" : "var(--warn)") + ';padding:13px 16px">' +
      '<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">' + avatarHTML(p, 36) +
      '<div style="flex:1;min-width:0"><b style="font-size:13px">' + esc(reasonTxt) + "</b>" +
      '<div style="font-size:11.5px;color:var(--ink-2)">' + esc(p.name) + " · " + esc(detailTxt) + "</div></div>" +
      '<button class="btn small care-action" data-id="' + p.id + '" data-action="' + action + '">' + actionLabel + "</button>" +
      "</div></div>"
    );
  }).join("");
  $("#home-care").innerHTML = '<div class="section-label"><h3>' + t("sec_care") + '</h3><button class="more" data-screen="care">' + t("btn_view_all") + "</button></div>" + care;

  // upcoming (tính động)
  const up = homeUpcoming().map((u) => {
    const p = byId(u.personId);
    if (!p) return "";
    return (
      '<div class="card" style="padding:14px 16px"><div style="display:flex;align-items:center;gap:13px;flex-wrap:wrap">' + avatarHTML(p, 40) +
      '<div style="flex:1;min-width:0"><b style="font-size:14px">' + esc(p.name) + " — " + t("reason_follow_up") + "</b>" +
      '<div style="font-size:12.5px;color:var(--ink-2)">' + esc(u.when) + " · " + esc(u.where) + "</div></div>" +
      '<button class="btn accent small refresh-open" data-id="' + p.id + '">' + icon("refresh", 13) + " " + t("btn_refresh") + "</button>" +
      "</div></div>"
    );
  }).join("");
  $("#home-upcoming").innerHTML = '<div class="section-label"><h3>' + t("sec_upcoming") + "</h3></div>" + up;

  // dates
  const dates = homeDates().map((d) => {
    const p = byId(d.personId);
    if (!p) return "";
    const label = d.kind === "birthday" ? t("reason_birthday") : d.kind === "birthday_month" ? t("reason_birthday_month") : d.label;
    return (
      '<div class="date-item"><div class="di-ico">' + icon(d.kind === "birthday" || d.kind === "birthday_month" ? "cake" : "cal", 14) + "</div>" +
      '<div style="flex:1;min-width:0"><b>' + esc(p.name) + " — " + esc(label) + "</b><span>" + esc(d.when) + "</span></div>" +
      '<button class="btn small ghost" data-id="' + p.id + '">' + t("btn_view") + "</button></div>"
    );
  }).join("");
  $("#home-dates").innerHTML = '<div class="section-label"><h3>' + t("sec_dates") + "</h3></div><div class='card'>" + dates + "</div>";

  // recent
  const rec = homeRecent().map((id) => {
    const p = byId(id);
    return personRow(p, { when: p.last ? p.last.when : "—", ctx: daysAgo(p.lastContactDays) + " · " + relTypeLabel(p.relationshipType) });
  }).join("");
  $("#home-recent").innerHTML = '<div class="section-label"><h3>' + t("sec_recent") + '</h3><button class="more" data-screen="people">' + t("btn_view_all") + "</button></div>" + rec;

  // memories
  const mems = homeMemories().map((m) => {
    const p = byId(m.personId);
    if (!p) return "";
    return (
      '<div class="memory-row"><span class="mr-when">' + esc(m.when) + "</span>" +
      "<p><b style='color:var(--ink)'>" + esc(p.name) + "</b> — " + esc(m.text) + "</p></div>"
    );
  }).join("");
  $("#home-memories").innerHTML = '<div class="section-label"><h3>' + t("sec_memories") + "</h3></div><div class='card'>" + mems + "</div>";

  bindHome();
}

function bindHome() {
  $$("#home-care .care-action").forEach((b) =>
    b.addEventListener("click", () => {
      const p = byId(b.dataset.id);
      if (!p) return;
      if (b.dataset.action === "refresh") return go("refresh", { personId: p.id });
      go("profile", { personId: p.id });
    })
  );
  $$("#home-upcoming .refresh-open").forEach((b) => b.addEventListener("click", () => go("refresh", { personId: b.dataset.id })));
  $$("#home-dates .btn").forEach((b) => b.addEventListener("click", () => go("profile", { personId: b.dataset.id })));
  $$("#home-recent .person-row").forEach((el) => el.addEventListener("click", () => go("profile", { personId: el.dataset.id })));
  $$(".more").forEach((b) => b.addEventListener("click", () => go(b.dataset.screen)));
}

/* ============================================================
   PEOPLE
   ============================================================ */
let peopleSearch = "", peopleStatus = "active";

function renderPeople() {
  const viewEl = $("#people-view");

  viewEl.innerHTML =
    '<div class="toolbar">' +
    '<div class="search-input">' + icon("search", 14) + '<input id="people-search" data-i18n-ph="people_search_ph" placeholder="' + t("people_search_ph") + '" /></div>' +
    '<select class="filter-select" id="people-status">' +
    '<option value="active">' + t("people_status_active") + "</option>" +
    '<option value="inactive">' + t("people_status_inactive") + "</option>" +
    '<option value="all">' + t("people_status_all") + "</option>" +
    "</select>" +
    "</div>" +
    '<div id="people-list"></div>';

  const q = peopleSearch.toLowerCase();
  let list = PEOPLE.filter((p) => {
    const mq = !q || p.name.toLowerCase().includes(q) || p.company.toLowerCase().includes(q) ||
      p.title.toLowerCase().includes(q) || p.interests.some((i) => i.toLowerCase().includes(q)) ||
      (p.nameJa || "").includes(q) || p.currentCity.toLowerCase().includes(q);
    const ms = peopleStatus === "all" ? true : peopleStatus === "inactive" ? p.active === false : p.active !== false;
    return mq && ms;
  });

  $("#people-list").innerHTML = list.length
    ? list.map((p) => {
        if (p.active === false) {
          return (
            '<div class="card inactive-card" style="padding:12px 16px;opacity:.78;display:flex;align-items:center;gap:12px;cursor:pointer">' +
            avatarHTML(p, 40) +
            '<div style="flex:1;min-width:0" class="inactive-open" data-id="' + p.id + '"><b style="font-size:13.5px">' + esc(p.name) + "</b>" +
            '<span style="display:block;font-size:12px;color:var(--ink-2)">' + esc(p.company) + " · " + esc(p.title) + "</span></div>" +
            '<span class="chip warn" style="font-size:10px;flex-shrink:0">' + t("badge_inactive") + "</span>" +
            '<button class="btn small primary" data-activate="' + p.id + '" style="flex-shrink:0">' + t("btn_activate") + "</button>" +
            "</div>"
          );
        }
        return personRow(p, { when: p.last ? p.last.when : "—", ctx: daysAgo(p.lastContactDays) + " · " + relTypeLabel(p.relationshipType) });
      }).join("")
    : '<div class="empty-state"><div class="big">' + (PEOPLE.length ? "🔍" : "👋") + "</div>" +
      t(PEOPLE.length ? "people_empty" : "people_none") +
      (!PEOPLE.length
        ? '<div style="display:flex;gap:9px;justify-content:center;margin-top:14px;flex-wrap:wrap">' +
          '<button class="btn accent" id="pl-add">' + icon("plus", 13) + " " + t("btn_add_person") + "</button>" +
          '<button class="btn ghost" id="pl-sample">' + t("btn_load_sample") + "</button></div>"
        : "") +
      "</div>";
  const plAdd = $("#pl-add");
  if (plAdd) plAdd.addEventListener("click", () => openCapture(null));
  const plSample = $("#pl-sample");
  if (plSample) plSample.addEventListener("click", () => { Store.loadSample(); renderAll(); toast(t("toast_sample_loaded")); });

  $$("#people-list .person-row").forEach((el) => el.addEventListener("click", () => go("profile", { personId: el.dataset.id })));
  $$("#people-list .inactive-open").forEach((el) => el.addEventListener("click", () => go("profile", { personId: el.dataset.id })));
  $$("#people-list [data-activate]").forEach((b) => b.addEventListener("click", () => { toggleActive(b.dataset.activate); renderPeople(); }));

  const si = $("#people-search");
  si.value = peopleSearch;
  si.addEventListener("input", () => { peopleSearch = si.value; renderPeople(); });
  $("#people-status").value = peopleStatus;
  $("#people-status").addEventListener("change", () => { peopleStatus = $("#people-status").value; renderPeople(); });
}

/* ============================================================
   RELATIONSHIP CARE
   ============================================================ */
const REASON_LABEL = { silence: "reason_silence", promise: "reason_promise", follow_up: "reason_follow_up", birthday: "reason_birthday", birthday_month: "reason_birthday_month", date: "reason_date", inactive: "reason_inactive" };

function careTitle(r, p) {
  if (r.reason === "birthday") return t("care_birthday_in", { n: r.days }) + (p.birthday ? " (" + p.birthday + ")" : "");
  if (r.reason === "birthday_month") return t("care_birthday_month_in", { n: r.days }) + (p.birthday ? " (" + p.birthday + ")" : "");
  if (r.reason === "date") return r.date ? t("care_date_in", { label: r.date.label, n: r.days }) + " (" + r.date.when + ")" : t("reason_date");
  if (r.reason === "silence") return t("care_silence_title", { n: r.days });
  return r.followUp ? r.followUp.what : "";
}

function careContext(r, p) {
  if (r.reason === "birthday" || r.reason === "birthday_month") {
    return (p.memories && p.memories.length) ? t("care_ctx_birthday") + " " + p.memories[p.memories.length - 1].text : t("care_ctx_birthday");
  }
  if (r.reason === "date") return t("care_ctx_date");
  if (r.reason === "silence") return t("care_ctx_silence") + " " + t("care_last", { v: (p.last && p.last.when) || "—" }) + ".";
  if (r.reason === "promise") return t("care_ctx_promise");
  return t("care_ctx_followup");
}

/** Snooze 7 ngày: ẩn người này khỏi care queue 7 ngày. */
function snoozeFollowUp(p, days) {
  Store.updatePerson(p.id, { snoozedUntil: Date.now() + days * 86400000 });
  toast(t("toast_snoozed"));
}

/** Dismiss: ẩn 30 ngày. */
function dismissCare(p) {
  Store.updatePerson(p.id, { snoozedUntil: Date.now() + 30 * 86400000 });
  toast(t("toast_dismissed"));
}

/** Follow-up done: ghi meeting hoàn tất + xoá follow-up. */
function completeFollowUp(p) {
  const fu = p.followUp;
  Store.updatePerson(p.id, {
    followUp: { when: "—", what: "", kind: "reconnect" },
    meetings: [...(p.meetings || []), { date: TODAY_LABEL, type: "Done", title: fu && fu.what ? fu.what : "Follow-up done", summary: "Follow-up completed.", tags: ["done"] }],
    lastContactDays: 0,
    metCount: (p.metCount || 0) + 1,
  });
  toast(t("followup_done"));
}

function renderCare() {
  const items = computeCareItems(activePeople());
  if (!items.length) {
    $("#care-list").innerHTML = '<div class="empty-state">' + t("care_empty") + "</div>";
    return;
  }
  const groups = [t("care_group_attention"), t("care_group_coming")];
  const html = groups.map((g, gi) => {
    const list = items.filter((r) => (gi === 0 && r.group === "Needs attention") || (gi === 1 && r.group === "Coming up"));
    return (
      '<div class="care-group-label">' + g + " · " + list.length + "</div>" +
      list.map((r) => {
        const p = byId(r.personId);
        const freq = frequencyOf(p.frequency);
        return (
          '<div class="card rem-card">' +
          '<div class="rem-icon ' + (r.reason === "birthday" || r.reason === "birthday_month" || r.reason === "date" ? "cake" : r.reason === "promise" ? "action" : r.reason === "follow_up" ? "meeting" : "alert") + '">' +
          icon(r.reason === "birthday" || r.reason === "birthday_month" ? "cake" : r.reason === "date" ? "cal" : r.reason === "promise" ? "check" : r.reason === "follow_up" ? "meeting" : "alert", 17) + "</div>" +
          '<div class="rem-body">' +
          '<div class="rem-person">' + avatarHTML(p, 24) + "<span>" + esc(p.name) + "</span>" +
          '<span class="reason-chip ' + r.reason + '">' + t(REASON_LABEL[r.reason]) + "</span></div>" +
          "<b>" + esc(careTitle(r, p)) + "</b>" +
          "<p>" + esc(careContext(r, p)) + (freq ? " <i style='color:var(--ink-3)'>" + t("care_rhythm") + frequencyLabel(freq.id) + ".</i>" : "") + "</p>" +
          '<div class="rem-actions">' +
          r.actions.map((a) => {
            const label = { refresh: t("btn_refresh"), profile: t("btn_view") }[a] || t("btn_view");
            const cls = "btn small primary";
            return '<button class="' + cls + '" data-action="' + a + '" data-id="' + r.personId + '">' + label + "</button>";
          }).join("") +
          "</div></div></div>"
        );
      }).join("")
    );
  }).join("");

  $("#care-list").innerHTML = html;
  $$("#care-list .rem-actions button").forEach((b) =>
    b.addEventListener("click", () => {
      const a = b.dataset.action, p = byId(b.dataset.id);
      if (!p) return;
      if (a === "refresh") return go("refresh", { personId: p.id });
      go("profile", { personId: p.id });
    })
  );
}

/* ============================================================
   SEARCH
   ============================================================ */
function renderAsk() {
  $("#q-chips").innerHTML = QUICK_QUESTIONS.map((q) => '<button class="q-chip">' + esc(q) + "</button>").join("");
  $$("#q-chips .q-chip").forEach((c) => c.addEventListener("click", () => { $("#ask-input").value = c.textContent; runAsk(c.textContent); }));

  $("#ask-results").innerHTML =
    '<div class="answer-box" style="opacity:.85">' +
    '<div class="answer-head"><b>' + t("search_name") + "</b><span>" + t("search_example") + "</span></div>" +
    '<div class="answer-text">' + t("ask_hint") + "</div></div>";
}

function sourceRow(id, why, src) {
  const p = byId(id);
  if (!p) return "";
  const chip = src ? '<span class="src-chip ' + src + '">' + src + "</span>" : "";
  return (
    '<button class="source-row" data-id="' + id + '">' +
    avatarHTML(p, 32) +
    "<span style='flex:1;min-width:0'><b>" + esc(p.name) + chip + "</b><span class='src-sub'>" + esc(p.company) + "</span></span>" +
    '<span class="why">' + esc(why) + "</span></button>"
  );
}

const SEARCH_STOPWORDS = new Set([
  "a", "an", "and", "about", "at", "by", "do", "does", "did", "for", "from", "i", "in", "is", "me", "my",
  "of", "on", "or", "related", "relate", "to", "the", "them", "they", "what", "where", "which", "who",
  "work", "works", "working", "know", "lives", "live",
  "ai", "co", "cua", "dau", "den", "gi", "lam", "lien", "nao", "nguoi", "quan", "toi", "ve", "voi",
]);

function searchNormalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function searchTerms(query) {
  const normalized = searchNormalize(query);
  const rawTerms = normalized.split(/\s+/).filter(Boolean);
  const filtered = rawTerms.filter((term) => term.length > 1 && !SEARCH_STOPWORDS.has(term));
  return filtered.length ? filtered : rawTerms.filter((term) => term.length > 1);
}

function searchHaystack(parts) {
  return searchNormalize(parts.flat(Infinity).filter(Boolean).join(" "));
}

function analyze(q) {
  const s = searchNormalize(q);
  const people = activePeople();
  if (!people.length) return { answer: t("ask_no_people"), sources: [], why: {} };
  if (!s) return { answer: t("ask_hint"), sources: [], why: {} };

  const terms = searchTerms(q);
  const hasTerm = (hay) => {
    const hayTerms = new Set(hay.split(/\s+/).filter(Boolean));
    return terms.some((term) => term.length <= 2 ? hayTerms.has(term) : hay.includes(term));
  };

  let sources = [];
  const why = {};

  // Tìm theo từ khoá trên nhiều field
  const found = [];
  const add = (p, label) => {
    if (!found.includes(p)) {
      found.push(p);
      why[p.id] = label;
    }
  };
  people.forEach((p) => {
    if (hasTerm(searchHaystack([p.name, p.nameJa, p.nickname]))) add(p, t("ask_asked_about"));
    else if (hasTerm(searchHaystack([p.currentCity, p.country, p.area, p.location]))) add(p, t("ask_where"));
    else if (hasTerm(searchHaystack([p.company, p.previousCompanies]))) add(p, t("ask_company"));
    else if (hasTerm(searchHaystack([p.industry, p.title, p.department, p.profession, p.expertise, p.skills, p.businessTopics, p.workNotes]))) add(p, t("ask_industry"));
    else if (hasTerm(searchHaystack([p.relationshipType, p.role, p.firstMet && p.firstMet.how, p.introducedBy, p.helpGiven, p.helpReceived, p.promises, p.relationshipNotes]))) add(p, t("ask_relationship"));
    else if (hasTerm(searchHaystack([p.interests, p.hobbies, p.sports, p.tags, p.favoriteFood, p.favoriteDrink, p.travelInterests, p.interestsNotes]))) add(p, t("ask_interest"));
    else if (hasTerm(searchHaystack([p.notes, p.familyNotes, p.spouse, p.children, p.schools, p.pets, p.about, p.raw, (p.memories || []).map((m) => m.text), (p.meetings || []).map((m) => [m.title, m.summary, m.tags])]))) add(p, t("ask_memory"));
  });

  if (found.length) {
    sources = found.slice(0, 6).map((p) => p.id);
    return { answer: t("ask_found", { n: found.length }), sources, why };
  }

  return { answer: t("ask_none") + " " + t("ask_try"), sources: [], why: {} };
}

function runAsk(q) {
  const box = $("#ask-results");
  const r = analyze(q);
  box.innerHTML =
    '<div class="answer-box"><div class="answer-head"><b>' + t("search_name") + "</b><span>" + t("search_answered", { n: r.sources.length }) + "</span></div>" +
    '<div class="answer-text">' + r.answer + "</div>" +
    '<div class="answer-sources">' + r.sources.map((id) => sourceRow(id, r.why[id] || "")).join("") + "</div></div>";
  $$(".source-row", box).forEach((el) => el.addEventListener("click", () => go("profile", { personId: el.dataset.id })));
}

/* ============================================================
   NETWORK MAP — lenses + focus mode + Google Maps (location)
   ============================================================ */
let mapState = { lens: "people", focusId: null, degree: 2, topic: "", city: null };
let mapNodes = [], mapEdges = [], mapPopNode = null;
let locMap = null;
let locMapRenderId = 0;

function googleMapsConfig() {
  return window.GOOGLE_MAPS_CONFIG || {};
}

function googleMapsApiKey() {
  return String(googleMapsConfig().apiKey || "").trim();
}

function googleMapsMapId() {
  // Google Maps bắt buộc Map ID khi nạp thư viện marker (Advanced Marker);
  // thiếu/trống sẽ hiện lỗi "This page can't load Google Maps correctly".
  // DEMO_MAP_ID chạy ngay không cần tạo trong Cloud Console.
  return String(googleMapsConfig().mapId || "DEMO_MAP_ID").trim();
}

function googleMapsEnabled() {
  return !!googleMapsApiKey();
}

function loadGoogleMapsApi() {
  if (window.google && window.google.maps) return Promise.resolve(window.google.maps);
  if (!googleMapsEnabled()) return Promise.reject(new Error("google-maps-disabled"));
  if (window.__nmGoogleMapsPromise) return window.__nmGoogleMapsPromise;
  window.__nmGoogleMapsPromise = new Promise((resolve, reject) => {
    const callbackName = "__nmGoogleMapsReady";
    const script = document.createElement("script");
    const cleanup = () => {
      try { delete window[callbackName]; } catch (e) { window[callbackName] = null; }
    };
    window[callbackName] = () => {
      cleanup();
      resolve(window.google.maps);
    };
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=" + encodeURIComponent(googleMapsApiKey()) +
      "&libraries=marker&callback=" + encodeURIComponent(callbackName);
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      cleanup();
      reject(new Error("google-maps-load-failed"));
    };
    document.head.appendChild(script);
  });
  return window.__nmGoogleMapsPromise;
}

function clearLocationMapInstance() {
  locMap = null;
}

function renderLocationListFallback(groups) {
  const visibleGroups = mapState.city
    ? groups.filter((g) => searchNormalize(g.label) === searchNormalize(mapState.city))
    : groups;
  const list = visibleGroups.map((g) => {
    const members = (g.members || []).map((id) => byId(id)).filter((p) => p && p.active !== false);
    if (!members.length) return "";
    return '<div class="loc-off-row"><b>' + esc(g.label) + "</b>" +
      members.map((p) => '<button class="link-chip" data-id="' + p.id + '">' + esc(p.name) + "</button>").join(", ") + "</div>";
  }).join("");
  $("#map-canvas").innerHTML =
    '<div class="card" style="padding:16px"><div style="font-size:13px;color:var(--ink-2);margin-bottom:8px">' + t("map_offline") + "</div>" + list + "</div>";
  $$("#map-canvas .link-chip").forEach((b) => b.addEventListener("click", () => go("profile", { personId: b.dataset.id })));
}

function locationPopupHTML(p) {
  return '<div class="loc-pop">' +
    '<div class="loc-pop-head">' + avatarHTML(p, 40) + "</div>" +
    "<b>" + esc(p.name) + "</b>" +
    '<div class="loc-pop-sub">' + esc(p.company) + " · " + esc(p.title) + "</div>" +
    '<div class="loc-pop-city">' + icon("pin", 11) + " " + esc(p.currentCity) + "</div>" +
    '<button class="btn small primary loc-pop-open" data-id="' + p.id + '">' + t("btn_profile") + "</button></div>";
}

function locationMarkerHTML(p) {
  const inner = p.photo
    ? '<img src="' + esc(p.photo) + '" alt="" />'
    : '<span class="loc-initials">' + esc(p.initials || p.name.slice(0, 2)) + "</span>";
  return '<div class="loc-marker" style="--c:' + esc(p.color) + '">' + inner + "</div>";
}

async function renderGoogleLocationMap(people, renderId) {
  const maps = await loadGoogleMapsApi();
  if (renderId !== locMapRenderId || mapState.lens !== "location") return false;
  $("#map-canvas").innerHTML = '<div id="location-map" class="location-map"></div>';
  const container = $("#location-map");
  if (!container) return false;

  const map = new maps.Map(container, {
    center: { lat: 35.6, lng: 139.6 },
    zoom: 5,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    gestureHandling: "greedy",
    mapId: googleMapsMapId() || undefined,
  });
  const infoWindow = new maps.InfoWindow();
  const bounds = new maps.LatLngBounds();
  let count = 0;
  let firstPosition = null;

  people.forEach((p) => {
    const geo = personGeo(p);
    if (!geo) return;
    count += 1;
    const position = { lat: geo[0], lng: geo[1] };
    if (!firstPosition) firstPosition = position;
    bounds.extend(position);
    const markerContent = document.createElement("div");
    markerContent.className = "loc-marker-wrap";
    markerContent.innerHTML = locationMarkerHTML(p);

    let marker = null;
    if (maps.marker && maps.marker.AdvancedMarkerElement) {
      marker = new maps.marker.AdvancedMarkerElement({
        map,
        position,
        title: p.name,
        content: markerContent,
      });
      marker.addListener("gmp-click", () => {
        infoWindow.setContent(locationPopupHTML(p));
        infoWindow.open({ map, anchor: marker });
      });
    } else {
      marker = new maps.Marker({
        map,
        position,
        title: p.name,
        icon: {
          url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" width="46" height="54" viewBox="0 0 46 54">' +
            '<circle cx="23" cy="23" r="21" fill="' + esc(p.color) + '" stroke="#ffffff" stroke-width="3"/>' +
            '<path d="M17 46 L23 53 L29 46 Z" fill="#ffffff"/>' +
            '<text x="23" y="27" text-anchor="middle" font-family="Inter, sans-serif" font-size="13" font-weight="700" fill="#ffffff">' + esc(p.initials || p.name.slice(0, 2)) + "</text></svg>"
          ),
          scaledSize: new maps.Size(46, 54),
          anchor: new maps.Point(23, 50),
        },
      });
      marker.addListener("click", () => {
        infoWindow.setContent(locationPopupHTML(p));
        infoWindow.open({ map, anchor: marker });
      });
    }
  });

  maps.event.addListener(infoWindow, "domready", () => {
    const btn = document.querySelector(".loc-pop-open");
    if (btn && !btn._bound) {
      btn._bound = true;
      btn.addEventListener("click", () => go("profile", { personId: btn.dataset.id }));
    }
  });

  if (count > 1) map.fitBounds(bounds, 40);
  else if (count === 1) { map.setCenter(firstPosition); map.setZoom(10); }
  locMap = { provider: "google", instance: map };
  return true;
}

function renderMap() {
  // Chưa có người → empty state (app thật bắt đầu rỗng)
  if (!activePeople().length) {
    $("#lens-tabs").innerHTML = "";
    $("#focus-bar").classList.add("hidden");
    $("#map-legend").innerHTML = "";
    $("#map-wrap .map-pop") && $("#map-wrap .map-pop").remove();
    $("#map-canvas").innerHTML = '<div class="empty-state">' + t("map_empty") + "</div>";
    return;
  }

  // lens tabs
  $("#lens-tabs").innerHTML = Object.keys(LENSES).map((k) =>
    '<button class="q-chip' + (mapState.lens === k ? " active" : "") + '" data-lens="' + k + '">' + t("lens_" + k) + "</button>"
  ).join("");
  $$("#lens-tabs .q-chip").forEach((c) => c.addEventListener("click", () => { mapState.lens = c.dataset.lens; mapState.focusId = null; mapState.topic = ""; mapState.city = null; renderMap(); }));

  // focus bar
  $("#focus-bar").innerHTML =
    '<span class="fb-label">' + t("map_focus_label") + "</span>" +
    '<div class="fb-input">' + icon("search", 13) + '<input id="focus-topic" placeholder="' + t("map_focus_ph") + '" value="' + esc(mapState.topic) + '" /></div>';
  $("#focus-topic").addEventListener("input", debounce(() => { mapState.topic = $("#focus-topic").value.trim(); renderMap(); }, 350));

  // location lens needs no filter bar
  $("#focus-bar").classList.toggle("hidden", mapState.lens === "location");

  // hint text depends on lens
  const hint = $(".map-hint");
  if (hint) hint.textContent = mapState.lens === "location" ? t("map_hint_loc") : t("map_hint");

  if (mapState.lens === "location") { renderLocationMap(); return; }
  buildMapSvg();
}

/** Nhóm người thật theo currentCity cho location lens (legend + fallback list). */
function locationGroupsFromPeople() {
  const byCity = {};
  activePeople().forEach((p) => {
    const city = String(p.currentCity || "").trim();
    if (!city) return;
    (byCity[city] = byCity[city] || []).push(p.id);
  });
  return Object.keys(byCity).map((city) => ({ label: city, members: byCity[city] }));
}

function renderLocationMap() {
  const groups = locationGroupsFromPeople();
  const selectedCity = String(mapState.city || "").trim();
  const mapPeople = selectedCity
    ? activePeople().filter((p) => searchNormalize(p.currentCity) === searchNormalize(selectedCity))
    : activePeople();

  clearLocationMapInstance();
  const renderId = ++locMapRenderId;

  // compact legend: per-city counts (active people only)
  const counts = groups.map((g) => {
    const n = (g.members || []).filter((id) => { const p = byId(id); return p && p.active !== false; }).length;
    if (selectedCity && searchNormalize(g.label) !== searchNormalize(selectedCity)) return null;
    return n ? esc(g.label) + " " + n : null;
  }).filter(Boolean);
  $("#map-legend").innerHTML =
    '<span><i style="background:#7A5AF8"></i>' + t("lens_location") + "</span>" +
    (selectedCity ? '<span>' + esc(selectedCity) + '</span><button class="q-chip" id="location-clear">' + t("map_clear") + "</button>" : "") +
    counts.map((c) => "<span>" + c + "</span>").join("");
  const clear = $("#location-clear");
  if (clear) clear.addEventListener("click", () => { mapState.city = null; renderMap(); });
  if (googleMapsEnabled() && mapPeople.some((p) => personGeo(p))) {
    renderGoogleLocationMap(mapPeople, renderId).catch(() => {
      if (renderId !== locMapRenderId || mapState.lens !== "location") return;
      renderLocationListFallback(groups);
    });
    return;
  }
  renderLocationListFallback(groups);
}

function openMapLocation(city) {
  const clean = String(city || "").trim();
  if (!clean) return;
  go("map", { map: { lens: "location", focusId: null, topic: "", city: clean } });
}

function debounce(fn, ms) {
  let t;
  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
}

function personMatchTopic(p, topic) {
  const t2 = topic.toLowerCase();
  if (!t2) return false;
  const hay = [p.name, p.company, p.title, p.industry, p.currentCity, p.relationshipType, p.about,
    ...(p.interests || []), ...(p.hobbies || []), ...(p.tags || [])].join(" ").toLowerCase();
  return hay.includes(t2);
}

function buildMapSvg() {
  const W = 920, H = 640;
  mapNodes = []; mapEdges = [];
  const people = activePeople();

  mapNodes.push({ id: "you", label: t("map_legend_you"), type: "you", x: PERSON_POS.you[0], y: PERSON_POS.you[1], color: "#201D1A" });
  people.forEach((p) => {
    const pos = personPos(p);
    mapNodes.push({ id: p.id, label: shortName(p), type: "person", x: pos[0], y: pos[1], color: p.color });
  });
  people.forEach((p) => mapEdges.push({ a: "you", b: p.id, why: t("nav_people") }));
  personLinks().forEach((l) => {
    const pa = byId(l.a), pb = byId(l.b);
    if (pa && pb && pa.active !== false && pb.active !== false) mapEdges.push({ a: l.a, b: l.b, why: l.why });
  });

  const dimNode = (id) => {
    if (mapState.topic) {
      if (id === "you") return true;
      const p = byId(id);
      return p ? !personMatchTopic(p, mapState.topic) : true;
    }
    return false;
  };

  // legend
  $("#map-legend").innerHTML =
    '<span><i style="background:#201D1A"></i>' + t("map_legend_you") + "</span><span><i style='background:var(--accent)'></i>" + t("map_legend_people") + "</span><span><i style='background:#8D867C'></i>" + t("map_legend_rel") + "</span>";

  let svg = '<svg viewBox="0 0 ' + W + " " + H + '" xmlns="http://www.w3.org/2000/svg">';

  mapEdges.forEach((e) => {
    const na = mapNodes.find((n) => n.id === e.a), nb = mapNodes.find((n) => n.id === e.b);
    if (!na || !nb) return;
    const dim = dimNode(e.a) || dimNode(e.b);
    const hot = mapState.topic && !dim;
    svg += '<line class="map-edge' + (dim ? " dim" : "") + (hot ? " hot" : "") + '" x1="' + na.x + '" y1="' + na.y + '" x2="' + nb.x + '" y2="' + nb.y + '" data-a="' + e.a + '" data-b="' + e.b + '"><title>' + esc(e.why) + "</title></line>";
  });

  mapNodes.forEach((n) => {
    const r = n.type === "you" ? 26 : 19;
    const dim = dimNode(n.id);
    svg +=
      '<g class="map-node" data-id="' + n.id + '" transform="translate(' + n.x + "," + n.y + ')">' +
      '<circle class="' + (dim ? "dim" : "") + '" r="' + r + '" fill="' + n.color + '" stroke="var(--surface)" stroke-width="2.5"/>' +
      (n.type !== "you" ? '<text class="' + (dim ? "dim" : "") + '" y="1" text-anchor="middle" font-size="' + Math.round(r * 0.62) + '" font-weight="700" fill="#fff">' + esc(initialsOf(n.label)) + "</text>" : "") +
      '<text class="' + (dim ? "dim" : "") + '" y="' + (r + 16) + '" text-anchor="middle" font-size="' + (n.type === "you" ? 12 : 10.5) + '" font-weight="' + (n.type === "you" ? "700" : "600") + '" fill="var(--ink)">' + esc(n.label) + "</text>" +
      "</g>";
  });
  svg += "</svg>";
  $("#map-canvas").innerHTML = svg;
  $("#map-wrap .map-pop") && $("#map-wrap .map-pop").remove();
  bindMapEvents();
}

function initialsOf(label) {
  const parts = label.split(" ");
  return (parts[0][0] + (parts[1] ? parts[1][0] : "")).toUpperCase();
}

/** Tên rút gọn cho node map — chịu được tên 1 chữ (người thật). */
function shortName(p) {
  const parts = String(p.name || "").split(" ").filter(Boolean);
  if (!parts.length) return "?";
  if (parts.length === 1) return parts[0].slice(0, 8);
  return parts[0] + " " + parts[parts.length - 1][0] + ".";
}

function bindMapEvents() {
  $$("#map-canvas .map-node").forEach((g) => {
    const id = g.dataset.id;
    g.addEventListener("click", (e) => { e.stopPropagation(); showMapPop(id); });
    const node = mapNodes.find((n) => n.id === id);
    let dragging = false;
    g.addEventListener("pointerdown", (e) => { dragging = true; g.setPointerCapture(e.pointerId); });
    g.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const rect = $("#map-canvas").getBoundingClientRect();
      node.x = Math.min(900, Math.max(20, (e.clientX - rect.left) * (920 / rect.width)));
      node.y = Math.min(620, Math.max(25, (e.clientY - rect.top) * (640 / rect.height)));
      g.setAttribute("transform", "translate(" + node.x + "," + node.y + ")");
      $$("#map-canvas line.map-edge").forEach((line) => {
        if (line.dataset.a === id) line.setAttribute("x1", node.x), line.setAttribute("y1", node.y);
        if (line.dataset.b === id) line.setAttribute("x2", node.x), line.setAttribute("y2", node.y);
      });
    });
    ["pointerup", "pointercancel"].forEach((ev) => g.addEventListener(ev, () => (dragging = false)));
  });
  $("#map-canvas").addEventListener("click", () => { const p = $("#map-wrap .map-pop"); if (p) p.remove(); });
}

function showMapPop(id) {
  $("#map-wrap .map-pop") && $("#map-wrap .map-pop").remove();
  const node = mapNodes.find((n) => n.id === id);
  if (!node) return;
  const person = byId(id);
  const pop = document.createElement("div");
  pop.className = "map-pop";
  pop.innerHTML = '<button class="close">✕</button>';

  if (person) {
    const linked = mapEdges.filter((e) => e.a === id || e.b === id).map((e) => (e.a === id ? e.b : e.a)).map((nid) => byId(nid)).filter(Boolean);
    pop.innerHTML +=
      avatarHTML(person, 34) +
      "<b>" + esc(person.name) + "</b>" +
      '<div class="sub">' + esc(person.title) + " · " + esc(person.company) + "</div>" +
      '<div class="row"><span>' + t("map_last_contact") + "</span>" + daysAgo(person.lastContactDays) + "</div>" +
      '<div class="row"><span>' + t("map_strength") + "</span>" + strengthLabel(strengthOf(person.strength).id) + "</div>" +
      '<div class="row"><span>' + t("map_links") + "</span>" + t("map_connections_count", { n: linked.length }) + "</div>" +
      '<div class="actions">' +
      '<button class="btn small primary pop-profile" data-id="' + id + '">' + t("btn_profile") + "</button>" +
      '<button class="btn small pop-refresh" data-id="' + id + '">' + t("btn_refresh") + "</button>" +
      "</div>";
    pop.querySelector(".pop-profile").addEventListener("click", () => go("profile", { personId: id }));
    pop.querySelector(".pop-refresh").addEventListener("click", () => go("refresh", { personId: id }));
  } else {
    const members = mapEdges.filter((e) => e.a === id || e.b === id).map((e) => (e.a === id ? e.b : e.a)).map((nid) => byId(nid)).filter(Boolean);
    pop.innerHTML +=
      "<b>" + esc(node.label) + "</b>" +
      '<div class="sub">' + t("lens_" + mapState.lens) + t("map_group_of") + "</div>" +
      (members.length
        ? '<div style="margin-top:8px;font-size:11px;color:var(--ink-3)">' + t("map_people_upper") + " (" + members.length + ")</div>" +
          members.map((p) => '<button class="row" style="width:100%;text-align:left;cursor:pointer" data-id="' + p.id + '"><span>' + esc(p.name) + "</span></button>").join("")
        : "") +
      (members.length ? '<div class="actions"><button class="btn small primary" id="pop-lens">' + t("map_explore", { name: node.label }) + "</button></div>" : "");
    $$(".row[data-id]", pop).forEach((r) => r.addEventListener("click", () => go("profile", { personId: r.dataset.id })));
    const lp = pop.querySelector("#pop-lens");
    if (lp) lp.addEventListener("click", () => { mapState.topic = node.label; mapState.focusId = null; mapState.lens = "people"; renderMap(); });
  }
  $("#map-wrap").appendChild(pop);
  pop.querySelector(".close").addEventListener("click", () => pop.remove());
}

/* ============================================================
   PROFILE
   ============================================================ */
function profileTimeline(p) {
  const items = [];
  p.meetings.forEach((m) => items.push({ date: m.date, key: dateKey(m.date), kind: m.type === "Event" ? "event" : "meeting", title: m.title, body: m.summary }));
  p.memories.forEach((m) => items.push({ date: m.when, key: dateKey(m.when), kind: "memory", title: "Memory", body: m.text }));
  (p.timelineExtra || []).forEach((m) => items.push({ date: m.date, key: dateKey(m.date), kind: m.kind, title: m.title, body: m.body }));
  p.dates.forEach((d) => items.push({ date: d.when.split("(")[0].trim(), key: dateKey(d.when), kind: "event", title: d.label, body: "" }));
  items.sort((a, b) => (a.key < b.key ? 1 : -1));
  return items.map((it) =>
    '<div class="tl-item ' + it.kind + '"><div class="tl-date">' + esc(it.date) + "</div>" +
    '<div class="tl-title">' + (it.kind !== "memory" && it.kind !== "meeting" && it.kind !== "event" ? '<span class="tl-kind">' + esc(it.kind.replace(/_/g, " ")) + "</span>" : "") + esc(it.title) + "</div>" +
    (it.body ? '<div class="tl-body">' + esc(it.body) + "</div>" : "") + "</div>"
  ).join("");
}

function kvList(items) {
  if (!items.length) return '<span class="chip ghost">' + t("nothing_here") + "</span>";
  return '<div style="display:flex;flex-direction:column">' + items.map((it) => '<div class="kv"><span class="k">' + esc(it.k) + "</span><span class='v'>" + esc(it.v) + "</span></div>").join("") + "</div>";
}

function renderProfile(id) {
  const p = byId(id);
  if (!p) return go("people");
  const st = strengthOf(p.strength);
  const freq = frequencyOf(p.frequency);
  const inactive = p.active === false;
  const importantDates = [
    ...(p.birthday ? [{ label: t("field_birthday"), when: p.birthday }] : []),
    ...(p.dates || []),
  ];

  const head =
    '<button class="btn ghost" style="margin-bottom:12px" id="back-people">' + icon("back") + " " + t("btn_back") + "</button>" +
    '<div class="screen-head-row"><div class="profile-head">' + avatarHTML(p, 62) +
    "<div><h1>" + esc(p.name) + "</h1>" +
    '<div class="role-line"><b>' + esc(p.title) + "</b> at " + esc(p.company) + "</div>" +
    '<div class="chip-row" style="margin-top:8px">' +
    '<span class="chip dot" style="color:' + st.color + '">' + strengthLabel(st.id) + "</span>" +
    (p.currentCity ? '<button class="chip chip-action" data-profile-location="' + esc(p.currentCity) + '">' + icon("pin", 11) + esc(p.currentCity) + "</button>" : "") +
    (p.metCount ? '<span class="chip">' + t("profile_met", { n: p.metCount }).replace("{n}", p.metCount) + "</span>" : "") +
    '<span class="chip ' + (p.lastContactDays > 90 ? "warn" : "ok") + '">' + t("profile_last_contact_label", { d: daysAgo(p.lastContactDays) }).replace("{d}", daysAgo(p.lastContactDays)) + "</span>" +
    (inactive ? '<span class="chip warn">' + t("badge_inactive") + "</span>" : "") +
    "</div>" +
    '<div class="contact-row">' +
    '<a href="#" onclick="return false">' + icon("mail", 12) + esc(p.email) + "</a>" +
    '<a href="#" onclick="return false">' + icon("phone", 12) + esc(p.phone) + "</a>" +
    '<a href="#" onclick="return false">' + icon("msg", 12) + t("btn_message") + "</a>" +
    "</div></div></div>" +
    '<div class="profile-actions">' +
    '<button class="btn accent" id="act-addinfo">' + icon("plus", 13) + " " + t("btn_add_info") + "</button>" +
    '<button class="btn small" id="act-edit">' + t("btn_edit") + "</button>" +
    '<button class="btn small refresh-open" data-id="' + p.id + '">' + icon("refresh", 12) + " " + t("btn_refresh") + "</button>" +
    '<button class="btn small" id="act-connections">' + icon("graph", 12) + " " + t("btn_connections") + "</button>" +
    "</div></div>";

  const tabs =
    '<div class="tabs">' +
    ["overview", "personal", "work", "relationship", "timeline", "photos"].map((tb) =>
      '<button class="tab' + (tb === profileTab ? " active" : "") + '" data-tab="' + tb + '">' + t("profile_tab_" + tb) + "</button>"
    ).join("") +
    "</div>";

  const overview =
    '<div class="profile-grid">' +
    '<div class="stack">' +
    '<div class="card"><div class="card-title">' + icon("spark", 13) + " " + t("profile_about") + "</div>" +
    '<div class="summary-quote">' + esc(p.about) + "</div></div>" +
    '<div class="card"><div class="card-title">' + icon("users", 13) + " " + t("profile_rel_settings") + "</div>" +
    '<div class="fact-grid"><div class="fact"><div class="k">' + t("fact_relationship") + '</div><div class="v">' + esc(relTypeLabel(p.relationshipType)) + "</div></div>" +
    '<div class="fact"><div class="k">' + t("fact_first_met") + '</div><div class="v">' + esc(p.firstMet.date) + (p.firstMet.place ? " · " + esc(p.firstMet.place) : "") + "</div></div>" +
    '<div class="fact"><div class="k">' + t("fact_introduced_by") + '</div><div class="v">' + esc(p.introducedBy || "—") + "</div></div>" +
    '<div class="fact"><div class="k">' + t("fact_last_contact") + '</div><div class="v">' + daysAgo(p.lastContactDays) + "</div></div></div>" +
    '<div style="margin-top:12px;font-size:11.5px;font-weight:700;color:var(--ink-3);text-transform:uppercase;letter-spacing:.6px">' + t("fact_strength") + "</div>" +
    '<div class="pick-row" style="margin-top:7px">' + STRENGTHS.map((s) => '<button class="pick strength-pick' + (s.id === p.strength ? " on" : "") + '" data-s="' + s.id + '">' + strengthLabel(s.id) + "</button>").join("") + "</div>" +
    '<div style="margin-top:12px;font-size:11.5px;font-weight:700;color:var(--ink-3);text-transform:uppercase;letter-spacing:.6px">' + t("fact_rhythm") + "</div>" +
    '<div class="pick-row" style="margin-top:7px">' + FREQUENCIES.map((f) => '<button class="pick freq-pick' + (f.id === p.frequency ? " on" : "") + '" data-f="' + f.id + '">' + frequencyLabel(f.id) + "</button>").join("") + "</div>" +
    '<p style="font-size:11px;color:var(--ink-3);margin-top:9px">' + t("profile_care_note") + "</p></div>" +
    '<div class="card"><div class="card-title">' + icon("cake", 13) + " " + t("profile_important_dates") + "</div>" +
    (importantDates.length ? kvList(importantDates.map((d) => ({ k: d.label, v: d.when }))) : '<span class="chip ghost">' + t("no_dates_yet") + "</span>") + "</div>" +
    '<div class="card"><div class="card-title">' + icon("tag", 13) + " " + t("profile_tags") + "</div>" +
    '<div class="chip-row">' + (p.tags || []).map((tg) => '<button class="chip chip-action tag-search" data-tag-search="' + esc(tg) + '" title="' + esc(t("tag_search_hint")) + '">#' + esc(tg) + "</button>").join("") + "</div></div>" +
    "</div>" +
    '<div class="stack">' +
    '<div class="card"><div class="card-title">' + icon("pin", 13) + " " + t("profile_last_interaction") + "</div>" +
    '<div class="chip-row"><span class="chip ok">' + esc(p.last.type) + "</span><span class='chip'>" + esc(p.last.when) + "</span><span class='chip'>" + esc(p.last.place) + "</span></div>" +
    '<p style="font-size:13px;color:var(--ink-2);margin-top:10px">' + esc(p.last.summary) + "</p></div>" +
    '<div class="card"><div class="card-title">' + icon("link", 13) + " " + t("profile_mutual") + "</div>" +
    (p.mutual.length ? '<div class="chip-row">' + p.mutual.map((nm) => { const mp = byId(PEOPLE.find((x) => x.name.startsWith(nm.split(" ")[0])) ? PEOPLE.find((x) => x.name.startsWith(nm.split(" ")[0])).id : ""); return '<button class="chip person-link" data-id="' + (mp ? mp.id : "") + '">' + esc(nm) + "</button>"; }).join("") + "</div>" : '<span class="chip ghost">' + t("none_yet") + "</span>") + "</div>" +
    '<div class="card"><div class="card-title">' + icon("mic", 13) + " " + t("profile_raw") + "</div>" +
    '<div class="raw-block">' + (p.raw || t("raw_empty")) + "</div>" +
    '<p style="font-size:11px;color:var(--ink-3);margin-top:8px">' + t("profile_raw_note") + "</p></div>" +
    "</div></div>";

  const fieldCard = (title, items, ico) =>
    '<div class="card"><div class="card-title">' + icon(ico, 13) + " " + title + "</div>" + kvList(items) + "</div>";

  const personal = fieldCard(t("profile_tab_personal"), [
    ...(p.familyNotes ? [{ k: t("fact_family"), v: p.familyNotes }] : []),
    ...(p.interestsNotes ? [{ k: t("fact_interests_notes"), v: p.interestsNotes }] : []),
    ...(p.notes ? [{ k: t("fact_other_notes"), v: p.notes }] : []),
    ...(p.spouse ? [{ k: t("fact_spouse"), v: p.spouse }] : []),
    ...(p.children ? [{ k: t("fact_children"), v: p.children }] : []),
    ...(p.hobbies && p.hobbies.length ? [{ k: t("fact_hobbies"), v: p.hobbies.join(", ") }] : []),
    ...(p.sports && p.sports.length ? [{ k: t("fact_sports"), v: p.sports.join(", ") }] : []),
    ...(p.favoriteFood ? [{ k: t("fact_food"), v: p.favoriteFood }] : []),
    ...(p.favoriteDrink ? [{ k: t("fact_drink"), v: p.favoriteDrink }] : []),
    ...(p.schools ? [{ k: t("fact_school"), v: p.schools }] : []),
    ...(p.pets ? [{ k: t("fact_pets"), v: p.pets }] : []),
    ...(p.languages && p.languages.length ? [{ k: t("fact_languages"), v: p.languages.join(", ") }] : []),
    ...(p.hometown ? [{ k: t("fact_hometown"), v: p.hometown }] : []),
    ...(p.nationality ? [{ k: t("fact_nationality"), v: p.nationality }] : [])
  ], "book");

  const work = fieldCard(t("profile_tab_work"), [
    ...(p.workNotes ? [{ k: t("fact_work_notes"), v: p.workNotes }] : []),
    { k: t("fact_company"), v: p.company },
    ...(p.department ? [{ k: t("fact_department"), v: p.department }] : []),
    { k: t("fact_position"), v: p.title },
    ...(p.industry ? [{ k: t("fact_industry"), v: p.industry }] : []),
    ...(p.profession ? [{ k: t("fact_profession"), v: p.profession }] : []),
    ...(p.expertise && p.expertise.length ? [{ k: t("fact_expertise"), v: p.expertise.join(", ") }] : []),
    ...(p.previousCompanies && p.previousCompanies.length ? [{ k: t("fact_previous"), v: p.previousCompanies.join(", ") }] : []),
    ...(p.careerHistory && p.careerHistory.length ? [{ k: t("fact_career"), v: p.careerHistory.join(" · ") }] : []),
    ...(p.skills && p.skills.length ? [{ k: t("fact_skills"), v: p.skills.join(", ") }] : []),
    ...(p.businessTopics && p.businessTopics.length ? [{ k: t("fact_business"), v: p.businessTopics.join(", ") }] : [])
  ], "brief");

  const relationship = fieldCard(t("profile_tab_relationship"), [
    ...(p.relationshipNotes ? [{ k: t("fact_relationship_notes"), v: p.relationshipNotes }] : []),
    { k: t("fact_type"), v: relTypeLabel(p.relationshipType) },
    { k: t("fact_strength"), v: strengthLabel(st.id) },
    ...(freq ? [{ k: t("fact_rhythm"), v: frequencyLabel(freq.id) }] : []),
    { k: t("fact_first_met"), v: p.firstMet.date + (p.firstMet.place ? " · " + p.firstMet.place : "") },
    ...(p.firstMet.how ? [{ k: t("fact_how"), v: p.firstMet.how }] : []),
    ...(p.introducedBy ? [{ k: t("fact_introduced_by"), v: p.introducedBy }] : []),
    ...(p.helpGiven && p.helpGiven.length ? [{ k: t("fact_helped"), v: p.helpGiven.join(" · ") }] : []),
    ...(p.helpReceived && p.helpReceived.length ? [{ k: t("fact_helped_me"), v: p.helpReceived.join(" · ") }] : []),
    ...(p.promises && p.promises.length ? [{ k: t("fact_promises"), v: p.promises.join(" · ") }] : [])
  ], "link");

  const timelineCard = '<div class="card"><div class="card-title">' + icon("meeting", 13) + " " + t("profile_tab_timeline") + "</div>" +
    '<div class="timeline">' + profileTimeline(p) + "</div></div>";

  const photosTab =
    '<div class="profile-grid">' +
    '<div class="stack">' +
    '<div class="card"><div class="card-title">' + icon("image", 13) + " " + t("profile_photos") + "</div>" +
    '<div class="profile-photo-row">' + avatarHTML(p, 96) +
    '<div style="display:flex;flex-direction:column;gap:7px">' +
    '<button class="btn small primary" id="ph-change">' + t("profile_edit_photo") + "</button>" +
    (p.photo ? '<button class="btn small ghost" id="ph-remove">' + t("profile_remove_photo") + "</button>" : "") +
    "</div></div>" +
    '<input type="file" id="ph-file" accept="image/*" hidden /></div>' +
    '<div class="card"><div class="card-title">' + icon("camera", 13) + " " + t("profile_photos_gallery") + "</div>" +
    '<div class="photo-gallery">' +
    (p.photos && p.photos.length
      ? p.photos.map((ph, i) =>
          '<div class="photo-tile"><img src="' + esc(ph.src) + '" alt="" />' +
          '<input class="photo-note" data-idx="' + i + '" placeholder="' + t("profile_photo_note") + '" value="' + esc(ph.note || "") + '" />' +
          '<button class="photo-remove" data-idx="' + i + '" title="' + t("btn_remove") + '">✕</button></div>'
        ).join("")
      : '<span class="chip ghost" style="grid-column:1/-1">' + t("profile_photos_empty") + "</span>") +
    "</div>" +
    '<button class="btn small" id="ph-add" style="margin-top:12px">' + icon("plus", 12) + " " + t("btn_add_photo") + "</button>" +
    '<input type="file" id="ph-multi" accept="image/*" multiple hidden /></div>' +
    "</div></div>";

  const bodies = { overview, personal, work, relationship, timeline: timelineCard, photos: photosTab };
  if (!bodies[profileTab]) profileTab = "overview";
  const profileEndActions =
    '<div class="profile-end-actions" aria-label="' + esc(t("profile_end_actions")) + '">' +
    '<div class="profile-end-copy"><b>' + t("profile_end_actions") + "</b><span>" + t("profile_end_actions_desc") + "</span></div>" +
    '<div class="profile-end-buttons">' +
    '<button class="btn small ghost" id="act-archive">' + (inactive ? t("btn_restore_contact") : t("btn_archive_contact")) + "</button>" +
    '<button class="btn small ghost danger-link" id="act-delete">' + icon("trash", 12) + " " + t("btn_delete_contact") + "</button>" +
    "</div></div>";
  $("#screen-profile").innerHTML = head + tabs + '<div id="profile-body">' + bodies[profileTab] + "</div>" + profileEndActions;

  $$(".tab", $("#screen-profile")).forEach((tb) =>
    tb.addEventListener("click", () => {
      profileTab = tb.dataset.tab;
      renderProfile(profileId);
    })
  );

  $("#back-people").addEventListener("click", goBack);
  bindProfile();
}

function bindProfile() {
  const scope = $("#screen-profile");
  const p = byId(profileId);
  if (!p) return;
  $("#act-addinfo").addEventListener("click", () => openCapture(null, { personId: p.id, addInfo: true }));
  $("#act-edit").addEventListener("click", () => openCapture("manual", { personId: p.id, edit: true }));
  $("#act-connections").addEventListener("click", () => go("map", { map: { lens: "people", focusId: null, topic: "" } }));
  $("#act-archive").addEventListener("click", () => {
    const next = p.active === false;
    Store.setActive(p.id, next);
    toast(t(next ? "toast_active_on" : "toast_active_off", { name: p.name.split(" ")[0] }));
    renderProfile(p.id);
  });
  $("#act-delete").addEventListener("click", () => {
    if (!confirm(t("delete_person_confirm", { name: p.name }))) return;
    Store.deletePerson(p.id);
    toast(t("toast_person_deleted", { name: p.name }));
    go("people");
  });
  $$(".refresh-open", scope).forEach((b) => b.addEventListener("click", () => go("refresh", { personId: b.dataset.id })));
  $$(".person-link", scope).forEach((b) => b.addEventListener("click", () => b.dataset.id && go("profile", { personId: b.dataset.id })));
  $$("[data-profile-location]", scope).forEach((b) => b.addEventListener("click", () => openMapLocation(b.dataset.profileLocation)));
  $$("[data-tag-search]", scope).forEach((b) => b.addEventListener("click", () => {
    go("ask");
    setTimeout(() => {
      const input = $("#ask-input");
      if (input) {
        input.value = b.dataset.tagSearch || "";
        runAsk(input.value);
        input.focus();
      }
    }, 60);
  }));
  $$(".strength-pick", scope).forEach((b) => b.addEventListener("click", () => {
    Store.setStrength(p.id, b.dataset.s);
    toast(t("toast_strength", { label: strengthLabel(b.dataset.s) }));
    renderProfile(p.id);
  }));
  $$(".freq-pick", scope).forEach((b) => b.addEventListener("click", () => {
    Store.setFrequency(p.id, b.dataset.f);
    toast(t("toast_rhythm", { label: frequencyLabel(b.dataset.f) }));
    renderProfile(p.id);
  }));
  // photos
  const phChange = $("#ph-change");
  const phFile = $("#ph-file");
  if (phChange && phFile) {
    phChange.addEventListener("click", () => phFile.click());
    phFile.addEventListener("change", (e) => {
      const f = e.target.files && e.target.files[0];
      if (!f) return;
      readFileAsDataURL(f, (src) => {
        profileTab = "photos";
        setProfilePhoto(p.id, src);
        toast(t("toast_photo_saved"));
        renderProfile(p.id);
      });
    });
  }
  const phRemove = $("#ph-remove");
  if (phRemove) phRemove.addEventListener("click", () => {
    profileTab = "photos";
    removeProfilePhoto(p.id);
    toast(t("toast_photo_removed"));
    renderProfile(p.id);
  });
  const phAdd = $("#ph-add");
  const phMulti = $("#ph-multi");
  if (phAdd && phMulti) {
    phAdd.addEventListener("click", () => phMulti.click());
    phMulti.addEventListener("change", (e) => {
      const files = [...(e.target.files || [])];
      if (!files.length) return;
      const srcs = [];
      let remaining = files.length;
      files.forEach((f) => readFileAsDataURL(f, (src) => {
        srcs.push(src);
        if (--remaining === 0) {
          profileTab = "photos";
          addPhotos(p.id, srcs);
          toast(t("toast_photo_added"));
          renderProfile(p.id);
        }
      }));
    });
  }
  $$(".photo-remove", scope).forEach((b) => b.addEventListener("click", () => {
    profileTab = "photos";
    removePhoto(p.id, +b.dataset.idx);
    renderProfile(p.id);
  }));
  $$(".photo-note", scope).forEach((inp) => inp.addEventListener("change", () => { setPhotoNote(p.id, +inp.dataset.idx, inp.value); }));
}

/* ============================================================
   QUICK REFRESH
   ============================================================ */
function buildRefresh(p) {
  const topics = (p.last.tags || []).slice(0, 2).join(", ");
  return {
    hero: { name: p.name, company: p.company + " — " + p.title },
    meta: [
      { k: t("refresh_last_met"), v: p.last.when + " · " + p.last.place },
      { k: t("refresh_read_time"), v: t("refresh_read_time_v") }
    ],
    rows: [
      { k: t("refresh_lives"), v: p.currentCity + (p.area ? " (" + p.area + ")" : "") },
      { k: t("refresh_likes"), v: (p.hobbies && p.hobbies.length ? p.hobbies.join(", ") : (p.interests || []).slice(0, 3).join(", ")) },
      ...(p.children ? [{ k: t("refresh_children"), v: p.children }] : []),
      ...(p.familyNotes ? [{ k: t("refresh_family"), v: p.familyNotes }] : []),
      { k: t("refresh_last_topic"), v: topics || p.last.summary.slice(0, 60) + "…" },
      { k: t("refresh_open_topic"), v: (p.followUp.what && p.followUp.what !== "—" ? p.followUp.what : (p.promises && p.promises[0]) || "Just catch up") }
    ],
    points: [
      "Check how things changed since " + p.last.when + ".",
      "Pick up on: " + (p.memories[0] ? p.memories[0].text : "their work at " + p.company) + ".",
      (p.followUp.what && p.followUp.what !== "—" ? "Drive forward: " + p.followUp.what + "." : "Note what's next — I'll file it.")
    ]
  };
}

function renderRefresh(personId) {
  const p = byId(personId);
  if (!p) return go("home");
  const b = buildRefresh(p);
  $("#screen-refresh").innerHTML =
    '<button class="btn ghost" style="margin-bottom:14px" id="rf-back">' + icon("back") + " " + t("btn_back") + "</button>" +
    '<div class="refresh-hero">' +
    '<div class="kicker">' + t("refresh_kicker") + "</div>" +
    "<h1>" + esc(b.hero.name) + "</h1>" +
    "<p>" + esc(b.hero.company) + "</p>" +
    '<div class="refresh-meta">' + b.meta.map((m) => '<span class="chip">' + esc(m.k) + ": " + esc(m.v) + "</span>").join("") + "</div></div>" +
    '<div class="card"><div class="card-title">' + icon("book", 13) + " " + t("refresh_before") + "</div>" +
    '<div class="brief-rows">' + b.rows.map((r) => '<div class="kv"><span class="k">' + esc(r.k) + "</span><span class='v'>" + esc(r.v) + "</span></div>").join("") + "</div></div>" +
    '<div class="card"><div class="card-title">' + icon("spark", 13) + " " + t("refresh_starters") + "</div>" +
    b.points.map((tp, i) => '<label class="check-row"><input type="checkbox" ' + (i === 0 ? "checked" : "") + "/><span><b>" + esc(tp) + "</b><span>reference from memory</span></span></label>").join("") + "</div>" +
    '<div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap">' +
    '<button class="btn primary" id="rf-done">' + icon("check", 14) + " " + t("btn_ready") + "</button>" +
    '<button class="btn" id="rf-profile">' + t("btn_open_profile") + "</button>" +
    '<button class="btn ghost" id="rf-memory">' + icon("mic", 13) + " " + t("btn_update_after") + "</button></div>";

  $("#rf-back").addEventListener("click", goBack);
  $("#rf-profile").addEventListener("click", () => go("profile", { personId }));
  $("#rf-memory").addEventListener("click", () => openCapture("voice", { personId, addInfo: true }));
  $("#rf-done").addEventListener("click", () => { toast(t("toast_good_luck")); go("home"); });
}

/* ============================================================
   SETTINGS (web companion)
   ============================================================ */
function findDuplicates() {
  const map = new Map();
  PEOPLE.forEach((p) => {
    const key = p.name.toLowerCase().replace(/\s+/g, " ").trim();
    const arr = map.get(key) || [];
    arr.push(p);
    map.set(key, arr);
  });
  return [...map.values()].filter((g) => g.length > 1);
}

/** Merge 2 người trùng tên: giữ người thứ nhất, gộp dữ liệu, xoá người thứ hai. */
function mergePeople(keep, dup) {
  if (!keep || !dup) return;
  const merged = {
    meetings: [...(keep.meetings || []), ...(dup.meetings || [])],
    memories: [...(keep.memories || []), ...(dup.memories || [])],
    photos: [...(keep.photos || []), ...(dup.photos || [])],
    photo: keep.photo || dup.photo || "",
    tags: [...new Set([...(keep.tags || []), ...(dup.tags || [])])],
    connections: [...new Set([...(keep.connections || []), ...(dup.connections || [])])],
    metCount: (keep.metCount || 0) + (dup.metCount || 0),
    email: keep.email || dup.email || "",
    phone: keep.phone || dup.phone || "",
    company: keep.company && keep.company !== "—" ? keep.company : dup.company || keep.company,
    title: keep.title && keep.title !== "—" ? keep.title : dup.title || keep.title,
  };
  Store.updatePerson(keep.id, merged);
  Store.deletePerson(dup.id);
}

function renderSettings() {
  const dups = findDuplicates();
  $("#screen-settings").innerHTML =
    '<div class="screen-head"><div class="kicker">' + t("settings_kicker") + "</div>" +
    '<h1 class="screen-title">' + t("settings_title") + "</h1>" +
    '<p class="screen-sub">' + t("settings_sub") + "</p></div>" +
    '<div class="card"><div class="card-title">' + icon("merge", 13) + " " + t("settings_duplicates") + "</div>" +
    (dups.length
      ? dups.map((g) =>
          '<div class="setting-row"><div><b>' + esc(g[0].name) + " × " + esc(g[1].name) + "</b><span>" + t("settings_dup_sub") + "</span></div>" +
          '<button class="btn small primary s-act merge-btn" data-keep="' + g[0].id + '" data-dup="' + g[1].id + '">' + icon("merge", 12) + " " + t("btn_merge") + "</button></div>"
        ).join("")
      : '<div class="setting-row"><div><span>' + t("settings_no_duplicates") + "</span></div></div>") +
    "</div>" +
    '<div class="card"><div class="card-title">' + icon("gear", 13) + " " + t("settings_bulk") + "</div>" +
    '<div class="setting-row"><div><b>' + t("settings_export") + "</b><span>" + t("settings_export_desc") + "</span></div>" +
    '<button class="btn small s-act" id="export-btn">' + t("btn_export") + "</button></div>" +
    '<div class="setting-row"><div><b>' + t("settings_import") + "</b><span>" + t("settings_import_desc") + "</span></div>" +
    '<button class="btn small s-act" id="import-btn">' + t("btn_import") + "</button></div>" +
    '<input type="file" id="import-file" accept="application/json,.json" hidden />' +
    '<div class="setting-row"><div><b>' + t("settings_sample_row") + "</b><span>" + t("settings_sample_desc") + "</span></div>" +
    '<button class="btn small s-act" id="sample-btn">' + t("btn_load_sample") + "</button></div></div>" +
    (fbEnabled()
      ? '<div class="card"><div class="card-title">' + icon("users", 13) + " " + t("auth_account") + "</div>" +
        '<div class="setting-row"><div><b>' + esc(fbUser && fbUser.email ? fbUser.email : t("you")) + "</b><span>" + t("auth_sync_note") + "</span></div>" +
        '<button class="btn small ghost s-act" id="logout-btn">' + t("auth_sign_out") + "</button></div></div>"
      : "") +
    '<div class="card"><div class="card-title">' + icon("lock", 13) + " " + t("settings_privacy") + "</div>" +
    '<div class="setting-row"><div><b>' + t("settings_private") + "</b><span>" + t("settings_private_desc") + "</span></div><span class='chip ok'>On</span></div>" +
    '<div class="setting-row"><div><b>' + t("settings_delete") + "</b><span>" + t("settings_delete_desc") + "</span></div>" +
    '<button class="btn small ghost s-act" id="delete-btn">' + icon("trash", 12) + " " + t("btn_delete") + "</button></div></div>";

  $$(".merge-btn", $("#screen-settings")).forEach((b) => b.addEventListener("click", () => {
    mergePeople(byId(b.dataset.keep), byId(b.dataset.dup));
    renderSettings();
    toast(t("toast_merged"), "merge");
  }));
  $("#sample-btn").addEventListener("click", () => {
    if (!confirm(t("settings_sample_confirm"))) return;
    Store.loadSample();
    renderAll();
    toast(t("toast_sample_loaded"));
  });
  $("#export-btn").addEventListener("click", () => {
    const blob = new Blob([Store.exportJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "network-management-backup.json";
    a.click();
    URL.revokeObjectURL(url);
    toast(t("toast_exported"));
  });
  $("#import-btn").addEventListener("click", () => $("#import-file").click());
  $("#import-file").addEventListener("change", (e) => {
    const f = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const people = Store.parseImport(String(r.result));
        Store.importPeople(people);
        renderAll();
        toast(t("toast_imported", { n: people.length }));
      } catch (err) {
        toast(t("toast_import_error"));
      }
    };
    r.readAsText(f);
  });
  $("#delete-btn").addEventListener("click", () => {
    if (!confirm(t("settings_delete_confirm"))) return;
    Store.deleteAll();
    renderAll();
    go("home");
    toast(t("toast_deleted_all"));
  });
  const lb = $("#logout-btn");
  if (lb) lb.addEventListener("click", () => { Firebase.signOut().catch(() => { /* ignore */ }); });
}

/* ============================================================
   CAPTURE — voice / card / text / manual
   ============================================================ */
let cap = { mode: null, step: 0, timer: null, seconds: 0, open: false, personId: null, addInfo: false, edit: false };
const VOICE_LANGS = ["ja-JP", "vi-VN", "en-US"];
const VOICE_LANG_KEY = "nm-voice-lang";

function openCapture(mode, opts = {}) {
  cap = {
    mode: mode || null, sourceMode: mode || null, step: 1, timer: null, seconds: 0, open: true,
    personId: opts.personId || null, addInfo: !!opts.addInfo, edit: !!opts.edit, text: "", photo: "",
    voiceLang: getVoiceLang(),
    prefill: opts.prefill || {}, review: false, formDraft: null, initialFormDraft: "",
    advancedOpen: false, openSections: {}, dirty: false, nameFocused: false, aiAbort: null,
    cardStream: null, cardCameraStarted: false,
  };
  $("#capture-modal").classList.add("open");
  renderCapture();
}

function abortCapAI() {
  if (cap.aiAbort) {
    try { cap.aiAbort.abort(); } catch (e) { /* ignore */ }
  }
  cap.aiAbort = null;
}

function closeCapture(force = false) {
  if (force !== true && cap.mode === "manual" && cap.dirty && !confirm(t("discard_changes"))) return false;
  clearInterval(cap.timer);
  abortCapAI();
  stopCardCamera();
  cap.open = false;
  $("#capture-modal").classList.remove("open");
  return true;
}

function setCapTitle(txt, step) {
  $("#capture-title").textContent = txt;
  $("#capture-step").textContent = step || "";
}

function manualKey(field) {
  return field.sec + "." + field.k;
}

function manualSnapshot() {
  return JSON.stringify({ fields: cap.formDraft || {} });
}

function refreshManualDirty() {
  cap.dirty = !!cap.initialFormDraft && manualSnapshot() !== cap.initialFormDraft;
}

function aiProxyConfig() {
  return window.AI_PROXY_CONFIG || {};
}

function aiProxyBaseUrl() {
  const base = String(aiProxyConfig().baseUrl || "").trim().replace(/\/$/, "");
  return base;
}

function aiProxyReady() {
  return !!aiProxyBaseUrl();
}

function getVoiceLang() {
  const saved = localStorage.getItem(VOICE_LANG_KEY);
  return VOICE_LANGS.includes(saved) ? saved : "ja-JP";
}

function setVoiceLang(value) {
  cap.voiceLang = VOICE_LANGS.includes(value) ? value : "ja-JP";
  localStorage.setItem(VOICE_LANG_KEY, cap.voiceLang);
}

function captureInputLocale() {
  return cap.voiceLang || "ja-JP";
}

function buildExtractPrefill(parsed, rawText) {
  const source = parsed || {};
  const birthdayParts = parseBirthdayParts(source.birthday) || {};
  const birthdayParsed = manualHasValue(birthdayParts);
  const workNotes = [
    source.title ? "Role/title: " + source.title : "",
    source.department ? "Department: " + source.department : "",
    source.businessTopics && source.businessTopics.length ? "Business topics: " + source.businessTopics.join(", ") : "",
    source.website ? "Website: " + source.website : "",
  ].filter(Boolean).join("\n");
  const interestsNotes = [
    source.hobbies && source.hobbies.length ? "Hobbies: " + source.hobbies.join(", ") : "",
    source.interests && source.interests.length ? "Interests: " + source.interests.join(", ") : "",
  ].filter(Boolean).join("\n");
  const relationshipNotes = [
    source.introducedBy ? "Introduced by: " + source.introducedBy : "",
    source.firstMetPlace ? "First met place: " + source.firstMetPlace : "",
    source.followUpWhat ? "Follow-up: " + source.followUpWhat : "",
    source.promises && source.promises.length ? "Promises: " + source.promises.join(", ") : "",
  ].filter(Boolean).join("\n");
  const notes = [
    source.notes || rawText || "",
    source.birthday && !birthdayParsed ? "Birthday: " + source.birthday : "",
  ].filter(Boolean).join("\n");
  const prefill = {
    name: source.name || "",
    relationshipType: source.relationshipType || "",
    company: source.company || "",
    currentCity: source.currentCity || "",
    birthday: source.birthday || "",
    birthdayParts,
    workNotes,
    familyNotes: source.familyNotes || "",
    interestsNotes,
    relationshipNotes,
    followUpWhat: source.followUpWhat || "",
    promises: source.promises || [],
    tags: source.tags || [],
    department: source.department || "",
    title: source.title || "",
    email: source.email || "",
    phone: source.phone || "",
    website: source.website || "",
    languages: source.languages || [],
    hobbies: source.hobbies || [],
    interests: source.interests || [],
    businessTopics: source.businessTopics || [],
    introducedBy: source.introducedBy || "",
    notes,
  };
  if (prefill.followUpWhat && !prefill.promises.length) prefill.promises = [prefill.followUpWhat];
  return prefill;
}

function existingPeopleHints() {
  return Store.people().slice(0, 60).map((person) => ({
    id: person.id,
    name: person.name || "",
    company: person.company || "",
    currentCity: person.currentCity || "",
  }));
}

async function requestProxyExtraction(mode, text) {
  const baseUrl = aiProxyBaseUrl();
  if (!baseUrl) {
    const err = new Error("proxy-disabled");
    err.code = "proxy-disabled";
    throw err;
  }
  abortCapAI();
  const controller = new AbortController();
  cap.aiAbort = controller;
  const timeoutMs = Number(aiProxyConfig().timeoutMs || 15000);
  const timer = setTimeout(() => controller.abort("timeout"), timeoutMs);
  try {
    const response = await fetch(baseUrl + "/extract", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        mode,
        locale: captureInputLocale(),
        text,
        existingPeople: existingPeopleHints(),
      }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload || payload.ok !== true || !payload.extraction) {
      const err = new Error(payload && payload.error ? payload.error : "proxy-failed");
      err.code = "proxy-failed";
      throw err;
    }
    return payload.extraction;
  } finally {
    clearTimeout(timer);
    cap.aiAbort = null;
  }
}

async function requestProxyCardOcr(imageDataUrl, mimeType) {
  const baseUrl = aiProxyBaseUrl();
  if (!baseUrl) {
    const err = new Error("proxy-disabled");
    err.code = "proxy-disabled";
    throw err;
  }
  abortCapAI();
  const controller = new AbortController();
  cap.aiAbort = controller;
  const timeoutMs = Number(aiProxyConfig().cardTimeoutMs || aiProxyConfig().timeoutMs || 30000);
  const timer = setTimeout(() => controller.abort("timeout"), timeoutMs);
  try {
    const response = await fetch(baseUrl + "/card-ocr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        imageDataUrl,
        mimeType,
        existingPeople: existingPeopleHints(),
      }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload || payload.ok !== true) {
      const err = new Error(payload && payload.error ? payload.error : "card-ocr-failed");
      err.code = "card-ocr-failed";
      throw err;
    }
    return {
      ocrText: String(payload.ocrText || "").trim(),
      extraction: payload.extraction || {},
    };
  } finally {
    clearTimeout(timer);
    cap.aiAbort = null;
  }
}

function renderAIWaiting(kind) {
  setCapTitle(t("ai_organizing"), t("ai_step_2"));
  const body = $("#capture-body");
  body.innerHTML =
    '<div class="progress-step active"><span class="sp">1</span>' + t("prog_read") + "</div>" +
    '<div class="progress-step active"><span class="sp">2</span>' + t("prog_resolve_short") + "</div>" +
    '<div class="progress-step active"><span class="sp">3</span>' + t("prog_extract_short") + "</div>" +
    '<p style="font-size:12px;color:var(--ink-3);margin-top:12px">' + esc(aiProxyReady() ? t("ai_proxy_secure") : t("ai_proxy_fallback")) + "</p>" +
    '<div class="modal-foot"><button class="btn ghost" id="proc-cancel">' + t("btn_cancel") + "</button></div>";
  $("#proc-cancel").addEventListener("click", () => {
    abortCapAI();
    if (kind === "card") {
      cap.step = 3;
      renderCapture();
      return;
    }
    cap.step = 4;
    renderCapture();
  });
}

async function extractCapturePrefill(mode, text, fallback) {
  const local = fallback || (mode === "card" ? parseCardOcrText(text || "") : parsedToPrefill(parseCaptureText(text || "")));
  try {
    const extraction = await requestProxyExtraction(mode, text || "");
    return buildExtractPrefill(extraction, text || "");
  } catch (err) {
    if (err && err.name === "AbortError") throw err;
    toast(t("toast_ai_fallback"));
    return local;
  }
}

function manualOptionLabel(field, value) {
  if (!value) return "—";
  if (field.k === "gender") return genderLabel(value);
  if (field.k === "strength") return strengthLabel(value);
  if (field.k === "frequency") return frequencyLabel(value);
  if (field.k === "relationshipType") return relTypeLabel(value);
  return value;
}

function manualFieldHTML(field) {
  const key = manualKey(field);
  const id = "f-" + field.sec + "-" + field.k;
  const value = cap.formDraft[key];
  const label = t("field_" + field.k) + (field.req ? ' <span class="req">*</span>' : "");
  const placeholder = field.phKey ? t(field.phKey) : "";
  const attrs =
    (field.autocomplete ? ' autocomplete="' + esc(field.autocomplete) + '"' : "") +
    (field.inputmode ? ' inputmode="' + esc(field.inputmode) + '"' : "") +
    (field.req ? ' required aria-required="true"' : "");
  let control = "";

  if (field.control === "select") {
    control = '<select class="field-input" id="' + id + '" data-manual-key="' + key + '">' +
      field.options.map((option) => '<option value="' + esc(option) + '"' + (String(value || "") === option ? " selected" : "") + ">" + esc(manualOptionLabel(field, option)) + "</option>").join("") +
      "</select>";
  } else if (field.control === "textarea") {
    control = '<textarea class="field-textarea" id="' + id + '" data-manual-key="' + key + '" placeholder="' + esc(placeholder) + '"' + attrs + ">" + esc(value || "") + "</textarea>";
  } else if (field.control === "chips") {
    const chips = Array.isArray(value) ? value : [];
    const inputText = cap.chipInput && cap.chipInput[key] ? cap.chipInput[key] : "";
    const suggestions = field.k === "tags" ? collectTagSuggestions(Store.people(), chips, inputText, 8) : [];
    control = '<div class="chip-input" data-chip-wrap="' + key + '">' +
      '<div class="chip-list">' + chips.map((chip, index) =>
        '<span class="input-chip"><span>' + esc(chip) + '</span><button type="button" data-chip-remove="' + key + '" data-chip-index="' + index + '" aria-label="' + esc(t("chip_remove", { value: chip })) + '"><span class="chip-remove-icon">' + icon("plus", 10) + "</span></button></span>"
      ).join("") + "</div>" +
      '<input class="chip-entry" id="' + id + '" data-chip-entry="' + key + '" placeholder="' + esc(t(field.k === "tags" ? "tag_add_ph" : "chip_add_ph")) + '" autocomplete="off" value="' + esc(inputText) + '" />' +
      "</div>" +
      (field.k === "tags"
        ? '<div class="tag-suggestions" data-tag-suggestions="' + key + '" aria-label="' + esc(t("tag_suggestions")) + '">' +
          (suggestions.length
            ? suggestions.map((tag) => '<button type="button" class="tag-suggestion" data-tag-pick="' + key + '" data-tag-value="' + esc(tag) + '">#' + esc(tag) + "</button>").join("")
            : '<span>' + esc(inputText ? t("tag_no_matches") : t("tag_suggestions_empty")) + "</span>") +
          "</div>"
        : "");
  } else if (field.control === "location") {
    control = '<input class="field-input" id="' + id + '" data-manual-key="' + key + '" list="manual-location-list" placeholder="' + esc(placeholder) + '" value="' + esc(value || "") + '"' + attrs + " />" +
      '<div class="field-help-row"><span>' + t("location_hint") + '</span><button type="button" class="field-inline-action" data-location-other="' + key + '">' + t("location_other") + "</button></div>";
  } else if (field.control === "birthday") {
    const parts = value && typeof value === "object" ? value : parseBirthdayParts(value) || {};
    const month = validMonth(parseInt(parts.month, 10));
    const day = validDay(parseInt(parts.day, 10));
    const year = validYear(parseInt(parts.year, 10));
    const dateValue = month && day && year ? String(year).padStart(4, "0") + "-" + String(month).padStart(2, "0") + "-" + String(day).padStart(2, "0") : "";
    control = '<div class="birthday-parts" data-birthday-key="' + key + '">' +
      '<input class="field-input" type="number" inputmode="numeric" min="1" max="31" data-birthday-part="' + key + '" data-part="day" placeholder="' + esc(t("birthday_day_ph")) + '" aria-label="' + esc(t("birthday_day_ph")) + '" value="' + esc(day || "") + '" />' +
      '<input class="field-input" type="number" inputmode="numeric" min="1" max="12" data-birthday-part="' + key + '" data-part="month" placeholder="' + esc(t("birthday_month_ph")) + '" aria-label="' + esc(t("birthday_month_ph")) + '" value="' + esc(month || "") + '" />' +
      '<input class="field-input" type="number" inputmode="numeric" min="1" max="9999" data-birthday-part="' + key + '" data-part="year" placeholder="' + esc(t("birthday_year_ph")) + '" aria-label="' + esc(t("birthday_year_ph")) + '" value="' + esc(year || "") + '" />' +
      '<button class="birthday-calendar-btn" type="button" data-birthday-open="' + key + '" aria-label="' + esc(t("birthday_calendar")) + '">' + icon("cal", 14) + "</button>" +
      '<input class="birthday-date-native" type="date" data-birthday-date="' + key + '" value="' + esc(dateValue) + '" aria-hidden="true" tabindex="-1" />' +
      "</div>";
  } else {
    const type = field.control === "email" || field.control === "tel" ? field.control : "text";
    control = '<input class="field-input" id="' + id + '" type="' + type + '" data-manual-key="' + key + '" placeholder="' + esc(placeholder) + '" value="' + esc(value || "") + '"' + attrs + " />";
  }

  return '<div class="field' + (field.control === "textarea" || field.control === "birthday" ? " full" : "") + '"><label for="' + id + '">' + label + "</label>" + control + "</div>";
}

function manualVisibleFields() {
  if (!cap.review) return MANUAL_QUICK_FIELDS.map((key) => MANUAL_FIELD_MAP[key]).filter(Boolean);
  const detected = new Set(["basic.name"]);
  MANUAL_FIELDS.forEach((field) => {
    if (manualHasValue((cap.prefill || {})[field.k])) detected.add(manualKey(field));
  });
  const order = [...MANUAL_QUICK_FIELDS, ...MANUAL_FIELDS.map(manualKey)];
  return [...new Set(order)].filter((key) => detected.has(key)).map((key) => MANUAL_FIELD_MAP[key]).filter(Boolean);
}

function manualSectionCount(sectionKey) {
  return MANUAL_FIELDS.filter((field) => field.sec === sectionKey && manualHasValue(cap.formDraft[manualKey(field)])).length;
}

function manualAccordionHTML(visibleKeys) {
  if (!cap.advancedOpen) return "";
  const sections = MANUAL_SECTIONS.filter((section) => section.key !== "basic");
  const sectionHTML = sections.map((section) => {
    const fields = MANUAL_FIELDS.filter((field) => field.sec === section.key && !visibleKeys.has(manualKey(field)));
    if (!fields.length) return "";
    const open = !!cap.openSections[section.key];
    const count = manualSectionCount(section.key);
    const countText = count ? '<span class="accordion-count">' + t("advanced_count", { n: count }) + "</span>" : "";
    return '<section class="manual-accordion">' +
      '<button type="button" class="accordion-trigger" data-accordion="' + section.key + '" aria-expanded="' + String(open) + '" aria-controls="manual-section-' + section.key + '">' +
      '<span><b>' + t("section_" + section.key) + "</b>" + countText + '</span><span class="accordion-chevron">' + icon("chev", 14) + "</span></button>" +
      (open
        ? '<div class="accordion-body form-grid" id="manual-section-' + section.key + '">' + fields.map(manualFieldHTML).join("") + "</div>"
        : '<div id="manual-section-' + section.key + '" hidden></div>') +
      "</section>";
  }).join("");

  return '<div class="advanced-panel">' + sectionHTML + "</div>";
}

function initManualDraft(editing) {
  if (cap.formDraft) return;
  cap.formDraft = createManualDraft(editing, cap.prefill || {}, cap.review);
  cap.chipInput = {};
  cap.initialFormDraft = manualSnapshot();
  cap.dirty = false;
}

function updateManualSaveState() {
  const save = $("#mf-save");
  if (!save) return;
  const ready = !!String(cap.formDraft && cap.formDraft["basic.name"] || "").trim();
  save.disabled = !ready;
  save.setAttribute("aria-disabled", String(!ready));
}

function updateManualDuplicateHint(editingId) {
  const hint = $("#manual-duplicate");
  if (!hint) return;
  const duplicate = findPotentialDuplicate(cap.formDraft && cap.formDraft["basic.name"], Store.people(), editingId);
  hint.hidden = !duplicate;
  hint.dataset.personId = duplicate ? duplicate.id : "";
  if (duplicate) {
    hint.innerHTML = icon("alert", 14) + '<span>' + esc(t("duplicate_maybe", { name: duplicate.name })) + '</span><button type="button" id="manual-duplicate-open">' + t("duplicate_open") + "</button>";
    $("#manual-duplicate-open").addEventListener("click", () => {
      const id = hint.dataset.personId;
      closeCapture(true);
      go("profile", { personId: id });
    });
  }
}

function addManualChips(key, raw, rerender) {
  const values = String(raw || "").split(/[,，]/).map((item) => item.trim()).filter(Boolean);
  if (!values.length) return;
  const current = Array.isArray(cap.formDraft[key]) ? [...cap.formDraft[key]] : [];
  values.forEach((value) => {
    if (!current.some((item) => item.toLocaleLowerCase() === value.toLocaleLowerCase())) current.push(value);
  });
  cap.formDraft[key] = current;
  if (cap.chipInput) cap.chipInput[key] = "";
  refreshManualDirty();
  if (rerender) {
    renderManualCapture();
    setTimeout(() => {
      const field = MANUAL_FIELD_MAP[key];
      const input = field && $("#f-" + field.sec + "-" + field.k);
      if (input && input.focus) input.focus();
    }, 0);
  }
}

function commitPendingManualChips(body) {
  $$(".chip-entry", body).forEach((input) => {
    addManualChips(input.dataset.chipEntry, input.value, false);
    input.value = "";
  });
}

function captureSource() {
  return cap.review ? (cap.sourceMode || "text") : "manual";
}

function hiddenStructuredPrefillFields(prefill) {
  const allowed = [
    "department", "title", "email", "phone", "languages", "hobbies", "interests",
    "businessTopics", "introducedBy", "promises", "tags", "website",
  ];
  const out = {};
  allowed.forEach((key) => {
    const value = prefill && prefill[key];
    if (manualHasValue(value)) out[key] = Array.isArray(value) ? [...value] : String(value).trim();
  });
  return out;
}

function saveManualCapture() {
  const body = $("#capture-body");
  const editing = cap.personId ? byId(cap.personId) : null;
  commitPendingManualChips(body);
  const name = String(cap.formDraft["basic.name"] || "").trim();
  if (!name) {
    toast(t("name_required"));
    const input = $("#f-basic-name");
    if (input && input.focus) input.focus();
    return;
  }

  const fields = Object.assign(
    {},
    cap.review ? hiddenStructuredPrefillFields(cap.prefill || {}) : {},
    manualDraftToFields(cap.formDraft),
  );
  fields.tags = manualArrayValue(fields.tags);
  const note = String(cap.formDraft["notes.notes"] || "").trim();
  const source = captureSource();
  const sourceLabel = source === "voice" ? "Voice memo" : source === "card" ? "Card scan" : source === "text" ? "Text note" : "Manual entry";
  const existingFirstMet = editing && editing.firstMet ? editing.firstMet : null;
  const transMemory = cap.text ? { when: "Today", text: cap.text } : null;
  const noteMemory = note ? { when: "Today", text: note } : null;
  const followUpFromPrefill = cap.prefill && cap.prefill.followUpWhat
    ? { when: "—", what: cap.prefill.followUpWhat, kind: "action" }
    : null;

  fields.name = name;
  fields.initials = name.split(" ").filter(Boolean).map((word) => word[0]).join("").slice(0, 2).toUpperCase();
  fields.company = fields.company || (editing ? "" : "—");
  fields.relationshipType = fields.relationshipType || (editing ? "" : "New");
  if (!editing) fields.title = fields.title || "—";
  if (!editing) fields.strength = fields.strength || "normal";
  fields.location = [fields.currentCity, fields.country].filter(Boolean).join(", ") || (editing ? "" : "—");
  fields.firstMet = {
    date: existingFirstMet ? existingFirstMet.date || "" : "Today",
    place: existingFirstMet ? existingFirstMet.place || "" : "",
    how: existingFirstMet ? existingFirstMet.how || "" : "",
  };
  const titleForAbout = fields.title || (editing && editing.title !== "—" ? editing.title : "");
  const aboutParts = [titleForAbout, fields.company].filter((value) => value && value !== "—");
  fields.about = name + (aboutParts.length ? " — " + aboutParts.join(" at ") : "") +
    (cap.review ? " Captured from " + source + " today." : ".");

  if (editing) {
    const patch = Object.assign({}, fields);
    if (cap.review && transMemory) {
      patch.raw = cap.text;
      patch.memories = [...(editing.memories || []), transMemory];
      patch.lastContactDays = 0;
      patch.metCount = (editing.metCount || 0) + 1;
      patch.last = Object.assign({}, editing.last || {}, { type: sourceLabel, when: "Today", summary: cap.text.slice(0, 120), tags: [] });
    } else if (noteMemory) {
      patch.memories = [...(editing.memories || []), noteMemory];
      patch.last = Object.assign({}, editing.last || {}, { type: sourceLabel, when: "Today", summary: note.slice(0, 120), tags: [] });
    }
    if (followUpFromPrefill) patch.followUp = followUpFromPrefill;
    Store.updatePerson(editing.id, patch);
    closeCapture(true);
    toast(cap.review ? t("toast_updated_person", { name: name.split(" ")[0] }) : t("toast_updated_profile", { name: name.split(" ")[0] }));
    go("profile", { personId: editing.id });
    return;
  }

  const summary = cap.text || note || "Created manually.";
  const sourceTags = source === "manual" ? [] : [source];
  const tags = [...new Set([...(fields.tags || []), ...sourceTags].map((tag) => String(tag).trim()).filter(Boolean))];
  const newPerson = Object.assign({}, fields, {
    id: "p" + Date.now(),
    role: "New · just created", since: "Today", color: "#8E5A9E",
    interests: cap.prefill.interests || [], dates: [],
    last: { type: sourceLabel, when: "Today", place: "", summary: summary.slice(0, 120), tags: [] },
    followUp: followUpFromPrefill || { when: "—", what: "Say hi in a few days", kind: "reconnect" },
    meetings: [], timelineExtra: [],
    memories: cap.review && transMemory ? [transMemory] : noteMemory ? [noteMemory] : [],
    raw: cap.text || "", connections: [], mutual: [], tags, lastContactDays: 0,
    metCount: cap.review ? 1 : 0, active: true, photo: "", photos: [], _custom: true,
  });
  Store.createPerson(newPerson);
  closeCapture(true);
  toast(t("toast_created", { name }));
  go("profile", { personId: newPerson.id });
}

function bindManualCapture(editing) {
  const body = $("#capture-body");
  $$('[data-manual-key]', body).forEach((input) => {
    const update = () => {
      cap.formDraft[input.dataset.manualKey] = input.value;
      refreshManualDirty();
      updateManualSaveState();
      if (input.dataset.manualKey === "basic.name") updateManualDuplicateHint(editing && editing.id);
    };
    input.addEventListener("input", update);
    input.addEventListener("change", update);
  });

  $$(".chip-entry", body).forEach((input) => {
    input.addEventListener("input", () => {
      cap.chipInput = cap.chipInput || {};
      cap.chipInput[input.dataset.chipEntry] = input.value;
      refreshManualDirty();
      renderManualCapture();
      setTimeout(() => {
        const next = $('[data-chip-entry="' + input.dataset.chipEntry + '"]', $("#capture-body"));
        if (next && next.focus) {
          next.focus();
          if (next.setSelectionRange) next.setSelectionRange(next.value.length, next.value.length);
        }
      }, 0);
    });
    input.addEventListener("keydown", (event) => {
      if (!event.isComposing && (event.key === "Enter" || event.key === "," || event.key === "，")) {
        event.preventDefault();
        addManualChips(input.dataset.chipEntry, input.value, true);
      }
    });
    input.addEventListener("blur", () => {
      addManualChips(input.dataset.chipEntry, input.value, false);
      if (cap.chipInput) cap.chipInput[input.dataset.chipEntry] = "";
      input.value = "";
    });
  });
  $$('[data-tag-pick]', body).forEach((button) => button.addEventListener("mousedown", (event) => event.preventDefault()));
  $$('[data-tag-pick]', body).forEach((button) => button.addEventListener("click", () => {
    addManualChips(button.dataset.tagPick, button.dataset.tagValue, true);
  }));
  $$('[data-chip-remove]', body).forEach((button) => button.addEventListener("click", () => {
    const key = button.dataset.chipRemove;
    const values = Array.isArray(cap.formDraft[key]) ? [...cap.formDraft[key]] : [];
    values.splice(parseInt(button.dataset.chipIndex, 10), 1);
    cap.formDraft[key] = values;
    refreshManualDirty();
    renderManualCapture();
  }));
  $$('[data-location-other]', body).forEach((button) => button.addEventListener("click", () => {
    const key = button.dataset.locationOther;
    cap.formDraft[key] = "";
    refreshManualDirty();
    const field = MANUAL_FIELD_MAP[key];
    const input = field && $("#f-" + field.sec + "-" + field.k);
    if (input) { input.value = ""; if (input.focus) input.focus(); }
  }));
  $$('[data-birthday-part]', body).forEach((input) => {
    const update = () => {
      const key = input.dataset.birthdayPart;
      const current = cap.formDraft[key] && typeof cap.formDraft[key] === "object" ? cap.formDraft[key] : {};
      cap.formDraft[key] = Object.assign({}, current, { [input.dataset.part]: input.value });
      refreshManualDirty();
      updateManualSaveState();
    };
    input.addEventListener("input", update);
    input.addEventListener("change", update);
  });
  $$('[data-birthday-open]', body).forEach((button) => {
    button.addEventListener("click", () => {
      const picker = $('[data-birthday-date="' + button.dataset.birthdayOpen + '"]', body);
      if (!picker) return;
      if (picker.showPicker) picker.showPicker();
      else picker.click();
    });
  });
  $$('[data-birthday-date]', body).forEach((input) => {
    input.addEventListener("change", () => {
      const parts = parseBirthdayParts(input.value) || {};
      cap.formDraft[input.dataset.birthdayDate] = {
        month: parts.month ? String(parts.month) : "",
        day: parts.day ? String(parts.day) : "",
        year: parts.year ? String(parts.year) : "",
      };
      refreshManualDirty();
      updateManualSaveState();
      renderManualCapture();
    });
  });
  const advanced = $("#manual-advanced-toggle");
  if (advanced) advanced.addEventListener("click", () => {
    cap.advancedOpen = !cap.advancedOpen;
    renderManualCapture();
  });
  $$('[data-accordion]', body).forEach((button) => button.addEventListener("click", () => {
    const key = button.dataset.accordion;
    cap.openSections[key] = !cap.openSections[key];
    renderManualCapture();
  }));
  $("#mf-cancel").addEventListener("click", () => closeCapture());
  $("#mf-save").addEventListener("click", saveManualCapture);
  updateManualSaveState();
  updateManualDuplicateHint(editing && editing.id);
}

function syncManualDraftFromDOM() {
  const body = $("#capture-body");
  if (!body || !cap.formDraft) return;
  $$('[data-manual-key]', body).forEach((input) => {
    cap.formDraft[input.dataset.manualKey] = input.value;
  });
  commitPendingManualChips(body);
  refreshManualDirty();
}

function renderManualCapture() {
  const body = $("#capture-body");
  const editing = cap.personId ? byId(cap.personId) : null;
  if (cap.formDraft) syncManualDraftFromDOM();
  initManualDraft(editing);
  setCapTitle(
    cap.review ? t("review_title") : editing ? t("btn_edit") + " — " + editing.name.split(" ")[0] : t("manual_entry"),
    t("manual_step"),
  );

  const visibleFields = manualVisibleFields();
  const visibleKeys = new Set(visibleFields.map(manualKey));
  const suggestions = locationSuggestions(Store.people());
  const reviewNote = cap.review
    ? '<p class="manual-review-note">' + icon("spark", 13) + " " + t("review_note") + "</p>"
    : '<div class="manual-intro"><b>' + t("quick_intro") + "</b><span>" + t("quick_intro_sub") + "</span></div>";
  const advancedLabel = cap.advancedOpen ? t("advanced_hide") : t("advanced_add");

  body.innerHTML = reviewNote +
    '<div class="quick-form form-grid">' + visibleFields.map(manualFieldHTML).join("") + "</div>" +
    '<div class="duplicate-hint" id="manual-duplicate" hidden></div>' +
    '<datalist id="manual-location-list">' + suggestions.map((value) => '<option value="' + esc(value) + '"></option>').join("") + "</datalist>" +
    '<button type="button" class="advanced-toggle" id="manual-advanced-toggle" aria-expanded="' + String(cap.advancedOpen) + '" aria-controls="manual-advanced-panel"><span>' + icon("plus", 14) + " " + advancedLabel + '</span><span class="accordion-chevron">' + icon("chev", 14) + "</span></button>" +
    '<div id="manual-advanced-panel">' + manualAccordionHTML(visibleKeys) + "</div>" +
    '<p class="manual-optional-note">' + t("all_fields_optional") + "</p>" +
    '<div class="manual-sticky-foot"><button class="btn ghost" id="mf-cancel">' + t("btn_cancel") + '</button><button class="btn primary" id="mf-save">' + icon("check", 14) + " " + (cap.review ? t("btn_save") : editing ? t("save_changes") : t("create_person")) + "</button></div>";

  bindManualCapture(editing);
  if (!cap.nameFocused) {
    cap.nameFocused = true;
    setTimeout(() => {
      const input = $("#f-basic-name");
      if (input && input.focus) input.focus();
    }, 0);
  }
}

function renderCapture() {
  const body = $("#capture-body");
  const m = cap.mode;

  if (m === null) {
    setCapTitle(cap.addInfo ? t("cap_add_info_title", { name: cap.personId ? byId(cap.personId).name.split(" ")[0] : "" }) : t("cap_add_person_title"), "");
    const modes = cap.addInfo
      ? [
          ["voice", t("mode_voice"), t("mode_voice_sub"), "voice"],
          ["manual", t("mode_manual"), t("mode_manual_sub"), "text"]
        ]
      : [
          ["voice", t("mode_voice"), t("mode_voice_sub"), "voice"],
          ["card", t("mode_card"), t("mode_card_sub"), "card"],
          ["manual", t("mode_manual"), t("mode_manual_sub"), "text"]
        ];
    body.innerHTML =
      '<p style="color:var(--ink-2);font-size:13px;margin-bottom:14px">' +
      (cap.addInfo ? t("cap_add_info_desc") : t("cap_add_person_desc")) +
      "</p>" +
      '<div class="mode-grid">' +
      modes.map(([key, tlabel, sub, ico]) =>
        '<button class="mode-cell" data-mode="' + key + '"><span class="ico ' + ico + '" style="' +
        (key === "card" ? "background:var(--ok-soft);color:var(--ok)" : key === "voice" ? "background:var(--accent-soft);color:var(--accent)" : "background:#eef1f8;color:#3e5fbf") +
        '">' + icon(key === "manual" ? "text" : key, 18) + "</span><b>" + tlabel + "</b><span>" + sub + "</span></button>"
      ).join("") +
      "</div>" +
      '<p style="font-size:11px;color:var(--ink-3);margin-top:13px">' + t("cap_every_mode_note") + "</p>";
    $$(".mode-cell", body).forEach((b) => b.addEventListener("click", () => {
      stopCardCamera();
      cap.mode = b.dataset.mode;
      cap.sourceMode = b.dataset.mode;
      cap.step = 2;
      renderCapture();
    }));
    return;
  }

  if (m === "voice") {
    if (cap.step === 2) {
      setCapTitle(cap.addInfo ? t("mode_voice") + " — " + (cap.personId ? byId(cap.personId).name.split(" ")[0] : "") : t("voice_title"), t("voice_step_record"));
      cap.seconds = 0;
      const langOptions = VOICE_LANGS.map((lang) =>
        '<option value="' + lang + '"' + (cap.voiceLang === lang ? " selected" : "") + ">" + t("voice_lang_" + lang.replace("-", "_")) + "</option>"
      ).join("");
      body.innerHTML =
        '<div class="rec-wrap"><div class="rec-ring"><div class="pulse"></div><div class="core">' + icon("mic", 34) + "</div></div>" +
        '<div class="rec-timer" id="rec-timer">0:00</div>' +
        '<label class="voice-lang"><span>' + t("voice_language") + '</span><select id="voice-lang">' + langOptions + "</select></label>" +
        '<div class="rec-hint">' + (cap.addInfo ? t("voice_hint_add") : t("voice_hint_new")) + "</div></div>" +
        '<div class="modal-foot"><button class="btn ghost" id="rec-cancel">' + t("btn_cancel") + "</button>" +
        '<button class="btn ghost" id="rec-type">' + t("btn_type_instead") + "</button>" +
        '<button class="btn accent" id="rec-stop">' + icon("check", 14) + " " + t("rec_stop") + "</button></div>";
      $("#rec-cancel").addEventListener("click", closeCapture);
      $("#voice-lang").addEventListener("change", (e) => setVoiceLang(e.target.value));
      $("#rec-type").addEventListener("click", () => { stopRec(); cap.mode = "text"; cap.sourceMode = "text"; cap.step = 2; renderCapture(); });
      $("#rec-stop").addEventListener("click", () => stopRec(true));
      cap.timer = setInterval(() => {
        cap.seconds++;
        const tm = $("#rec-timer");
        if (tm) tm.textContent = "0:" + String(cap.seconds).padStart(2, "0");
      }, 1000);
      if (!startVoiceRecognition()) {
        // Trình duyệt không hỗ trợ nhận dạng giọng nói → chuyển sang nhập chữ
        stopRec();
        toast(t("voice_unsupported"));
        cap.mode = "text";
        cap.step = 2;
        renderCapture();
      }
    } else if (cap.step === 3) {
      setCapTitle(t("ai_organizing"), t("ai_step_2"));
      body.innerHTML =
        '<div class="progress-step active"><span class="sp">1</span>' + t("prog_transcribe") + "</div>" +
        '<div class="progress-step" id="ps2"><span class="sp">2</span>' + t("prog_resolve") + "</div>" +
        '<div class="progress-step" id="ps3"><span class="sp">3</span>' + t("prog_extract") + "</div>" +
        '<div class="modal-foot"><button class="btn ghost" id="proc-cancel">' + t("btn_cancel") + "</button></div>";
      $("#proc-cancel").addEventListener("click", closeCapture);
      setTimeout(() => { if (!cap.open) return; $("#ps2").classList.add("active"); }, 700);
      setTimeout(() => { if (!cap.open) return; $("#ps2").classList.remove("active"); $("#ps2").classList.add("done"); $("#ps3").classList.add("active"); }, 1500);
      setTimeout(() => { if (!cap.open) return; $("#ps3").classList.remove("active"); $("#ps3").classList.add("done"); cap.step = 4; renderCapture(); }, 2300);
    } else if (cap.step === 4) {
      // Đã có transcript → cho user KIỂM TRA text, rồi sang màn confirm điền tự động
      if (!cap.text) cap.text = "";
      renderTranscriptCheck();
    }
    return;
  }

  if (m === "card") {
    if (cap.step === 2) {
      setCapTitle(t("card_scan"), t("card_step_scan"));
      body.innerHTML =
        '<div class="ocr-surface">' +
        '<div class="card-camera">' +
          '<video id="card-video" autoplay muted playsinline></video>' +
          '<div class="card-guide"><span></span></div>' +
          '<div class="card-camera-empty" id="card-camera-empty">' + icon("camera", 28) + '<b>' + t("card_camera_starting") + "</b></div>" +
        "</div>" +
        '<input class="ocr-file" id="card-photo" type="file" accept="image/*" capture="environment" />' +
        (cap.photo ? '<img class="ocr-preview" src="' + cap.photo + '" alt="" />' : "") +
        '<div class="ocr-status" id="ocr-status">' + t("card_ocr_local") + "</div>" +
        '<div class="ocr-bar" aria-hidden="true"><span id="ocr-bar"></span></div>' +
        '</div>' +
        '<div class="modal-foot ocr-foot"><button class="btn primary" id="card-capture" disabled>' + icon("camera", 13) + " " + t("card_capture") + "</button>" +
        '<button class="btn ghost" id="card-choose">' + icon("image", 13) + " " + t("card_choose_instead") + "</button></div>";
      $("#card-photo").addEventListener("change", handleCardPhoto);
      $("#card-choose").addEventListener("click", () => $("#card-photo").click());
      $("#card-capture").addEventListener("click", captureCardFrame);
      startCardCamera();
    } else if (cap.step === 3) {
      stopCardCamera();
      setCapTitle(t("card_read"), t("card_step_review"));
      const extracted = cardFieldsToExtract(cap.prefill || parseCardOcrText(cap.ocrText || ""));
      const extractedHTML = extracted.length
        ? '<div class="extract-grid">' +
          extracted.map((f) => '<div class="extract-cell"><div class="k">' + esc(f.label) + (f.conf ? ' <span class="conf">' + f.conf + "%</span>" : "") + "</div><div class='v'>" + esc(f.value) + "</div></div>").join("") +
          "</div>"
        : '<p class="ocr-empty-review">' + t("card_no_fields") + "</p>";
      body.innerHTML =
        extractedHTML +
        '<textarea class="story" id="card-raw" style="margin-top:12px;min-height:120px" placeholder="' + t("card_raw_ph") + '">' + esc(cap.ocrText || "") + "</textarea>" +
        '<p style="font-size:12px;color:var(--ink-3);margin-top:10px">' + t("card_review_hint") + (cap.ocrProvider ? " " + t("card_source", { provider: cap.ocrProvider }) : "") + "</p>" +
        '<div class="modal-foot"><button class="btn ghost" id="card-rescan">' + t("rescan") + "</button>" +
        '<button class="btn primary" id="card-next">' + icon("check", 13) + " " + t("looks_right") + "</button></div>";
      $("#card-rescan").addEventListener("click", () => { stopCardCamera(); cap.cardCameraStarted = false; cap.step = 2; renderCapture(); });
      $("#card-next").addEventListener("click", () => {
        cap.ocrText = $("#card-raw").value.trim();
        if (!cap.ocrText) { toast(t("text_empty")); return; }
        enterReviewFromCard();
      });
    }
    return;
  }

  if (m === "text") {
    if (cap.step === 2) {
      setCapTitle(t("text_title"), t("text_step"));
      body.innerHTML =
        '<textarea class="story" id="story-text" placeholder="' + t("text_ph") + '">' + esc(cap.text || "") + "</textarea>" +
        '<p style="font-size:11.5px;color:var(--ink-3);margin-top:9px">' + t("text_hint") + "</p>" +
        '<div class="modal-foot"><button class="btn ghost" id="text-cancel">' + t("btn_cancel") + "</button>" +
        '<button class="btn primary" id="text-parse">' + icon("spark", 14) + " " + t("let_ai") + "</button></div>";
      $("#text-cancel").addEventListener("click", closeCapture);
      $("#text-parse").addEventListener("click", () => {
        cap.text = $("#story-text").value.trim();
        if (!cap.text) { toast(t("text_empty")); return; }
        cap.step = 3;
        renderCapture();
      });
    } else if (cap.step === 3) {
      setCapTitle(t("ai_organizing"), t("ai_step_2"));
      body.innerHTML =
        '<div class="progress-step active"><span class="sp">1</span>' + t("prog_read") + "</div>" +
        '<div class="progress-step" id="ps2"><span class="sp">2</span>' + t("prog_resolve_short") + "</div>" +
        '<div class="progress-step" id="ps3"><span class="sp">3</span>' + t("prog_extract_short") + "</div>" +
        '<div class="modal-foot"><button class="btn ghost" id="proc-cancel">' + t("btn_cancel") + "</button></div>";
      $("#proc-cancel").addEventListener("click", closeCapture);
      setTimeout(() => { if (!cap.open) return; $("#ps2").classList.add("active"); }, 600);
      setTimeout(() => { if (!cap.open) return; $("#ps2").classList.remove("active"); $("#ps2").classList.add("done"); $("#ps3").classList.add("active"); }, 1300);
      setTimeout(() => { if (!cap.open) return; $("#ps3").classList.remove("active"); $("#ps3").classList.add("done"); cap.step = 4; renderCapture(); }, 2000);
    } else if (cap.step === 4) {
      renderTranscriptCheck();
    }
    return;
  }

  if (m === "manual") {
    renderManualCapture();
    return;
  }
}

/* ============================================================
   CAPTURE — trợ giúp THẬT (không demo): voice (Web Speech API) + text
   ============================================================ */
let speechRec = null;

/** Tìm người được nhắc tên trong đoạn text/voice. */
function resolvePersonFromText(text) {
  const s = (text || "").toLowerCase();
  return PEOPLE.find((p) => {
    const parts = p.name.toLowerCase().split(" ").filter(Boolean);
    if (!parts.length) return false;
    if (s.includes(p.name.toLowerCase())) return true;
    if (parts.length >= 2) return s.includes(parts[0]) && s.includes(parts[parts.length - 1]);
    return parts[0].length > 3 && s.includes(parts[0]);
  });
}

/** Bắt đầu nhận dạng giọng nói (Web Speech API). Trả false nếu không hỗ trợ. */
function startVoiceRecognition() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return false;
  try {
    speechRec = new SR();
    speechRec.lang = captureInputLocale();
    speechRec.continuous = true;
    speechRec.interimResults = false;
    let final = "";
    speechRec.onresult = (e) => {
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript + " ";
      }
    };
    speechRec.onend = () => {
      cap.text = ((cap.text ? cap.text + " " : "") + final.trim()).trim();
      if (!cap.open || cap.mode !== "voice" || cap.step !== 2) return;
      if (!cap.text) { cap.mode = "text"; cap.step = 2; renderCapture(); return; }
      cap.step = 3;
      renderCapture();
    };
    speechRec.onerror = () => { /* onend sẽ xử lý */ };
    speechRec.start();
    return true;
  } catch (e) {
    return false;
  }
}

function stopRec() {
  clearInterval(cap.timer);
  if (speechRec) { try { speechRec.stop(); } catch (e) { /* ignore */ } }
}

/** Bước kết quả chung cho voice + text: gắn ký ức vào người (hoặc tạo mới). */
function renderCaptureResult() {
  const matched = cap.personId ? byId(cap.personId) : resolvePersonFromText(cap.text);
  const body = $("#capture-body");
  setCapTitle(t("here_understood"), t("result_step"));
  const options = activePeople().map((p) =>
    '<option value="' + p.id + '"' + (matched && matched.id === p.id ? " selected" : "") + ">" + esc(p.name) + "</option>"
  ).join("");
  const chip = matched
    ? avatarHTML(matched, 24) + (cap.addInfo ? t("updating_person", { name: matched.name }) : t("matched_person", { name: matched.name }))
    : '<span style="display:inline-flex">👤</span>' + t("text_new_person");
  body.innerHTML =
    '<div class="resolved-chip">' + chip + "</div>" +
    '<div class="field" style="margin-top:12px"><label>' + t("text_attach_to") + "</label>" +
    '<select class="field-input" id="res-person"><option value="">＋ ' + t("text_create_new") + "</option>" + options + "</select></div>" +
    '<div class="field" id="res-name-wrap" style="display:' + (matched ? "none" : "block") + '"><label>' + t("field_name") + "</label>" +
    '<input class="field-input" id="res-name" placeholder="' + t("field_name_ph") + '" /></div>' +
    '<div style="margin:12px 0 6px;font-size:12px;font-weight:700;color:var(--ink-3);letter-spacing:.6px;text-transform:uppercase">' + t("raw_stored") + "</div>" +
    '<div class="raw-block">' + esc(cap.text || "") + "</div>" +
    '<div class="modal-foot"><button class="btn ghost" id="res-edit">' + (cap.mode === "voice" ? t("record_again") : t("edit_text")) + "</button>" +
    '<button class="btn primary" id="res-save">' + icon("check", 14) + " " + t("btn_save") + "</button></div>";

  $("#res-person").addEventListener("change", () => {
    $("#res-name-wrap").style.display = $("#res-person").value ? "none" : "block";
  });
  $("#res-edit").addEventListener("click", () => {
    if (cap.mode === "voice") cap.text = "";
    cap.step = 2;
    renderCapture();
  });
  $("#res-save").addEventListener("click", () => {
    const pid = $("#res-person").value;
    const text = cap.text || "";
    const kind = cap.mode === "voice" ? "Voice memo" : "Text note";
    const memory = { when: "Today", text };
    closeCapture();
    if (pid) {
      const p = byId(pid);
      Store.updatePerson(p.id, {
        raw: text,
        memories: [...(p.memories || []), memory],
        lastContactDays: 0,
        last: Object.assign({}, p.last || {}, { type: kind, when: "Today", place: "", summary: text.slice(0, 120), tags: [] }),
        metCount: (p.metCount || 0) + 1,
      });
      toast(t("toast_updated_person", { name: p.name.split(" ")[0] }));
      go("profile", { personId: p.id });
    } else {
      const nm = $("#res-name").value.trim() || "New contact";
      const np = Store.createPerson({
        name: nm,
        initials: nm.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase(),
        role: "New · from " + (cap.mode === "voice" ? "voice" : "text"),
        since: "Today",
        location: "—",
        color: "#8E5A9E",
        firstMet: { date: "Today", place: "", how: kind },
        last: { type: kind, when: "Today", place: "", summary: text.slice(0, 120), tags: [] },
        followUp: { when: "—", what: "Say hi in a few days", kind: "reconnect" },
        meetings: [],
        memories: [memory],
        raw: text,
        dates: [],
        tags: [cap.mode === "voice" ? "voice" : "text"],
        lastContactDays: 0,
        metCount: 1,
        active: true,
        photo: "",
        photos: [],
        about: nm + " — captured from " + (cap.mode === "voice" ? "voice memo" : "text") + " today.",
      });
      toast(t("toast_created", { name: np.name }));
      go("profile", { personId: np.id });
    }
  });
}

/* ============================================================
   CAPTURE — transcript check → màn confirm tự điền trường → lưu
   ============================================================ */

/** Bước kiểm tra text nhận diện (voice/text): user đọc, SỬA, rồi bấm "Đúng rồi". */
function renderTranscriptCheck() {
  setCapTitle(t("here_heard"), t("result_step"));
  const body = $("#capture-body");
  const kind = cap.mode === "voice" ? "voice" : "text";
  body.innerHTML =
    '<textarea class="story" id="tx-edit" placeholder="' + t("text_ph") + '">' + esc(cap.text || "") + "</textarea>" +
    '<p style="font-size:12px;color:var(--ink-3);margin-top:10px">' + t("review_check_hint") + "</p>" +
    '<div class="modal-foot"><button class="btn ghost" id="tx-again">' + (kind === "voice" ? t("record_again") : t("edit_text")) + "</button>" +
    '<button class="btn primary" id="tx-next">' + icon("check", 14) + " " + t("looks_right") + "</button></div>";
  $("#tx-again").addEventListener("click", () => {
    if (kind === "voice") cap.text = "";
    cap.mode = kind;
    cap.step = 2;
    renderCapture();
  });
  $("#tx-next").addEventListener("click", () => {
    const edited = $("#tx-edit").value.trim();
    if (!edited) { toast(t("text_empty")); return; }
    cap.text = edited;
    enterReviewFromText();
  });
}

/** Map kết quả parse → các trường của form manual. */
function parsedToPrefill(p) {
  const workNotes = p.title ? "Role/title: " + p.title : "";
  const interestsNotes = [
    p.hobbies && p.hobbies.length ? "Hobbies: " + p.hobbies.join(", ") : "",
    p.interests && p.interests.length ? "Interests: " + p.interests.join(", ") : "",
  ].filter(Boolean).join("\n");
  const relationshipNotes = p.followUpWhat ? "Follow-up: " + p.followUpWhat : "";
  return {
    name: p.name || "",
    company: p.company || "",
    currentCity: p.currentCity || "",
    workNotes,
    interestsNotes,
    relationshipNotes,
    followUpWhat: p.followUpWhat || "",
    notes: p.notes || "",
  };
}

function cardFieldsToExtract(pre) {
  const labels = {
    name: "Name", company: "Company", department: "Department", title: "Title",
    email: "Email", phone: "Phone", currentCity: "Address"
  };
  return Object.keys(labels).filter((k) => pre[k]).map((k) => ({ label: labels[k], value: pre[k], conf: "" }));
}

function parseCardOcrText(text) {
  const raw = (text || "").replace(/\r/g, "\n");
  const lines = raw.split("\n").map((s) => s.trim()).filter(Boolean);
  const joined = lines.join("\n");
  const labeled = {};
  lines.forEach((l) => {
    const m = l.match(/^\s*(name|company|department|title|email|phone|address)\s*:\s*(.+)\s*$/i);
    if (m) labeled[m[1].toLowerCase()] = m[2].trim();
  });
  const email = (joined.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i) || [""])[0];
  const phone = (joined.match(/(?:\+?\d[\d\s().-]{7,}\d)/) || [""])[0].trim();
  const web = (joined.match(/(?:https?:\/\/)?(?:www\.)?[A-Z0-9-]+\.[A-Z]{2,}(?:\/[^\s]*)?/i) || [""])[0];
  const nonContact = lines
    .map((l) => l.replace(/^\s*(name|company|department|title|email|phone|address)\s*:\s*/i, "").trim())
    .filter((l) => l && !l.includes("@") && !/[+()]\d|www\.|https?:\/\//i.test(l));
  const company = labeled.company || nonContact.find((l) => /(co\.?|corp|corporation|company|ltd|llc|inc|株式会社|有限会社|会社|group|solutions|technology|technologies|studio|agency)/i.test(l)) || "";
  const department = labeled.department || nonContact.find((l) => /(division|department|team|dept\.?|事業部|本部|部|課|phòng|ban)/i.test(l)) || "";
  const title = labeled.title || nonContact.find((l) => l !== department && /(manager|director|founder|ceo|cto|cfo|sales|marketing|engineer|designer|consultant|lead|head|代表取締役|代表|取締役|部長|課長|係長|主任|マネージャー|社長|giám đốc|trưởng|nhân viên|kỹ sư)/i.test(l)) || "";
  const cityLine = labeled.address || lines.find((l) => /(tokyo|osaka|kyoto|yokohama|ho chi minh|hanoi|ha noi|danang|da nang|singapore|japan|vietnam|〒|区|市|県|quận|phường)/i.test(l)) || "";
  const name = labeled.name || pickCardName(nonContact, company, title, department);
  const cardEmail = labeled.email || email;
  const cardPhone = labeled.phone || phone;
  const workNotes = [
    title ? "Role/title: " + title : "",
    department ? "Department: " + department : "",
    cardEmail ? "Email: " + cardEmail : "",
    cardPhone ? "Phone: " + cardPhone : "",
    web ? "Website: " + web : "",
  ].filter(Boolean).join("\n");
  const notes = raw;
  return { name, company, department, title, email: cardEmail, phone: cardPhone, currentCity: cityLine, workNotes, notes };
}

function pickCardName(lines, company, title, department) {
  const skip = new Set([company, title, department].filter(Boolean));
  const candidates = lines.filter((l) => !skip.has(l) && l.length >= 2 && l.length <= 40 && !/\d/.test(l));
  const roman = candidates.find((l) => /^[A-Z][A-Za-z'.-]+(?:\s+[A-Z][A-Za-z'.-]+){1,3}$/.test(l));
  const jp = candidates.find((l) => /[\u3040-\u30ff\u3400-\u9fff]/.test(l) && l.replace(/\s/g, "").length <= 8);
  return roman || jp || candidates[0] || "";
}

function dataUrlMime(dataUrl) {
  const m = String(dataUrl || "").match(/^data:([^;]+);/);
  return m ? m[1] : "image/jpeg";
}

function cardProgressSetter() {
  const status = $("#ocr-status");
  const bar = $("#ocr-bar");
  return (msg, pct) => {
    if (status) status.textContent = msg;
    if (bar) bar.style.width = Math.max(3, Math.round((pct || 0) * 100)) + "%";
  };
}

function stopCardCamera() {
  const video = $("#card-video");
  if (video) {
    try { video.pause(); } catch (e) { /* ignore */ }
    video.srcObject = null;
    video.classList.remove("ready");
  }
  if (!cap || !cap.cardStream) return;
  try {
    cap.cardStream.getTracks().forEach((track) => track.stop());
  } catch (e) { /* ignore */ }
  cap.cardStream = null;
}

async function startCardCamera() {
  if (!cap.open || cap.mode !== "card" || cap.step !== 2 || cap.cardCameraStarted) return;
  cap.cardCameraStarted = true;
  const setProgress = cardProgressSetter();
  const video = $("#card-video");
  const empty = $("#card-camera-empty");
  const capture = $("#card-capture");
  const media = navigator.mediaDevices;
  if (!media || !media.getUserMedia) {
    setProgress(t("card_camera_unavailable"), 0);
    if (empty) empty.innerHTML = icon("camera", 28) + "<b>" + t("card_camera_unavailable") + "</b>";
    if (capture) capture.disabled = true;
    return;
  }
  try {
    setProgress(t("card_camera_starting"), 0.05);
    const stream = await media.getUserMedia({
      video: {
        facingMode: { ideal: "environment" },
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
      audio: false,
    });
    if (!cap.open || cap.mode !== "card" || cap.step !== 2) {
      stream.getTracks().forEach((track) => track.stop());
      return;
    }
    cap.cardStream = stream;
    if (video) {
      video.srcObject = stream;
      await video.play().catch(() => {});
      video.classList.add("ready");
    }
    if (empty) empty.hidden = true;
    if (capture) capture.disabled = false;
    setProgress(t("card_camera_align"), 0.08);
  } catch (err) {
    console.warn("Camera unavailable", err);
    setProgress(t("card_camera_unavailable"), 0);
    if (empty) empty.innerHTML = icon("camera", 28) + "<b>" + t("card_camera_unavailable") + "</b>";
    if (capture) capture.disabled = true;
  }
}

function readFileAsDataURLPromise(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = () => reject(r.error || new Error("file-read-failed"));
    r.readAsDataURL(file);
  });
}

function compressImageFile(file) {
  if (typeof Image === "undefined" || typeof document === "undefined") return readFileAsDataURLPromise(file);
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const maxSide = 1800;
      const ratio = Math.min(1, maxSide / Math.max(img.width || maxSide, img.height || maxSide));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round((img.width || maxSide) * ratio));
      canvas.height = Math.max(1, Math.round((img.height || maxSide) * ratio));
      const ctx = canvas.getContext && canvas.getContext("2d");
      if (!ctx || !canvas.toDataURL) {
        resolve(img.src);
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.86));
    };
    img.onerror = () => readFileAsDataURLPromise(file).then(resolve, () => resolve(""));
    readFileAsDataURLPromise(file).then((url) => { img.src = url; }, () => resolve(""));
  });
}

async function runLocalCardOcr(file, setProgress) {
  if (!window.Tesseract || !window.Tesseract.recognize) {
    const err = new Error("tesseract-unavailable");
    err.code = "tesseract-unavailable";
    throw err;
  }
  setProgress(t("card_ocr_fallback"), 0.12);
  const result = await window.Tesseract.recognize(file, "jpn+eng+vie", {
    logger: (m) => {
      if (m.status) setProgress(t("card_ocr_reading") + " " + Math.round((m.progress || 0) * 100) + "%", m.progress || 0.1);
    }
  });
  return ((result && result.data && result.data.text) || "").trim();
}

async function processCardImageDataUrl(imageDataUrl, fallbackImage, setProgress) {
  if (!imageDataUrl) throw new Error("image-read-failed");
  cap.photo = imageDataUrl;
  const prev = $(".ocr-preview", $("#capture-body"));
  if (prev) prev.src = imageDataUrl;
  try {
    setProgress(t("card_ai_reading"), 0.18);
    const ai = await requestProxyCardOcr(imageDataUrl, dataUrlMime(imageDataUrl));
    cap.ocrText = (ai.ocrText || "").trim();
    cap.prefill = buildExtractPrefill(ai.extraction || {}, cap.ocrText || "");
    cap.ocrProvider = "AI";
    if (!cap.ocrText && cap.prefill && cap.prefill.notes) cap.ocrText = cap.prefill.notes;
  } catch (err) {
    if (err && err.name === "AbortError") return false;
    setProgress(t("card_ocr_fallback"), 0.12);
    const localText = await runLocalCardOcr(fallbackImage || imageDataUrl, setProgress);
    cap.ocrText = localText;
    cap.prefill = parseCardOcrText(localText);
    cap.ocrProvider = "local OCR";
  }
  if (!cap.ocrText) { toast(t("card_ocr_empty")); return false; }
  stopCardCamera();
  cap.step = 3;
  renderCapture();
  return true;
}

async function captureCardFrame() {
  const video = $("#card-video");
  const setProgress = cardProgressSetter();
  if (!video || !video.videoWidth || !video.videoHeight) {
    toast(t("card_camera_not_ready"));
    return;
  }
  try {
    setProgress(t("card_image_preparing"), 0.1);
    const maxSide = 1800;
    const ratio = Math.min(1, maxSide / Math.max(video.videoWidth, video.videoHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(video.videoWidth * ratio));
    canvas.height = Math.max(1, Math.round(video.videoHeight * ratio));
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    await processCardImageDataUrl(canvas.toDataURL("image/jpeg", 0.88), null, setProgress);
  } catch (err) {
    console.warn("Camera capture failed", err);
    toast(t("card_ocr_failed"));
    setProgress(t("card_ocr_failed"), 0);
  }
}

async function handleCardPhoto(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const setProgress = cardProgressSetter();
  try {
    setProgress(t("card_image_preparing"), 0.05);
    const imageDataUrl = await compressImageFile(file);
    await processCardImageDataUrl(imageDataUrl, file, setProgress);
  } catch (err) {
    console.warn("OCR failed", err);
    toast(err && err.code === "tesseract-unavailable" ? t("card_ocr_unavailable") : t("card_ocr_failed"));
    setProgress(t("card_ocr_failed"), 0);
  }
}

/** Vào màn confirm (form manual) với trường đã tự điền từ text/voice. */
async function enterReviewFromText() {
  const parsed = parseCaptureText(cap.text || "");
  const matched = cap.personId ? byId(cap.personId) : resolvePersonFromText(cap.text || "");
  const sourceMode = cap.sourceMode === "voice" ? "voice" : "text";
  renderAIWaiting(sourceMode);
  let prefill = parsedToPrefill(parsed);
  try {
    prefill = await extractCapturePrefill(sourceMode, cap.text || "", prefill);
  } catch (err) {
    if (err && err.name === "AbortError") return;
  }
  if (!cap.open) return;
  cap.sourceMode = sourceMode;
  cap.mode = "manual";
  cap.review = true;
  cap.prefill = prefill;
  cap.personId = matched ? matched.id : null;
  cap.edit = !!matched;
  cap.formDraft = null;
  cap.step = 1;
  renderCapture();
}

/** Vào màn confirm với trường từ namecard (chỉ trường CÓ dữ liệu). */
async function enterReviewFromCard() {
  const pre = cap.prefill && manualHasValue(cap.prefill) ? cap.prefill : parseCardOcrText(cap.ocrText || "") || {};
  const matched = resolvePersonFromText(pre.name || "");
  let prefill = pre;
  if (cap.ocrProvider !== "AI") {
    renderAIWaiting("card");
    try {
      prefill = await extractCapturePrefill("card", cap.ocrText || "", pre);
    } catch (err) {
      if (err && err.name === "AbortError") return;
    }
  }
  if (!cap.open) return;
  cap.sourceMode = "card";
  cap.mode = "manual";
  cap.review = true;
  cap.text = cap.ocrText || "";
  cap.prefill = prefill;
  cap.personId = matched ? matched.id : null;
  cap.edit = !!matched;
  cap.formDraft = null;
  cap.step = 1;
  renderCapture();
}

function createNakamura() {
  closeCapture();
  toast(t("toast_nakamura"));
  go("profile", { personId: "nakamura" });
}

function readFileAsDataURL(file, cb) {
  const r = new FileReader();
  r.onload = () => cb(r.result);
  r.readAsDataURL(file);
}

/* ============================================================
   STATE / PERSISTENCE — giờ do js/store.js quản lý TOÀN BỘ
   (mọi field, mọi người — không chỉ photos/active/custom như trước)
   ============================================================ */
function setProfilePhoto(id, src) { Store.setPhoto(id, src); }
function removeProfilePhoto(id) { Store.setPhoto(id, ""); }
function addPhotos(id, srcs) { Store.addPhotos(id, srcs); }
function removePhoto(id, idx) { Store.removePhoto(id, idx); }
function setPhotoNote(id, idx, note) { Store.setPhotoNote(id, idx, note); }

function toggleActive(id) {
  const p = byId(id);
  if (!p) return;
  const next = p.active === false;
  Store.setActive(id, next);
  toast(t(next ? "toast_active_on" : "toast_active_off", { name: p.name.split(" ")[0] }));
}

/* ============================================================
   THEME
   ============================================================ */
function toggleTheme() {
  const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  try { localStorage.setItem("nm-theme", next); } catch (e) {}
}

function initTheme() {
  const param = new URLSearchParams(location.search).get("theme");
  const saved = localStorage.getItem("nm-theme") || localStorage.getItem("omoide-theme");
  const theme = param || saved || "light";
  document.documentElement.setAttribute("data-theme", theme);
  if (param) { try { localStorage.setItem("nm-theme", param); } catch (e) {} }
}

/* ============================================================
   INIT
   ============================================================ */
function updateFab() {
  const fab = $("#fab");
  if (!fab) return;
  const addInfo = currentScreen === "profile" && profileId && byId(profileId);
  const label = addInfo ? t("btn_add_info") : t("btn_add_person");
  fab.setAttribute("aria-label", label);
  fab.title = label;
}

function onFabClick() {
  if (currentScreen === "profile" && profileId && byId(profileId)) {
    openCapture(null, { personId: profileId, addInfo: true });
  } else {
    openCapture(null);
  }
}

function updateCareBadge() {
  const b = $("#care-badge");
  if (!b) return;
  const n = computeCareItems(activePeople()).length;
  b.textContent = n;
  b.style.display = n ? "" : "none";
}

function renderAll() {
  renderHome();
  renderPeople();
  renderCare();
  renderAsk();
  renderMap();
  if (currentScreen === "profile" && profileId && byId(profileId)) renderProfile(profileId);
  else if (currentScreen === "profile") go("people");
  else if (currentScreen === "refresh" && profileId && byId(profileId)) renderRefresh(profileId);
  else if (currentScreen === "refresh") go("home");
  else if (currentScreen === "settings") renderSettings();
  else if (currentScreen === "login") renderLogin();
  updateFab();
  updateCareBadge();
  updateUserChip();
  applyStaticI18n();
}

/* ============================================================
   AUTH (chỉ khi Firebase đã cấu hình — BUILD-GUIDE seam)
   Không cấu hình → local-only, không có màn hình login.
   ============================================================ */
let fbUser = null;

/** An toàn cả khi js/firebase.js chưa nạp (fallback local-only). */
function fbEnabled() {
  return typeof Firebase !== "undefined" && Firebase.isEnabled();
}

function onFbUser(user) {
  fbUser = user;
  if (user) {
    renderAll();
    if (currentScreen === "login") go("home");
  } else {
    // Firebase mode: cloud is authoritative, so never leave another account's data locally.
    Store.replaceFromRemote([]);
    go("login");
  }
}

function renderLogin() {
  const el = $("#screen-login");
  if (!el) return;
  el.innerHTML =
    '<div class="login-wrap"><div class="login-brand"><div class="brand-mark" style="width:46px;height:46px;font-size:19px">NM</div>' +
    "<b>" + t("app_name") + "</b><span>" + t("login_sub") + "</span></div>" +
    '<div class="card" style="max-width:340px;width:100%"><div class="card-title">' + t("login_title") + "</div>" +
    '<div class="form-grid" style="grid-template-columns:1fr">' +
    '<div class="field"><label>' + t("field_email") + '</label><input class="field-input" id="login-email" type="email" placeholder="you@example.com" autocomplete="email" /></div>' +
    '<div class="field"><label>' + t("field_password") + '</label><input class="field-input" id="login-pass" type="password" autocomplete="current-password" /></div>' +
    "</div>" +
    '<p class="login-err" id="login-err" style="display:none"></p>' +
    '<button class="btn accent" id="login-btn" style="width:100%;margin-top:8px">' + t("auth_sign_in") + "</button>" +
    '<button class="btn ghost" id="login-reset" style="width:100%">' + t("auth_forgot") + "</button>" +
    "</div></div>";
  $("#login-btn").addEventListener("click", doLogin);
  $("#login-reset").addEventListener("click", doReset);
  $("#login-pass").addEventListener("keydown", (e) => { if (e.key === "Enter") doLogin(); });
}

function loginBusy(on) {
  const btn = $("#login-btn");
  if (btn) {
    btn.disabled = on;
    btn.textContent = on ? t("login_signing") : t("auth_sign_in");
  }
}

function loginError(msg) {
  const err = $("#login-err");
  if (!err) return;
  err.textContent = msg;
  err.style.display = msg ? "block" : "none";
}

async function doLogin() {
  const email = $("#login-email").value.trim();
  const pass = $("#login-pass").value;
  loginError("");
  if (!email || !pass) { loginError(t("login_err")); return; }
  loginBusy(true);
  try {
    await Firebase.signIn(email, pass);
    // onAuthStateChanged → onFbUser sẽ điều hướng
  } catch (e) {
    loginError(t("login_err"));
    loginBusy(false);
  }
}

async function doReset() {
  const email = $("#login-email").value.trim();
  if (!email) { toast(t("login_err")); return; }
  try {
    await Firebase.sendReset(email);
    toast(t("login_reset_sent"));
  } catch (e) {
    toast(t("login_err"));
  }
}

function updateUserChip() {
  const b = document.querySelector(".user-chip .who b");
  if (b) b.textContent = fbEnabled() && fbUser ? (fbUser.email || t("you")) : t("you");
}

function init() {
  initTheme();

  // view
  const vParam = new URLSearchParams(location.search).get("view");
  const vSaved = localStorage.getItem("nm-view") || localStorage.getItem("omoide-view");
  setView(vParam || vSaved || "mobile");

  // data — js/store.js: localStorage (local-only) HOẶC Firestore (Firebase đã cấu hình)
  Store.subscribe(() => { if (!cap.open) renderAll(); });
  Store.init();
  if (fbEnabled()) {
    Store.setSyncHooks({
      create: Firebase.syncCreate,
      update: Firebase.syncUpdate,
      remove: Firebase.syncRemove,
      replaceAll: Firebase.syncReplaceAll,
    });
    Firebase.init(onFbUser);
    // chưa biết trạng thái đăng nhập → về login; onAuthStateChanged sẽ điều hướng tiếp
    go("login");
  }

  applyStaticI18n();
  renderHome();
  renderPeople();
  renderCare();
  renderAsk();
  renderMap();
  updateFab();

  // nav (web sidebar + mobile tabbar)
  $$(".nav-item, .tabbar .t").forEach((b) => b.addEventListener("click", () => go(b.dataset.screen)));

  // capture triggers
  $("#capture-open").addEventListener("click", () => openCapture(null));
  $("#fab").addEventListener("click", onFabClick);
  $("#capture-close").addEventListener("click", closeCapture);
  $("#capture-modal").addEventListener("click", (e) => { if (e.target.id === "capture-modal") closeCapture(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCapture(); });
  // ask
  $("#ask-bar-home").addEventListener("click", () => { go("ask"); setTimeout(() => $("#ask-input").focus(), 60); });
  $("#ask-submit").addEventListener("click", () => runAsk($("#ask-input").value.trim()));
  $("#ask-input").addEventListener("keydown", (e) => { if (e.key === "Enter") runAsk($("#ask-input").value.trim()); });
  $("#ask-back-home").addEventListener("click", () => go("home"));
  $("#care-back-home").addEventListener("click", () => go("home"));

  // theme / view toggles (web sidebar)
  $("#theme-toggle").addEventListener("click", toggleTheme);
  $("#view-toggle-web").addEventListener("click", () => setView("mobile"));

  updateCareBadge();
  updateUserChip();

  // PWA — service worker (chỉ chạy qua http/https, không phải file://)
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => { /* offline tuỳ chọn */ });
    });
  }

  window.addEventListener("hashchange", routeFromHash);
  routeFromHash();
}

document.addEventListener("DOMContentLoaded", init);
