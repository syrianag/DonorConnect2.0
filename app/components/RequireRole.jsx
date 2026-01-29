"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { roleCanCreate, roleCanDelete, roleCanUpdate } from '../../RBAC/rbac';

export default function RequireRole({ children, allowRead=true }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(()=>{
    try{
      const raw = localStorage.getItem('dc_user');
      if (raw) setUser(JSON.parse(raw));
    }catch(e){}
  },[]);

  useEffect(() => {
    if (!user) {
      try { router.push('/'); } catch (e) {}
    }
  }, [user, router]);

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
