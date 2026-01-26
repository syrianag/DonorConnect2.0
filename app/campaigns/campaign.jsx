import React from 'react';
import './campaigns.css';

export default function CampaignPage() {
  return (
    <div className="campaign-root">
      <nav className="campaign-breadcrumb">DonorConnect &nbsp; / &nbsp; Campaigns</nav>

      <div className="campaign-grid">
        <main className="campaign-main">
          <section className="card campaign-overview">
            <div className="overview-header">
              <h1>New Campaign</h1>
              <div className="screen-creds">Screen credentials: user: campaign@test / pass: camp123</div>
            </div>

            <div className="goal">
              <div className="goal-title">Goal progress</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '0%'}}></div>
              </div>
              <div className="goal-label">$650 raised of $0 (0%)</div>
            </div>

            <div className="stats-row">
              <div className="stat">
                <div className="stat-value">$650</div>
                <div className="stat-label">Raised</div>
              </div>

              <div className="stat">
                <div className="stat-value">2</div>
                <div className="stat-label">Donors</div>
              </div>

              <div className="stat">
                <div className="stat-value">—</div>
                <div className="stat-label">Days Left</div>
              </div>
            </div>
          </section>

          <section className="card campaign-actions">
            <h3>Campaign Actions</h3>
            <div className="actions-row">
              <button className="btn primary">Share Campaign</button>
              <button className="btn outline">Edit Campaign</button>
            </div>
          </section>

          <section className="card create-campaign">
            <h3>Create New Campaign</h3>
            <p>Sign in to create a campaign.</p>
          </section>
        </main>

        <aside className="campaign-side">
          <div className="card sidebar-block">
            <h4>Seasonal Campaigns (Annual)</h4>

            <div className="season-card">
              <div className="season-title">Winter Fest</div>
              <div className="season-desc">A winter-focused drive that provides warm clothing, emergency relief and holiday support to families in need.</div>
              <div className="season-raised">Raised: $50,000</div>
            </div>

            <div className="season-card">
              <div className="season-title">Spring Fest</div>
              <div className="season-desc">A spring initiative focused on school supplies, community cleanups, and educational support programs.</div>
              <div className="season-raised">Raised: $50,000</div>
            </div>

            <div className="season-card">
              <div className="season-title">Summer Fest</div>
              <div className="season-desc">A summer outreach program providing meal assistance, youth activities, and cooling/safety resources.</div>
              <div className="season-raised">Raised: $75,000</div>
            </div>

            <div className="season-card">
              <div className="season-title">Fall Fest</div>
              <div className="season-desc">An autumn effort centered on harvest assistance, warm meal programs, and volunteer coordination.</div>
              <div className="season-raised">Raised: $45,000</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

