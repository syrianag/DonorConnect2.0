"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Database, TrendingUp, Users } from 'lucide-react';
import '../home/home.css';

export default function Home() {
	const router = useRouter();

	const handleGetStarted = () => {
		router.push('/dashboard');
	};

	return (
		<div className="home-root">

			<main className="hc-main">
 				<section className="hc-hero">
 					<h1 className="hc-title">
 						Donor<span className="accent">Connect</span>
 					</h1>

 					<div className="hc-card">
 						<div style={{display:'flex',gap:16,alignItems:'flex-start'}}>
 							<div style={{flexShrink:0,width:48,height:48,background:'#fee2e2',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center'}}>
 								<TrendingUp style={{width:20,height:20,color:'#dc2626'}} />
 							</div>
 							<div style={{textAlign:'left'}}>
 								<h2 style={{fontSize:18,fontWeight:700,marginBottom:8}}>The Challenge</h2>
 								<p style={{color:'#475569',lineHeight:1.45}}>
 									Companies are receiving donations but don't have the capacity to keep up with the donations that are coming in or know how to track them the correct way.
 								</p>
 							</div>
 						</div>
 					</div>

 					<div className="hc-solution" style={{marginTop:20}}>
 						<div style={{display:'flex',gap:16,alignItems:'flex-start'}}>
 							<div style={{flexShrink:0,width:48,height:48,background:'rgba(255,255,255,0.12)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center'}}>
 								<Users style={{width:20,height:20,color:'#fff'}} />
 							</div>
 							<div style={{textAlign:'left'}}>
 								<h2 style={{fontSize:18,fontWeight:700,marginBottom:8,color:'#fff'}}>Our Solution</h2>
 								<p style={{color:'rgba(255,255,255,0.9)',lineHeight:1.45}}>
 									DonorConnect is an API-driven platform for managing donors, donations, and campaigns. It enables clean client-server communication using structured JSON, supports endpoints for recent donors, top donations, and active campaigns, and demonstrates full frontend-to-backend data flow.
 								</p>
 							</div>
 						</div>
 					</div>

 					<div className="hc-cta">
 						<button onClick={handleGetStarted} className="btn">
 							Get Started <ArrowRight style={{width:18,height:18}} />
 						</button>
 					</div>

 					<div className="hc-grid">
 						<div className="hc-feature">
 							<div style={{width:48,height:48,background:'#eef2ff',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 12px'}}>
 								<Database style={{width:20,height:20,color:'#4f46e5'}} />
 							</div>
 							<h3>Centralized Database</h3>
 							<p>Store and manage all donor information in one secure location powered by Neon DB.</p>
 						</div>

 						<div className="hc-feature">
 							<div style={{width:48,height:48,background:'#eff6ff',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 12px'}}>
 								<TrendingUp style={{width:20,height:20,color:'#0284c7'}} />
 							</div>
 							<h3>Real-Time Tracking</h3>
 							<p>Monitor donations and campaigns as they happen with live dashboards.</p>
 						</div>

 						<div className="hc-feature">
 							<div style={{width:48,height:48,background:'#ecfccb',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 12px'}}>
 								<Users style={{width:20,height:20,color:'#16a34a'}} />
 							</div>
 							<h3>Donor Insights</h3>
 							<p>Understand your top contributors and engagement patterns at a glance.</p>
 						</div>
 					</div>
 				</section>
 			</main>

 			<footer className="hc-footer">
 				<div className="container">
 					<p>Built with Next.js, React 19, Tailwind CSS, and Neon DB</p>
 				</div>
 			</footer>
 		</div>
 	);
}
