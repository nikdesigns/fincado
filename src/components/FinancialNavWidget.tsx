'use client';

import React from 'react';
import Link from 'next/link';

type NavItem = {
  href: string;
  label: string;
  icon?: string;
  isNew?: boolean;
};

// 1. POPULAR TOOLS
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
    isNew: true, // Will now sit immediately next to text
  },
  { href: '/ppf-calculator', label: 'PPF Calculator', icon: '💰' },
  { href: '/income-tax-calculator', label: 'Tax Calculator', icon: '🧾' },
  { href: '/credit-score', label: 'Check Credit Score', icon: '🛡️' },
];

// 2. TRENDING GUIDES
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
                <span className="icon">{item.icon}</span>
                <span className="label-text">{item.label}</span>
                {item.isNew && <span className="badge-new">NEW</span>}
              </Link>
            </li>
          ))}
        </ul>

        <div className="view-all-wrap">
          <Link href="/calculators" className="view-all-link">
            View All Calculators →
          </Link>
        </div>
      </div>

      {/* --- SECTION 2: GUIDES --- */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Trending Guides</h3>
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

      <style jsx>{`
        .financial-sidebar {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }

        .sidebar-section {
          padding: 24px 20px;
        }

        .sidebar-section + .sidebar-section {
          border-top: 1px solid #e2e8f0;
        }

        .sidebar-title {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 20px;
          border-bottom: 2px solid #22c55e;
          display: inline-block;
          padding-bottom: 4px;
        }

        .sidebar-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .sidebar-list li {
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 1px dashed #cbd5e1;
        }

        .sidebar-list li:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        /* --- TOOL LINK (Simplified & Fixed) --- */
        .tool-link {
          display: flex;
          align-items: center;
          gap: 12px; /* Consistent spacing between Icon, Text, Badge */
          text-decoration: none;
          color: #334155;
          font-weight: 600;
          font-size: 15px;
          transition: all 0.2s ease;
        }

        .tool-link:hover {
          color: #16a34a;
          transform: translateX(4px);
        }

        .icon {
          font-size: 18px;
          flex-shrink: 0; /* Prevents icon from squishing */
          line-height: 1;
        }

        .label-text {
          white-space: nowrap; /* Prevents text wrapping */
        }

        .badge-new {
          font-size: 9px;
          background: #ef4444;
          color: white;
          padding: 2px 8px;
          border-radius: 99px;
          font-weight: 700;
          letter-spacing: 0.5px;
          display: inline-flex; /* Ensures standard box model */
          align-items: center;
          height: 18px;
          line-height: 1;
        }

        /* --- GUIDE LINK --- */
        .guide-link {
          display: flex;
          align-items: start;
          gap: 10px;
          text-decoration: none;
          color: #475569;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.5;
          transition: color 0.2s;
        }

        .guide-link:hover {
          color: #16a34a;
        }

        .guide-bullet {
          color: #cbd5e1;
          font-size: 18px;
          line-height: 1;
        }

        .guide-link:hover .guide-bullet {
          color: #16a34a;
        }

        .view-all-wrap {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #e2e8f0;
          text-align: center;
        }

        .view-all-link {
          font-size: 14px;
          color: #16a34a;
          font-weight: 600;
          text-decoration: none;
          display: inline-block;
          padding: 6px 12px;
          background: #fff;
          border: 1px solid #bbf7d0;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .view-all-link:hover {
          background: #f0fdf4;
        }
      `}</style>
    </nav>
  );
}
