'use client';

import React from 'react';
import Link from 'next/link';

type NavItem = {
  href: string;
  label: string;
  isNew?: boolean;
};

// ✅ Updated List: Matches your actual calculator pages
const TOP_CALCULATORS: NavItem[] = [
  { href: '/sip-calculator', label: 'SIP Calculator' },
  { href: '/emi-calculator', label: 'EMI Calculator' },
  { href: '/ppf-calculator', label: 'PPF Calculator' },
  { href: '/gst-calculator', label: 'GST Calculator' },
  { href: '/fd-calculator', label: 'FD Calculator' },
  { href: '/credit-score', label: 'Check Credit Score', isNew: true },
];

// ✅ Updated List: Matches your new articles.json slugs
const POPULAR_GUIDES: NavItem[] = [
  {
    href: '/guides/sip-vs-fd',
    label: 'SIP vs FD: Which is Better?',
  },
  {
    href: '/guides/home-loan-first-time-buyers',
    label: 'Home Loan Guide 2025',
  },
  {
    href: '/guides/how-credit-score-works-india',
    label: 'How CIBIL Score Works',
  },
  {
    href: '/guides/retirement-planning-india',
    label: 'Retirement Planning 101',
  },
];

export default function FinancialNavWidget() {
  return (
    <nav
      className="financial-nav-widget"
      aria-label="Financial tools and guides"
      style={{
        background: '#fff',
        border: '1px solid var(--color-border)',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
      }}
    >
      {/* --- SECTION 1: TOOLS --- */}
      <section style={{ padding: '20px 20px 10px' }}>
        <h3
          style={{
            fontSize: 12,
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            fontWeight: 700,
            letterSpacing: '0.5px',
            marginBottom: 16,
          }}
        >
          Popular Tools
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {TOP_CALCULATORS.map((item) => (
            <li key={item.href} style={{ marginBottom: 6 }}>
              <Link href={item.href} className="nav-link-item">
                <span>{item.label}</span>
                {item.isNew && <span className="badge-new">NEW</span>}
              </Link>
            </li>
          ))}
        </ul>

        {/* 'View All' Link */}
        <div style={{ marginTop: 14, textAlign: 'center' }}>
          <Link
            href="/calculators"
            style={{
              fontSize: 13,
              color: 'var(--color-brand-green)',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            View All Calculators &rarr;
          </Link>
        </div>
      </section>

      {/* --- DIVIDER --- */}
      <div
        style={{
          height: 1,
          background: 'var(--color-bg-soft)',
          margin: '8px 20px',
        }}
      />

      {/* --- SECTION 2: GUIDES --- */}
      <section style={{ padding: '16px 20px 24px' }}>
        <h3
          style={{
            fontSize: 12,
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            fontWeight: 700,
            letterSpacing: '0.5px',
            marginBottom: 16,
            marginTop: 8,
          }}
        >
          Must Read
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {POPULAR_GUIDES.map((item) => (
            <li key={item.href} style={{ marginBottom: 12 }}>
              <Link href={item.href} className="guide-link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* --- STYLES --- */}
      <style jsx>{`
        /* Link Item Styling */
        .nav-link-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          border-radius: 8px;
          text-decoration: none;
          color: var(--color-text-main);
          font-weight: 500;
          font-size: 15px;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          background: transparent;
        }

        /* Hover Effect: Slide & Color */
        .nav-link-item:hover {
          background: var(--color-success-bg);
          color: var(--color-brand-green);
          padding-left: 16px;
        }

        /* New Badge */
        .badge-new {
          font-size: 9px;
          background: #ef4444; /* Red for attention */
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        /* Guide Link Styling */
        .guide-link {
          display: block;
          text-decoration: none;
          color: var(--color-text-main);
          font-size: 14px;
          font-weight: 500;
          line-height: 1.4;
          transition: color 0.2s;
        }

        .guide-link:hover {
          color: var(--color-brand-green);
          text-decoration: underline;
          text-decoration-color: var(--color-brand-light);
          text-decoration-thickness: 2px;
        }
      `}</style>
    </nav>
  );
}
