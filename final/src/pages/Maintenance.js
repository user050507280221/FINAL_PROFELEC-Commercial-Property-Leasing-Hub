import React, { useState } from 'react';

// Configuration for UI consistency
const priorityBadge = { high: 'badge-red', medium: 'badge-amber', low: 'badge-green' };
const colMeta = {
  open: { label: 'Open', icon: '🔴', bg: '#fff' },
  inprogress: { label: 'In Progress', icon: '🟡', bg: '#fffbf0' },
  resolved: { label: 'Resolved', icon: '🟢', bg: '#f0fdf4' },
};

export default function Maintenance() {
  // 1. State Management
  const [ticketData, setTicketData] = useState({
    open: [
      { id: '#108', title: 'HVAC not cooling — Floor 3', unit: 'B2', priority: 'high', reported: 'Jun 8, 2026', reporter: 'Leo Cruz', type: 'HVAC / Cooling' },
      { id: '#110', title: 'Elevator 2 door malfunction', unit: 'Common', priority: 'high', reported: 'Jun 9, 2026', reporter: 'Building Staff', type: 'Elevator' },
      { id: '#112', title: 'Networking port dead — Rack A', unit: 'A3', priority: 'medium', reported: 'Jun 10, 2026', reporter: 'Jake Rivera', type: 'Networking' },
    ],
    inprogress: [
      { id: '#105', title: 'Flood light flickering — Parking B1', unit: 'Parking', priority: 'medium', reported: 'Jun 4, 2026', reporter: 'Security', type: 'Electrical', assigned: 'Ryan Dela Cruz' },
      { id: '#107', title: 'Water leak — Comfort Room Floor 5', unit: 'CR-5F', priority: 'high', reported: 'Jun 6, 2026', reporter: 'Ana Reyes', type: 'Plumbing', assigned: 'Jun Magsino' },
    ],
    resolved: [
      { id: '#101', title: 'AC unit replaced — Unit A5', unit: 'A5', priority: 'low', reported: 'May 28, 2026', resolved: 'Jun 1, 2026', type: 'HVAC / Cooling' },
      { id: '#103', title: 'Glass door broken — Lobby', unit: 'Lobby', priority: 'medium', reported: 'May 30, 2026', resolved: 'Jun 3, 2026', type: 'Structural' },
      { id: '#104', title: 'CCTV offline — Floor 2', unit: '2F', priority: 'low', reported: 'Jun 1, 2026', resolved: 'Jun 5, 2026', type: 'Security' },
    ],
  });

  const [selected, setSelected] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ title: '', unit: '', priority: 'medium', type: 'General' });

  // Helpers
  const allTickets = Object.values(ticketData).flat();
  const detail = selected ? allTickets.find(t => t.id === selected) : null;

  // 2. Logic: Add Ticket (FIXED DATE LOGIC)
  const handleAddTicket = (e) => {
    if (e) e.preventDefault();
    
    if (!formData.title.trim() || !formData.unit.trim()) {
      alert("Mangyaring punan ang lahat ng fields.");
      return;
    }

    const newId = `#${113 + allTickets.length}`;
    const newEntry = {
      ...formData,
      id: newId,
      // FIXED: 'year' must be 'numeric', not a specific number
      reported: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      reporter: 'Staff Admin'
    };

    setTicketData(prev => ({
      ...prev,
      open: [newEntry, ...prev.open]
    }));
    setIsAdding(false);
    setFormData({ title: '', unit: '', priority: 'medium', type: 'General' });
  };

  // 3. Logic: Update Status
  const handleUpdateStatus = (currentId) => {
    let ticketToMove = null;
    let currentColumn = '';

    Object.keys(ticketData).forEach(col => {
      const found = ticketData[col].find(t => t.id === currentId);
      if (found) {
        ticketToMove = { ...found }; // Clone the object
        currentColumn = col;
      }
    });

    if (!ticketToMove) return;

    const nextState = { ...ticketData };
    nextState[currentColumn] = nextState[currentColumn].filter(t => t.id !== currentId);

    if (currentColumn === 'open') {
      ticketToMove.assigned = 'Technical Team';
      nextState.inprogress = [ticketToMove, ...nextState.inprogress];
    } else if (currentColumn === 'inprogress') {
      ticketToMove.resolved = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      nextState.resolved = [ticketToMove, ...nextState.resolved];
    }

    setTicketData(nextState);
  };

  return (
    <div className="animate-in">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h1>Maintenance & Facilities</h1>
            <p>Priority ticketing system · Building-wide issue tracking</p>
          </div>
          <button 
            className="btn btn-primary" 
            onClick={() => { setIsAdding(!isAdding); setSelected(null); }}
          >
            {isAdding ? '✕ Close' : '➕ New Ticket'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Open', value: ticketData.open.length, color: 'var(--red)', icon: '🔴' },
          { label: 'In Progress', value: ticketData.inprogress.length, color: 'var(--amber)', icon: '🟡' },
          { label: 'Resolved', value: ticketData.resolved.length, color: 'var(--emerald)', icon: '🟢' },
          { label: 'Avg. Resolution', value: '3.2d', color: 'var(--blue)', icon: '⏱️' },
        ].map((s, i) => (
          <div key={i} className="glass-card" style={{ padding: '16px 20px' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{s.icon} {s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, fontFamily: 'DM Mono', color: s.color, marginTop: 6 }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <div className="kanban-board" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {Object.entries(ticketData).map(([col, items]) => (
              <div key={col} style={{ background: colMeta[col].bg, borderRadius: '8px', border: '1px solid var(--border)', padding: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 12, display: 'flex', justifyContent: 'space-between' }}>
                  <span>{colMeta[col].icon} {colMeta[col].label}</span>
                  <span className="badge-slate">{items.length}</span>
                </div>
                {items.map(t => (
                  <div
                    key={t.id}
                    className={`ticket-card priority-${t.priority}`}
                    onClick={() => { setSelected(t.id); setIsAdding(false); }}
                    style={{ 
                      background: selected === t.id ? 'var(--emerald-light)' : 'white',
                      padding: 12, borderRadius: 8, border: '1px solid var(--border)', marginBottom: 10, cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span className="font-mono" style={{ fontSize: 10, color: 'var(--text-muted)' }}>{t.id}</span>
                      <span className={`badge ${priorityBadge[t.priority]}`}>{t.priority.toUpperCase()}</span>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{t.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>📍 {t.unit} · 🏷️ {t.type}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: 300 }}>
          {isAdding ? (
            <div className="glass-card animate-in">
              <div className="section-title">New Request</div>
              <div className="panel-divider" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input 
                  className="form-input" placeholder="Issue Title" 
                  value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                />
                <input 
                  className="form-input" placeholder="Unit / Area" 
                  value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})}
                />
                <select 
                  className="form-input" 
                  value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <button className="btn btn-primary" onClick={handleAddTicket}>Create Ticket</button>
              </div>
            </div>
          ) : detail ? (
            <div className="glass-card animate-in">
              <div className="flex-between">
                <div className="panel-title">Ticket {detail.id}</div>
                <button className="btn btn-ghost" onClick={() => setSelected(null)}>✕</button>
              </div>
              <span className={`badge ${priorityBadge[detail.priority]}`} style={{ marginTop: 8, display: 'inline-block' }}>
                {detail.priority.toUpperCase()} PRIORITY
              </span>
              <div className="panel-divider" />
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>{detail.title}</div>
              <div className="panel-row"><span className="label">Unit</span><span className="value">{detail.unit}</span></div>
              <div className="panel-row"><span className="label">Reported</span><span className="value">{detail.reported}</span></div>
              
              <div className="panel-divider" />
              {detail.resolved ? (
                <div style={{ textAlign: 'center', color: 'var(--emerald)', fontSize: 12, fontWeight: 600 }}>✅ Resolved on {detail.resolved}</div>
              ) : (
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%' }} 
                  onClick={() => handleUpdateStatus(detail.id)}
                >
                  {ticketData.open.some(t => t.id === detail.id) ? 'Start Work' : 'Mark as Resolved'}
                </button>
              )}
            </div>
          ) : (
            <div className="glass-card" style={{ textAlign: 'center', padding: 40, opacity: 0.6 }}>
              <div style={{ fontSize: 32 }}>🔧</div>
              <p style={{ fontSize: 12 }}>Select a ticket or click "New Ticket" to begin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}