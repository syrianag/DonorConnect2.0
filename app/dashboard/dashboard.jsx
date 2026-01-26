"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Database, Users, DollarSign, TrendingUp, Activity, Calendar, ArrowRight, ChevronRight } from 'lucide-react';
import './dashboard.css';

export default function DashboardPage() {
	const router = useRouter();

	// State for dashboard data - replace with API calls to your Neon DB
	const [dashboardData, setDashboardData] = useState({
		totalDonors: 248,
		totalDonations: 84250,
		activeCampaigns: 5,
		monthlyGrowth: 12.5,
		recentDonors: [
			{ id: 1, name: 'Sarah Mitchell', amount: 5000, date: '2026-01-20', campaign: 'Annual Giving 2026' },
			{ id: 2, name: 'Tech Corp Foundation', amount: 25000, date: '2026-01-19', campaign: 'Capital Campaign' },
			{ id: 3, name: 'John Anderson', amount: 1500, date: '2026-01-18', campaign: 'Emergency Relief Fund' },
			{ id: 4, name: 'Maria Garcia', amount: 750, date: '2026-01-17', campaign: 'Annual Giving 2026' }
		],
		topCampaigns: [
			{ id: 1, name: 'Capital Campaign', raised: 50000, goal: 100000, donors: 12 },
			{ id: 2, name: 'Annual Giving 2026', raised: 18500, goal: 25000, donors: 42 },
			{ id: 3, name: 'Emergency Relief Fund', raised: 8750, goal: 15000, donors: 28 }
		],
		recentActivity: [
			{ id: 1, type: 'donation', message: 'New donation of $5,000 from Sarah Mitchell', time: '2 hours ago' },
			{ id: 2, type: 'donor', message: 'New donor registered: Emily Chen', time: '5 hours ago' },
			{ id: 3, type: 'campaign', message: 'Capital Campaign reached 50% of goal', time: '1 day ago' }
		]
	});

	// Simulate API call - replace with actual fetch to your backend
	useEffect(() => {
		// async function fetchDashboardData() {
		//   const response = await fetch('/api/dashboard');
		//   const data = await response.json();
		//   setDashboardData(data);
		// }
		// fetchDashboardData();
	}, []);

	const handleNavigate = (path) => {
		if (router && path) router.push(path);
	};

	return (
		<div className="dashboard-page">
			<main className="container dashboard-main">
				{/* Page Title */}
				<div className="page-title mb-8">
					<h1>Dashboard</h1>
					<p>Welcome back! Here's your donation management overview</p>
				</div>

				{/* Summary Statistics Cards */}
				<div className="stats-grid">
					<div className="dc-card stat-card">
						<span className="stat-title">Total Donors</span>
						<div className="stat-meta" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
							<div className="stat-icon" style={{background:'#eef2ff'}}><Users /></div>
							<div style={{textAlign:'right'}}>
								<div className="stat-value">{dashboardData.totalDonors}</div>
								<button onClick={() => handleNavigate('/donors')} className="link-button">View all</button>
							</div>
						</div>
					</div>

					<div className="dc-card stat-card">
						<span className="stat-title">Total Donations</span>
						<div className="stat-meta" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
							<div className="stat-icon" style={{background:'#ecfdf5'}}><DollarSign /></div>
							<div style={{textAlign:'right'}}>
								<div className="stat-value">${dashboardData.totalDonations.toLocaleString()}</div>
								<button onClick={() => handleNavigate('/donations')} className="link-button">View all</button>
							</div>
						</div>
					</div>

					<div className="dc-card stat-card">
						<span className="stat-title">Active Campaigns</span>
						<div className="stat-meta" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
							<div className="stat-icon" style={{background:'#eff6ff'}}><Activity /></div>
							<div style={{textAlign:'right'}}>
								<div className="stat-value">{dashboardData.activeCampaigns}</div>
								<button onClick={() => handleNavigate('/campaigns')} className="link-button">View all</button>
							</div>
						</div>
					</div>

					<div className="dc-card stat-card">
						<span className="stat-title">Monthly Growth</span>
						<div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
							<div className="stat-icon" style={{background:'#ecfdf5'}}><TrendingUp /></div>
							<div style={{textAlign:'right'}}>
								<div className="stat-value">+{dashboardData.monthlyGrowth}%</div>
								<div style={{color:'#10b981',fontSize:'0.9rem'}}>vs last month</div>
							</div>
						</div>
					</div>
				</div>

				{/* Two Column Layout */}
				<div className="two-col">
					{/* Recent Donors */}
					<div className="dc-card">
						<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
							<h2 style={{margin:0}}>Recent Donors</h2>
							<button onClick={() => handleNavigate('/donors')} className="link-button">View all</button>
						</div>
						<div className="recent-list">
							{dashboardData.recentDonors.map((donor) => (
								<div key={donor.id} className="recent-item">
									<div>
										<p style={{margin:0,fontWeight:600}}>{donor.name}</p>
										<p className="meta">{donor.campaign}</p>
										<p className="meta" style={{fontSize:'0.85rem',marginTop:6}}>{donor.date}</p>
									</div>
									<p style={{margin:0,fontWeight:700,color:'#059669'}}>${donor.amount.toLocaleString()}</p>
								</div>
							))}
						</div>
					</div>

					{/* Top Campaigns */}
					<div className="dc-card">
						<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
							<h2 style={{margin:0}}>Top Campaigns</h2>
							<button onClick={() => handleNavigate('/campaigns')} className="link-button">View all</button>
						</div>
						<div className="campaigns-list">
							{dashboardData.topCampaigns.map((campaign) => {
								const progress = (campaign.raised / campaign.goal) * 100;
								return (
									<div key={campaign.id}>
										<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
											<div style={{fontWeight:600}}>{campaign.name}</div>
											<div style={{color:'#6b7280'}}>{campaign.donors} donors</div>
										</div>
										<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
											<div style={{color:'#475569'}}>${campaign.raised.toLocaleString()} of ${campaign.goal.toLocaleString()}</div>
											<div style={{fontWeight:600,color:'#4f46e5'}}>{progress.toFixed(0)}%</div>
										</div>
										<div className="dc-progress-wrap" style={{marginBottom:12}}>
											<div className="dc-progress" style={{ width: `${progress}%` }}></div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>

				{/* Recent Activity Feed */}
				<div className="dc-card">
					<h2 style={{marginTop:0,marginBottom:12}}>Recent Activity</h2>
					<div className="activity-list">
						{dashboardData.recentActivity.map((activity) => (
							<div key={activity.id} className="activity-item">
								<div className={`activity-icon`} style={{background: activity.type === 'donation' ? '#ecfdf5' : activity.type === 'donor' ? '#eef2ff' : '#eff6ff'}}>
									{activity.type === 'donation' && <DollarSign />}
									{activity.type === 'donor' && <Users />}
									{activity.type === 'campaign' && <Activity />}
								</div>
								<div style={{flex:1}}>
									<p style={{margin:0}}>{activity.message}</p>
									<p style={{margin:0,color:'#6b7280',fontSize:'0.9rem',marginTop:6}}>
										<Calendar style={{width:14,height:14,verticalAlign:'middle',marginRight:6}} /> {activity.time}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</main>

			{/* Footer */}
			<footer className="page-footer">
				<div className="container">
					<p>Built with Next.js, React, PostCSS, and Neon DB</p>
				</div>
			</footer>
		</div>
	);
}

