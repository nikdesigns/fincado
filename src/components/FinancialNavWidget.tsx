// src/components/FinancialNavWidget.tsx
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
  { href: '/loans/car-loan', label: 'Car Loan EMI' },
];

const QUICK_GUIDES: NavItem[] = [
  {
    href: '/guides/credit-score-factors',
    label: 'Improve Your Credit Score Guide',
  },
  { href: '/guides/tax-saving-schemes', label: 'Top Tax Saving Schemes (80C)' },
  { href: '/guides/swp-vs-sip', label: 'SWP vs SIP: Which is Right?' },
];

export default function FinancialNavWidget() {
  return (
    <nav
      className="financial-nav-widget"
      aria-label="Financial tools and guides"
    >
      <section className="nav-section calculator-section">
        <h3 className="widget-header">Key Financial Tools</h3>
        <ul className="nav-list">
          {TOP_CALCULATORS.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="nav-link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="nav-section guide-section">
        <h3 className="widget-header">Financial Guides & Resources</h3>
        <ul className="nav-list">
          {QUICK_GUIDES.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="nav-link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </nav>
  );
}
