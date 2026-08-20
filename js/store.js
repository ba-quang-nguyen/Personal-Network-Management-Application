/* ============================================================
   Network Management — data store (local-first · BUILD-GUIDE seam)
   Quản lý mảng PEOPLE toàn cục + persist localStorage + đồng bộ đa tab.
   UI (app.js) chỉ đọc/ghi dữ liệu qua Store — không đụng localStorage trực tiếp.
   ============================================================ */
const STORE_VERSION = 3;
const STORE_KEY = 'nm-data';
const SETTINGS_KEY = 'nm-settings';

const Store = (() => {
  const listeners = new Set();
  // Firebase write-through hooks — do js/firebase.js đăng ký khi kích hoạt.
  const syncHooks = { create: null, update: null, remove: null, replaceAll: null };

  function hook(action, payload) {
    try {
      if (syncHooks[action]) syncHooks[action](payload);
    } catch (e) {
      console.warn('sync hook error', e);
    }
  }

  function snapshot() {
    return PEOPLE.map((p) => ({ ...p }));
  }

  function persist() {
    try {
      localStorage.setItem(
        STORE_KEY,
        JSON.stringify({
          version: STORE_VERSION,
          savedAt: new Date().toISOString(),
          people: PEOPLE,
        }),
      );
    } catch (e) {
      /* quota / bị chặn — bỏ qua */
    }
  }

  function emit() {
    listeners.forEach((fn) => {
      try {
        fn(snapshot());
      } catch (e) {
        /* ignore listener error */
      }
    });
  }

  /** persist + emit — gọi sau MỌI mutation. */
  function save() {
    persist();
    emit();
  }

  function normalize(p) {
    if (!p.id) p.id = 'p' + Date.now() + Math.floor(Math.random() * 1000);
    if (!p.name) p.name = 'Unknown';
    if (!p.initials) p.initials = p.name.slice(0, 2).toUpperCase();
    if (typeof p.active !== 'boolean') p.active = true;
    if (!p.photo) p.photo = '';
    if (!Array.isArray(p.photos)) p.photos = [];
    if (!Array.isArray(p.meetings)) p.meetings = [];
    if (!Array.isArray(p.memories)) p.memories = [];
    if (!Array.isArray(p.dates)) p.dates = [];
    if (!Array.isArray(p.circles)) p.circles = [];
    if (!Array.isArray(p.tags)) p.tags = [];
    if (!Array.isArray(p.connections)) p.connections = [];
    if (!Array.isArray(p.mutual)) p.mutual = [];
    if (!Array.isArray(p.interests)) p.interests = [];
    if (!Array.isArray(p.hobbies)) p.hobbies = [];
    normalizeBirthdayFields(p);
    if (typeof p.workNotes !== 'string') p.workNotes = p.workNotes == null ? '' : String(p.workNotes);
    if (typeof p.familyNotes !== 'string') p.familyNotes = p.familyNotes == null ? '' : String(p.familyNotes);
    if (typeof p.interestsNotes !== 'string') p.interestsNotes = p.interestsNotes == null ? '' : String(p.interestsNotes);
    if (typeof p.relationshipNotes !== 'string') p.relationshipNotes = p.relationshipNotes == null ? '' : String(p.relationshipNotes);
    if (typeof p.notes !== 'string') p.notes = p.notes == null ? '' : String(p.notes);
    if (!p.firstMet) p.firstMet = { date: '—', place: '', how: '' };
    if (!p.last) p.last = { type: '—', when: '—', place: '', summary: '', tags: [] };
    if (!p.followUp) p.followUp = { when: '—', what: '', kind: 'reconnect' };
    if (!p.company) p.company = '—';
    if (!p.title) p.title = '—';
    return p;
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const env = JSON.parse(raw);
        if (env && Array.isArray(env.people) && (!env.version || env.version <= STORE_VERSION)) {
          PEOPLE = env.people.map(normalize);
          if (env.version !== STORE_VERSION) persist();
          return true;
        }
      }
    } catch (e) {
      /* JSON hỏng → coi như chưa có gì */
    }
    return false;
  }

  // Đồng bộ nhiều tab: tab khác ghi → reload + emit (KHÔNG persist lại để tránh vòng lặp).
  window.addEventListener('storage', (e) => {
    if (e.key === STORE_KEY) {
      load();
      emit();
    }
  });

  /* ============================================================
     SETTINGS — app preferences + profile ("You")
     Envelope riêng (nm-settings), KHÔNG đụng nm-data / STORE_VERSION.
     Legacy keys (nm-theme / nm-view / nm-voice-lang) được migrate 1 lần.
     ============================================================ */
  const DEFAULT_SETTINGS = {
    profile: { name: '', color: '#201D1A', photo: '' },
    theme: 'light',        // light | dark | system
    view: 'mobile',        // mobile | web
    voiceLang: 'ja-JP',    // capture recognition language
    notif: { care: true, toast: true },
    language: 'en',        // fixed English-only (D5)
  };
  let SETTINGS = null;

  function loadSettings() {
    if (SETTINGS) return;
    const base = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
    const hadSaved = (() => {
      try { return !!localStorage.getItem(SETTINGS_KEY); } catch (e) { return false; }
    })();
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s && typeof s === 'object') {
          base.profile = Object.assign({}, base.profile, s.profile || {});
          base.theme = s.theme || base.theme;
          base.view = s.view || base.view;
          base.voiceLang = s.voiceLang || base.voiceLang;
          base.notif = Object.assign({}, base.notif, s.notif || {});
          base.language = s.language || base.language;
        }
      }
    } catch (e) {
      /* JSON hỏng → dùng default */
    }
    // Migrate legacy keys — chỉ khi chưa từng có nm-settings (tránh ghi đè lựa chọn mới).
    if (!hadSaved) {
      try {
        const legacyTheme = localStorage.getItem('nm-theme') || localStorage.getItem('omoide-theme');
        if (legacyTheme) base.theme = legacyTheme === 'dark' ? 'dark' : 'light';
        const legacyView = localStorage.getItem('nm-view') || localStorage.getItem('omoide-view');
        if (legacyView) base.view = legacyView === 'web' ? 'web' : 'mobile';
        const legacyVoice = localStorage.getItem('nm-voice-lang');
        if (legacyVoice) base.voiceLang = legacyVoice;
      } catch (e) { /* ignore */ }
    }
    SETTINGS = base;
    persistSettings();
  }

  function persistSettings() {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(SETTINGS)); } catch (e) { /* quota — bỏ qua */ }
  }

  return {
    /** Gọi 1 lần lúc khởi động; trả true nếu có dữ liệu cũ. */
    init() {
      const loaded = load();
      emit();
      return loaded;
    },

    /** UI đăng ký re-render khi data đổi. */
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },

    save,
    people() {
      return PEOPLE;
    },

    createPerson(input) {
      const p = normalize(Object.assign({}, input));
      PEOPLE.unshift(p);
      save();
      hook('create', p);
      return p;
    },

    updatePerson(id, patch) {
      const p = byId(id);
      if (!p) return null;
      Object.assign(p, patch);
      p.id = id;
      save();
      hook('update', p);
      return p;
    },

    deletePerson(id) {
      PEOPLE = PEOPLE.filter((p) => p.id !== id);
      save();
      hook('remove', id);
    },

    setActive(id, active) {
      const p = byId(id);
      if (!p) return;
      p.active = active;
      save();
      hook('update', p);
    },
    setStrength(id, s) {
      const p = byId(id);
      if (!p) return;
      p.strength = s;
      save();
      hook('update', p);
    },
    setFrequency(id, f) {
      const p = byId(id);
      if (!p) return;
      p.frequency = f;
      save();
      hook('update', p);
    },
    setFollowUp(id, fu) {
      const p = byId(id);
      if (!p) return;
      p.followUp = fu;
      save();
      hook('update', p);
    },
    setCircles(id, circles) {
      const p = byId(id);
      if (!p) return;
      p.circles = circles;
      save();
      hook('update', p);
    },

    setPhoto(id, src) {
      const p = byId(id);
      if (!p) return;
      p.photo = src;
      save();
      hook('update', p);
    },
    addPhotos(id, srcs) {
      const p = byId(id);
      if (!p) return;
      srcs.forEach((s) => p.photos.push({ src: s, note: '' }));
      save();
      hook('update', p);
    },
    removePhoto(id, idx) {
      const p = byId(id);
      if (!p) return;
      p.photos.splice(idx, 1);
      save();
      hook('update', p);
    },
    setPhotoNote(id, idx, note) {
      const p = byId(id);
      if (!p || !p.photos[idx]) return;
      p.photos[idx].note = note;
      // persist KHÔNG emit — gõ ghi chú từng ký tự không re-render (mất focus).
      persist();
      hook('update', p); // change event = blur, an toàn để sync
    },

    addMeeting(id, meeting) {
      const p = byId(id);
      if (!p) return;
      p.meetings.push(meeting);
      save();
      hook('update', p);
    },
    addMemory(id, memory) {
      const p = byId(id);
      if (!p) return;
      p.memories.push(memory);
      save();
      hook('update', p);
    },

    /** Nạp 10 người hư cấu (demo). */
    loadSample() {
      PEOPLE = SAMPLE_PEOPLE.map((s) => normalize(Object.assign({}, s)));
      save();
      hook('replaceAll', PEOPLE);
    },

    /** Merge import — trùng id thì ghi đè, mới thì thêm. */
    importPeople(people) {
      people.forEach((raw) => {
        const p = normalize(Object.assign({}, raw));
        const existing = byId(p.id);
        if (existing) Object.assign(existing, p);
        else PEOPLE.unshift(p);
      });
      save();
      hook('replaceAll', PEOPLE);
    },

    deleteAll() {
      PEOPLE = [];
      save();
      hook('replaceAll', []);
    },

    /** Firestore onSnapshot gọi — thay local bằng cloud, KHÔNG write-back (tránh vòng lặp). */
    replaceFromRemote(people) {
      PEOPLE = (people || []).map((p) => normalize(Object.assign({}, p)));
      persist();
      emit();
    },

    /** js/firebase.js đăng ký write-through hooks. */
    setSyncHooks(h) {
      Object.assign(syncHooks, h);
    },

    /** Settings (profile + app prefs) — đọc/ghi qua Store, persist nm-settings. */
    getSettings() {
      loadSettings();
      return SETTINGS;
    },
    setSettings(patch) {
      loadSettings();
      if (!patch || typeof patch !== 'object') return SETTINGS;
      if (patch.profile) SETTINGS.profile = Object.assign({}, SETTINGS.profile, patch.profile);
      if (patch.notif) SETTINGS.notif = Object.assign({}, SETTINGS.notif, patch.notif);
      ['theme', 'view', 'voiceLang', 'language'].forEach((k) => {
        if (patch[k] !== undefined) SETTINGS[k] = patch[k];
      });
      persistSettings();
      emit();
      return SETTINGS;
    },

    exportJson() {
      return JSON.stringify(
        {
          app: 'network-management',
          version: STORE_VERSION,
          exportedAt: new Date().toISOString(),
          people: PEOPLE,
        },
        null,
        2,
      );
    },

    parseImport(text) {
      const data = JSON.parse(text);
      if (Array.isArray(data)) return data;
      if (data && Array.isArray(data.people)) return data.people;
      throw new Error('invalid backup');
    },
  };
})();
