import React, { useState } from 'react';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const chartData = [
  { month: 'Jan', projected: 2100000, actual: 2050000 },
  { month: 'Feb', projected: 2100000, actual: 1980000 },
  { month: 'Mar', projected: 2200000, actual: 2250000 },
  { month: 'Apr', projected: 2200000, actual: 2180000 },
  { month: 'May', projected: 2300000, actual: 2310000 },
  { month: 'Jun', projected: 2300000, actual: 2400000 },
  { month: 'Jul', projected: 2400000, actual: null },
  { month: 'Aug', projected: 2400000, actual: null },
  { month: 'Sep', projected: 2500000, actual: null },
  { month: 'Oct', projected: 2500000, actual: null },
  { month: 'Nov', projected: 2500000, actual: null },
  { month: 'Dec', projected: 2600000, actual: null },
];

const invoices = [
  { inv: 'INV-2024-087', tenant: 'GlobalLink Inc.', amount: '₱120,000', due: 'Jun 30, 2024', status: 'Pending', statusClass: 'badge-amber' },
  { inv: 'INV-2024-086', tenant: 'TechCorp PH', amount: '₱85,000', due: 'Jun 15, 2024', status: 'Paid', statusClass: 'badge-green' },
  { inv: 'INV-2024-085', tenant: 'NovaBiz Hub', amount: '₱72,000', due: 'Jun 10, 2024', status: 'Paid', statusClass: 'badge-green' },
  { inv: 'INV-2024-084', tenant: 'Vertex Solutions', amount: '₱55,000', due: 'Jun 5, 2024', status: 'Overdue', statusClass: 'badge-red' },
  { inv: 'INV-2024-083', tenant: 'CloudBase PH', amount: '₱38,000', due: 'Jun 1, 2024', status: 'Paid', statusClass: 'badge-green' },
];

const maxVal = 2800000;

export default function Billing() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  
  // New state for form inputs
  const [form, setForm] = useState({
    tenant: '',
    amount: '',
    due: 'Jul 15, 2024'
  });

  const openInvoice = (inv) => {
    setSelectedInvoice(inv);
    setForm({
      tenant: inv.tenant,
      amount: inv.amount.replace('₱', '').replace(',', ''),
      due: inv.due
    });
    setModalOpen(true);
  };

  const handleNewInvoice = () => {
    setSelectedInvoice(null);
    setForm({ tenant: '', amount: '', due: 'Jul 15, 2024' });
    setModalOpen(true);
  };

  // Calculations
  const subtotal = selectedInvoice ? 121500 : (Number(form.amount) || 0);
  const vat = subtotal * 0.12;
  const total = subtotal + vat;

  return (
    <div>
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h1>Billing & Finance</h1>
            <p>Revenue analytics, projections, and invoice management</p>
          </div>
          <button className="btn btn-primary" onClick={handleNewInvoice}>
            ➕ New Invoice
          </button>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="glass-card" style={{ marginBottom: 20 }}>
        <div className="flex-between" style={{ marginBottom: 20 }}>
          <div>
            <div className="section-title">Revenue Projection vs. Actual</div>
            <div className="section-sub">Full year 2024 · Monthly breakdown</div>
          </div>
          <div style={{ display: 'flex', gap: 20, fontSize: 12 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 12, height: 4, background: '#10b981', display: 'inline-block', borderRadius: 2 }}></span>
              Actual
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 12, height: 4, background: '#cbd5e1', display: 'inline-block', borderRadius: 2, borderTop: '2px dashed #94a3b8' }}></span>
              Projected
            </span>
          </div>
        </div>

        <div className="chart-bars">
          {chartData.map((d, i) => {
            const projH = Math.round((d.projected / maxVal) * 140);
            const actH = d.actual ? Math.round((d.actual / maxVal) * 140) : 0;
            return (
              <div className="chart-col" key={i}>
                <div className="chart-bar-wrap">
                  <div style={{ position: 'relative', width: '100%', display: 'flex', gap: 2, justifyContent: 'center', height: '100%', alignItems: 'flex-end' }}>
                    <div
                      className="chart-bar"
                      style={{ height: projH, background: '#e2e8f0', width: '45%' }}
                      title={`Projected: ₱${(d.projected / 1000000).toFixed(1)}M`}
                    />
                    {d.actual && (
                      <div
                        className="chart-bar"
                        style={{ height: actH, background: '#10b981', width: '45%' }}
                        title={`Actual: ₱${(d.actual / 1000000).toFixed(1)}M`}
                      />
                    )}
                  </div>
                </div>
                <div className="chart-label">{d.month}</div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: 20, marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
          {[
            { label: 'YTD Revenue', value: '₱12.17M', sub: 'Jan–Jun 2024' },
            { label: 'YTD Projected', value: '₱13.2M', sub: 'Jan–Jun 2024' },
            { label: 'Variance', value: '-₱1.03M', sub: '↓ 7.8% below target', red: true },
            { label: 'Full Year Forecast', value: '₱29.6M', sub: 'Based on current rate' },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, padding: '12px 16px', background: 'var(--slate-light)', borderRadius: 10 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.6px' }}>{s.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'DM Mono, monospace', color: s.red ? 'var(--red)' : 'var(--text-primary)', marginTop: 4 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Invoice Table */}
      <div className="glass-card">
        <div className="section-title" style={{ marginBottom: 4 }}>Recent Invoices</div>
        <div className="section-sub">Click any row to view the full invoice</div>
        <table className="data-table" style={{ marginTop: 8 }}>
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Tenant</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, i) => (
              <tr key={i} style={{ cursor: 'pointer' }} onClick={() => openInvoice(inv)}>
                <td className="td-bold font-mono">{inv.inv}</td>
                <td>{inv.tenant}</td>
                <td className="font-mono td-bold">{inv.amount}</td>
                <td>{inv.due}</td>
                <td><span className={`badge ${inv.statusClass}`}>{inv.status}</span></td>
                <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>View →</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invoice Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="invoice-header">
              <div>
                <div className="invoice-title">INVOICE</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                  {selectedInvoice ? selectedInvoice.inv : 'INV-2024-NEW'} · {form.due}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>Teen T-ITans Unified Property Hub</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Caloocan City, Monumento, Metro Manila</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>billing@TeenT-ITans.ph</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text-muted)', marginBottom: 6 }}>Bill To</div>
                {selectedInvoice ? (
                    <div style={{ fontWeight: 700 }}>{selectedInvoice.tenant}</div>
                ) : (
                    <input 
                        type="text" 
                        placeholder="Enter Tenant Name" 
                        style={{ width: '100%', padding: '4px 8px', borderRadius: '4px', border: '1px solid #ddd' }}
                        value={form.tenant}
                        onChange={(e) => setForm({...form, tenant: e.target.value})}
                    />
                )}
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Unit 7A, Teen T-ITans Tower</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Caloocan City, Monumento, Metro Manila</div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text-muted)', marginBottom: 6 }}>Invoice Details</div>
                <div style={{ fontSize: 13 }}>Status: <span className={`badge ${selectedInvoice?.statusClass || 'badge-amber'}`}>{selectedInvoice?.status || 'Draft'}</span></div>
                <div style={{ fontSize: 13, marginTop: 6 }}>Period: June 1–30, 2024</div>
              </div>
            </div>

            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Office Space Rental</td>
                  <td>1 month</td>
                  <td className="font-mono">
                    {selectedInvoice ? '₱115,000' : (
                        <input 
                            type="number" 
                            placeholder="Amount" 
                            style={{ width: '80px' }}
                            value={form.amount}
                            onChange={(e) => setForm({...form, amount: e.target.value})}
                        />
                    )}
                  </td>
                  <td className="font-mono">₱{subtotal.toLocaleString()}</td>
                </tr>
                {selectedInvoice && (
                  <>
                    <tr>
                      <td>Common Area Maintenance</td>
                      <td>1 month</td>
                      <td className="font-mono">₱3,500</td>
                      <td className="font-mono">₱3,500</td>
                    </tr>
                    <tr>
                      <td>Parking (2 slots)</td>
                      <td>1 month</td>
                      <td className="font-mono">₱1,500</td>
                      <td className="font-mono">₱3,000</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', alignItems: 'flex-end', gap: 6, paddingTop: 12 }}>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Subtotal: <strong className="font-mono">₱{subtotal.toLocaleString()}</strong></div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>VAT (12%): <strong className="font-mono">₱{vat.toLocaleString()}</strong></div>
              <div className="invoice-total font-mono">Total: <span style={{ color: 'var(--emerald)' }}>₱{total.toLocaleString()}</span></div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 24, justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={() => setModalOpen(false)}>Close</button>
              <button className="btn btn-primary" onClick={() => { alert('Invoice Saved!'); setModalOpen(false); }}>
                {selectedInvoice ? '🖨️ Print Invoice' : '💾 Save Invoice'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}