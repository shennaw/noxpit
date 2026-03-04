import { createContext, useContext, useState, useCallback } from 'react';
import { storage } from '../services/storage';

const AuthCtx = createContext(null);

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const session = storage.get('session');
    if (!session) return null;
    const users = storage.get('users') || [];
    return users.find((u) => u.id === session.userId) || null;
  });

  const isAuthenticated = !!user;

  const register = useCallback(({ name, email, phone, password }) => {
    const users = storage.get('users') || [];
    if (users.find((u) => u.email === email)) {
      return { ok: false, error: 'emailExists' };
    }
    const newUser = { id: generateId(), name, email, phone, password, createdAt: new Date().toISOString() };
    users.push(newUser);
    storage.set('users', users);
    storage.set('session', { userId: newUser.id });
    const { password: _, ...safe } = newUser;
    setUser(safe);
    return { ok: true, user: safe };
  }, []);

  const login = useCallback(({ email, password }) => {
    const users = storage.get('users') || [];
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return { ok: false, error: 'invalidCredentials' };
    storage.set('session', { userId: found.id });
    const { password: _, ...safe } = found;
    setUser(safe);
    return { ok: true, user: safe };
  }, []);

  const logout = useCallback(() => {
    storage.remove('session');
    setUser(null);
  }, []);

  const updateProfile = useCallback((updates) => {
    const users = storage.get('users') || [];
    const idx = users.findIndex((u) => u.id === user?.id);
    if (idx === -1) return;
    users[idx] = { ...users[idx], ...updates };
    storage.set('users', users);
    const { password: _, ...safe } = users[idx];
    setUser(safe);
  }, [user]);

  return (
    <AuthCtx.Provider value={{ user, isAuthenticated, login, register, logout, updateProfile }}>
      {children}
    </AuthCtx.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthCtx);
