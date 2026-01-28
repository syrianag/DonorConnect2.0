"use client";

import React, { useState, useEffect } from 'react';
import { Database, Users, Search, Filter, Plus, Mail, Phone, MapPin, X, Save } from 'lucide-react';
import './donors.css';

export default function DonorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Form state for new donor
  const [newDonor, setNewDonor] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    donorType: 'individual'
  });

  // Demo donors (always shown)
  const DEMO_DONORS = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      email: 'sarah.mitchell@email.com',
      phone: '(555) 123-4567',
      type: 'individual',
      totalDonations: 15000,
      lastDonation: '2026-01-20',
      donationCount: 8
    },
    {
      id: 2,
      name: 'Tech Corp Foundation',
      email: 'giving@techcorp.org',
      phone: '(555) 234-5678',
      type: 'corporate',
      totalDonations: 75000,
      lastDonation: '2026-01-19',
      donationCount: 3
    },
    {
      id: 3,
      name: 'John Anderson',
      email: 'john.anderson@email.com',
      phone: '(555) 345-6789',
      type: 'individual',
      totalDonations: 8500,
      lastDonation: '2026-01-18',
      donationCount: 12
    },
    {
      id: 4,
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      phone: '(555) 456-7890',
      type: 'individual',
      totalDonations: 3250,
      lastDonation: '2026-01-17',
      donationCount: 5
    },
    {
      id: 5,
      name: 'Global Enterprises',
      email: 'donations@globalent.com',
      phone: '(555) 567-8901',
      type: 'corporate',
      totalDonations: 125000,
      lastDonation: '2026-01-15',
      donationCount: 6
    },
    {
      id: 6,
      name: 'Emily Chen',
      email: 'emily.chen@email.com',
      phone: '(555) 678-9012',
      type: 'individual',
      totalDonations: 12000,
      lastDonation: '2026-01-14',
      donationCount: 15
    }
  ];

  // Saved donors persisted in localStorage (user-added)
  const [savedDonors, setSavedDonors] = useState([]);
  const [donors, setDonors] = useState([]);

  // load saved donors from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('dc_saved_donors');
      const parsed = raw ? JSON.parse(raw) : [];
      setSavedDonors(parsed);
      // combine saved + demo donors (saved first)
      setDonors([...(parsed || []), ...DEMO_DONORS]);
    } catch (e) {
      setSavedDonors([]);
      setDonors([...DEMO_DONORS]);
    }
  }, []);

  // keep donors state in sync when savedDonors changes
  useEffect(() => {
    setDonors([...savedDonors, ...DEMO_DONORS]);
  }, [savedDonors]);

  // Calculate statistics
  const totalDonors = donors.length;
  const individualDonors = donors.filter(d => d.type === 'individual').length;
  const corporateDonors = donors.filter(d => d.type === 'corporate').length;

  // Filter donors
  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || donor.type === filterType;
    return matchesSearch && matchesFilter;
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDonor(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate required fields
    if (!newDonor.firstName || !newDonor.lastName || !newDonor.email || !newDonor.phone) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Create new donor object
    const donorToAdd = {
      id: donors.length + 1,
      name: `${newDonor.firstName} ${newDonor.lastName}`,
      email: newDonor.email,
      phone: newDonor.phone,
      type: newDonor.donorType,
      totalDonations: 0,
      lastDonation: null,
      donationCount: 0
    };

    // In production, replace with API call:
    // const response = await fetch('/api/donors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newDonor)
    // });
    // const savedDonor = await response.json();

    // Persist saved donor in localStorage and update donors list
    setSavedDonors(prev => {
      const next = [donorToAdd, ...prev];
      try { localStorage.setItem('dc_saved_donors', JSON.stringify(next)); } catch (e) {}
      return next;
    });

    // Reset form and close modal
    setNewDonor({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      donorType: 'individual'
    });
    setShowAddModal(false);
  };

  return (
    <div className="donors-page">
      {/* Header */}
      <header className="donors-header">
        <div className="donors-container" style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 0'}}>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <Database style={{width:28,height:28,color:'#0f172a'}} />
            <span style={{fontWeight:700,fontSize:18,color:'#0f172a'}}>DonorConnect</span>
          </div>
          <nav style={{display:'flex',gap:18}}>
            <a href="#">Dashboard</a>
            <a href="#">Donations</a>
            <a href="#" style={{color:'#4f46e5',fontWeight:600}}>Donors</a>
            <a href="#">Campaigns</a>
          </nav>
        </div>
      </header>

      <main className="donors-container">
        {/* Page Title */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:18}}>
          <div>
            <h1 style={{margin:0,fontSize:'1.75rem',fontWeight:800,color:'#0f172a'}}>Donor Management</h1>
            <p style={{margin:0,color:'#6b7280'}}>View and manage your donor relationships</p>
          </div>
          <button onClick={() => setShowAddModal(true)} style={{display:'flex',alignItems:'center',gap:8,padding:'10px 16px',background:'#4f46e5',color:'#fff',borderRadius:10,border:0}}> 
            <Plus style={{width:16,height:16}} />
            Add Donor
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="stat-cards">
          <div className="card">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
              <span className="card-title">Total Donors</span>
              <div style={{width:40,height:40,background:'#eef2ff',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Users />
              </div>
            </div>
            <p style={{fontSize:'1.5rem',fontWeight:700}}>{totalDonors}</p>
            <p style={{color:'#6b7280',fontSize:'0.9rem',marginTop:6}}>Active relationships</p>
          </div>

          <div className="card">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
              <span className="card-title">Individual Donors</span>
              <div style={{width:40,height:40,background:'#eff6ff',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Users />
              </div>
            </div>
            <p style={{fontSize:'1.5rem',fontWeight:700}}>{individualDonors}</p>
            <p style={{color:'#6b7280',fontSize:'0.9rem',marginTop:6}}>Personal contributors</p>
          </div>

          <div className="card">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
              <span className="card-title">Corporate Donors</span>
              <div style={{width:40,height:40,background:'#f5f3ff',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Users />
              </div>
            </div>
            <p style={{fontSize:'1.5rem',fontWeight:700}}>{corporateDonors}</p>
            <p style={{color:'#6b7280',fontSize:'0.9rem',marginTop:6}}>Organizational partners</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card" style={{marginBottom:16}}>
          <div style={{display:'flex',flexDirection:'row',gap:12}}>
            <div style={{flex:1,position:'relative'}}>
              <Search style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'#94a3b8'}} />
              <input className="search-input" type="text" placeholder="Search by name or email..." value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
            </div>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <Filter style={{color:'#94a3b8'}} />
              <select className="select" value={filterType} onChange={(e)=>setFilterType(e.target.value)}>
                <option value="all">All Types</option>
                <option value="individual">Individual</option>
                <option value="corporate">Corporate</option>
              </select>
            </div>
          </div>
        </div>

        {/* Donors Grid */}
        <div className="donor-grid">
          {filteredDonors.map((donor) => (
            <div key={donor.id} className="donor-card">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
                <div>
                  <h3 style={{margin:0,fontWeight:700}}>{donor.name}</h3>
                  <div style={{marginTop:6}}>
                    <span className={`donor-type ${donor.type==='individual' ? 'individual' : 'corporate'}`}>{donor.type==='individual' ? 'Individual' : 'Corporate'}</span>
                  </div>
                </div>
              </div>

              <div style={{marginBottom:12}}>
                <div style={{display:'flex',alignItems:'center',gap:8,color:'#475569'}}>
                  <Mail />
                  <span>{donor.email}</span>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:8,color:'#475569',marginTop:8}}>
                  <Phone />
                  <span>{donor.phone}</span>
                </div>
              </div>

              <div style={{borderTop:'1px solid #eef2ff',paddingTop:12}}>
                <div className="donor-stats">
                  <div>
                    <p style={{margin:0,color:'#6b7280',fontSize:'0.85rem'}}>Total Given</p>
                    <p style={{margin:0,fontWeight:700,color:'#059669'}}>${donor.totalDonations.toLocaleString()}</p>
                  </div>
                  <div>
                    <p style={{margin:0,color:'#6b7280',fontSize:'0.85rem'}}>Donations</p>
                    <p style={{margin:0,fontWeight:700}}>{donor.donationCount}</p>
                  </div>
                </div>
                {donor.lastDonation && (
                  <p style={{marginTop:8,color:'#6b7280',fontSize:'0.85rem',textAlign:'center'}}>Last donation: {donor.lastDonation}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDonors.length === 0 && (
          <div className="card" style={{textAlign:'center',padding:48}}>
            <Users style={{width:64,height:64,color:'#cbd5e1',marginBottom:12}} />
            <p style={{color:'#6b7280',fontSize:'1rem'}}>No donors found matching your filters.</p>
          </div>
        )}
      </main>

      {/* Add Donor Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h2 style={{margin:0,fontSize:'1.25rem',fontWeight:700}}>Add New Donor</h2>
              <button onClick={()=>setShowAddModal(false)} style={{border:0,background:'transparent',padding:8,borderRadius:8}}><X /></button>
            </div>
            <div>
              <div className="form-row" style={{marginBottom:12}}>
                <div>
                  <label style={{display:'block',fontWeight:600,marginBottom:6}}>Donor Type</label>
                  <select name="donorType" value={newDonor.donorType} onChange={handleInputChange} className="form-input">
                    <option value="individual">Individual</option>
                    <option value="corporate">Corporate</option>
                  </select>
                </div>
                <div></div>
              </div>
              <div className="form-row">
                <div>
                  <label style={{display:'block',fontWeight:600,marginBottom:6}}>First Name *</label>
                  <input type="text" name="firstName" value={newDonor.firstName} onChange={handleInputChange} className="form-input" />
                </div>
                <div>
                  <label style={{display:'block',fontWeight:600,marginBottom:6}}>Last Name *</label>
                  <input type="text" name="lastName" value={newDonor.lastName} onChange={handleInputChange} className="form-input" />
                </div>
              </div>

              <div className="form-row" style={{marginTop:12}}>
                <div>
                  <label style={{display:'block',fontWeight:600,marginBottom:6}}>Email *</label>
                  <input type="email" name="email" value={newDonor.email} onChange={handleInputChange} className="form-input" />
                </div>
                <div>
                  <label style={{display:'block',fontWeight:600,marginBottom:6}}>Phone *</label>
                  <input type="tel" name="phone" value={newDonor.phone} onChange={handleInputChange} className="form-input" />
                </div>
              </div>

              <div style={{marginTop:12}}>
                <label style={{display:'block',fontWeight:600,marginBottom:6}}>Address</label>
                <input type="text" name="address" value={newDonor.address} onChange={handleInputChange} className="form-input" />
              </div>

              <div className="form-row" style={{marginTop:12}}>
                <div>
                  <label style={{display:'block',fontWeight:600,marginBottom:6}}>City</label>
                  <input type="text" name="city" value={newDonor.city} onChange={handleInputChange} className="form-input" />
                </div>
                <div>
                  <label style={{display:'block',fontWeight:600,marginBottom:6}}>State</label>
                  <input type="text" name="state" value={newDonor.state} onChange={handleInputChange} className="form-input" />
                </div>
                <div>
                  <label style={{display:'block',fontWeight:600,marginBottom:6}}>Zip Code</label>
                  <input type="text" name="zipCode" value={newDonor.zipCode} onChange={handleInputChange} className="form-input" />
                </div>
              </div>

              <div style={{display:'flex',gap:12,marginTop:18}}>
                <button onClick={()=>setShowAddModal(false)} style={{flex:1,padding:'10px 12px',borderRadius:8,border:'1px solid #e6edf3',background:'transparent'}}>Cancel</button>
                <button onClick={handleSubmit} style={{flex:1,padding:'10px 12px',borderRadius:8,background:'#4f46e5',color:'#fff',border:0}}> <Save /> Save Donor</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="donors-container">
          <p style={{margin:0}}>Built with Next.js, React, PostCSS, and Neon DB</p>
        </div>
      </footer>
    </div>
  );
}
 
