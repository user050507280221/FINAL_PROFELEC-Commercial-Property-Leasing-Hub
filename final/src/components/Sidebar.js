import React from 'react';
import logoImg from '../logo.jpg'; 

const navItems = [
  { id: 'dashboard', icon: '📊', label: 'Executive Dashboard' },
  { id: 'floorplan', icon: '🗺️', label: 'Floor Plan' },
  { id: 'tenants', icon: '🏢', label: 'Tenant CRM' },
  { id: 'billing', icon: '💳', label: 'Billing & Finance' },
  { id: 'maintenance', icon: '🔧', label: 'Maintenance' },
  { id: 'visitors', icon: '🪪', label: 'Visitor Access' },
];

export default function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">
          <img src={logoImg} className="logo-img-fix" alt="Teen T-ITans Logo" />
          <div>
            <div className="logo-text">TEEN T-ITANS</div>
            <div className="logo-sub">Unified Property Hub</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-label">Navigation</div>
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => setActivePage(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-avatar">
          <div className="avatar-img">AM</div>
          <div className="avatar-info">
            <div className="name">Alex Mendoza</div>
            <div className="role">Property Manager</div>
          </div>
        </div>
      </div>
    </aside>
  );
}