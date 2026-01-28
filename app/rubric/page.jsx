"use client";
import React from 'react';
import Link from 'next/link';
import RequireRole from '../components/RequireRole';
import './rubric.css';

function RubricInner() {
  return (
    <div className="rubric-root">
      <div className="rubric-container">
        <div className="rubric-header">
          <h1 className="rubric-title">Rubric</h1>
          <Link href="/admin" className="back-link">Back to Admin Dashboard</Link>
        </div>

        <p className="rubric-purpose">This page shows grading rubric and evaluation criteria.</p>

        <section className="rubric-card">
          <h2 className="rubric-subtitle">Project Rubric</h2>
          <ul className="rubric-list">
            <li>Functionality: 40%</li>
            <li>Design & UX: 30%</li>
            <li>Code Quality: 20%</li>
            <li>Documentation: 10%</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default function RubricPage() {
  return (
    <RequireRole>
      <RubricInner />
    </RequireRole>
  );
}
