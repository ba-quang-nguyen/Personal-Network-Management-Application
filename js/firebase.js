/* ============================================================
   Network Management — Firebase backend (BUILD-GUIDE seam)
   Chỉ kích hoạt khi FIREBASE_CONFIG đã điền (js/firebase-config.js).
   SDK (vendor/firebase/*-compat.js) được nạp ĐỘNG khi cần — local-only không tốn thêm.
   Data model: users/{uid}/people/{id} (nhúng meetings/memories/followUp) — khớp rules đã test.
   ============================================================ */
const Firebase = (() => {
  const configured =
    typeof FIREBASE_CONFIG !== 'undefined' &&
    Boolean(FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.projectId);

  let app = null;
  let db = null;
  let auth = null;
  let uid = null;
  let remoteIds = new Set();
  let unsubRemote = null;

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error('load failed: ' + src));
      document.head.appendChild(s);
    });
  }

  async function ensure() {
    if (!configured) throw new Error('Firebase not configured');
    if (!app) {
      if (typeof firebase === 'undefined') {
        await loadScript('vendor/firebase/firebase-app-compat.js');
        await loadScript('vendor/firebase/firebase-auth-compat.js');
        await loadScript('vendor/firebase/firebase-firestore-compat.js');
      }
      app = firebase.initializeApp(FIREBASE_CONFIG);
      db = firebase.firestore();
      auth = firebase.auth();
    }
    return { db, auth };
  }

  const isEnabled = () => configured;

  function peoplePath() {
    return db.collection('users').doc(uid).collection('people');
  }

  function stripId(p) {
    const data = Object.assign({}, p);
    delete data.id;
    return data;
  }

  /**
   * Khởi tạo auth + sync. Gọi onUserChange(user|null) mỗi khi trạng thái đổi.
   * Khi đã đăng nhập: cloud là nguồn chân lý — replace local PEOPLE bằng remote.
   */
  function init(onUserChange) {
    if (!configured) {
      if (onUserChange) onUserChange(null);
      return;
    }
    ensure().then(({ auth: a }) => {
      a.onAuthStateChanged((user) => {
        if (unsubRemote) {
          try { unsubRemote(); } catch (e) { /* ignore */ }
          unsubRemote = null;
        }
        uid = user ? user.uid : null;
        remoteIds = new Set();
        if (uid) unsubRemote = attachRemote();
        onUserChange(user ? { uid: user.uid, email: user.email } : null);
      });
    });
  }

  function attachRemote() {
    let firstSnapshot = true;
    return peoplePath().onSnapshot(
      (snap) => {
        remoteIds = new Set(snap.docs.map((d) => d.id));
        const people = snap.docs.map((d) => Object.assign({}, d.data(), { id: d.id }));
        if (firstSnapshot && people.length === 0 && Store.people().length > 0) {
          firstSnapshot = false;
          syncReplaceAll(Store.people());
          return;
        }
        firstSnapshot = false;
        Store.replaceFromRemote(people);
      },
      (err) => console.error('firestore snapshot error', err),
    );
  }

  async function signIn(email, password) {
    const { auth: a } = await ensure();
    await a.signInWithEmailAndPassword(email, password);
  }

  async function signOut() {
    const { auth: a } = await ensure();
    await a.signOut();
  }

  async function sendReset(email) {
    const { auth: a } = await ensure();
    await a.sendPasswordResetEmail(email);
  }

  /* ---------- write-through hooks (Store gọi sau mỗi mutation local) ---------- */
  async function syncCreate(p) {
    if (!configured || !uid) return;
    try {
      await peoplePath().doc(p.id).set(stripId(p));
    } catch (e) {
      console.warn('sync create failed', e);
    }
  }

  async function syncUpdate(p) {
    if (!configured || !uid) return;
    try {
      await peoplePath().doc(p.id).set(stripId(p), { merge: true });
    } catch (e) {
      console.warn('sync update failed', e);
    }
  }

  async function syncRemove(id) {
    if (!configured || !uid) return;
    try {
      await peoplePath().doc(id).delete();
    } catch (e) {
      console.warn('sync remove failed', e);
    }
  }

  async function syncReplaceAll(people) {
    if (!configured || !uid) return;
    try {
      const batch = db.batch();
      remoteIds.forEach((id) => batch.delete(peoplePath().doc(id)));
      people.forEach((p) => batch.set(peoplePath().doc(p.id), stripId(p)));
      await batch.commit();
      remoteIds = new Set(people.map((p) => p.id));
    } catch (e) {
      console.warn('sync replaceAll failed', e);
    }
  }

  return {
    isEnabled,
    init,
    signIn,
    signOut,
    sendReset,
    syncCreate,
    syncUpdate,
    syncRemove,
    syncReplaceAll,
  };
})();
