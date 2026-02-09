"use client";

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function DonorAISummaryModal({ donor, isOpen, onClose, cachedSummary, onCache }) {
  const [summary, setSummary] = useState(cachedSummary || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    if (!donor) return;
    if (cachedSummary) {
      setSummary(cachedSummary);
      return;
    }
    const abortController = new AbortController();
    const fetchAISummary = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/ai/donor-summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ donors: [donor], client: {} }),
          signal: abortController.signal,
        });

        if (!response.ok) throw new Error('Failed to fetch AI summary');
        const data = await response.json();

        const donorSummary = (data && Array.isArray(data.donors) && data.donors[0]) || data;
        setSummary(donorSummary || data);
        if (onCache && donor && donor.id != null) onCache(donor.id, donorSummary || data);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err.message || 'Failed to fetch summary');
      } finally {
        setLoading(false);
      }
    };

    fetchAISummary();

    return () => abortController.abort();
  }, [isOpen, donor, cachedSummary, onCache]);

  if (!isOpen) return null;

  const safeNumber = (val) => (typeof val === 'number' ? val.toLocaleString() : val ?? '—');

  return (
    <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-box bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">AI Summary: {donor?.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {loading && (
            <div className="ai-loading-overlay">
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:10}}>
                <div className="ai-spinner" />
                <div className="ai-loading-text">Generating AI summary…</div>
                <div style={{color:'#0b3a83'}}>This may take a few seconds.</div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">Error: {error}</div>
          )}

          {summary && !loading && (
            <div className="space-y-4">
              <div className="ai-summary-overview">
                <h3 className="font-semibold text-lg mb-2">Overview</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Total Donations:</span>
                    <span className="ml-2 font-medium">${safeNumber(summary.totalDonations)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Number of Donations:</span>
                    <span className="ml-2 font-medium">{summary.donationCount ?? '—'}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-600">Last Donation:</span>
                    <span className="ml-2 font-medium">{summary.lastDonation ?? '—'}</span>
                  </div>
                </div>
              </div>

              {summary.shortSummary && (
                <div className="ai-summary-insights">
                  <h3 className="font-semibold text-lg mb-2">Summary</h3>
                  <p className="text-gray-700">{summary.shortSummary}</p>
                </div>
              )}

              {summary.suggestedNextAction && (
                <div className="ai-summary-insights" style={{border:'1px solid rgba(37,99,235,0.12)'}}>
                  <h3 className="font-semibold text-lg mb-2" style={{color:'#052a63'}}>Suggested Next Action</h3>
                  <p style={{color:'#08306b'}}>{summary.suggestedNextAction}</p>
                </div>
              )}
            </div>
          )}

          {!loading && !error && !summary && <p>No summary available.</p>}
        </div>

        <div className="flex justify-end gap-3 p-6 border-t">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">Close</button>
        </div>
      </div>
    </div>
  );
}
