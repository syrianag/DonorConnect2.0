"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Database } from 'lucide-react';
import { lookupUserByEmail, verifyCredentials } from '../../RBAC/rbac';
import './header.css';

function SignInModal({ open, onClose }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [organization, setOrganization] = useState('');
  const [instructorName, setInstructorName] = useState('');
  const [agreeTos, setAgreeTos] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  if (!open) return null;

  function closeAndClear() {
    setError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFirstName('');
    setLastName('');
    setOrganization('');
    setInstructorName('');
    setAgreeTos(false);
    onClose();
  }

  function handleLogin(e) {
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

    const payload = { email: email.trim().toLowerCase(), username: user.username, role: user.role, instructorName: instructorName.trim() || '' };
    try {
      localStorage.setItem('dc_user', JSON.stringify(payload));
      window.dispatchEvent(new CustomEvent('dc_auth'));
    } catch (err) {}
    closeAndClear();
    try { router.push('/admin'); } catch (e) {}
  }

  function handleSignup(e) {
    e.preventDefault();
    setError('');
    if (!firstName.trim() || !lastName.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!email.trim()) {
      setError('Please provide an email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreeTos) {
      setError('You must agree to the Terms of Service.');
      return;
    }

    // Create a lightweight user object and sign them in locally.
    const username = (firstName + lastName).replace(/\s+/g, '').toLowerCase() || email.split('@')[0];
    const payload = { email: email.trim().toLowerCase(), username, role: 'STAFF', instructorName: `${firstName} ${lastName}` };
    try {
      localStorage.setItem('dc_user', JSON.stringify(payload));
      window.dispatchEvent(new CustomEvent('dc_auth'));
    } catch (err) {}

    closeAndClear();
    try { router.push('/admin'); } catch (e) {}
  }

  return (
    <div className="modal-overlay" onClick={closeAndClear}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-tabs">
          <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>Login</button>
          <button className={mode === 'signup' ? 'active' : ''} onClick={() => setMode('signup')}>Sign Up</button>
        </div>

        {mode === 'login' ? (
          <form onSubmit={handleLogin}>
            <label className="modal-label">Email Address</label>
            <input className="modal-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />

            <label className="modal-label">Password</label>
            <input className="modal-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <div className="modal-row">
              <label className="modal-checkbox"><input type="checkbox" checked={agreeTos} onChange={(e)=>setAgreeTos(e.target.checked)} /> Remember me</label>
              <a className="modal-link" href="#">Forgot password?</a>
            </div>

            {error && <div className="modal-error">{error}</div>}

            <div className="modal-actions">
              <button type="button" onClick={closeAndClear}>Cancel</button>
              <button type="submit" className="primary">Sign In</button>
            </div>

            <div className="modal-demo">
              <div className="modal-demo-title">Demo credentials (use to sign in)</div>
              <div className="modal-demo-creds">
                <div className="modal-demo-item"><span className="demo-key">Email:</span> <span className="demo-value">demouser123@gmail.com</span></div>
                <div className="modal-demo-item"><span className="demo-key">Password:</span> <span className="demo-value">lpuser1</span></div>
              </div>
            </div>

            <div className="modal-divider">Or continue with</div>
            <div className="modal-socials">
              <button className="social">Google</button>
              <button className="social">GitHub</button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <div className="modal-grid-2">
              <div>
                <label className="modal-label">First Name</label>
                <input className="modal-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John" />
              </div>
              <div>
                <label className="modal-label">Last Name</label>
                <input className="modal-input" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe" />
              </div>
            </div>

            <label className="modal-label">Organization (Optional)</label>
            <input className="modal-input" value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder="Your organization name" />

            <label className="modal-label">Email Address</label>
            <input className="modal-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />

            <label className="modal-label">Password</label>
            <input className="modal-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <label className="modal-label">Confirm Password</label>
            <input className="modal-input" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

            <label className="modal-checkbox"><input type="checkbox" checked={agreeTos} onChange={(e)=>setAgreeTos(e.target.checked)} /> I agree to the Terms of Service and Privacy Policy</label>

            {error && <div className="modal-error">{error}</div>}

            <div className="modal-actions">
              <button type="button" onClick={closeAndClear}>Cancel</button>
              <button type="submit" className="primary">Create Account</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname() || '/';
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const openHandler = () => setModalOpen(true);
    window.addEventListener('dc_open_signin', openHandler);
    return () => window.removeEventListener('dc_open_signin', openHandler);
  }, []);

  const nav = [
    { href: '/dashboard', label: 'Dashboard' },
    
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
