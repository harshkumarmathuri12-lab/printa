import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from './api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem('vistaclone_token');
    if (token) {
      api('/auth/me')
        .then((data) => setUser(data.user))
        .catch(() => window.localStorage.removeItem('vistaclone_token'));
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      async login(email, password) {
        const data = await api('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
        window.localStorage.setItem('vistaclone_token', data.token);
        setUser(data.user);
      },
      async signup(name, email, password) {
        const data = await api('/auth/signup', { method: 'POST', body: JSON.stringify({ name, email, password }) });
        window.localStorage.setItem('vistaclone_token', data.token);
        setUser(data.user);
      },
      logout() {
        window.localStorage.removeItem('vistaclone_token');
        setUser(null);
      }
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
