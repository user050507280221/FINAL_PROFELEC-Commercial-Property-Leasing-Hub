import React, { useState } from 'react';

// Initial data for the "Teen T-ITans Tower"
const initialUnits = [
  { id: 'A1', x: 20, y: 20, w: 120, h: 80, type: 'Large Suite', status: 'occupied', tenant: 'TechCorp PH', size: '180 sqm', rent: '₱85,000', contact: 'Angel A. Benitez' },
  { id: 'A2', x: 160, y: 20, w: 100, h: 80, type: 'Small Office', status: 'available', tenant: null, size: '90 sqm', rent: '₱42,000', contact: null },
  { id: 'A3', x: 280, y: 20, w: 120, h: 80, type: 'Large Suite', status: 'occupied', tenant: 'GlobalLink Inc.', size: '200 sqm', rent: '₱120,000', contact: 'Danred D. Peña' },
  { id: 'A4', x: 420, y: 20, w: 100, h: 80, type: 'Co-working', status: 'occupied', tenant: 'NovaBiz Hub', size: '110 sqm', rent: '₱72,000', contact: 'James O. Ayunting' },
  { id: 'A5', x: 540, y: 20, w: 100, h: 80, type: 'Small Office', status: 'maintenance', tenant: null, size: '75 sqm', rent: '₱35,000', contact: null },
  { id: 'B1', x: 20, y: 130, w: 100, h: 90, type: 'Small Office', status: 'available', tenant: null, size: '85 sqm', rent: '₱40,000', contact: null },
  { id: 'B2', x: 140, y: 130, w: 140, h: 90, type: 'Large Suite', status: 'occupied', tenant: 'Vertex Solutions', size: '220 sqm', rent: '₱55,000', contact: 'James O. Ayunting' },
  { id: 'B3', x: 300, y: 130, w: 100, h: 90, type: 'Co-working', status: 'available', tenant: null, size: '95 sqm', rent: '₱48,000', contact: null },
  { id: 'B4', x: 420, y: 130, w: 100, h: 90, type: 'Small Office', status: 'occupied', tenant: 'CloudBase PH', size: '80 sqm', rent: '₱38,000', contact: 'Lujille M. Banal' },
  { id: 'B5', x: 540, y: 130, w: 100, h: 90, type: 'Large Suite', status: 'maintenance', tenant: null, size: '190 sqm', rent: '₱95,000', contact: null },
  { id: 'C1', x: 20, y: 250, w: 160, h: 80, type: 'Large Suite', status: 'occupied', tenant: 'InnovaGroup', size: '250 sqm', rent: '₱140,000', contact: 'Mark Reyes' },
  { id: 'C2', x: 200, y: 250, w: 100, h: 80, type: 'Co-working', status: 'available', tenant: null, size: '100 sqm', rent: '₱50,000', contact: null },
  { id: 'C3', x: 320, y: 250, w: 100, h: 80, type: 'Small Office', status: 'occupied', tenant: 'PixelWorks', size: '78 sqm', rent: '₱36,000', contact: 'Nia Lopez' },
  { id: 'C4', x: 440, y: 250, w: 100, h: 80, type: 'Co-working', status: 'available', tenant: null, size: '92 sqm', rent: '₱46,000', contact: null },
  { id: 'C5', x: 560, y: 250, w: 80, h: 80, type: 'Small Office', status: 'occupied', tenant: 'DataSync', size: '70 sqm', rent: '₱33,000', contact: 'Chris Uy' },
];

const statusColor = { occupied: '#d1fae5', available: '#f1f5f9', maintenance: '#fef3c7' };
const statusStroke = { occupied: '#6ee7b7', available: '#cbd5e1', maintenance: '#fcd34d' };
const statusText = { occupied: '#065f46', available: '#64748b', maintenance: '#92400e' };
const filters = ['All', 'Small Office', 'Large Suite', 'Co-working'];

export default function FloorPlan() {
  const [unitsData, setUnitsData] = useState(initialUnits);
  const [selectedId, setSelectedId] = useState(null); // Store only ID to avoid stale state
  const [activeFilter, setActiveFilter] = useState('All');
  const [sideView, setSideView] = useState('details');
  const [formName, setFormName] = useState('');

  // Find the currently selected unit from our stateful data
  const selected = unitsData.find(u => u.id === selectedId);

  const handleSelectUnit = (unit) => {
    setSelectedId(unit.id);
    setSideView('details');
    setFormName('');
  };

  // FUNCTION: Finalize Lease (Updates status to occupied)
  const handleFinalizeLease = () => {
    if (!formName) return alert("Please enter a tenant name.");
    
    setUnitsData(prev => prev.map(u => 
      u.id === selectedId 
        ? { ...u, status: 'occupied', tenant: formName, contact: 'New Registry' } 
        : u
    ));
    setSideView('details');
  };

  // FUNCTION: Mark as Fixed (Updates maintenance to available)
  const handleMarkFixed = () => {
    setUnitsData(prev => prev.map(u => 
      u.id === selectedId 
        ? { ...u, status: 'available', tenant: null } 
        : u
    ));
    setSideView('details');
  };

  return (
    <div className="animate-in">
      <div className="page-header">
        <h1>Interactive Floor Plan</h1>
        <p>Teen T-ITans Tower · Floor 3 · Click any unit for details</p>
      </div>

      <div className="floor-filter-bar">
        {filters.map(f => (
          <button key={f} className={`filter-btn ${activeFilter === f ? 'active' : ''}`} onClick={() => setActiveFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      <div className="floor-layout">
        <div className="svg-container">
          <svg viewBox="0 0 660 360" width="100%" height="100%" style={{ minHeight: 340 }}>
            <rect x="10" y="10" width="640" height="340" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
            <g className="floor-utilities" opacity="0.1">
                <rect x="270" y="110" width="60" height="120" rx="8" fill="#cbd5e1" />
                <text x="300" y="165" textAnchor="middle" fontSize="8" fill="#64748b" fontWeight="800">ELEVATOR</text>
            </g>

            {unitsData.map(u => {
              const dimmed = activeFilter !== 'All' && u.type !== activeFilter;
              const isSelected = selectedId === u.id;
              return (
                <g key={u.id} onClick={() => handleSelectUnit(u)} style={{ cursor: 'pointer', transition: 'all 0.2s ease' }} opacity={dimmed ? 0.2 : 1}>
                  <rect x={u.x} y={u.y} width={u.w} height={u.h} rx="6" fill={statusColor[u.status]} stroke={isSelected ? '#10b981' : statusStroke[u.status]} strokeWidth={isSelected ? 2.5 : 1} />
                  <text x={u.x + u.w / 2} y={u.y + u.h / 2 - 6} textAnchor="middle" fontSize="10" fontWeight="700" fill={statusText[u.status]}>{u.id}</text>
                  <text x={u.x + u.w / 2} y={u.y + u.h / 2 + 8} textAnchor="middle" fontSize="7.5" fill={statusText[u.status]} opacity="0.7">
                    {u.tenant ? (u.tenant.length > 10 ? u.tenant.substring(0, 8) + '...' : u.tenant) : u.type}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {selected && (
          <div className="slide-panel animate-in">
            {sideView === 'details' && (
              <>
                <div className="flex-between">
                  <div className="panel-title">Unit {selected.id}</div>
                  <button className="btn btn-ghost" onClick={() => setSelectedId(null)}>✕</button>
                </div>
                <span className={`badge ${selected.status === 'occupied' ? 'badge-green' : selected.status === 'maintenance' ? 'badge-amber' : 'badge-slate'}`} style={{ marginTop: 8, display: 'inline-flex' }}>
                  {selected.status.toUpperCase()}
                </span>
                <div className="panel-divider" />
                <div className="panel-row"><span className="label">Area</span><span className="value">{selected.size}</span></div>
                <div className="panel-row"><span className="label">Rent</span><span className="value font-mono">{selected.rent}</span></div>

                {selected.tenant ? (
                  <button className="btn btn-primary" style={{ width: '100%', marginTop: 16 }} onClick={() => setSideView('profile')}>View Full Profile →</button>
                ) : (
                  <button className="btn btn-primary" style={{ width: '100%', marginTop: 16 }} onClick={() => setSideView(selected.status === 'maintenance' ? 'ticket' : 'lease')}>
                    {selected.status === 'maintenance' ? '🔧 View Ticket' : '➕ Create Lease'}
                  </button>
                )}
              </>
            )}

            {sideView === 'profile' && (
              <div className="animate-in">
                <button className="btn btn-ghost" onClick={() => setSideView('details')}>← Back</button>
                <div className="panel-title" style={{ marginTop: 10 }}>{selected.tenant}</div>
                <div className="panel-divider" />
                <div className="panel-row"><span className="label">Contact</span><span className="value">{selected.contact}</span></div>
                <button className="btn btn-primary" style={{ width: '100%', marginTop: 20 }}>Message Tenant</button>
              </div>
            )}

            {sideView === 'lease' && (
              <div className="animate-in">
                <button className="btn btn-ghost" onClick={() => setSideView('details')}>← Back</button>
                <div className="panel-title" style={{ marginTop: 10 }}>New Lease: {selected.id}</div>
                <div className="panel-divider" />
                <label style={{ fontSize: 11, fontWeight: 700 }}>TENANT NAME</label>
                <input 
                    className="form-input" 
                    value={formName} 
                    onChange={(e) => setFormName(e.target.value)}
                    style={{ width: '100%', marginBottom: 12, padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} 
                    placeholder="Enter name..." 
                />
                <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleFinalizeLease}>Finalize Lease</button>
              </div>
            )}

            {sideView === 'ticket' && (
              <div className="animate-in">
                <button className="btn btn-ghost" onClick={() => setSideView('details')}>← Back</button>
                <div className="panel-title" style={{ marginTop: 10 }}>Repair Ticket: {selected.id}</div>
                <div className="panel-divider" />
                <div className="panel-row"><span className="label">Issue</span><span className="value">General Checkup</span></div>
                <button className="btn btn-primary" style={{ width: '100%', marginTop: 20 }} onClick={handleMarkFixed}>Mark as Fixed</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}