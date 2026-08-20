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
  renderDemoPanel();
}

/* ============================================================
   ROUTER (+ back / history stack)
   ============================================================ */
let currentScreen = "home", profileId = null, peopleTab = "people";
const navStack = [];

function go(screen, opts = {}, isBack = false) {
  // Route guard: Firebase đã bật mà chưa đăng nhập → mọi màn hình về login
  if (fbEnabled() && !fbUser && screen !== "login") {
    screen = "login";
  }
  const prevScreen = currentScreen, prevProfile = profileId, prevTab = peopleTab;

  if (!isBack) {
    if (screen === "profile" || screen === "refresh") {
      // entering a sub-screen: remember where we came from
      navStack.push({ screen: prevScreen, personId: prevProfile, tab: prevTab, map: Object.assign({}, mapState) });
    } else {
      // top-level navigation resets history
      navStack.length = 0;
    }
  }

  currentScreen = screen;
  profileId = opts.personId || null;
  if (opts.tab) peopleTab = opts.tab;

  $$(".screen").forEach((s) => s.classList.remove("active"));
  const el = $("#screen-" + screen);
  if (!el) { screen = "home"; }
  $("#screen-" + screen).classList.add("active");

  const navKey = screen === "profile" ? "people" : screen === "refresh" ? "home" : screen;
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
  else if (screen === "people") hash = peopleTab === "circles" ? "#/circles" : "#/people";
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
  if (s === "circles") return go("people", { tab: "circles" });
  if (s === "capture") { go("home"); setTimeout(() => openCapture(null), 80); return; }
  if (s === "map") {
    if (v1 === "lens" && LENSES[v2]) { mapState.lens = v2; mapState.focusId = null; mapState.city = null; }
    else if (v1 === "focus" && byId(v2)) { mapState.lens = "people"; mapState.focusId = v2; }
    else if (v1 === "topic") { mapState.lens = "people"; mapState.topic = decodeURIComponent(v2 || ""); }
    return go("map");
  }
  if (s === "addinfo" && v1 && byId(v1)) { go("profile", { personId: v1 }); setTimeout(() => openCapture(null, { personId: v1, addInfo: true }), 80); return; }
  if (["home", "people", "care", "ask", "map", "settings"].includes(s)) return go(s);
  go("home");
}

/* ============================================================
   DEMO PANEL (desktop, mobile view)
   ============================================================ */
function demoLinks() {
  return [
    { group: "Screens", items: [
      { go: "home", label: t("nav_today") + " (home)", dot: "#E0452C" },
      { go: "people", label: t("nav_people"), dot: "#3E7BB6" },
      { go: "circles", label: t("people_tab_circles"), dot: "#7A5AF8" },
      { go: "care", label: t("nav_care"), dot: "#B45F06" },
      { go: "ask", label: t("nav_ask") + " " + t("nav_people"), dot: "#0E9F8A" }
    ]},
    { group: t("nav_map"), items: [
      { go: "map", label: t("lens_people") + " (" + t("nav_map") + ")", dot: "#E0452C" },
      { go: "map:lens:interest", label: t("lens_interest"), dot: "#8E5A9E" },
      { go: "map:lens:location", label: t("lens_location") + " · Google Maps", dot: "#3E7BB6" },
      { go: "map:focus:tanaka", label: "Focus — Tanaka (2°)", dot: "#B45F06" },
      { go: "map:topic:robotics", label: "Topic — robotics", dot: "#E08B00" }
    ]},
    { group: "Person & flows", items: [
      { go: "profile:tanaka", label: t("btn_profile") + " — Tanaka", dot: "#E0452C" },
      { go: "profile:suzuki", label: t("btn_profile") + " — Suzuki", dot: "#7A5AF8" },
      { go: "profile:mori", label: t("btn_profile") + " — Mori (investor)", dot: "#3E7BB6" },
      { go: "refresh:tanaka", label: t("btn_refresh") + " — Tanaka", dot: "#5B8C5A" },
      { go: "capture", label: t("btn_add_person") + " (4 modes)", dot: "#0E9F8A" },
      { go: "addinfo:tanaka", label: t("btn_add_info") + " — Tanaka", dot: "#C43A8B" },
      { go: "settings", label: t("nav_settings") + " (web companion)", dot: "#8D867C" }
    ]}
  ];
}

function renderDemoPanel() {
  const p = $("#demo-panel");
  if (!p) return;
  let html =
    '<div class="dp-brand"><div class="brand-mark" style="width:30px;height:30px;font-size:13px">NM</div>' +
    "<div><b>" + esc(t("app_name")) + "</b><span>mock · 2 views</span></div></div>" +
    '<div class="dp-title">View</div>' +
    '<div class="dp-row">' +
    '<button class="dp-btn' + (view === "mobile" ? " on" : "") + '" data-view="mobile">' + icon("phone", 13) + " Mobile</button>" +
    '<button class="dp-btn' + (view === "web" ? " on" : "") + '" data-view="web">' + icon("monitor", 13) + " Web</button>" +
    "</div>";
  demoLinks().forEach((g) => {
    html += '<div class="dp-title">' + esc(g.group) + "</div>";
    html += g.items.map((it) => '<button class="dp-link" data-go="' + it.go + '"><span class="dot" style="background:' + it.dot + '"></span>' + esc(it.label) + "</button>").join("");
  });
  html +=
    '<div class="dp-title">' + esc(t("settings_language")) + "</div>" +
    '<div class="dp-row">' +
    '<button class="dp-btn' + (LANG === "vi" ? " on" : "") + '" data-lang="vi">Tiếng Việt</button>' +
    '<button class="dp-btn' + (LANG === "en" ? " on" : "") + '" data-lang="en">English</button>' +
    '<button class="dp-btn' + (LANG === "ja" ? " on" : "") + '" data-lang="ja">日本語</button>' +
    "</div>" +
    '<div class="dp-title">Theme</div>' +
    '<div class="dp-row"><button class="dp-btn" id="dp-theme">' + (document.documentElement.getAttribute("data-theme") === "dark" ? "☀ Light" : "🌙 Dark") + "</button></div>" +
    '<div class="dp-note">Mobile is the primary surface. The web view is the companion for big-map exploration, bulk edits and settings.</div>';
  p.innerHTML = html;

  $$("#demo-panel .dp-btn[data-view]").forEach((b) => b.addEventListener("click", () => setView(b.dataset.view)));
  $$("#demo-panel .dp-link").forEach((b) =>
    b.addEventListener("click", () => demoGo(b.dataset.go))
  );
  $$("#demo-panel .dp-btn[data-lang]").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));
  $("#dp-theme").addEventListener("click", () => { toggleTheme(); renderDemoPanel(); });
}

function demoGo(goKey) {
  const [kind, a, b] = goKey.split(":");
  if (kind === "map") {
    if (a === "lens") { mapState.lens = b; mapState.focusId = null; mapState.topic = ""; mapState.city = null; go("map"); }
    else if (a === "focus") { mapState.lens = "people"; mapState.focusId = b; mapState.topic = ""; go("map"); }
    else if (a === "topic") { mapState.lens = "people"; mapState.topic = b; mapState.focusId = null; go("map"); }
    else { mapState.lens = "people"; mapState.focusId = null; mapState.topic = ""; mapState.city = null; go("map"); }
    return;
  }
  if (kind === "profile") return go("profile", { personId: a });
  if (kind === "refresh") return go("refresh", { personId: a });
  if (kind === "addinfo") return go("profile", { personId: a }), setTimeout(() => openCapture(null, { personId: a, addInfo: true }), 60);
  if (kind === "capture") return go("home"), setTimeout(() => openCapture(null), 60);
  go(kind);
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
    } else if (c.reason === "silence") {
      reasonTxt = t("care_silence_days", { n: c.days });
      detailTxt = t("care_last", { v: (p.last && p.last.when) || "—" });
    } else {
      reasonTxt = c.reason === "promise" ? t("reason_promise") : t("reason_follow_up");
      detailTxt = c.followUp ? c.followUp.what : "";
    }
    const action = c.actions[0] || "dismiss";
    const actionLabel = { message: t("care_action_message"), reconnect: t("care_action_reconnect"), do: t("care_action_do") }[action] || t("btn_view");
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
    const label = d.kind === "birthday" ? t("reason_birthday") : d.label;
    return (
      '<div class="date-item"><div class="di-ico">' + icon(d.kind === "birthday" ? "cake" : "cal", 14) + "</div>" +
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
      if (b.dataset.action === "message" || b.dataset.action === "do") toast(t("toast_draft", { name: p.name.split(" ")[0] }));
      else go("profile", { personId: p.id });
    })
  );
  $$("#home-upcoming .refresh-open").forEach((b) => b.addEventListener("click", () => go("refresh", { personId: b.dataset.id })));
  $$("#home-dates .btn").forEach((b) => b.addEventListener("click", () => go("profile", { personId: b.dataset.id })));
  $$("#home-recent .person-row").forEach((el) => el.addEventListener("click", () => go("profile", { personId: el.dataset.id })));
  $$(".more").forEach((b) => b.addEventListener("click", () => go(b.dataset.screen)));
}

/* ============================================================
   PEOPLE + CIRCLES
   ============================================================ */
let peopleSearch = "", peopleCircle = "", peopleStatus = "active";

function renderPeople() {
  const seg = $("#people-segmented");
  $$("button", seg).forEach((b) => b.classList.toggle("on", b.dataset.tab === peopleTab));

  const viewEl = $("#people-view");
  if (peopleTab === "circles") {
    viewEl.innerHTML =
      '<div class="card" style="background:var(--accent-soft);border-color:transparent;padding:13px 16px;font-size:12.5px;color:var(--ink)">' +
      icon("spark", 13) + " " + t("circles_hint") + "</div>" +
      '<div style="margin-top:14px"></div>' +
      '<div class="circle-grid">' +
      CIRCLES.map((c) => {
        const activeMembers = c.members.filter((id) => { const m = byId(id); return m && m.active !== false; });
        const avs = activeMembers.map((id) => byId(id));
        return (
          '<button class="circle-card" data-circle="' + c.id + '">' +
          '<div class="cc-head"><span class="cc-dot" style="background:' + c.color + '"></span><b>' + esc(c.name) + "</b>" +
          '<span class="cc-count">' + activeMembers.length + "</span></div>" +
          '<div class="cc-avs">' + avs.map((m) => avatarHTML(m, 24)).join("") + "</div>" +
          "</button>"
        );
      }).join("") +
      "</div>";
    $$(".circle-card", viewEl).forEach((b) =>
      b.addEventListener("click", () => {
        const c = circleOf(b.dataset.circle);
        peopleCircle = c.id;
        peopleSearch = "";
        peopleStatus = "active";
        peopleTab = "people";
        const si = $("#people-search");
        if (si) si.value = "";
        renderPeople();
        toast(t("toast_filtered", { name: c.name }));
      })
    );
    return;
  }

  const filterOptions = CIRCLES.map((c) => '<option value="' + c.id + '">' + esc(c.name) + "</option>").join("");
  viewEl.innerHTML =
    '<div class="toolbar">' +
    '<div class="search-input">' + icon("search", 14) + '<input id="people-search" data-i18n-ph="people_search_ph" placeholder="' + t("people_search_ph") + '" /></div>' +
    '<select class="filter-select" id="people-status">' +
    '<option value="active">' + t("people_status_active") + "</option>" +
    '<option value="inactive">' + t("people_status_inactive") + "</option>" +
    '<option value="all">' + t("people_status_all") + "</option>" +
    "</select>" +
    '<select class="filter-select" id="people-filter"><option value="">' + t("people_filter_all") + "</option>" + filterOptions + "</select>" +
    "</div>" +
    '<div id="people-list"></div>';

  const q = peopleSearch.toLowerCase();
  let list = PEOPLE.filter((p) => {
    const mq = !q || p.name.toLowerCase().includes(q) || p.company.toLowerCase().includes(q) ||
      p.title.toLowerCase().includes(q) || p.interests.some((i) => i.toLowerCase().includes(q)) ||
      (p.nameJa || "").includes(q) || p.currentCity.toLowerCase().includes(q);
    const mc = !peopleCircle || (p.circles || []).includes(peopleCircle);
    const ms = peopleStatus === "all" ? true : peopleStatus === "inactive" ? p.active === false : p.active !== false;
    return mq && mc && ms;
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
  $("#people-filter").value = peopleCircle;
  $("#people-filter").addEventListener("change", () => { peopleCircle = $("#people-filter").value; renderPeople(); });
}

/* ============================================================
   RELATIONSHIP CARE
   ============================================================ */
const REASON_LABEL = { silence: "reason_silence", promise: "reason_promise", follow_up: "reason_follow_up", birthday: "reason_birthday", inactive: "reason_inactive" };

function careTitle(r, p) {
  if (r.reason === "birthday") return t("care_birthday_in", { n: r.days }) + (p.birthday ? " (" + p.birthday + ")" : "");
  if (r.reason === "silence") return t("care_silence_title", { n: r.days });
  return r.followUp ? r.followUp.what : "";
}

function careContext(r, p) {
  if (r.reason === "birthday") {
    return (p.memories && p.memories.length) ? t("care_ctx_birthday") + " " + p.memories[p.memories.length - 1].text : t("care_ctx_birthday");
  }
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
          '<div class="rem-icon ' + (r.reason === "birthday" ? "cake" : r.reason === "promise" ? "action" : r.reason === "follow_up" ? "meeting" : "alert") + '">' +
          icon(r.reason === "birthday" ? "cake" : r.reason === "promise" ? "check" : r.reason === "follow_up" ? "meeting" : "alert", 17) + "</div>" +
          '<div class="rem-body">' +
          '<div class="rem-person">' + avatarHTML(p, 24) + "<span>" + esc(p.name) + "</span>" +
          '<span class="reason-chip ' + r.reason + '">' + t(REASON_LABEL[r.reason]) + "</span></div>" +
          "<b>" + esc(careTitle(r, p)) + "</b>" +
          "<p>" + esc(careContext(r, p)) + (freq ? " <i style='color:var(--ink-3)'>" + t("care_rhythm") + frequencyLabel(freq.id) + ".</i>" : "") + "</p>" +
          '<div class="rem-actions">' +
          r.actions.map((a) => {
            const label = { reconnect: t("btn_reconnect"), snooze: t("btn_snooze_7d"), refresh: t("btn_refresh"), dismiss: t("btn_dismiss"), message: t("btn_message_send"), do: t("btn_do_it") }[a];
            const cls = a === "snooze" || a === "dismiss" ? "btn small ghost" : "btn small primary";
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
      if (a === "reconnect") return go("profile", { personId: p.id });
      if (a === "do" || a === "message") return toast(t("toast_draft", { name: p.name.split(" ")[0] }));
      if (a === "snooze") return snoozeFollowUp(p, 7);
      dismissCare(p);
    })
  );
}

/* ============================================================
   SEARCH / ASK
   ============================================================ */
function renderAsk() {
  $("#q-chips").innerHTML = QUICK_QUESTIONS.map((q) => '<button class="q-chip">' + esc(q) + "</button>").join("");
  $$("#q-chips .q-chip").forEach((c) => c.addEventListener("click", () => { $("#ask-input").value = c.textContent; runAsk(c.textContent); }));

  $("#ask-results").innerHTML =
    '<div class="answer-box" style="opacity:.85">' +
    '<div class="answer-head"><div class="ai-orb">' + icon("spark", 13) + '</div><b>' + t("ai_name") + "</b><span>" + t("ai_example") + "</span></div>" +
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

function analyze(q) {
  const s = q.toLowerCase();
  const people = activePeople();
  if (!people.length) return { answer: t("ask_no_people"), sources: [], why: {} };

  const terms = s.split(/\s+/).filter((w) => w.length > 2);
  const hasTerm = (hay) => (terms.length ? terms.some((w) => hay.includes(w)) : hay.includes(s));

  // Hỏi về một người cụ thể (tên xuất hiện trong câu hỏi)
  const person = people.find(
    (p) =>
      s.includes(p.name.split(" ")[0].toLowerCase()) ||
      (p.nameJa && s.includes(p.nameJa)) ||
      (p.name.split(" ").length > 1 && s.includes(p.name.toLowerCase())),
  );

  let sources = [];
  const why = {};

  if (person) {
    const last = person.last || {};
    const answer =
      "<b>" + esc(person.name) + "</b> — " + esc(person.title) + " at " + esc(person.company) + ". " + esc(person.about) +
      (person.children ? " Family: " + esc(person.children) + "." : "") +
      (person.followUp && person.followUp.what && person.followUp.what !== "—" ? " Follow-up: " + esc(person.followUp.what) + "." : "") +
      (s.includes("discuss") || s.includes("talk") || s.includes("last")
        ? " Last time (" + esc(last.when || "—") + ", " + esc(last.place || "") + "): “" + esc(last.summary || "") + "”"
        : "");
    sources = [person.id];
    why[person.id] = t("ask_asked_about");
    return { answer, sources, why };
  }

  // Tìm theo từ khoá trên nhiều field
  const found = [];
  const add = (p, label) => {
    if (!found.includes(p)) {
      found.push(p);
      why[p.id] = label;
    }
  };
  people.forEach((p) => {
    if (hasTerm((p.currentCity || "").toLowerCase() + " " + (p.country || "").toLowerCase())) add(p, t("ask_where"));
    else if (hasTerm((p.company || "").toLowerCase())) add(p, t("ask_company"));
    else if (hasTerm((p.industry || "").toLowerCase() + " " + (p.title || "").toLowerCase())) add(p, t("ask_industry"));
    else if (hasTerm(((p.interests || []).join(" ") + " " + (p.hobbies || []).join(" ") + " " + (p.tags || []).join(" ")).toLowerCase())) add(p, t("ask_interest"));
    else if (hasTerm((p.circles || []).map((c) => ((circleOf(c) || {}).name || "")).join(" ").toLowerCase())) add(p, t("ask_circle"));
    else if (hasTerm(((p.raw || "") + " " + (p.memories || []).map((m) => m.text).join(" ")).toLowerCase())) add(p, t("ask_memory"));
  });

  if (found.length) {
    const answer =
      t("ask_found", { n: found.length }) + " — " +
      found.slice(0, 4).map((p) => "<b>" + esc(p.name) + "</b> (" + esc(p.company) + ")").join(", ") +
      (found.length > 4 ? ", …" : "") + ".";
    sources = found.slice(0, 6).map((p) => p.id);
    return { answer, sources, why };
  }

  return { answer: t("ask_none") + " " + t("ask_try"), sources: [], why: {} };
}

function runAsk(q) {
  const box = $("#ask-results");
  box.innerHTML =
    '<div class="answer-box"><div class="answer-head"><div class="ai-orb">' + icon("spark", 13) + '</div><b>' + t("ai_name") + "</b><span>" + t("ai_searching") + "</span></div>" +
    '<div class="answer-text"><span class="typing-dots"><i></i><i></i><i></i></span></div></div>';
  setTimeout(() => {
    const r = analyze(q);
    box.innerHTML =
      '<div class="answer-box"><div class="answer-head"><div class="ai-orb">' + icon("spark", 13) + '</div><b>' + t("ai_name") + "</b><span>" + t("ai_answered", { n: r.sources.length, s: r.sources.length > 1 ? "s" : "" }) + "</span></div>" +
      '<div class="answer-text">' + r.answer + "</div>" +
      '<div class="answer-sources">' + r.sources.map((id) => sourceRow(id, r.why[id] || "")).join("") + "</div></div>";
    $$(".source-row", box).forEach((el) => el.addEventListener("click", () => go("profile", { personId: el.dataset.id })));
  }, 1000);
}

/* ============================================================
   NETWORK MAP — lenses + focus mode + Google Maps (location)
   ============================================================ */
let mapState = { lens: "people", focusId: null, degree: 2, topic: "", city: null };
let mapNodes = [], mapEdges = [], mapPopNode = null;
let locMap = null;

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
  const focusP = mapState.focusId ? byId(mapState.focusId) : null;
  $("#focus-bar").innerHTML =
    '<span class="fb-label">' + t("map_focus_label") + "</span>" +
    '<div class="fb-input">' + icon("search", 13) + '<input id="focus-topic" placeholder="' + t("map_focus_ph") + '" value="' + esc(mapState.topic) + '" /></div>' +
    '<button class="btn small' + (focusP ? " primary" : "") + '" id="focus-toggle">' + icon("target", 13) + (focusP ? " " + esc(focusP.name.split(" ")[0]) + " " + t("map_clear") : " " + t("map_pick")) + "</button>" +
    (focusP
      ? '<div class="pick-row" style="display:inline-flex">' +
        [1, 2].map((d) => '<button class="pick' + (mapState.degree === d ? " on" : "") + '" data-degree="' + d + '">' + d + "°</button>").join("") +
        "</div>"
      : "");
  $("#focus-toggle").addEventListener("click", () => {
    if (focusP) { mapState.focusId = null; mapState.topic = ""; renderMap(); return; }
    const ids = activePeople().map((p) => p.id);
    const id = ids[Math.floor(Math.random() * ids.length)];
    mapState.focusId = id; renderMap();
    const p = byId(id);
    toast(t("toast_focus", { name: p.name }));
  });
  $$("#focus-bar .pick[data-degree]").forEach((b) => b.addEventListener("click", () => { mapState.degree = +b.dataset.degree; renderMap(); }));
  $("#focus-topic").addEventListener("input", debounce(() => { mapState.topic = $("#focus-topic").value.trim(); renderMap(); }, 350));

  // location lens needs no filter bar
  $("#focus-bar").classList.toggle("hidden", mapState.lens === "location");

  // hint text depends on lens
  const hint = $(".map-hint");
  if (hint) hint.textContent = mapState.lens === "location" ? t("map_hint_loc") : t("map_hint");

  if (mapState.lens === "location") { renderLocationMap(); return; }
  buildMapSvg();
}

function renderLocationMap() {
  const groups = LENSES.location.groups;
  const people = activePeople();

  // destroy previous Leaflet instance (avoid duplicates on re-render)
  if (locMap) { try { locMap.remove(); } catch (e) {} locMap = null; }

  // compact legend: per-city counts (active people only)
  const counts = groups.map((g) => {
    const n = (g.members || []).filter((id) => { const p = byId(id); return p && p.active !== false; }).length;
    return n ? esc(g.label) + " " + n : null;
  }).filter(Boolean);
  $("#map-legend").innerHTML =
    '<span><i style="background:#7A5AF8"></i>' + t("lens_location") + "</span>" +
    counts.map((c) => "<span>" + c + "</span>").join("");
  $("#map-wrap .map-pop") && $("#map-wrap .map-pop").remove();

  // offline / CDN unavailable fallback: compact text list (no big avatars)
  if (typeof L === "undefined") {
    const list = groups.map((g) => {
      const members = (g.members || []).map((id) => byId(id)).filter((p) => p && p.active !== false);
      if (!members.length) return "";
      return '<div class="loc-off-row"><b>' + esc(g.label) + "</b>" +
        members.map((p) => '<button class="link-chip" data-id="' + p.id + '">' + esc(p.name) + "</button>").join(", ") + "</div>";
    }).join("");
    $("#map-canvas").innerHTML =
      '<div class="card" style="padding:16px"><div style="font-size:13px;color:var(--ink-2);margin-bottom:8px">' + t("map_offline") + "</div>" + list + "</div>";
    $$("#map-canvas .link-chip").forEach((b) => b.addEventListener("click", () => go("profile", { personId: b.dataset.id })));
    return;
  }

  // interactive map with photo markers
  $("#map-canvas").innerHTML = '<div id="location-map" class="location-map"></div>';
  const container = $("#location-map");
  if (!container) return;

  locMap = L.map(container, { zoomControl: true });
  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 19
  }).addTo(locMap);

  const markers = [];
  people.forEach((p) => {
    const [lat, lng] = personGeo(p);
    const iconHtml = p.photo
      ? '<img src="' + esc(p.photo) + '" alt="" />'
      : '<span class="loc-initials">' + esc(p.initials || p.name.slice(0, 2)) + "</span>";
    const markerIcon = L.divIcon({
      className: "loc-marker-wrap",
      html: '<div class="loc-marker" style="--c:' + esc(p.color) + '">' + iconHtml + "</div>",
      iconSize: [46, 54],
      iconAnchor: [23, 50],
      popupAnchor: [0, -48]
    });
    const m = L.marker([lat, lng], { icon: markerIcon, title: p.name });

    const pop = document.createElement("div");
    pop.className = "loc-pop";
    pop.innerHTML =
      '<div class="loc-pop-head">' + avatarHTML(p, 40) + "</div>" +
      "<b>" + esc(p.name) + "</b>" +
      '<div class="loc-pop-sub">' + esc(p.company) + " · " + esc(p.title) + "</div>" +
      '<div class="loc-pop-city">' + icon("pin", 11) + " " + esc(p.currentCity) + "</div>" +
      '<button class="btn small primary loc-pop-open" data-id="' + p.id + '">' + t("btn_profile") + "</button>";
    m.bindPopup(pop, { closeButton: true });
    m.on("popupopen", () => {
      const btn = pop.querySelector(".loc-pop-open");
      if (btn && !btn._bound) { btn._bound = true; btn.addEventListener("click", () => go("profile", { personId: btn.dataset.id })); }
    });
    markers.push(m);
  });

  if (markers.length) {
    L.layerGroup(markers).addTo(locMap);
    locMap.fitBounds(L.latLngBounds(markers.map((m) => m.getLatLng())), { padding: [40, 40] });
  } else {
    locMap.setView([35.6, 139.6], 5);
  }
  setTimeout(() => { try { if (locMap) locMap.invalidateSize(); } catch (e) {} }, 80);
}

function debounce(fn, ms) {
  let t;
  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
}

function personMatchTopic(p, topic) {
  const t2 = topic.toLowerCase();
  if (!t2) return false;
  const hay = [p.name, p.company, p.title, p.industry, p.currentCity, p.relationshipType, p.about,
    ...(p.interests || []), ...(p.hobbies || []), ...(p.tags || []),
    ...(p.circles || []).map((c) => (circleOf(c) || {}).name || "")].join(" ").toLowerCase();
  return hay.includes(t2);
}

function buildMapSvg() {
  const W = 920, H = 640;
  mapNodes = []; mapEdges = [];
  const people = activePeople();
  const lens = LENSES[mapState.lens];

  if (mapState.lens === "people") {
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
  } else {
    const groups = lens.groups;
    const cx = 460, cy = 320, R = 265;
    groups.forEach((g, i) => {
      const ang = (i / groups.length) * Math.PI * 2 - Math.PI / 2;
      mapNodes.push({ id: g.id, label: g.label, type: "group", x: Math.round(cx + R * Math.cos(ang)), y: Math.round(cy + R * Math.sin(ang)), color: "#7A5AF8" });
    });
    people.forEach((p) => {
      const pos = personPos(p);
      mapNodes.push({ id: p.id, label: shortName(p), type: "person", x: pos[0], y: pos[1], color: p.color });
    });
    groups.forEach((g) => g.members.forEach((mid) => {
      const mp = byId(mid);
      if (mp && mp.active !== false) mapEdges.push({ a: g.id, b: mid, why: g.label });
    }));
  }

  // focus set
  let focusSet = null;
  if (mapState.focusId) {
    focusSet = new Set([mapState.focusId]);
    const linksOf = (id) => mapEdges.filter((e) => e.a === id || e.b === id);
    const n1 = linksOf(mapState.focusId);
    n1.forEach((e) => focusSet.add(e.a === mapState.focusId ? e.b : e.a));
    if (mapState.degree >= 2) {
      [...focusSet].forEach((id) => linksOf(id).forEach((e) => {
        focusSet.add(e.a); focusSet.add(e.b);
      }));
    }
  }

  const dimNode = (id) => {
    if (mapState.focusId) return !focusSet.has(id);
    if (mapState.topic) {
      if (id === "you") return true;
      const p = byId(id);
      return p ? !personMatchTopic(p, mapState.topic) : true;
    }
    return false;
  };

  // legend
  $("#map-legend").innerHTML = mapState.lens === "people"
    ? '<span><i style="background:#201D1A"></i>' + t("map_legend_you") + "</span><span><i style='background:var(--accent)'></i>" + t("map_legend_people") + "</span><span><i style='background:#8D867C'></i>" + t("map_legend_rel") + "</span>" +
      (mapState.focusId ? '<span><i style="background:var(--ok)"></i>' + t("map_legend_focus") + esc(byId(mapState.focusId).name) + "</span>" : "")
    : '<span><i style="background:#7A5AF8"></i>' + t("lens_" + mapState.lens) + "</span><span><i style='background:var(--accent)'></i>" + t("map_legend_people") + "</span>";

  let svg = '<svg viewBox="0 0 ' + W + " " + H + '" xmlns="http://www.w3.org/2000/svg">';

  mapEdges.forEach((e) => {
    const na = mapNodes.find((n) => n.id === e.a), nb = mapNodes.find((n) => n.id === e.b);
    if (!na || !nb) return;
    const dim = dimNode(e.a) || dimNode(e.b);
    const hot = mapState.topic && !dim;
    svg += '<line class="map-edge' + (dim ? " dim" : "") + (hot ? " hot" : "") + '" x1="' + na.x + '" y1="' + na.y + '" x2="' + nb.x + '" y2="' + nb.y + '" data-a="' + e.a + '" data-b="' + e.b + '"><title>' + esc(e.why) + "</title></line>";
  });

  mapNodes.forEach((n) => {
    const r = n.type === "you" ? 26 : n.type === "person" ? 19 : 17;
    const dim = dimNode(n.id);
    const focusRing = mapState.focusId && n.id === mapState.focusId;
    const isGroup = n.type === "group";
    svg +=
      '<g class="map-node" data-id="' + n.id + '" transform="translate(' + n.x + "," + n.y + ')">' +
      (isGroup
        ? '<rect class="' + (dim ? "dim" : "") + '" x="' + (-r - 6) + '" y="' + (-r - 4) + '" width="' + (r * 2 + 12) + '" height="' + (r * 2 + 8) + '" rx="12" fill="' + n.color + '" opacity="0.14" stroke="' + n.color + '" stroke-width="1.6"/>' +
          '<text class="' + (dim ? "dim" : "") + '" y="4" text-anchor="middle" font-size="' + Math.round(r * 0.62) + '" font-weight="700" fill="' + n.color + '">' + esc(n.label.split(" ")[0].slice(0, 2).toUpperCase()) + "</text>"
        : '<circle class="' + (dim ? "dim" : "") + '" r="' + r + '" fill="' + n.color + '" stroke="' + (focusRing ? "var(--ok)" : "var(--surface)") + '" stroke-width="' + (focusRing ? 4 : 2.5) + '"/>' +
          (n.type !== "you" ? '<text class="' + (dim ? "dim" : "") + '" y="1" text-anchor="middle" font-size="' + Math.round(r * 0.62) + '" font-weight="700" fill="#fff">' + esc(n.type === "you" ? "You" : initialsOf(n.label)) + "</text>" : "")) +
      '<text class="' + (dim ? "dim" : "") + '" y="' + (isGroup ? r + 22 : r + 16) + '" text-anchor="middle" font-size="' + (n.type === "you" ? 12 : 10.5) + '" font-weight="' + (n.type === "you" ? "700" : "600") + '" fill="var(--ink)">' + esc(n.label) + "</text>" +
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
      '<button class="btn small pop-focus" data-id="' + id + '">' + t("btn_focus") + "</button>" +
      '<button class="btn small pop-refresh" data-id="' + id + '">' + t("btn_refresh") + "</button>" +
      "</div>";
    pop.querySelector(".pop-profile").addEventListener("click", () => go("profile", { personId: id }));
    pop.querySelector(".pop-focus").addEventListener("click", () => { mapState.focusId = id; mapState.topic = ""; renderMap(); });
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

  const head =
    '<button class="btn ghost" style="margin-bottom:12px" id="back-people">' + icon("back") + " " + t("btn_back") + "</button>" +
    '<div class="screen-head-row"><div class="profile-head">' + avatarHTML(p, 62) +
    "<div><h1>" + esc(p.name) + '<span class="ja">' + esc(p.nameJa) + "</span></h1>" +
    '<div class="role-line"><b>' + esc(p.title) + "</b> at " + esc(p.company) + "</div>" +
    '<div class="chip-row" style="margin-top:8px">' +
    '<span class="chip dot" style="color:' + st.color + '">' + strengthLabel(st.id) + "</span>" +
    '<span class="chip">' + esc(p.currentCity) + "</span>" +
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
    '<button class="btn small" id="act-followup">' + t("btn_followup") + "</button>" +
    '<button class="btn small refresh-open" data-id="' + p.id + '">' + icon("refresh", 12) + " " + t("btn_refresh") + "</button>" +
    '<button class="btn small" id="act-connections">' + icon("graph", 12) + " " + t("btn_connections") + "</button>" +
    "</div></div>";

  const tabs =
    '<div class="tabs">' +
    ["overview", "personal", "work", "relationship", "timeline", "photos"].map((tb, i) =>
      '<button class="tab' + (i === 0 ? " active" : "") + '" data-tab="' + tb + '">' + t("profile_tab_" + tb) + "</button>"
    ).join("") +
    "</div>";

  const overview =
    '<div class="profile-grid">' +
    '<div class="stack">' +
    '<div class="card"><div class="card-title">' + icon("spark", 13) + " " + t("profile_about") + "</div>" +
    '<div class="summary-quote">' + esc(p.about).replace("Interested in robotics, Vietnam and warehouse automation", "<span class='hl'>Interested in robotics, Vietnam and warehouse automation</span>") + "</div></div>" +
    '<div class="card"><div class="card-title">' + icon("users", 13) + " " + t("profile_rel_settings") + "</div>" +
    '<div class="fact-grid"><div class="fact"><div class="k">' + t("fact_relationship") + '</div><div class="v">' + esc(relTypeLabel(p.relationshipType)) + "</div></div>" +
    '<div class="fact"><div class="k">' + t("fact_first_met") + '</div><div class="v">' + esc(p.firstMet.date) + (p.firstMet.place ? " · " + esc(p.firstMet.place) : "") + "</div></div>" +
    '<div class="fact"><div class="k">' + t("fact_introduced_by") + '</div><div class="v">' + esc(p.introducedBy || "—") + "</div></div>" +
    '<div class="fact"><div class="k">' + t("fact_last_contact") + '</div><div class="v">' + daysAgo(p.lastContactDays) + "</div></div></div>" +
    '<div style="margin-top:12px;font-size:11.5px;font-weight:700;color:var(--ink-3);text-transform:uppercase;letter-spacing:.6px">' + t("fact_strength") + "</div>" +
    '<div class="pick-row" style="margin-top:7px">' + STRENGTHS.map((s) => '<button class="pick strength-pick' + (s.id === p.strength ? " on" : "") + '" data-s="' + s.id + '">' + strengthLabel(s.id) + "</button>").join("") + "</div>" +
    '<div style="margin-top:12px;font-size:11.5px;font-weight:700;color:var(--ink-3);text-transform:uppercase;letter-spacing:.6px">' + t("fact_rhythm") + "</div>" +
    '<div class="pick-row" style="margin-top:7px">' + FREQUENCIES.map((f) => '<button class="pick freq-pick' + (f.id === p.frequency ? " on" : "") + '" data-f="' + f.id + '">' + frequencyLabel(f.id) + "</button>").join("") + "</div>" +
    '<div style="margin-top:14px;font-size:11.5px;font-weight:700;color:var(--ink-3);text-transform:uppercase;letter-spacing:.6px">' + t("profile_network_status") + "</div>" +
    '<div class="pick-row" style="margin-top:7px">' +
    '<button class="pick active-pick' + (!inactive ? " on" : "") + '" data-active="1">' + t("profile_active") + "</button>" +
    '<button class="pick active-pick' + (inactive ? " on" : "") + '" data-active="0">' + t("profile_inactive") + "</button>" +
    "</div>" +
    '<p style="font-size:11px;color:var(--ink-3);margin-top:9px">' + t("profile_care_note") + "</p></div>" +
    '<div class="card"><div class="card-title">' + icon("cake", 13) + " " + t("profile_important_dates") + "</div>" +
    (p.dates.length ? kvList(p.dates.map((d) => ({ k: d.label, v: d.when }))) : '<span class="chip ghost">' + t("no_dates_yet") + "</span>") + "</div>" +
    '<div class="card"><div class="card-title">' + icon("tag", 13) + " " + t("profile_circles_tags") + "</div>" +
    '<div class="chip-row">' + (p.circles || []).map((c) => { const cc = circleOf(c); return cc ? '<span class="chip dot" style="color:' + cc.color + '">' + esc(cc.name) + "</span>" : ""; }).join("") +
    (p.tags || []).map((tg) => '<span class="chip">#' + esc(tg) + "</span>").join("") + "</div></div>" +
    "</div>" +
    '<div class="stack">' +
    '<div class="card followup-card" style="background:linear-gradient(135deg,var(--accent-soft),transparent 70%);border-color:var(--accent)">' +
    '<div class="card-title" style="color:var(--accent)">' + icon("cal", 13) + " " + t("profile_next_followup") + "</div>" +
    '<div class="followup-when" style="font-family:var(--serif);font-size:18px;font-weight:600;color:var(--accent)">' + esc(p.followUp.when) + "</div>" +
    '<div style="font-size:13px;color:var(--ink-2);margin-top:4px">' + esc(p.followUp.what) + "</div>" +
    '<div style="display:flex;gap:7px;margin-top:12px"><button class="btn small primary" id="act-done">' + icon("check", 12) + " " + t("btn_done") + '</button><button class="btn small ghost" id="act-snooze">' + t("btn_snooze") + "</button></div></div>" +
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

  $("#screen-profile").innerHTML = head + tabs + '<div id="profile-body">' + overview + "</div>";

  const bodies = { overview, personal, work, relationship, timeline: timelineCard, photos: photosTab };
  $$(".tab", $("#screen-profile")).forEach((tb) =>
    tb.addEventListener("click", () => {
      $$(".tab", $("#screen-profile")).forEach((x) => x.classList.toggle("active", x === tb));
      $("#profile-body").innerHTML = bodies[tb.dataset.tab];
      bindProfile();
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
  $("#act-followup").addEventListener("click", () => { toast(t("toast_followup_added")); });
  $("#act-connections").addEventListener("click", () => go("map", { map: { lens: "people", focusId: p.id, topic: "" } }));
  $$(".refresh-open", scope).forEach((b) => b.addEventListener("click", () => go("refresh", { personId: b.dataset.id })));
  $$(".person-link", scope).forEach((b) => b.addEventListener("click", () => b.dataset.id && go("profile", { personId: b.dataset.id })));
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
  $$(".active-pick", scope).forEach((b) => b.addEventListener("click", () => {
    const next = b.dataset.active === "1";
    Store.setActive(p.id, next);
    toast(t(next ? "toast_active_on" : "toast_active_off", { name: p.name.split(" ")[0] }));
    renderProfile(p.id);
  }));
  const done = $("#act-done"), snooze = $("#act-snooze");
  if (done) done.addEventListener("click", () => { completeFollowUp(p); renderProfile(p.id); });
  if (snooze) snooze.addEventListener("click", () => { snoozeFollowUp(p, 7); renderProfile(p.id); });

  // photos
  const phChange = $("#ph-change");
  const phFile = $("#ph-file");
  if (phChange && phFile) {
    phChange.addEventListener("click", () => phFile.click());
    phFile.addEventListener("change", (e) => {
      const f = e.target.files && e.target.files[0];
      if (!f) return;
      readFileAsDataURL(f, (src) => { setProfilePhoto(p.id, src); toast(t("toast_photo_saved")); renderProfile(p.id); });
    });
  }
  const phRemove = $("#ph-remove");
  if (phRemove) phRemove.addEventListener("click", () => { removeProfilePhoto(p.id); toast(t("toast_photo_removed")); renderProfile(p.id); });
  const phAdd = $("#ph-add");
  const phMulti = $("#ph-multi");
  if (phAdd && phMulti) {
    phAdd.addEventListener("click", () => phMulti.click());
    phMulti.addEventListener("change", (e) => {
      const files = [...(e.target.files || [])];
      if (!files.length) return;
      const srcs = [];
      let remaining = files.length;
      files.forEach((f) => readFileAsDataURL(f, (src) => { srcs.push(src); if (--remaining === 0) { addPhotos(p.id, srcs); toast(t("toast_photo_added")); renderProfile(p.id); } }));
    });
  }
  $$(".photo-remove", scope).forEach((b) => b.addEventListener("click", () => { removePhoto(p.id, +b.dataset.idx); renderProfile(p.id); }));
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
      "Ask how things changed since " + p.last.when + ".",
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
    circles: [...new Set([...(keep.circles || []), ...(dup.circles || [])])],
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
    '<div class="card"><div class="card-title">' + icon("globe", 13) + " " + t("settings_language") + "</div>" +
    '<div class="setting-row"><div><b>' + t("settings_language_desc") + "</b></div></div>" +
    '<div class="pick-row" style="margin-top:8px">' +
    '<button class="pick lang-pick' + (LANG === "vi" ? " on" : "") + '" data-lang="vi">' + t("lang_vi") + "</button>" +
    '<button class="pick lang-pick' + (LANG === "en" ? " on" : "") + '" data-lang="en">' + t("lang_en") + "</button>" +
    '<button class="pick lang-pick' + (LANG === "ja" ? " on" : "") + '" data-lang="ja">' + t("lang_ja") + "</button>" +
    "</div></div>" +
    '<div class="card"><div class="card-title">' + icon("users", 13) + " " + t("settings_network") + "</div>" +
    '<div class="setting-row"><div><b>' + t("settings_network_desc") + "</b></div></div>" +
    PEOPLE.map((p) =>
      '<div class="setting-row"><div><b>' + esc(p.name) + "</b><span>" + esc(p.company) + "</span></div>" +
      '<span class="net-switch' + (p.active !== false ? " on" : "") + '" data-id="' + p.id + '" role="switch" aria-checked="' + (p.active !== false) + '"><i></i></span></div>'
    ).join("") +
    "</div>" +
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
    '<div class="card"><div class="card-title">' + icon("link", 13) + " " + t("settings_integrations") + "</div>" +
    '<div class="chip-row"><span class="chip ghost">Calendar</span><span class="chip ghost">Email</span><span class="chip ghost">LINE</span><span class="chip ghost">LinkedIn</span><span class="chip ghost">Contacts</span></div>' +
    '<p style="font-size:11.5px;color:var(--ink-3);margin-top:10px">' + t("settings_integrations_note") + "</p></div>" +
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
  $$(".lang-pick", $("#screen-settings")).forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));
  $$(".net-switch", $("#screen-settings")).forEach((b) => b.addEventListener("click", () => { toggleActive(b.dataset.id); renderSettings(); }));
}

/* ============================================================
   CAPTURE — voice / card / text / manual
   ============================================================ */
let cap = { mode: null, step: 0, timer: null, seconds: 0, open: false, personId: null, addInfo: false, edit: false };

function openCapture(mode, opts = {}) {
  cap = { mode: mode || null, step: 1, timer: null, seconds: 0, open: true, personId: opts.personId || null, addInfo: !!opts.addInfo, edit: !!opts.edit, text: "", photo: "", prefill: opts.prefill || {}, review: false };
  $("#capture-modal").classList.add("open");
  renderCapture();
}

function closeCapture() {
  clearInterval(cap.timer);
  cap.open = false;
  $("#capture-modal").classList.remove("open");
}

function setCapTitle(txt, step) {
  $("#capture-title").textContent = txt;
  $("#capture-step").textContent = step || "";
}

function renderCapture() {
  const body = $("#capture-body");
  const m = cap.mode;

  if (m === null) {
    setCapTitle(cap.addInfo ? t("cap_add_info_title", { name: cap.personId ? byId(cap.personId).name.split(" ")[0] : "" }) : t("cap_add_person_title"), "");
    const modes = cap.addInfo
      ? [
          ["voice", t("mode_voice"), t("mode_voice_sub"), "voice"],
          ["text", t("mode_text"), t("mode_text_sub"), "text"],
          ["manual", t("mode_manual"), t("mode_manual_sub"), "text"]
        ]
      : [
          ["card", t("mode_card"), t("mode_card_sub"), "card"],
          ["voice", t("mode_voice"), t("mode_voice_sub"), "voice"],
          ["text", t("mode_text"), t("mode_text_sub"), "text"],
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
    $$(".mode-cell", body).forEach((b) => b.addEventListener("click", () => { cap.mode = b.dataset.mode; cap.step = 2; renderCapture(); }));
    return;
  }

  if (m === "voice") {
    if (cap.step === 2) {
      setCapTitle(cap.addInfo ? t("mode_voice") + " — " + (cap.personId ? byId(cap.personId).name.split(" ")[0] : "") : t("voice_title"), t("voice_step_record"));
      cap.seconds = 0;
      body.innerHTML =
        '<div class="rec-wrap"><div class="rec-ring"><div class="pulse"></div><div class="core">' + icon("mic", 34) + "</div></div>" +
        '<div class="rec-timer" id="rec-timer">0:00</div>' +
        '<div class="rec-hint">' + (cap.addInfo ? t("voice_hint_add") : t("voice_hint_new")) + "</div></div>" +
        '<div class="modal-foot"><button class="btn ghost" id="rec-cancel">' + t("btn_cancel") + "</button>" +
        '<button class="btn ghost" id="rec-type">' + t("btn_type_instead") + "</button>" +
        '<button class="btn accent" id="rec-stop">' + icon("check", 14) + " " + t("rec_stop") + "</button></div>";
      $("#rec-cancel").addEventListener("click", closeCapture);
      $("#rec-type").addEventListener("click", () => { stopRec(); cap.mode = "text"; cap.step = 2; renderCapture(); });
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
        '<label class="ocr-picker" for="card-photo">' +
          '<span class="ico">' + icon("card", 24) + "</span>" +
          "<b>" + t("card_pick_photo") + "</b>" +
          "<p>" + t("card_pick_hint") + "</p>" +
        "</label>" +
        '<input class="ocr-file" id="card-photo" type="file" accept="image/*" capture="environment" />' +
        (cap.photo ? '<img class="ocr-preview" src="' + cap.photo + '" alt="" />' : "") +
        '<div class="ocr-status" id="ocr-status">' + t("card_ocr_local") + "</div>" +
        '<div class="ocr-bar" aria-hidden="true"><span id="ocr-bar"></span></div>' +
        '<div class="modal-foot"><button class="btn ghost" id="card-demo">' + t("card_use_demo") + "</button>" +
        '<button class="btn primary" id="card-choose">' + icon("camera", 13) + " " + t("card_choose") + "</button></div>";
      $("#card-photo").addEventListener("change", handleCardPhoto);
      $("#card-choose").addEventListener("click", () => $("#card-photo").click());
      $("#card-demo").addEventListener("click", () => { cap.ocrText = cardDemoText(); cap.step = 3; renderCapture(); });
    } else if (cap.step === 3) {
      setCapTitle(t("card_read"), t("card_step_review"));
      const extracted = cardFieldsToExtract(cap.prefill || parseCardOcrText(cap.ocrText || ""));
      body.innerHTML =
        '<div class="extract-grid">' +
        extracted.map((f) => '<div class="extract-cell"><div class="k">' + esc(f.label) + (f.conf ? ' <span class="conf">' + f.conf + "%</span>" : "") + "</div><div class='v'>" + esc(f.value) + "</div></div>").join("") +
        "</div>" +
        '<textarea class="story" id="card-raw" style="margin-top:12px;min-height:120px" placeholder="' + t("card_raw_ph") + '">' + esc(cap.ocrText || "") + "</textarea>" +
        '<p style="font-size:12px;color:var(--ink-3);margin-top:10px">' + t("card_review_hint") + "</p>" +
        '<div class="modal-foot"><button class="btn ghost" id="card-rescan">' + t("rescan") + "</button>" +
        '<button class="btn primary" id="card-next">' + icon("check", 13) + " " + t("looks_right") + "</button></div>";
      $("#card-rescan").addEventListener("click", () => { cap.step = 2; renderCapture(); });
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
    const editing = cap.personId ? byId(cap.personId) : null;
    const prefill = cap.prefill || {};
    setCapTitle(
      cap.review ? t("review_title") : editing ? t("btn_edit") + " — " + editing.name.split(" ")[0] : t("manual_entry"),
      t("manual_step"),
    );
    const val = (k) => {
      if (prefill[k] != null && String(prefill[k]) !== "") return Array.isArray(prefill[k]) ? prefill[k].join(", ") : prefill[k];
      if (editing && editing[k] != null) return Array.isArray(editing[k]) ? editing[k].join(", ") : editing[k];
      return "";
    };
    body.innerHTML =
      (cap.review
        ? '<p style="font-size:12.5px;color:var(--ok);background:var(--ok-soft);padding:9px 12px;border-radius:10px;margin-bottom:12px">' +
          icon("spark", 13) + " " + t("review_note") + "</p>"
        : "") +
      MANUAL_SECTIONS.map((sec) =>
        '<div class="form-section"><div class="fs-title">' + t("section_" + sec.key) + "</div><div class='form-grid'>" +
        sec.fields.map((f) => {
          const id = "f-" + sec.key + "-" + f.k;
          const label = t("field_" + f.k) + (f.req ? ' <span class="req">*</span>' : "");
          const input =
            f.type === "select"
              ? '<select class="field-input" id="' + id + '">' + f.options.map((o) => {
                  let optLabel = o;
                  if (sec.key === "basic" && f.k === "gender") optLabel = genderLabel(o);
                  else if (f.k === "strength") optLabel = strengthLabel(o);
                  else if (f.k === "frequency") optLabel = frequencyLabel(o);
                  else if (f.k === "relationshipType") optLabel = relTypeLabel(o);
                  return '<option value="' + o + '"' + (String(val(f.k)) === o ? " selected" : "") + ">" + esc(o ? optLabel : "—") + "</option>";
                }).join("") + "</select>"
              : f.type === "textarea"
                ? '<textarea class="field-textarea" id="' + id + '" placeholder="' + esc(f.ph || "") + '">' + esc(val(f.k)) + "</textarea>"
                : '<input class="field-input" id="' + id + '" placeholder="' + esc(f.ph || "") + '" value="' + esc(val(f.k)) + '" />';
          return '<div class="field' + (f.type === "textarea" ? " full" : "") + '"><label>' + label + "</label>" + input + "</div>";
        }).join("") +
        "</div></div>"
      ).join("") +
      '<div class="form-section"><div class="fs-title">' + (editing ? t("circles_edit") : t("circles_optional")) + "</div>" +
      '<div class="pick-row">' + CIRCLES.map((c) => {
        const on = (editing && (editing.circles || []).includes(c.id)) || (prefill.circles || []).includes(c.id);
        return '<button class="pick circle-pick' + (on ? " on" : "") + '" data-c="' + c.id + '">' + esc(c.name) + "</button>";
      }).join("") + "</div></div>" +
      '<p style="font-size:11.5px;color:var(--ink-3)">' + t("all_fields_optional") + "</p>" +
      '<div class="modal-foot"><button class="btn ghost" id="mf-cancel">' + t("btn_cancel") + "</button>" +
      '<button class="btn primary" id="mf-save">' + icon("check", 14) + " " + (cap.review ? t("btn_save") : editing ? t("save_changes") : t("create_person")) + "</button></div>";

    $$(".circle-pick", body).forEach((b) => b.addEventListener("click", () => b.classList.toggle("on")));
    $("#mf-cancel").addEventListener("click", closeCapture);
    $("#mf-save").addEventListener("click", () => {
      const get = (k) => {
        const el = document.getElementById("f-" + k);
        if (!el) return "";
        return el.value.trim();
      };
      const circles = $$(".circle-pick.on", body).map((b) => b.dataset.c);
      const SPLIT_FIELDS = ["languages", "expertise", "skills", "hobbies", "sports", "businessTopics", "previousCompanies", "careerHistory", "travelInterests", "interests", "helpGiven", "helpReceived", "promises"];
      const readField = (f) => {
        const v = get(f.sec + "-" + f.k);
        if (!v) return null;
        if (f.k === "kana") return ["nameJa", v];
        if (SPLIT_FIELDS.includes(f.k)) return [f.k, v.split(",").map((s) => s.trim()).filter(Boolean)];
        return [f.k, v];
      };

      // Ký ức + raw từ voice/text (nếu có)
      const transMemory = cap.text ? { when: "Today", text: cap.text } : null;
      const followUpFromPrefill = cap.prefill.followUpWhat
        ? { when: "—", what: cap.prefill.followUpWhat, kind: "action" }
        : null;

      if (editing) {
        const patch = {};
        MANUAL_SECTIONS.forEach((sec) => sec.fields.forEach((f) => {
          const r = readField(Object.assign({ sec: sec.key }, f));
          if (r) patch[r[0]] = r[1];
        }));
        if (patch.firstMetDate || patch.firstMetPlace) {
          patch.firstMet = {
            date: patch.firstMetDate || editing.firstMet.date || "Today",
            place: patch.firstMetPlace || "",
            how: editing.firstMet.how || "",
          };
          delete patch.firstMetDate;
          delete patch.firstMetPlace;
        }
        if (circles.length) patch.circles = circles;
        const nm = patch.name;
        if (nm) patch.initials = nm.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
        if (cap.review && cap.text) {
          patch.raw = cap.text;
          patch.memories = [...(editing.memories || []), transMemory];
          patch.lastContactDays = 0;
          patch.metCount = (editing.metCount || 0) + 1;
          patch.last = Object.assign({}, editing.last || {}, { type: "Voice/Text note", when: "Today", summary: cap.text.slice(0, 120), tags: [] });
        }
        if (followUpFromPrefill) patch.followUp = followUpFromPrefill;
        Store.updatePerson(editing.id, patch);
        closeCapture();
        toast(cap.review ? t("toast_updated_person", { name: (nm || editing.name).split(" ")[0] }) : t("toast_updated_profile", { name: (nm || editing.name).split(" ")[0] }));
        go("profile", { personId: editing.id });
        return;
      }
      const name = get("basic-name") || "New contact";
      const newPerson = {
        id: "p" + Date.now(), name, nameJa: get("basic-kana"), initials: name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase(),
        gender: get("basic-gender"), birthday: get("basic-birthday"), nationality: get("basic-nationality"),
        languages: get("basic-languages") ? get("basic-languages").split(",").map((s) => s.trim()) : [],
        currentCity: get("basic-currentCity"), hometown: get("basic-hometown"), country: get("basic-country"),
        email: get("basic-email"), phone: get("basic-phone"),
        company: get("work-company") || "—", department: get("work-department"), title: get("work-title") || "—",
        industry: get("work-industry"), profession: get("work-profession"),
        expertise: get("work-expertise") ? get("work-expertise").split(",").map((s) => s.trim()) : [],
        skills: get("work-skills") ? get("work-skills").split(",").map((s) => s.trim()) : [],
        spouse: get("personal-spouse"), children: get("personal-children"), familyNotes: get("personal-familyNotes"),
        hobbies: get("personal-hobbies") ? get("personal-hobbies").split(",").map((s) => s.trim()) : [],
        favoriteFood: get("personal-favoriteFood"), favoriteDrink: get("personal-favoriteDrink"), schools: get("personal-schools"),
        relationshipType: get("relationship-relationshipType") || "New", strength: get("relationship-strength") || "normal",
        frequency: get("relationship-frequency"),
        firstMet: { date: get("relationship-firstMetDate") || "Today", place: get("relationship-firstMetPlace"), how: "" },
        introducedBy: get("relationship-introducedBy"),
        helpGiven: get("relationship-helpGiven") ? [get("relationship-helpGiven")] : [],
        helpReceived: get("relationship-helpReceived") ? [get("relationship-helpReceived")] : [],
        promises: get("relationship-promises") ? [get("relationship-promises")] : [],
        role: "New · just created", since: "Today", location: (get("basic-currentCity") || "—") + (get("basic-country") ? ", " + get("basic-country") : ""),
        color: "#8E5A9E",
        interests: cap.prefill.interests || [], dates: [], last: { type: cap.review ? (cap.mode === "voice" ? "Voice memo" : cap.mode === "card" ? "Card scan" : "Text note") : "Manual entry", when: "Today", place: "", summary: (cap.text || get("notes-notes") || "Created manually.").slice(0, 120), tags: [] },
        followUp: followUpFromPrefill || { when: "—", what: "Say hi in a few days", kind: "reconnect" },
        meetings: [], timelineExtra: [],
        memories: cap.review && cap.text
          ? [transMemory]
          : get("notes-notes") ? [{ when: "Today", text: get("notes-notes") }] : [],
        raw: cap.text || "",
        connections: [], mutual: [], circles, tags: [cap.review ? (cap.mode === "voice" ? "voice" : cap.mode === "card" ? "card" : "text") : "manual"], lastContactDays: 0, metCount: cap.review ? 1 : 0,
        active: true, photo: "", photos: [], _custom: true,
        about: name + " — " + (get("work-title") || "—") + " at " + (get("work-company") || "—") + (cap.review ? " Captured from " + (cap.mode === "voice" ? "voice" : cap.mode === "card" ? "card" : "text") + " today." : ". Created manually today.")
      };
      Store.createPerson(newPerson);
      closeCapture();
      toast(t("toast_created", { name }));
      go("profile", { personId: newPerson.id });
    });
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
    speechRec.lang = LANG === "ja" ? "ja-JP" : LANG === "vi" ? "vi-VN" : "en-US";
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
    : '<span class="ai-orb" style="display:inline-flex">👤</span>' + t("text_new_person");
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
        circles: [],
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
  return {
    name: p.name || "",
    company: p.company || "",
    title: p.title || "",
    currentCity: p.currentCity || "",
    hobbies: (p.hobbies || []).join(", "),
    interests: p.interests || [],
    followUpWhat: p.followUpWhat || "",
    notes: p.notes || "",
  };
}

function cardDemoText() {
  return (CARD_DEMO.extracted || []).map((f) => f.label + ": " + f.value).join("\n");
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
  const title = labeled.title || nonContact.find((l) => /(manager|director|founder|ceo|cto|cfo|sales|marketing|engineer|designer|consultant|lead|head|代表|取締役|部長|課長|営業|開発|マネージャー|社長|giám đốc|trưởng|nhân viên|kỹ sư)/i.test(l)) || "";
  const department = labeled.department || nonContact.find((l) => /(division|department|team|dept\.?|事業部|部|課|phòng|ban)/i.test(l) && l !== title) || "";
  const cityLine = labeled.address || lines.find((l) => /(tokyo|osaka|kyoto|yokohama|ho chi minh|hanoi|ha noi|danang|da nang|singapore|japan|vietnam|〒|区|市|県|quận|phường)/i.test(l)) || "";
  const name = labeled.name || pickCardName(nonContact, company, title, department);
  const notes = [web && "Website: " + web, raw].filter(Boolean).join("\n\n");
  return { name, company, department, title, email: labeled.email || email, phone: labeled.phone || phone, currentCity: cityLine, notes };
}

function pickCardName(lines, company, title, department) {
  const skip = new Set([company, title, department].filter(Boolean));
  const candidates = lines.filter((l) => !skip.has(l) && l.length >= 2 && l.length <= 40 && !/\d/.test(l));
  const roman = candidates.find((l) => /^[A-Z][A-Za-z'.-]+(?:\s+[A-Z][A-Za-z'.-]+){1,3}$/.test(l));
  const jp = candidates.find((l) => /[\u3040-\u30ff\u3400-\u9fff]/.test(l) && l.replace(/\s/g, "").length <= 8);
  return roman || jp || candidates[0] || "";
}

async function handleCardPhoto(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  readFileAsDataURL(file, (url) => {
    cap.photo = url;
    const prev = $(".ocr-preview", $("#capture-body"));
    if (prev) prev.src = url;
  });
  const status = $("#ocr-status");
  const bar = $("#ocr-bar");
  const setProgress = (msg, pct) => {
    if (status) status.textContent = msg;
    if (bar) bar.style.width = Math.max(3, Math.round((pct || 0) * 100)) + "%";
  };
  if (!window.Tesseract || !window.Tesseract.recognize) {
    toast(t("card_ocr_unavailable"));
    cap.ocrText = "";
    return;
  }
  try {
    setProgress(t("card_ocr_loading"), 0.05);
    const result = await window.Tesseract.recognize(file, "eng+vie+jpn", {
      logger: (m) => {
        if (m.status) setProgress(t("card_ocr_reading") + " " + Math.round((m.progress || 0) * 100) + "%", m.progress || 0.1);
      }
    });
    cap.ocrText = ((result && result.data && result.data.text) || "").trim();
    cap.prefill = parseCardOcrText(cap.ocrText);
    if (!cap.ocrText) { toast(t("card_ocr_empty")); return; }
    cap.step = 3;
    renderCapture();
  } catch (err) {
    console.warn("OCR failed", err);
    toast(t("card_ocr_failed"));
    setProgress(t("card_ocr_failed"), 0);
  }
}

/** Vào màn confirm (form manual) với trường đã tự điền từ text/voice. */
function enterReviewFromText() {
  const parsed = parseCaptureText(cap.text || "");
  const matched = cap.personId ? byId(cap.personId) : resolvePersonFromText(cap.text || "");
  cap.mode = "manual";
  cap.review = true;
  cap.prefill = parsedToPrefill(parsed);
  cap.personId = matched ? matched.id : null;
  cap.edit = !!matched;
  cap.step = 1;
  renderCapture();
}

/** Vào màn confirm với trường từ namecard (chỉ trường CÓ dữ liệu). */
function enterReviewFromCard() {
  const pre = parseCardOcrText(cap.ocrText || "") || cardDemoFields();
  const matched = resolvePersonFromText(pre.name || "");
  cap.mode = "manual";
  cap.review = true;
  cap.text = cap.ocrText || "";
  cap.prefill = pre;
  cap.personId = matched ? matched.id : null;
  cap.edit = !!matched;
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
  Store.setActive(id, p.active !== false);
  toast(t(p.active !== false ? "toast_active_on" : "toast_active_off", { name: p.name.split(" ")[0] }));
}

/* ============================================================
   THEME
   ============================================================ */
function toggleTheme() {
  const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  try { localStorage.setItem("nm-theme", next); } catch (e) {}
  renderDemoPanel();
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
  renderDemoPanel();
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
    Store.replaceFromRemote([]); // đăng xuất → xoá bản local (cloud là nguồn chân lý)
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

  // language — mặc định tiếng Việt (không đoán theo navigator)
  const lParam = new URLSearchParams(location.search).get("lang");
  const lSaved = localStorage.getItem("nm-lang");
  const lInit = lParam || lSaved || "vi";
  LANG = ["en", "vi", "ja"].includes(lInit) ? lInit : "vi";

  // data — js/store.js: localStorage (local-only) HOẶC Firestore (Firebase đã cấu hình)
  Store.subscribe(() => { if (!cap.open) renderAll(); });
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
  } else {
    Store.init();
  }

  applyStaticI18n();
  renderDemoPanel();
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
  // people segmented
  $$("#people-segmented button").forEach((b) => b.addEventListener("click", () => { peopleTab = b.dataset.tab; renderPeople(); }));

  // ask
  $("#ask-bar-home").addEventListener("click", () => { go("ask"); setTimeout(() => $("#ask-input").focus(), 60); });
  $("#ask-submit").addEventListener("click", () => runAsk($("#ask-input").value.trim() || QUICK_QUESTIONS[0]));
  $("#ask-input").addEventListener("keydown", (e) => { if (e.key === "Enter") runAsk($("#ask-input").value.trim() || QUICK_QUESTIONS[0]); });

  // theme / view / lang toggles (web sidebar)
  $("#theme-toggle").addEventListener("click", toggleTheme);
  $("#view-toggle-web").addEventListener("click", () => setView("mobile"));
  $("#lang-toggle-web").addEventListener("click", () => {
    setLang(LANG === "vi" ? "en" : LANG === "en" ? "ja" : "vi");
  });

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
