"use client";
import React, { useEffect, useState } from 'react';
import { roleCanCreate, roleCanDelete, roleCanUpdate } from '../../RBAC/rbac';

export default function RequireRole({ children, allowRead=true }) {
  const [user, setUser] = useState(null);

  useEffect(()=>{
    try{
      const raw = localStorage.getItem('dc_user');
      if (raw) setUser(JSON.parse(raw));
    }catch(e){}
  },[]);

  if (!user) {
    return (
      <div style={{padding:20}}>
        <h3>Access required</h3>
        <p>This area requires a signed-in LaunchPad staff account. Use the small sign-in box at the top-right to authenticate (demo accounts provided in project README).</p>
      </div>
    );
  }

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
