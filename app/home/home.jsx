"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Database,
  TrendingUp,
  Users,
} from "lucide-react";

import "./home.css";
import "./landing.css";

export default function DonorConnectLanding() {
  const router = useRouter();

  const handleGetStarted = () => {
    try {
      window.dispatchEvent(new CustomEvent("dc_open_signin"));
    } catch {
      router.push("/dashboard");
    }
  };

  return (
    <div className="home-root min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Inline header removed: branding & Sign In moved to site header */}

      <main className="hc-main max-w-7xl mx-auto px-6 py-20">
        <section className="hc-hero">
          <h1 className="hc-title">
            Donor<span className="accent">Connect</span>
          </h1>

          <div className="hc-card">
            <div className="flex gap-4 items-start">
              <div className="icon-box danger">
                <TrendingUp />
              </div>
              <div>
                <h2>The Challenge</h2>
                <p>
                  Companies receive donations but lack tools to properly track
                  and manage them.
                </p>
              </div>
            </div>
          </div>

          <div className="hc-solution">
            <div className="flex gap-4 items-start">
              <div className="icon-box light">
                <Users />
              </div>
              <div>
                <h2>Our Solution</h2>
                <p>
                  DonorConnect is an API-driven platform for managing donors,
                  donations, and campaigns with real-time insights.
                </p>
              </div>
            </div>
          </div>

          <div className="hc-cta">
            <button onClick={handleGetStarted} className="btn">
              Get Started <ArrowRight />
            </button>
          </div>

          <div className="hc-grid">
            <Feature
              icon={<Database />}
              title="Centralized Database"
              text="Secure donor data powered by Neon DB."
            />
            <Feature
              icon={<TrendingUp />}
              title="Real-Time Tracking"
              text="Live donation and campaign monitoring."
            />
            <Feature
              icon={<Users />}
              title="Donor Insights"
              text="Understand engagement and top contributors."
            />
          </div>
        </section>
      </main>

      <footer className="hc-footer">
        <p>Built with Next.js, React 19, Tailwind CSS, and Neon DB</p>
      </footer>
    </div>
  );
}

/* Small reusable component */
function Feature({ icon, title, text }) {
  return (
    <div className="hc-feature">
      <div className="icon-box">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
