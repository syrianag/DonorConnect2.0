"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Database } from 'lucide-react';
import { lookupUserByEmail, verifyCredentials } from '../../RBAC/rbac';
import './header.css';

function SignInModal({ open, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [instructorName, setInstructorName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

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
    const payload = { email: email.trim().toLowerCase(), username: user.username, role: user.role, instructorName: instructorName.trim() || '' };
    try {
      localStorage.setItem('dc_user', JSON.stringify(payload));
      window.dispatchEvent(new CustomEvent('dc_auth'));
    } catch (err) {}
    onClose();
    // redirect admin users to the admin dashboard
    try {
      if (payload.role && payload.role.toUpperCase() === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } catch (e) {
      // router might not be available in some environments; ignore
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">Sign In</h3>
        <form onSubmit={handleSubmit}>
          <label className="modal-label">Email</label>
          <input className="modal-input" value={email} onChange={(e)=>setEmail(e.target.value)} />

          <label className="modal-label">Password</label>
          <input className="modal-input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />

          <label className="modal-label">Instructor name (optional)</label>
          <input className="modal-input" value={instructorName} onChange={(e)=>setInstructorName(e.target.value)} placeholder="Full name" />

          {error && <div className="modal-error">{error}</div>}

          <div className="modal-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit" className="primary">Sign in</button>
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
