import React from 'react';
import Link from 'next/link';

type NavItem = {
  href: string;
  label: string;
};

const TOP_CALCULATORS: NavItem[] = [
  { href: '/emi-calculator', label: 'EMI Calculator' },
  { href: '/sip-calculator', label: 'SIP Planner' },
  { href: '/loans/home-loan', label: 'Home Loan EMI' },
  { href: '/fd-calculator', label: 'Fixed Deposit (FD)' },
  { href: '/credit-score', label: 'Check Credit Score' },
];

const POPULAR_GUIDES: NavItem[] = [
  {
    href: '/guides/home-loan-for-first-time-buyers',
    label: 'Home Loan Guide for Beginners',
  },
  {
    href: '/guides/how-credit-score-affects-loans',
    label: 'How Credit Score Impacts Loans',
  },
  {
    href: '/guides/sip-vs-fd',
    label: 'SIP vs FD: Better Investment?',
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
          Key Tools
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {TOP_CALCULATORS.map((item) => (
            <li key={item.href} style={{ marginBottom: 4 }}>
              <Link
                href={item.href}
                className="nav-link-item"
                style={{
                  display: 'block',
                  padding: '10px 12px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  color: 'var(--color-text-main)',
                  fontWeight: 500,
                  fontSize: 15,
                  transition: 'all 0.2s',
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
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
      <section style={{ padding: '10px 20px 24px' }}>
        <h3
          style={{
            fontSize: 12,
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            fontWeight: 700,
            letterSpacing: '0.5px',
            marginBottom: 16,
            marginTop: 12,
          }}
        >
          Must Read
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {POPULAR_GUIDES.map((item) => (
            <li key={item.href} style={{ marginBottom: 12 }}>
              <Link
                href={item.href}
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  color: 'var(--color-text-main)',
                  fontSize: 14,
                  fontWeight: 500,
                  lineHeight: 1.4,
                }}
              >
                <span className="guide-link-text">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Hover Styles */}
      <style>{`
        .nav-link-item:hover {
          background: var(--color-success-bg);
          color: var(--color-action-cta) !important;
          padding-left: 16px !important; /* Subtle slide effect */
        }
        .guide-link-text {
          position: relative;
          transition: color 0.2s;
        }
        .guide-link-text:hover {
          color: var(--color-brand-green);
          text-decoration: underline;
          text-decoration-color: var(--color-brand-light);
          text-decoration-thickness: 2px;
        }
      `}</style>
    </nav>
  );
}
