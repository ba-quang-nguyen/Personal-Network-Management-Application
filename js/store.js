/* ============================================================
   Network Management — data store (local-first · BUILD-GUIDE seam)
   Quản lý mảng PEOPLE toàn cục + persist localStorage + đồng bộ đa tab.
   UI (app.js) chỉ đọc/ghi dữ liệu qua Store — không đụng localStorage trực tiếp.
   ============================================================ */
const STORE_VERSION = 1;
const STORE_KEY = 'nm-data';

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
        if (env && env.version === STORE_VERSION && Array.isArray(env.people)) {
          PEOPLE = env.people.map(normalize);
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
