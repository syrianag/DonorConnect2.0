"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Database, FileText, MessageSquare, ArrowRight } from 'lucide-react';
import './admin.css';

export default function AdminPortalPage() {
  const router = useRouter();
  const handleNavigate = (route) => {
    try {
      router.push(route);
    } catch (e) {
      console.log('navigate error', e);
    }
  };

  return (
    <div className="admin-page">
      <main className="admin-main">
        <div className="page-title">
          <h1>Admin Dashboard</h1>
          <p>Welcome, this is the admin dashboard. Choose your portal.</p>
        </div>

        <div className="portal-grid">
          <button onClick={() => handleNavigate('/rubric')} className="portal-btn">
            <div>
              <div className="portal-icon rubric"><FileText /></div>
              <h2 className="portal-title">Rubric</h2>
              <p className="portal-desc">Access project evaluation criteria and grading rubrics</p>
              <div className="portal-enter">Enter Portal <ArrowRight /></div>
            </div>
          </button>

          <button onClick={() => handleNavigate('/reflection')} className="portal-btn">
            <div>
              <div className="portal-icon refl"><MessageSquare /></div>
              <h2 className="portal-title">Reflection</h2>
              <p className="portal-desc">Review project reflections and development insights</p>
              <div className="portal-enter">Enter Portal <ArrowRight /></div>
            </div>
          </button>
        </div>
      </main>

      <footer className="admin-footer">
        <div className="inner">Built with Next.js, React, and Neon DB</div>
      </footer>
    </div>
  );
}
