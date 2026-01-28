"use client";

import React, { useEffect, useState } from 'react';
import './campaigns.css';

export default function CampaignPage() {
  // Demo campaigns always visible
  const DEMO_CAMPAIGNS = [
    { id: 'demo-1', title: 'Winter Fest', description: 'Warm clothing and holiday support', goal: 50000, raised: 50000, createdAt: new Date().toISOString() },
    { id: 'demo-2', title: 'Spring Fest', description: 'School supplies and community support', goal: 30000, raised: 15000, createdAt: new Date().toISOString() },
    { id: 'demo-3', title: 'Summer Fest', description: 'Meal assistance and youth activities', goal: 75000, raised: 60000, createdAt: new Date().toISOString() },
    { id: 'demo-4', title: 'Fall Fest', description: 'Harvest assistance and volunteer coordination', goal: 45000, raised: 20000, createdAt: new Date().toISOString() }
  ];

  const [savedCampaigns, setSavedCampaigns] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', goal: '', startDate: '', endDate: '' });

  // Load campaigns from API and localStorage, merge with demo campaigns
  useEffect(() => {
    // load saved campaigns from localStorage
    try {
      const raw = localStorage.getItem('dc_saved_campaigns');
      const parsed = raw ? JSON.parse(raw) : [];
      setSavedCampaigns(parsed);
    } catch (e) {
      setSavedCampaigns([]);
    }

    fetch('/api/campaigns')
      .then(r => r.json())
      .then(data => {
        setCampaigns([...(data || []), ...(JSON.parse(localStorage.getItem('dc_saved_campaigns') || '[]') || []), ...DEMO_CAMPAIGNS]);
      })
      .catch(() => {
        setCampaigns([...(JSON.parse(localStorage.getItem('dc_saved_campaigns') || '[]') || []), ...DEMO_CAMPAIGNS]);
      });
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
    if (!form.title) {
      alert('Please enter a title for the campaign');
      return;
    }
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          goal: parseFloat(form.goal || 0),
          startDate: form.startDate || undefined,
          endDate: form.endDate || undefined,
        }),
      });
      const saved = await res.json();
      if (res.ok) {
        setCampaigns(prev => [saved, ...prev]);
        setModalOpen(false);
        setForm({ title: '', description: '', goal: '', startDate: '', endDate: '' });
      } else {
        alert(saved?.error || 'Failed to save campaign');
      }
    } catch (err) {
      // fallback: persist locally and update view so demo campaigns stay visible
      console.error(err);
      const fallback = {
        id: `local-${Date.now()}`,
        title: form.title,
        description: form.description,
        goal: parseFloat(form.goal || 0),
        raised: 0,
        createdAt: new Date().toISOString(),
      };
      try {
        const curr = JSON.parse(localStorage.getItem('dc_saved_campaigns') || '[]');
        const next = [fallback, ...(curr || [])];
        localStorage.setItem('dc_saved_campaigns', JSON.stringify(next));
        setSavedCampaigns(next);
        setCampaigns(prev => [fallback, ...prev]);
        setModalOpen(false);
        setForm({ title: '', description: '', goal: '', startDate: '', endDate: '' });
      } catch (e) {
        alert('Error saving campaign locally');
      }
    }
  }

  return (
    <div className="campaign-root">
      <nav className="campaign-breadcrumb">DonorConnect &nbsp; / &nbsp; Campaigns</nav>

      <div className="campaign-grid">
        <main className="campaign-main">
          <section className="card campaign-overview">
            <div className="overview-header">
              <h1>Campaigns</h1>
              <div className="screen-creds">Manage and create fundraising campaigns</div>
            </div>

            <div className="goal">
              <div className="goal-title">Overview</div>
              <div className="goal-label">Total campaigns: {campaigns.length}</div>
            </div>

            <div className="stats-row">
              <div className="stat">
                <div className="stat-value">{campaigns.reduce((s,c)=>s+(c.goal||0),0)}</div>
                <div className="stat-label">Total Goals</div>
              </div>

              <div className="stat">
                <div className="stat-value">{campaigns.reduce((s,c)=>s+(c.raised||0),0)}</div>
                <div className="stat-label">Total Raised</div>
              </div>

              <div className="stat">
                <div className="stat-value">—</div>
                <div className="stat-label">Active</div>
              </div>
            </div>
          </section>

          <section className="card campaign-actions">
            <h3>Campaign Actions</h3>
            <div className="actions-row">
              <button className="btn primary" onClick={()=>setModalOpen(true)}>Create Campaign</button>
            </div>
          </section>

          <section className="card create-campaign">
            <h3>Existing Campaigns</h3>
            {campaigns.length === 0 && <p>No campaigns yet.</p>}
            <div className="campaign-list">
              {campaigns.map(c => (
                <div key={c.id} className="campaign-card">
                  <div className="campaign-title">{c.title}</div>
                  <div className="campaign-desc">{c.description}</div>
                  <div className="campaign-meta">Goal: ${c.goal?.toLocaleString?.() ?? c.goal} • Created: {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '—'}</div>
                </div>
              ))}
            </div>
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

      {modalOpen && (
        <div className="modal-overlay" style={{position:'fixed',inset:0,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(2,6,23,0.5)',zIndex:80}}>
          <div className="modal-box" style={{width:600,maxWidth:'92%',padding:16}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
              <h3 style={{margin:0}}>Create Campaign</h3>
              <button onClick={()=>setModalOpen(false)} style={{background:'transparent',border:0,fontSize:18}}>×</button>
            </div>

            <div style={{display:'grid',gap:10}}>
              <label style={{fontWeight:600}}>Title</label>
              <input name="title" value={form.title} onChange={handleChange} className="form-input" />

              <label style={{fontWeight:600}}>Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} className="form-input" style={{minHeight:80}} />

              <div style={{display:'flex',gap:8}}>
                <div style={{flex:1}}>
                  <label style={{fontWeight:600}}>Goal (USD)</label>
                  <input name="goal" value={form.goal} onChange={handleChange} className="form-input" />
                </div>
                <div style={{flex:1}}>
                  <label style={{fontWeight:600}}>End Date</label>
                  <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className="form-input" />
                </div>
              </div>

              <div style={{display:'flex',gap:8,justifyContent:'flex-end',marginTop:8}}>
                <button onClick={()=>setModalOpen(false)} className="btn outline">Cancel</button>
                <button onClick={handleSave} className="btn primary">Save Campaign</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

