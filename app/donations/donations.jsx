"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Database, TrendingUp, DollarSign, Calendar, Search, Filter, Download, ArrowUpDown } from 'lucide-react';
import './donations.css';

export default function DonationsPage() {
  const pathname = usePathname() || '/';
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [notifications, setNotifications] = useState([]);

  // Sample donations data - replace with API call to your Neon DB
  const [donations] = useState([
    { id: 1, donorName: 'Sarah Mitchell', amount: 5000, date: '2026-01-20', campaign: 'Annual Giving 2026', status: 'completed', paymentMethod: 'Credit Card' },
    { id: 2, donorName: 'Tech Corp Foundation', amount: 25000, date: '2026-01-19', campaign: 'Capital Campaign', status: 'completed', paymentMethod: 'Bank Transfer' },
    { id: 3, donorName: 'John Anderson', amount: 1500, date: '2026-01-18', campaign: 'Emergency Relief Fund', status: 'completed', paymentMethod: 'PayPal' },
    { id: 4, donorName: 'Maria Garcia', amount: 750, date: '2026-01-17', campaign: 'Annual Giving 2026', status: 'pending', paymentMethod: 'Credit Card' },
    { id: 5, donorName: 'Global Enterprises', amount: 50000, date: '2026-01-15', campaign: 'Capital Campaign', status: 'completed', paymentMethod: 'Bank Transfer' },
    { id: 6, donorName: 'Emily Chen', amount: 2000, date: '2026-01-14', campaign: 'Scholarship Fund', status: 'completed', paymentMethod: 'Credit Card' }
  ]);

  // Build notifications for new donors or recurring donors with missed donations
  React.useEffect(() => {
    let mounted = true;
    try {
      // group donations by donor
      const byDonor = {};
      donations.forEach(d => {
        const name = d.donorName;
        byDonor[name] = byDonor[name] || [];
        byDonor[name].push(d);
      });

      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      // load dismissed notifications from localStorage to avoid repeat
      const dismissedRaw = localStorage.getItem('dc_notifications_dismissed') || '{}';
      const dismissed = JSON.parse(dismissedRaw);

      // load cached generated messages
      const cacheRaw = localStorage.getItem('dc_notifications_messages') || '{}';
      const cache = JSON.parse(cacheRaw);

      const notes = [];
      Object.keys(byDonor).forEach(name => {
        const items = byDonor[name].slice().sort((a,b)=>new Date(b.date) - new Date(a.date));
        const count = items.length;
        const latest = items[0] && new Date(items[0].date);

        // New donor: only one donation recorded
        if (count === 1) {
          const key = `new:${name}`;
          if (!dismissed[key]) {
            notes.push({ key, type: 'new', donor: name, lastDonation: items[0]?.date, message: cache[key] || null });
          }
          return;
        }

        // Recurring donor who missed this month: last donation not in current month
        if (count > 1) {
          if (!latest || latest.getFullYear() < currentYear || latest.getMonth() < currentMonth) {
            const key = `missed:${name}:${currentYear}-${currentMonth}`;
            if (!dismissed[key]) {
              notes.push({ key, type: 'missed', donor: name, lastDonation: items[0]?.date, message: cache[key] || null });
            }
          }
        }
      });

      if (!mounted) return;
      setNotifications(notes);

      // For any note without a cached message, asynchronously request the AI-generated message
      notes.filter(n => !n.message).forEach(async (note) => {
        try {
          const res = await fetch('/api/notifications', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: note.donor, type: note.type, lastDonation: note.lastDonation }),
          });
          const data = await res.json();
          const msg = data?.message || (note.type === 'new' ? `Hey ${note.donor}, thank you for the donation — we appreciate your support.` : `Hey ${note.donor}, we missed this month's donation 😢 — here's an opportunity to donate now.`);

          // update cache and UI
          const cRaw = localStorage.getItem('dc_notifications_messages') || '{}';
          const cObj = JSON.parse(cRaw);
          cObj[note.key] = msg;
          localStorage.setItem('dc_notifications_messages', JSON.stringify(cObj));
          if (!mounted) return;
          setNotifications(prev => prev.map(p => p.key === note.key ? { ...p, message: msg } : p));
        } catch (err) {
          console.error('failed to fetch notification message', err);
        }
      });

    } catch (e) {
      console.error('notifications build error', e);
      setNotifications([]);
    }

    return () => { mounted = false; };
  }, [donations]);

  function dismissNotification(key) {
    try {
      const raw = localStorage.getItem('dc_notifications_dismissed') || '{}';
      const obj = JSON.parse(raw);
      obj[key] = true;
      localStorage.setItem('dc_notifications_dismissed', JSON.stringify(obj));
      setNotifications(prev => prev.filter(n => n.key !== key));
    } catch (e) {
      console.error('dismiss error', e);
    }
  }

  // Calculate statistics
  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
  const completedDonations = donations.filter(d => d.status === 'completed').length;
  const pendingDonations = donations.filter(d => d.status === 'pending').length;

  // Filter donations
  const filteredDonations = donations.filter(donation => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = donation.donorName.toLowerCase().includes(q) || donation.campaign.toLowerCase().includes(q);
    const matchesFilter = filterStatus === 'all' || donation.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="donations-root">
      {/* Notifications panel */}
      {notifications.length > 0 && (
        <div className="donations-notifications">
          {notifications.map(n => (
            <div key={n.key} className={`dc-notification ${n.type}`}>
              <div className="dc-notification-message">
                {n.message ? n.message : <em>Generating message…</em>}
              </div>
              <div className="dc-notification-actions">
                <button className="dc-btn-dismiss" onClick={() => dismissNotification(n.key)}>Dismiss</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <main className="donations-main">
        <div className="page-title">
          <h1>Donation Tracking</h1>
          <p>Monitor and manage all incoming donations</p>
        </div>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-head">
              <span>Total Donations</span>
              <div className="stat-icon"><DollarSign /></div>
            </div>
            <div className="stat-value">${totalDonations.toLocaleString()}</div>
            <div className="stat-note">+12% from last month</div>
          </div>

          <div className="stat-card">
            <div className="stat-head">
              <span>Completed</span>
              <div className="stat-icon"><TrendingUp /></div>
            </div>
            <div className="stat-value">{completedDonations}</div>
            <div className="stat-note">Successfully processed</div>
          </div>

          <div className="stat-card">
            <div className="stat-head">
              <span>Pending</span>
              <div className="stat-icon"><Calendar /></div>
            </div>
            <div className="stat-value">{pendingDonations}</div>
            <div className="stat-note">Awaiting confirmation</div>
          </div>
        </section>

        <section className="filters">
          <div className="filters-inner">
            <div className="search-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search by donor name or campaign..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-controls">
              <Filter className="filter-icon" />
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-select">
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            
          </div>
        </section>

        <section className="table-wrap">
          <div className="table-scroll">
            <table className="donations-table">
              <thead>
                <tr>
                  <th>Donor Name <ArrowUpDown className="col-icon" /></th>
                  <th>Amount <ArrowUpDown className="col-icon" /></th>
                  <th>Date <ArrowUpDown className="col-icon" /></th>
                  <th>Campaign</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonations.map((donation) => (
                  <tr key={donation.id} className="table-row">
                    <td className="td-name">{donation.donorName}</td>
                    <td className="td-amount">${donation.amount.toLocaleString()}</td>
                    <td className="td-date">{donation.date}</td>
                    <td className="td-campaign">{donation.campaign}</td>
                    <td className="td-method">{donation.paymentMethod}</td>
                    <td className="td-status">
                      <span className={"badge " + (donation.status === 'completed' ? 'badge-completed' : 'badge-pending')}>
                        {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredDonations.length === 0 && (
            <div className="empty-state">No donations found matching your filters.</div>
          )}
        </section>
      </main>
    </div>
  );
}

