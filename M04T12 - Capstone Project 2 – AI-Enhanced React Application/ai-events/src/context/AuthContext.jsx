import {createContext, useCallback, useContext, useMemo, useState} from 'react';
import {readJson, writeJson} from '../utils/storage.js';

const USERS_KEY = 'planner_users';
const SESSION_KEY = 'planner_session';

const AuthContext = createContext(null);

async function hashPassword(password) {
  const bytes = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
}

export function AuthProvider({children}) {
  const [user, setUser] = useState(() => readJson(SESSION_KEY, null));

  const register = useCallback(async ({name, email, username, password}) => {
    const users = readJson(USERS_KEY, []);
    if (users.some(
        (u) => u.username.toLowerCase() === username.trim().toLowerCase())) {
      throw new Error('That username is already taken.');
    }
    if (users.some(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
      throw new Error('An account with that email already exists.');
    }
    const newUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      username: username.trim(),
      passwordHash: await hashPassword(password),
    };
    writeJson(USERS_KEY, [...users, newUser]);
  }, []);

  const login = useCallback(async ({username, password}) => {
    const users = readJson(USERS_KEY, []);
    const match = users.find(
        (u) => u.username.toLowerCase() === username.trim().toLowerCase());
    if (!match || match.passwordHash !== await hashPassword(password)) {
      throw new Error('Username or password is incorrect.');
    }
    const session = {id: match.id, name: match.name, username: match.username};
    writeJson(SESSION_KEY, session);
    setUser(session);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
      () => ({user, register, login, logout}), [user, register, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
