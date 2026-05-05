import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  // 1. Initialize state with your existing static data
  const [kpis, setKpis] = useState([
    { label: 'Total Occupancy Rate', value: 87, trend: '▲ 3.2% vs last month', trendClass: 'trend-up', accent: '#10b981', spark: [40, 55, 48, 62, 58, 70, 75, 87] },
    { label: 'Revenue This Month', value: 2400000, trend: '▲ ₱180K vs last month', trendClass: 'trend-up', accent: '#3b82f6', spark: [60, 65, 58, 72, 80, 74, 90, 95] },
    { label: 'Pending Maintenance', value: 12, trend: '▼ 4 resolved today', trendClass: 'trend-warn', accent: '#f59e0b', spark: [8, 14, 10, 16, 12, 18, 14, 12] },
    { label: 'Expiring Leases', value: 5, trend: '⚠ Within 60 days', trendClass: 'trend-down', accent: '#ef4444', spark: [2, 3, 4, 3, 5, 5, 4, 5] },
  ]);

  const [heatmapData, setHeatmapData] = useState([]);
  const [activities, setActivities] = useState([
    { dot: '#10b981', text: 'TechCorp PH signed 2-year lease for Unit 3B', time: 'Just now' },
    { dot: '#f59e0b', text: 'HVAC maintenance ticket #108 escalated to High priority', time: '4 hours ago' },
    { dot: '#3b82f6', text: 'Invoice INV-2024-087 sent to GlobalLink Inc.', time: '6 hours ago' },
  ]);

  // 2. Real-time Simulation Logic
  useEffect(() => {
    // Generate initial heatmap
    const statuses = ['occupied', 'occupied', 'available', 'maintenance'];
    setHeatmapData(Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      status: statuses[Math.floor(Math.random() * statuses.length)]
    })));

    // Interval to simulate data changes every 5 seconds
    const interval = setInterval(() => {
      // Update KPIs slightly
      setKpis(prev => prev.map(k => {
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        const newValue = Math.max(0, k.value + (k.label === 'Revenue This Month' ? change * 5000 : change));
        return { 
          ...k, 
          value: newValue,
          spark: [...k.spark.slice(1), newValue > 100 ? 90 : newValue] // Shift sparkline
        };
      }));

      // Randomly update one heatmap unit
      setHeatmapData(prev => prev.map(u => 
        u.id === Math.floor(Math.random() * 40) + 1 
        ? { ...u, status: statuses[Math.floor(Math.random() * statuses.length)] } 
        : u
      ));
    }, 5000);

    return () => clearInterval(interval); // Cleanup to prevent memory leaks
  }, []);

  // Helper to format currency
  const formatCurrency = (val) => `₱${(val / 1000000).toFixed(1)}M`;

  return (
    <div>
      <div className="page-header">
        <h1>Executive Dashboard</h1>
        <p>{new Date().toLocaleDateString('en-PH', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} · Teen T-ITans Tower</p>
      </div>

      <div className="kpi-grid">
        {kpis.map((k, i) => (
          <div className="kpi-card" key={i} style={{ '--accent': k.accent }}>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value">
              {k.label === 'Revenue This Month' ? formatCurrency(k.value) : 
               k.label === 'Total Occupancy Rate' ? `${k.value}%` : k.value}
            </div>
            <div className="kpi-footer">
              <span className={`kpi-trend ${k.trendClass}`}>{k.trend}</span>
              <div className="sparkline">
                {k.spark.map((h, j) => (
                  <div key={j} className="sparkline-bar" style={{ height: `${(h / 100) * 28}px`, background: k.accent }} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="section-grid-2">
        <div className="glass-card">
          <div className="section-title">Occupancy Heatmap</div>
          <div className="section-sub">Live Unit Status updates</div>
          <div className="heatmap-grid">
            {heatmapData.map(u => (
              <div key={u.id} className={`heatmap-unit unit-${u.status}`} title={`Unit ${u.id}`}>
                {u.id}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card">
          <div className="section-title">Recent Activity</div>
          <div className="activity-feed">
            {activities.map((a, i) => (
              <div className="activity-item" key={i}>
                <div className="activity-dot" style={{ background: a.dot }} />
                <div>
                  <div className="activity-text">{a.text}</div>
                  <div className="activity-time">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}