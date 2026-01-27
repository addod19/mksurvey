import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type User = {
  id: number;
  email: string;
  role?: string;
  name?: string;
};

type AuthContextValue = {
  user: User | null;
  token: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signUp: (payload: Record<string, any>) => Promise<{ ok: boolean; error?: string }>;
  signOut: () => void;
};

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // try to fetch current user if token exists
    const init = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${API_BASE}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user || data);
        } else {
          setUser(null);
          setToken(null);
          localStorage.removeItem('token');
        }
      } catch (err) {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [token]);

  const signIn = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE}/auth/sign_in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const err = await res.text();
        return { ok: false, error: err || 'Sign in failed' };
      }
      const data = await res.json();
      const t = data.token || data.access_token || data.auth_token;
      const u = data.user || data;
      if (t) {
        localStorage.setItem('token', t);
        setToken(t);
      }
      setUser(u);
      return { ok: true };
    } catch (err: any) {
      return { ok: false, error: err?.message || 'Sign in error' };
    }
  };

  const signUp = async (payload: Record<string, any>) => {
    try {
      const res = await fetch(`${API_BASE}/auth/sign_up`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.text();
        return { ok: false, error: err || 'Sign up failed' };
      }
      const data = await res.json();
      const t = data.token || data.access_token || data.auth_token;
      const u = data.user || data;
      if (t) {
        localStorage.setItem('token', t);
        setToken(t);
      }
      setUser(u);
      return { ok: true };
    } catch (err: any) {
      return { ok: false, error: err?.message || 'Sign up error' };
    }
  };

  const signOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
