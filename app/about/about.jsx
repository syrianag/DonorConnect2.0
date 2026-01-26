import React from 'react';
import './about.css';

export default function About() {
  return (
    <div className="about-root">
      <header className="about-hero">
        <div className="about-hero-inner">
          <h1>DonorConnect</h1>
          <p className="lead">We're on a mission to empower nonprofits with innovative tools that transform how they connect with donors, manage relationships, and maximize their impact in communities worldwide.</p>
        </div>
      </header>

      <main className="about-main">
        <section className="about-section intro">
          <div className="card">
            <h2>What Is DonorConnect?</h2>
            <p>DonorConnect centralizes donor profiles, donation histories, and campaign performance into a single, easy-to-use dashboard. It provides clear visual insights, secure storage, and AI-powered summaries that turn activity into prioritized next steps — helping nonprofit teams spend less time managing data and more time building lasting relationships with supporters.</p>
          </div>
        </section>

        <section className="about-section values">
          <h2>Our Mission & Values</h2>
          <div className="values-grid">
            <div className="value card">
              <div className="icon">⚡</div>
              <h3>Innovation</h3>
              <p>We continuously push boundaries with AI and technology to create tools that make nonprofits more efficient and effective.</p>
            </div>

            <div className="value card">
              <div className="icon">🌍</div>
              <h3>Impact</h3>
              <p>Every feature we build is designed to help nonprofits increase their fundraising capacity and expand their reach.</p>
            </div>

            <div className="value card">
              <div className="icon">🛡️</div>
              <h3>Trust</h3>
              <p>We handle sensitive donor data with the highest standards of security and privacy, earning the trust of our nonprofit partners.</p>
            </div>
          </div>
        </section>

        <footer className="about-footer">
          <p>© 2025 DonorConnect. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
