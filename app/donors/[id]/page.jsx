"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Mail, Phone, Users, ArrowLeft } from 'lucide-react';
import '../donors.css';

export default function DonorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params || {};
  const [donor, setDonor] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  const DEMO_DONORS = [
    { id: 1, name: 'Sarah Mitchell', email: 'sarah.mitchell@email.com', phone: '(555) 123-4567', type: 'individual', totalDonations: 15000, lastDonation: '2026-01-20', donationCount: 8 },
    { id: 2, name: 'Tech Corp Foundation', email: 'giving@techcorp.org', phone: '(555) 234-5678', type: 'corporate', totalDonations: 75000, lastDonation: '2026-01-19', donationCount: 3 },
    { id: 3, name: 'John Anderson', email: 'john.anderson@email.com', phone: '(555) 345-6789', type: 'individual', totalDonations: 8500, lastDonation: '2026-01-18', donationCount: 12 },
    { id: 4, name: 'Maria Garcia', email: 'maria.garcia@email.com', phone: '(555) 456-7890', type: 'individual', totalDonations: 3250, lastDonation: '2026-01-17', donationCount: 5 },
    { id: 5, name: 'Global Enterprises', email: 'donations@globalent.com', phone: '(555) 567-8901', type: 'corporate', totalDonations: 125000, lastDonation: '2026-01-15', donationCount: 6 },
    { id: 6, name: 'Emily Chen', email: 'emily.chen@email.com', phone: '(555) 678-9012', type: 'individual', totalDonations: 12000, lastDonation: '2026-01-14', donationCount: 15 }
  ];

  useEffect(() => {
    if (!id) return;
    try {
      const raw = localStorage.getItem('dc_saved_donors');
      const saved = raw ? JSON.parse(raw) : [];
      const all = [...saved, ...DEMO_DONORS];
      const found = all.find(d => String(d.id) === String(id));
      setDonor(found || null);
    } catch (e) {
      setDonor(null);
    }
  }, [id]);

  const searchParams = useSearchParams();

  // Auto-generate summary when `?summarize=1` is present
  useEffect(() => {
    if (!searchParams || !searchParams.get) return;
    const should = searchParams.get('summarize');
    if (should && donor && !aiResult && !aiLoading) {
      handleGenerateSummary();
    }
    // Only depend on donor and searchParams getter
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donor, searchParams]);

  const handleGenerateSummary = async () => {
    if (!donor) return;
    setAiLoading(true);
    try {
      const res = await fetch('/api/ai/donor-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ donors: [donor], client: { org: 'DonorConnect' } }),
      });
      const ct = (res.headers.get('content-type') || '').toLowerCase();
      let data;
      if (ct.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        data = { raw: text, error: `Expected JSON but received ${ct || 'text/html'}` };
      }
      setAiResult(data);
    } catch (err) {
      setAiResult({ error: err.message || String(err) });
    } finally {
      setAiLoading(false);
    }
  };

  if (!donor) {
    return (
      <div className="donors-container" style={{padding:24}}>
        <button onClick={() => router.back()} style={{display:'inline-flex',alignItems:'center',gap:8,marginBottom:12}}>
          <ArrowLeft /> Back
        </button>
        <div className="card" style={{padding:24}}>
          <p style={{margin:0}}>Donor not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="donors-container">
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:18}}>
        <div>
          <h1 style={{margin:0,fontSize:'1.5rem',fontWeight:800}}>{donor.name}</h1>
          <p style={{margin:0,color:'#6b7280'}}>{donor.type === 'individual' ? 'Individual Donor' : 'Corporate Donor'}</p>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button onClick={() => router.back()} style={{padding:'8px 12px',borderRadius:8}}>Back</button>
          <button onClick={handleGenerateSummary} disabled={aiLoading} style={{padding:'8px 12px',borderRadius:8,background:'#4f46e5',color:'#fff',border:0}}>
            {aiLoading ? 'Generating...' : 'Generate AI Summary'}
          </button>
        </div>
      </div>

      <div className="card" style={{padding:20}}>
        <div style={{display:'flex',gap:24}}>
          <div style={{flex:1}}>
            <h3 style={{marginTop:0}}>Contact</h3>
            <div style={{display:'flex',alignItems:'center',gap:8}}><Mail /> <a href={`mailto:${donor.email}`}>{donor.email}</a></div>
            <div style={{display:'flex',alignItems:'center',gap:8,marginTop:8}}><Phone /> <a href={`tel:${(donor.phone||'').replace(/\D/g,'')}`}>{donor.phone}</a></div>
          </div>
          <div style={{width:240}}>
            <h3 style={{marginTop:0}}>Stats</h3>
            <p style={{margin:0}}>Total Given: <strong style={{color:'#059669'}}>${donor.totalDonations?.toLocaleString?.() ?? donor.totalDonations}</strong></p>
            <p style={{margin:0,marginTop:6}}>Donations: <strong>{donor.donationCount}</strong></p>
            {donor.lastDonation && <p style={{marginTop:6}}>Last donation: {donor.lastDonation}</p>}
          </div>
        </div>

        <div style={{marginTop:18}}>
          <h3>AI Summary</h3>
          <div className="ai-summary">
              {aiLoading ? (
                <div className="ai-loading-overlay">
                  <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:10}}>
                    <div className="ai-spinner" />
                    <div className="ai-loading-text">Generating AI summary…</div>
                    <div style={{color:'#0b3a83'}}>The summary will appear here shortly.</div>
                  </div>
                </div>
              ) : aiResult ? (
                aiResult.raw ? <div style={{whiteSpace:'pre-wrap'}}>{aiResult.raw}</div> : (
                  <div>
                    {aiResult.recommendations && (
                      <div style={{marginBottom:10}} className="ai-summary-overview">
                        <strong>Recommendations</strong>
                        <ul style={{marginTop:6}}>
                          {Array.isArray(aiResult.recommendations)
                            ? aiResult.recommendations.map((r,i)=>(<li key={i} style={{marginBottom:6}} className="recommendation">{r}</li>))
                            : <li className="recommendation">{aiResult.recommendations}</li>
                          }
                        </ul>
                      </div>
                    )}

                    {aiResult.insights && (
                      <div style={{marginBottom:10}} className="ai-summary-insights">
                        <strong>Insights</strong>
                        <p style={{marginTop:6}}>{Array.isArray(aiResult.insights) ? aiResult.insights.join('\n') : aiResult.insights}</p>
                      </div>
                    )}

                    {Array.isArray(aiResult.donors) && aiResult.donors.length > 0 && (
                      <div>
                        <strong>Donor Rundown</strong>
                        <div className="ai-summary-rundown" style={{marginTop:8}}>
                          {aiResult.donors.map((d,i)=>(
                            <div key={i} style={{borderTop: i===0 ? 'none' : '1px solid rgba(96,165,250,0.08)', paddingTop: i===0 ? 0 : 8, marginTop: i===0 ? 0 : 8}}>
                              <div style={{fontWeight:700,color:'#05326b'}}>{d.name}</div>
                              <div style={{fontSize:13,color:'#06357a',marginTop:4}}>
                                {d.shortSummary || d.summary || (d.totalDonations ? `${d.donationCount || 0} donations, total ${d.totalDonations}` : '')}
                              </div>
                              {d.suggestedNextAction && <div style={{marginTop:6,fontSize:13}}><em>Next action:</em> {d.suggestedNextAction}</div>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              ) : (
                <p style={{margin:0,color:'#08306b'}}>No summary generated yet.</p>
              )}
            </div>
        </div>
      </div>
    </div>
  );
}
