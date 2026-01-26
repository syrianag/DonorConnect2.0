import React from 'react';
import { Users } from 'lucide-react';
import './donors.css';

export default function Donors() {
  return (
    <div className="donors-root">
      <main className="donors-main">
        <section className="card">
          <h1>Donors</h1>
          <p>Donor directory and profiles will appear here.</p>
          <div style={{marginTop:12}}><Users /></div>
        </section>
      </main>
    </div>
  );
}
