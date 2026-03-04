const PREFIX = 'nxp-';

export const storage = {
  get(key) {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  set(key, value) {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  },

  remove(key) {
    localStorage.removeItem(PREFIX + key);
  },

  userKey(userId, key) {
    return `${key}-${userId}`;
  },

  getUser(userId, key) {
    return this.get(this.userKey(userId, key));
  },

  setUser(userId, key, value) {
    this.set(this.userKey(userId, key), value);
  },

  removeUser(userId, key) {
    this.remove(this.userKey(userId, key));
  },
};
