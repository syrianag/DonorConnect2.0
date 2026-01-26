"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Database } from 'lucide-react';
import { lookupUserByEmail, verifyCredentials } from '../../RBAC/rbac';
import './header.css';

function SignInModal({ open, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    const user = lookupUserByEmail(email);
    if (!user) {
      setError('Unknown email.');
      return;
    }
    if (!verifyCredentials(email, password)) {
      setError('Invalid password.');
      return;
    }

    // store user into localStorage and dispatch auth event for AuthProvider
    const payload = { email: email.trim().toLowerCase(), username: user.username, role: user.role };
    try {
      localStorage.setItem('dc_user', JSON.stringify(payload));
      window.dispatchEvent(new CustomEvent('dc_auth'));
    } catch (err) {}

    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3 style={{marginTop:0}}>Sign In</h3>
        <form onSubmit={handleSubmit}>
          <label style={{display:'block',marginBottom:8}}>Email</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} style={{width:'100%',padding:8,marginBottom:12}} />

          <label style={{display:'block',marginBottom:8}}>Password</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} style={{width:'100%',padding:8,marginBottom:12}} />

          {error && <div style={{color:'red',marginBottom:8}}>{error}</div>}

          <div style={{display:'flex',justifyContent:'flex-end',gap:8}}>
            <button type="button" onClick={onClose} style={{padding:'8px 12px'}}>Cancel</button>
            <button type="submit" style={{padding:'8px 12px'}}>Sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname() || '/';
  const [modalOpen, setModalOpen] = useState(false);

  const nav = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/', label: 'Home' },
    { href: '/donations', label: 'Donations' },
    { href: '/donors', label: 'Donors' },
    { href: '/campaigns', label: 'Campaigns' },
    { href: '/ai_policy', label: 'AI Policy' },
  ];

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="brand">
          <Database className="brand-icon" />
          <Link href="/" className="brand-title">DonorConnect</Link>
        </div>

        <nav className="site-nav">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={pathname === n.href ? 'active' : ''}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="site-actions">
          <button className="signin" onClick={()=>setModalOpen(true)}>Sign In</button>
        </div>
      </div>

      <SignInModal open={modalOpen} onClose={()=>setModalOpen(false)} />
    </header>
  );
}
