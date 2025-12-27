'use client';

import React from 'react';
import Link from 'next/link';

type NavItem = {
  href: string;
  label: string;
  icon?: string;
  isNew?: boolean;
};

// 1. POPULAR TOOLS (Curated List)
const TOP_TOOLS: NavItem[] = [
  { href: '/sip-calculator', label: 'SIP Calculator', icon: '📈' },
  { href: '/emi-calculator', label: 'Loan EMI Calculator', icon: '🏠' },
  {
    href: '/loans/home-loan',
    label: 'Home Loan EMI Calculator',
    icon: '🏡',
  },
  {
    href: '/sukanya-samriddhi',
    label: 'SSY Calculator',
    icon: '👧',
    isNew: true,
  },
  { href: '/ppf-calculator', label: 'PPF Calculator', icon: '💰' },
  { href: '/income-tax-calculator', label: 'Tax Calculator', icon: '🧾' },
  { href: '/credit-score', label: 'Check Credit Score', icon: '🛡️' },
];

// 2. TRENDING GUIDES (Updated with your new content)
const TRENDING_GUIDES: NavItem[] = [
  {
    href: '/guides/sukanya-samriddhi-yojana-guide-2025',
    label: 'Sukanya Samriddhi Yojana Guide 2025',
  },
  {
    href: '/guides/elss-funds-guide-2025',
    label: 'ELSS Funds: Save Tax (80C)',
  },
  {
    href: '/guides/sovereign-gold-bond-sgb-guide',
    label: 'Sovereign Gold Bonds (SGB)',
  },
  {
    href: '/guides/health-insurance-buying-guide',
    label: 'Health Insurance Checklist',
  },
];

export default function FinancialNavWidget() {
  return (
    <nav className="financial-sidebar">
      {/* --- SECTION 1: TOOLS --- */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Popular Tools</h3>
        <ul className="sidebar-list">
          {TOP_TOOLS.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="tool-link">
                <span
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <span style={{ fontSize: '16px' }}>{item.icon}</span>
                  {item.label}
                </span>
                {item.isNew && <span className="badge-new">NEW</span>}
              </Link>
            </li>
          ))}
        </ul>

        {/* View All Link */}
        <div style={{ marginTop: '12px', paddingLeft: '8px' }}>
          <Link href="/calculators" className="view-all-link">
            View All Calculators →
          </Link>
        </div>
      </div>

      {/* --- SECTION 2: GUIDES --- */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Latest Guides</h3>
        <ul className="sidebar-list">
          {TRENDING_GUIDES.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="guide-link">
                <span className="guide-bullet">•</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* --- STYLES --- */}
      <style jsx>{`
        .financial-sidebar {
          background: #fff;
          border: 1px solid var(--color-border);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
        }

        .sidebar-section {
          padding: 20px;
          border-bottom: 1px solid #f1f5f9;
        }

        .sidebar-section:last-child {
          border-bottom: none;
        }

        .sidebar-title {
          font-size: 11px;
          text-transform: uppercase;
          color: #64748b;
          font-weight: 700;
          letter-spacing: 0.8px;
          margin-bottom: 16px;
        }

        .sidebar-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .sidebar-list li {
          margin-bottom: 4px;
        }

        /* Tool Link Styling */
        .tool-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          border-radius: 8px;
          text-decoration: none;
          color: var(--color-text-main);
          font-weight: 500;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .tool-link:hover {
          background: #f0fdf4; /* Light Green */
          color: var(--color-brand-green);
          padding-left: 16px; /* Slide effect */
        }

        .badge-new {
          font-size: 9px;
          background: #ef4444;
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 700;
        }

        /* Guide Link Styling */
        .guide-link {
          display: flex;
          align-items: start;
          gap: 10px;
          padding: 8px 8px;
          border-radius: 6px;
          text-decoration: none;
          color: #334155;
          font-size: 14px;
          line-height: 1.5;
          transition: all 0.2s;
        }

        .guide-link:hover {
          color: var(--color-brand-green);
          background: #f8fafc;
        }

        .guide-bullet {
          color: #cbd5e1;
          font-size: 18px;
          line-height: 1;
        }

        .guide-link:hover .guide-bullet {
          color: var(--color-brand-green);
        }

        .view-all-link {
          font-size: 13px;
          color: var(--color-brand-green);
          font-weight: 600;
          text-decoration: none;
        }

        .view-all-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </nav>
  );
}
