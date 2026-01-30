"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { roleCanCreate, roleCanDelete, roleCanUpdate } from '../../RBAC/rbac';

export default function RequireRole({ children, allowRead=true }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    function loadUser() {
      try {
        const raw = localStorage.getItem('dc_user');
        setUser(raw ? JSON.parse(raw) : null);
      } catch (e) {
        setUser(null);
      }
    }

    // initial load
    loadUser();

    // open sign-in modal instead of redirecting to home when unauthenticated
    if (!localStorage.getItem('dc_user')) {
      try { window.dispatchEvent(new CustomEvent('dc_open_signin')); } catch (e) {}
    }

    const authHandler = () => loadUser();
    window.addEventListener('dc_auth', authHandler);
    window.addEventListener('storage', authHandler);
    return () => {
      window.removeEventListener('dc_auth', authHandler);
      window.removeEventListener('storage', authHandler);
    };
  }, []);

  if (!user) return null;

  // provide helpers via context-like props by cloning children
  const perms = {
    canCreate: roleCanCreate(user.role),
    canUpdate: roleCanUpdate(user.role),
    canDelete: roleCanDelete(user.role),
    role: user.role,
    username: user.username,
  };

  return (
    <div>
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, { rbac: perms });
      })}
    </div>
  );
}
