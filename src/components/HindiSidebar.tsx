'use client';

import React from 'react';
import Link from 'next/link';
import AdSlot from './AdSlot';

type NavItem = {
  href: string;
  label: string;
  icon?: string;
  isNew?: boolean;
};

// 1. POPULAR TOOLS (Curated for Hindi Users)
const HINDI_TOOLS: NavItem[] = [
  { href: '/hi/sip-calculator/', label: 'SIP कैलकुलेटर', icon: '📈' },
  { href: '/hi/loans/home-loan/', label: 'होम लोन EMI', icon: '🏠' },
  {
    href: '/hi/sukanya-samriddhi/',
    label: 'SSY (सुकन्या)',
    icon: '👧',
    isNew: true,
  },
  { href: '/hi/ppf-calculator/', label: 'PPF कैलकुलेटर', icon: '💰' },
  { href: '/hi/income-tax-calculator/', label: 'इनकम टैक्स (Tax)', icon: '📋' },
  { href: '/hi/fd-calculator/', label: 'FD कैलकुलेटर', icon: '📜' },
];

// 2. USEFUL GUIDES (Hindi)
const HINDI_GUIDES: NavItem[] = [
  {
    href: '/hi/guides/sukanya-samriddhi-yojana',
    label: 'सुकन्या समृद्धि योजना 2025: पूरी जानकारी',
  },
  {
    href: '/hi/guides/new-vs-old-tax-regime',
    label: 'New vs Old Tax Regime: क्या चुनें?',
  },
  {
    href: '/hi/guides/elss-mutual-funds',
    label: 'ELSS: टैक्स बचाने का स्मार्ट तरीका',
  },
  {
    href: '/hi/guides/sovereign-gold-bonds',
    label: 'SGB: सोना खरीदने का सही तरीका',
  },
];

export default function HindiSidebar({ adId }: { adId?: string }) {
  return (
    <aside className="sidebar">
      {/* Sticky Ad Unit */}
      <div
        style={{ marginTop: 32, marginBottom: 24, position: 'sticky', top: 24 }}
      >
        <AdSlot id={adId} type="box" label="विज्ञापन (Ad)" />
      </div>

      <nav className="financial-sidebar">
        {/* --- SECTION 1: TOOLS --- */}
        <div className="sidebar-section">
          <h3 className="sidebar-title">लोकप्रिय टूल्स (Tools)</h3>
          <ul className="sidebar-list">
            {HINDI_TOOLS.map((item) => (
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
            <Link href="/hi/calculators" className="view-all-link">
              सभी कैलकुलेटर देखें →
            </Link>
          </div>
        </div>

        {/* --- SECTION 2: GUIDES --- */}
        <div className="sidebar-section">
          <h3 className="sidebar-title">जरूरी जानकारी (Guides)</h3>
          <ul className="sidebar-list">
            {HINDI_GUIDES.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="guide-link">
                  <span className="guide-bullet">•</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* --- SECTION 3: LANGUAGE SWITCHER --- */}
        <div className="sidebar-section" style={{ background: '#f1f5f9' }}>
          <Link href="/calculators/" className="lang-switch-btn">
            <span>🇬🇧</span> Switch to English
          </Link>
        </div>

        <style jsx>{`
          .financial-sidebar {
            background: #fff;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          }

          .sidebar-section {
            padding: 20px;
          }

          .sidebar-section + .sidebar-section {
            border-top: 1px solid #e2e8f0;
          }

          .sidebar-title {
            font-size: 16px;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 16px;
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
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px dashed #cbd5e1;
          }

          .sidebar-list li:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
          }

          /* --- TOOL LINK --- */
          .tool-link {
            display: flex;
            align-items: center;
            gap: 12px;
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
            flex-shrink: 0;
            line-height: 1;
          }

          .label-text {
            white-space: nowrap;
          }

          .badge-new {
            font-size: 9px;
            background: #ef4444;
            color: white;
            padding: 2px 8px;
            border-radius: 99px;
            font-weight: 700;
            letter-spacing: 0.5px;
            display: inline-flex;
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

          /* --- LANG SWITCHER --- */
          .lang-switch-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            padding: 10px;
            background: #fff;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            color: #475569;
            font-weight: 600;
            font-size: 14px;
            text-decoration: none;
            transition: all 0.2s;
          }

          .lang-switch-btn:hover {
            background: #fff;
            border-color: #64748b;
            color: #0f172a;
          }
        `}</style>
      </nav>
    </aside>
  );
}
