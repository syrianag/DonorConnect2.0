"use client";
import React, { useEffect, useState } from 'react';
import { lookupUserByEmail } from '../../RBAC/rbac';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem('dc_user');
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {}
  }, []);

  useEffect(() => {
    function handleAuthEvent() {
      try {
        const raw = localStorage.getItem('dc_user');
        setUser(raw ? JSON.parse(raw) : null);
      } catch (e) {}
    }
    window.addEventListener('dc_auth', handleAuthEvent);
    return () => window.removeEventListener('dc_auth', handleAuthEvent);
  }, []);

  function signIn(e) {
    e && e.preventDefault();
    const info = lookupUserByEmail(email);
    if (info) {
      const payload = { email: email.trim().toLowerCase(), ...info };
      localStorage.setItem('dc_user', JSON.stringify(payload));
      setUser(payload);
    } else {
      alert('Unknown email for this demo. Try one of the seeded accounts.');
    }
  }

  function signOut() {
    localStorage.removeItem('dc_user');
    setUser(null);
  }

  return (
    <div>
      <div>{children}</div>
    </div>
  );
}
