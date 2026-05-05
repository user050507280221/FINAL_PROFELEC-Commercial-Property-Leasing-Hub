import React, { useState } from 'react';

const initialTenants = [
  {
    name: 'TechCorp PH',
    initials: 'TC',
    color: '#10b981',
    unit: '3B',
    contact: 'Angel A. Benitez',
    email: 'angelbenitez@techcorp.ph',
    phone: '+63 917 123 4567',
    leaseStart: 'Jan 1, 2023',
    leaseEnd: 'Dec 31, 2025',
    rent: '₱85,000/mo',
    badge: 'Premium Tenant',
    badgeClass: 'badge-green',
    daysLeft: 570,
    docs: [
      { name: 'Lease Contract 2023', type: 'PDF', signed: true },
      { name: 'Insurance Certificate', type: 'PDF', signed: true },
    ],
    paid: 'Monthly',
  },
  {
    name: 'GlobalLink Inc.',
    initials: 'GL',
    color: '#3b82f6',
    unit: '7A',
    contact: 'Danred D. Peña',
    email: 'danredpeña@globallink.com',
    phone: '+63 918 234 5678',
    leaseStart: 'Mar 1, 2023',
    leaseEnd: 'Feb 28, 2026',
    rent: '₱120,000/mo',
    badge: 'Quarterly Paid',
    badgeClass: 'badge-blue',
    daysLeft: 630,
    docs: [
      { name: 'Lease Contract 2023', type: 'PDF', signed: true },
      { name: 'Business Permit', type: 'DOCX', signed: false },
    ],
    paid: 'Quarterly',
  },
  {
    name: 'Vertex Solutions',
    initials: 'VS',
    color: '#f59e0b',
    unit: '2C',
    contact: 'Denver Paul C. Ramos',
    email: 'ramosdenver@vertex.ph',
    phone: '+63 919 345 6789',
    leaseStart: 'Jun 1, 2022',
    leaseEnd: 'Jul 31, 2024',
    rent: '₱55,000/mo',
    badge: 'Lease Expiring',
    badgeClass: 'badge-amber',
    daysLeft: 22,
    docs: [
      { name: 'Lease Contract 2022', type: 'PDF', signed: true },
      { name: 'Insurance Certificate', type: 'PDF', signed: true },
    ],
    paid: 'Monthly',
  },
  {
    name: 'NovaBiz Hub',
    initials: 'NB',
    color: '#8b5cf6',
    unit: '4D',
    contact: 'James O. Ayunting',
    email: 'ayuntingjames@novabiz.ph',
    phone: '+63 920 456 7890',
    leaseStart: 'Sep 1, 2023',
    leaseEnd: 'Aug 31, 2025',
    rent: '₱72,000/mo',
    badge: 'Premium Tenant',
    badgeClass: 'badge-green',
    daysLeft: 420,
    docs: [
      { name: 'Lease Contract 2023', type: 'PDF', signed: true },
      { name: 'NDA Agreement', type: 'DOCX', signed: true },
    ],
    paid: 'Semi-Annual',
  },
  {
    name: 'CloudBase PH',
    initials: 'CB',
    color: '#06b6d4',
    unit: 'B4',
    contact: 'Lujille M. Banal',
    email: 'lujillebanal@cloudbase.ph',
    phone: '+63 921 567 8901',
    leaseStart: 'Feb 1, 2024',
    leaseEnd: 'Jan 31, 2026',
    rent: '₱38,000/mo',
    badge: 'New Tenant',
    badgeClass: 'badge-blue',
    daysLeft: 570,
    docs: [
      { name: 'Lease Contract 2024', type: 'PDF', signed: true },
    ],
    paid: 'Monthly',
  },
];

export default function Tenants() {
  const [tenantsData, setTenantsData] = useState(initialTenants);
  const [expanded, setExpanded] = useState(null);
  const [isEditingName, setIsEditingName] = useState(null); // Tracks which tenant name is being edited

  // FUNCTION: Add a new tenant and immediately open it for editing
  const handleAddTenant = () => {
    const newTenant = {
      name: 'New Tenant Name',
      initials: '??',
      color: '#6366f1',
      unit: 'TBD',
      contact: 'Admin Office',
      email: 'admin@company.ph',
      phone: '+63 000 000 0000',
      leaseStart: 'May 1, 2026',
      leaseEnd: 'May 1, 2027',
      rent: '₱0/mo',
      badge: 'Pending Setup',
      badgeClass: 'badge-slate',
      daysLeft: 365,
      docs: [{ name: 'Onboarding Doc', type: 'PDF', signed: false }],
      paid: 'Pending',
    };
    setTenantsData([newTenant, ...tenantsData]);
    setExpanded(0); // Open the new tenant card
    setIsEditingName(0); // Start editing the name immediately
  };

  // FUNCTION: Update the name and initials dynamically
  const handleUpdateName = (index, newName) => {
    const updated = [...tenantsData];
    updated[index].name = newName;
    // Automatically update initials based on first two characters or words
    updated[index].initials = newName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || '??';
    setTenantsData(updated);
  };

  const toggleSignDoc = (tenantIndex, docIndex) => {
    const updated = [...tenantsData];
    updated[tenantIndex].docs[docIndex].signed = !updated[tenantIndex].docs[docIndex].signed;
    setTenantsData(updated);
  };

  return (
    <div className="animate-in">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h1>Tenant CRM</h1>
            <p>Corporate tenant profiles, documents, and lease tracking</p>
          </div>
          <button className="btn btn-primary" onClick={handleAddTenant}>➕ Add Tenant</button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {tenantsData.map((t, i) => {
          const pct = Math.max(0, Math.min(100, Math.round((t.daysLeft / 730) * 100)));
          const isOpen = expanded === i;
          const editing = isEditingName === i;

          return (
            <div className="glass-card" key={i} style={{ padding: 0, overflow: 'hidden', transition: 'all 0.3s ease' }}>
              {/* Header Row */}
              <div
                className="flex-between"
                style={{ padding: '18px 24px', cursor: 'pointer', background: isOpen ? 'rgba(0,0,0,0.02)' : 'transparent' }}
                onClick={() => setExpanded(isOpen ? null : i)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: t.color + '22',
                    border: `2px solid ${t.color}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: 14, color: t.color,
                  }}>
                    {t.initials}
                  </div>
                  <div>
                    {editing ? (
                      <input 
                        autoFocus
                        value={t.name}
                        onClick={(e) => e.stopPropagation()} // Prevent card closing when clicking input
                        onChange={(e) => handleUpdateName(i, e.target.value)}
                        onBlur={() => setIsEditingName(null)} // Stop editing when clicking away
                        onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(null)}
                        style={{ border: '1px solid var(--blue)', padding: '2px 8px', borderRadius: '4px', fontSize: '15px', fontWeight: 700 }}
                      />
                    ) : (
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{t.name}</div>
                    )}
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                      Unit {t.unit} · {t.contact}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span className={`badge ${t.badgeClass}`}>● {t.badge}</span>
                  <span className="font-mono" style={{ fontSize: 13, fontWeight: 700 }}>{t.rent}</span>
                  <span style={{ 
                    color: 'var(--text-muted)', 
                    fontSize: 18, 
                    transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', 
                    transition: 'transform 0.2s',
                    display: 'inline-block' 
                  }}>›</span>
                </div>
              </div>

              {/* Expanded Detail */}
              {isOpen && (
                <div className="animate-in" style={{ borderTop: '1px solid var(--border)', padding: '20px 24px', background: 'rgba(248,250,252,0.6)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
                    <div>
                      <div className="section-title" style={{ marginBottom: 12, fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>Lease Details</div>
                      <div className="panel-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}><span className="label">Start Date</span><span className="value">{t.leaseStart}</span></div>
                      <div className="panel-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}><span className="label">End Date</span><span className="value">{t.leaseEnd}</span></div>
                      
                      <div style={{ marginTop: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>
                          <span>Lease Progress</span>
                          <strong>{t.daysLeft} days left</strong>
                        </div>
                        <div style={{ height: 6, background: '#e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${pct}%`, background: t.daysLeft < 60 ? '#f59e0b' : '#10b981' }} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="section-title" style={{ marginBottom: 12, fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>Primary Contact</div>
                      <div className="panel-row" style={{ marginBottom: 8 }}>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Name</div>
                        <div 
                          style={{ fontSize: 14, fontWeight: 600, cursor: 'pointer', borderBottom: '1px dashed #ccc' }}
                          onClick={() => setIsEditingName(i)}
                        >
                          {t.name} ✏️
                        </div>
                      </div>
                      <div className="panel-row" style={{ marginBottom: 8 }}><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Email</div><div style={{ fontSize: 13 }}>{t.email}</div></div>
                    </div>

                    <div>
                      <div className="section-title" style={{ marginBottom: 12, fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>Document Vault</div>
                      {t.docs.map((d, j) => (
                        <div key={j} onClick={() => toggleSignDoc(i, j)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'white', borderRadius: 8, border: '1px solid var(--border)', marginBottom: 8, cursor: 'pointer' }}>
                          <div style={{ width: 32, height: 32, borderRadius: 6, background: d.type === 'PDF' ? '#fee2e2' : '#dbeafe', color: d.type === 'PDF' ? '#ef4444' : '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
                            {d.type === 'PDF' ? 'PDF' : 'DOC'}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 12, fontWeight: 600 }}>{d.name}</div>
                            <div style={{ fontSize: 10, color: d.signed ? '#10b981' : '#f59e0b', fontWeight: 600 }}>{d.signed ? '✅ Signed' : '⏳ Click to Sign'}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}