import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import FloorPlan from './pages/FloorPlan';
import Tenants from './pages/Tenants';
import Billing from './pages/Billing';
import Maintenance from './pages/Maintenance';
import Visitors from './pages/Visitors';
import Sidebar from './components/Sidebar';
import './App.css';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const pages = {
    dashboard: <Dashboard />,
    floorplan: <FloorPlan />,
    tenants: <Tenants />,
    billing: <Billing />,
    maintenance: <Maintenance />,
    visitors: <Visitors />,
  };

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="app-main">
        {pages[activePage]}
      </main>
    </div>
  );
}

