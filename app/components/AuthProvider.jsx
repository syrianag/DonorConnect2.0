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
      <div style={{borderBottom:'1px solid #eef4f6'}}>
        <div style={{maxWidth:1100,margin:'0 auto',padding:'8px 12px',display:'flex',alignItems:'center',justifyContent:'flex-end',gap:12}}>
          {user ? (
            <div style={{display:'flex',gap:12,alignItems:'center'}}>
              <div style={{fontSize:13,color:'#374151'}}>Signed in: <strong>{user.username}</strong> ({user.role})</div>
              <button onClick={signOut} style={{padding:'6px 10px'}}>Sign out</button>
            </div>
          ) : (
            // When not signed in we show nothing here so the header Sign In link is the only login entry point
            null
          )}
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
}
