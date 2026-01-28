#!/usr/bin/env node
const API_BASE = process.env.VITE_API_BASE || 'http://localhost:3000/api/v1';
const email = process.env.TEST_EMAIL || 'user1@example.com';
const password = process.env.TEST_PASSWORD || 'password123';

(async () => {
  try {
    console.log('API_BASE =', API_BASE);
    console.log('Signing in as', email);

    const res = await fetch(`${API_BASE}/users/sign_in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: { email, password } }),
    });

    console.log('Sign-in status:', res.status);
    const authHeader = res.headers.get('authorization') || res.headers.get('Authorization');
    console.log('Authorization header:', authHeader);

    const text = await res.text();
    try {
      console.log('Response JSON:', JSON.stringify(JSON.parse(text), null, 2));
    } catch (e) {
      console.log('Response text:', text);
    }

    if (authHeader) {
      const token = authHeader.replace(/^Bearer\s+/i, '');
      console.log('Extracted token:', token.slice(0, 20) + '...');

      const me = await fetch(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('/auth/me status:', me.status);
      const meText = await me.text();
      try {
        console.log('/auth/me JSON:', JSON.stringify(JSON.parse(meText), null, 2));
      } catch (e) {
        console.log('/auth/me text:', meText);
      }
    }
  } catch (err) {
    console.error('Error during test:', err);
    process.exit(1);
  }
})();
