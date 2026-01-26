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

  // Sample donations data - replace with API call to your Neon DB
  const [donations] = useState([
    { id: 1, donorName: 'Sarah Mitchell', amount: 5000, date: '2026-01-20', campaign: 'Annual Giving 2026', status: 'completed', paymentMethod: 'Credit Card' },
    { id: 2, donorName: 'Tech Corp Foundation', amount: 25000, date: '2026-01-19', campaign: 'Capital Campaign', status: 'completed', paymentMethod: 'Bank Transfer' },
    { id: 3, donorName: 'John Anderson', amount: 1500, date: '2026-01-18', campaign: 'Emergency Relief Fund', status: 'completed', paymentMethod: 'PayPal' },
    { id: 4, donorName: 'Maria Garcia', amount: 750, date: '2026-01-17', campaign: 'Annual Giving 2026', status: 'pending', paymentMethod: 'Credit Card' },
    { id: 5, donorName: 'Global Enterprises', amount: 50000, date: '2026-01-15', campaign: 'Capital Campaign', status: 'completed', paymentMethod: 'Bank Transfer' },
    { id: 6, donorName: 'Emily Chen', amount: 2000, date: '2026-01-14', campaign: 'Scholarship Fund', status: 'completed', paymentMethod: 'Credit Card' }
  ]);

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

            <button className="btn-export"><Download /> Export</button>
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
