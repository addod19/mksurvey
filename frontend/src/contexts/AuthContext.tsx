import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type User = {
  id: number;
  email: string;
  role?: string;
  name?: string;
  full_name?: string | null;
  phone_number?: string | null;
};

type AuthContextValue = {
  user: User | null;
  token: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signUp: (payload: Record<string, any>) => Promise<{ ok: boolean; error?: string }>;
  signOut: () => void;
};

const API_BASE = import.meta.env.VITE_API_BASE || '/api/v1';

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
      const res = await fetch(`${API_BASE}/users/sign_in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: { email, password } }),
      });
      if (!res.ok) {
        const err = await res.text();
        return { ok: false, error: err || 'Sign in failed' };
      }
      // devise-jwt dispatches JWT in the Authorization header
      const headerToken = res.headers.get('authorization') || res.headers.get('Authorization');
      const data = await res.json();
      const u = data.user || data;

      if (headerToken) {
        // header is typically: "Bearer <token>"
        const t = headerToken.replace(/^Bearer\s+/i, '');
        localStorage.setItem('token', t);
        setToken(t);
      } else if (data?.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
      }

      setUser(u);

      // redirect based on role
      const role = (u && (u.role || u.role_name)) || null;
      if (role) {
        if (role.includes('loader')) navigate('/dashboard/loader');
        else if (role.includes('tipper')) navigate('/dashboard/tipper');
        else if (role.includes('survey')) navigate('/dashboard/survey');
        else if (role.includes('blocks')) navigate('/dashboard/blocks');
        else if (role.includes('main')) navigate('/dashboard/main');
        else navigate('/dashboard');
      } else {
        navigate('/dashboard');
      }

      return { ok: true };
    } catch (err: any) {
      return { ok: false, error: err?.message || 'Sign in error' };
    }
  };

  const signUp = async (payload: Record<string, any>) => {
    try {
      const res = await fetch(`${API_BASE}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: payload }),
      });
      if (!res.ok) {
        const err = await res.text();
        return { ok: false, error: err || 'Sign up failed' };
      }
      const data = await res.json();
      // after sign up backend returns created user but may or may not dispatch a token
      const headerToken = res.headers.get('authorization') || res.headers.get('Authorization');
      const u = data.user || data;
      if (headerToken) {
        const t = headerToken.replace(/^Bearer\s+/i, '');
        localStorage.setItem('token', t);
        setToken(t);
      } else if (data?.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
      }
      setUser(u);

      // redirect based on role after sign up (if token was issued)
      const role = (u && (u.role || u.role_name)) || null;
      if (role) {
        if (role.includes('loader')) navigate('/dashboard/loader');
        else if (role.includes('tipper')) navigate('/dashboard/tipper');
        else if (role.includes('survey')) navigate('/dashboard/survey');
        else if (role.includes('blocks')) navigate('/dashboard/blocks');
        else if (role.includes('main')) navigate('/dashboard/main');
        else navigate('/dashboard');
      } else {
        navigate('/dashboard');
      }

      return { ok: true };
    } catch (err: any) {
      return { ok: false, error: err?.message || 'Sign up error' };
    }
  };

  const signOut = () => {
    (async () => {
      try {
        if (token) {
          await fetch(`${API_BASE}/users/sign_out`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          });
        }
      } catch (err) {
        // ignore
      } finally {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        navigate('/login');
      }
    })();
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
