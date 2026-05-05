import React, { useState } from 'react';

const visitors = [
  { name: 'Juan Santos', host: 'Angel A. Benitez (TechCorp PH)', unit: '3B', date: 'Jun 10, 2024', time: '10:00 AM', status: 'Checked In', statusClass: 'badge-green', pass: 'VP-20240610-001' },
  { name: 'Claire Lim', host: 'Danred D. Peña (GlobalLink Inc.)', unit: '7A', date: 'Jun 10, 2024', time: '2:00 PM', status: 'Pre-Registered', statusClass: 'badge-blue', pass: 'VP-20240610-002' },
  { name: 'Ryan Orozco', host: 'Denver Paul C. Ramos (Vertex Solutions)', unit: '2C', date: 'Jun 10, 2024', time: '3:30 PM', status: 'Pre-Registered', statusClass: 'badge-blue', pass: 'VP-20240610-003' },
  { name: 'Diane Ocampo', host: 'James O. Ayunting (NovaBiz Hub)', unit: '4D', date: 'Jun 9, 2024', time: '9:00 AM', status: 'Checked Out', statusClass: 'badge-slate', pass: 'VP-20240609-005' },
  { name: 'Rommel Bautista', host: 'Lujille M. Banal (CloudBase PH)', unit: 'B4', date: 'Jun 9, 2024', time: '11:00 AM', status: 'Checked Out', statusClass: 'badge-slate', pass: 'VP-20240609-006' },
];

const initialForm = { name: '', company: '', host: '', unit: '', date: '', time: '', purpose: '' };

export default function Visitors() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [generated, setGenerated] = useState(null);
  const [isSending, setIsSending] = useState(false); // New state for SaaS feedback

  const handleGenerate = () => {
    if (!form.name || !form.host || !form.unit) return;
    
    // Professional Pass ID logic: VP + Date + Random ID
    const dateStr = form.date ? form.date.replace(/-/g, '').substring(2) : '240504';
    const randomID = Math.floor(100 + Math.random() * 900);
    const pass = `VP-${dateStr}-${randomID}`;
    
    setGenerated({ ...form, pass });
    setShowForm(false);
  };

  const simulateSend = () => {
    setIsSending(true);
    setTimeout(() => {
      alert(`Pass ${generated.pass} has been sent to ${generated.name}'s email and mobile!`);
      setIsSending(false);
    }, 1500);
  };

  return (
    <div className="animate-in">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h1>Visitor & Access Management</h1>
            <p>Pre-register guests · Issue digital passes · Track entries</p>
          </div>
          <button className="btn btn-primary" onClick={() => { setShowForm(true); setGenerated(null); setForm(initialForm); }}>
            ➕ Pre-Register Guest
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Today\'s Visitors', value: '8', icon: '👥' },
          { label: 'Currently Inside', value: '3', icon: '🏢' },
          { label: 'Pre-Registered', value: '2', icon: '📋' },
          { label: 'Total This Month', value: '142', icon: '📊' },
        ].map((s, i) => (
          <div key={i} className="glass-card" style={{ padding: '16px 20px', borderLeft: '4px solid var(--emerald)' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.6px' }}>{s.icon} {s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, fontFamily: 'DM Mono', color: 'var(--text-primary)', marginTop: 6 }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>
        {/* Visitor Log */}
        <div className="glass-card">
          <div className="section-title" style={{ marginBottom: 4 }}>Visitor Log</div>
          <div className="section-sub">Real-time entry and exit tracking</div>
          <table className="data-table" style={{ marginTop: 12 }}>
            <thead>
              <tr>
                <th>Visitor</th>
                <th>Host / Unit</th>
                <th>Date & Time</th>
                <th>Pass ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {visitors.map((v, i) => (
                <tr key={i}>
                  <td className="td-bold">{v.name}</td>
                  <td style={{ fontSize: 12 }}>{v.host}<br /><span style={{ color: 'var(--text-muted)' }}>Unit {v.unit}</span></td>
                  <td>{v.date}<br /><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{v.time}</span></td>
                  <td className="font-mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>{v.pass}</td>
                  <td><span className={`badge ${v.statusClass}`}>● {v.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Panel: Conditional Content */}
        <div>
          {showForm && (
            <div className="glass-card animate-in">
              <div className="section-title" style={{ marginBottom: 16 }}>Register New Guest</div>
              {[
                { label: 'Guest Full Name', key: 'name', placeholder: 'e.g. Juan Santos' },
                { label: 'Host (Tenant Contact)', key: 'host', placeholder: 'e.g. Angel A. Benitez' },
                { label: 'Unit / Office', key: 'unit', placeholder: 'e.g. 3B' },
                { label: 'Visit Date', key: 'date', type: 'date' },
                { label: 'Expected Time', key: 'time', type: 'time' },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 12 }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>{f.label}</label>
                  <input
                    type={f.type || 'text'}
                    className="form-input"
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }}
                  />
                </div>
              ))}
              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setShowForm(false)}>Cancel</button>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleGenerate}>🪪 Generate Pass</button>
              </div>
            </div>
          )}

          {generated && (
            <div className="animate-in">
              <div className="glass-card" style={{ border: '2px solid var(--emerald)', padding: 24, textAlign: 'center' }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--emerald)', marginBottom: 16 }}>
                  ✅ Valid Digital Pass
                </div>
                
                <div className="qr-placeholder" style={{ background: '#f8fafc', padding: 20, borderRadius: 16, marginBottom: 16, display: 'inline-block' }}>
                  <svg viewBox="0 0 100 100" width="100" height="100">
                    {[0,1,2,3,4,5,6].flatMap(r => [0,1,2,3,4,5,6].map(c => {
                      const val = ((r * 7 + c) * 17 + r + c * 3) % 3;
                      return val === 0 ? <rect key={`${r}-${c}`} x={c * 14 + 1} y={r * 14 + 1} width={12} height={12} rx={2} fill="#0f1923" /> : null;
                    }))}
                    <rect x="2" y="2" width="38" height="38" rx="4" fill="none" stroke="#0f1923" strokeWidth="4" />
                    <rect x="60" y="2" width="38" height="38" rx="4" fill="none" stroke="#0f1923" strokeWidth="4" />
                    <rect x="2" y="60" width="38" height="38" rx="4" fill="none" stroke="#0f1923" strokeWidth="4" />
                  </svg>
                </div>

                <h3 style={{ margin: '0 0 4px 0', fontSize: 18 }}>{generated.name}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>{generated.company || 'Private Visit'}</p>
                
                <div className="panel-divider" style={{ borderStyle: 'dashed' }} />
                
                <div style={{ textAlign: 'left', margin: '16px 0', fontSize: 12 }}>
                  <div style={{ marginBottom: 6 }}>🏢 <strong>Unit:</strong> {generated.unit}</div>
                  <div style={{ marginBottom: 6 }}>👤 <strong>Host:</strong> {generated.host}</div>
                  <div style={{ marginBottom: 6 }}>📅 <strong>Schedule:</strong> {generated.date} @ {generated.time}</div>
                </div>

                <div className="font-mono" style={{ background: 'var(--slate-light)', padding: '6px', borderRadius: '4px', fontSize: 11, letterSpacing: '1px' }}>
                  {generated.pass}
                </div>

                <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                  <button 
                    className="btn btn-primary" 
                    style={{ flex: 1 }} 
                    onClick={simulateSend}
                    disabled={isSending}
                  >
                    {isSending ? 'Sending...' : '📤 Send Pass'}
                  </button>
                  <button className="btn btn-ghost" style={{ padding: '10px' }}>🖨️</button>
                </div>
              </div>
              <button 
                className="btn btn-ghost" 
                style={{ width: '100%', marginTop: 12 }}
                onClick={() => { setShowForm(true); setGenerated(null); }}
              >
                Register Another Guest
              </button>
            </div>
          )}

          {!showForm && !generated && (
            <div className="glass-card" style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🪪</div>
              <h3 style={{ marginBottom: 8 }}>Guest Registration</h3>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 24 }}>
                Generate secure, temporary access codes for office visitors and service providers.
              </p>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setShowForm(true)}>
                Start Registration →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}