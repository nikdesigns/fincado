import { ReactNode } from 'react';
import LoanCompareWidget from './LoanCompareWidget';

export default function CalculatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main
      style={{
        maxWidth: 1180,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        gap: 16,
        alignItems: 'start',
      }}
    >
      {/* ✅ MAIN CONTENT */}
      <div style={{ minWidth: 0 }}>{children}</div>

      {/* ✅ STICKY SIDEBAR */}
      <aside className="sidebar">
        {/* ✅ STICKY AD */}
        <div className="ad-box">Sticky Sidebar Ad</div>

        {/* ✅ LOAN COMPARISON WIDGET */}
        <LoanCompareWidget />

        {/* ✅ POPULAR CALCULATORS */}
        <div className="side-card" style={{ marginTop: 24 }}>
          <h3>Popular Calculators</h3>
          <ul className="side-links">
            <li>
              <a href="/emi-calculator">EMI Calculator</a>
            </li>
            <li>
              <a href="/sip-calculator">SIP Calculator</a>
            </li>
            <li>
              <a href="/fd-calculator">FD Calculator</a>
            </li>
          </ul>
        </div>
      </aside>
    </main>
  );
}
