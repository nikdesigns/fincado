// src/components/FinancialNavWidget.tsx
import React from 'react';
// Assuming you have imported your CSS globally or via module import (e.g., './FinancialNavWidget.module.css')
// For this example, we assume it's imported correctly.
// import styles from './FinancialNavWidget.module.css';

import {
  FaCalculator,
  FaBookOpen,
  FaMoneyBillWave,
  FaHome,
  FaCar,
  FaCreditCard,
  FaCoins,
} from 'react-icons/fa';

// Define the structure for the link data
const TOP_CALCULATORS = [
  {
    href: '/emi-calculator',
    label: 'EMI Calculator',
    icon: <FaMoneyBillWave />,
  },
  { href: '/sip-calculator', label: 'SIP Planner', icon: <FaCoins /> },
  { href: '/loans/home-loan', label: 'Home Loan EMI', icon: <FaHome /> },
  { href: '/fd-calculator', label: 'Fixed Deposit (FD)', icon: <FaCoins /> },
  { href: '/loans/car-loan', label: 'Car Loan EMI', icon: <FaCar /> },
];

const QUICK_GUIDES = [
  {
    href: '/guides/credit-score-factors',
    label: 'Improve Your Credit Score Guide',
    icon: <FaCreditCard />,
  },
  {
    href: '/guides/tax-saving-schemes',
    label: 'Top Tax Saving Schemes (80C)',
    icon: <FaMoneyBillWave />,
  },
  {
    href: '/guides/swp-vs-sip',
    label: 'SWP vs SIP: Which is Right?',
    icon: <FaBookOpen />,
  },
];

export default function FinancialNavWidget() {
  return (
    <div className="financial-nav-widget">
      {/* 1. KEY TOOLS (Targeting high-volume transactional keywords) */}
      <div className="nav-section calculator-section">
        <h3 className="widget-header">
          <FaCalculator
            style={{ marginRight: '8px', verticalAlign: 'middle' }}
          />
          Key Financial Tools
        </h3>

        <ul className="nav-list">
          {TOP_CALCULATORS.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="nav-link">
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* 2. GUIDES & RESOURCES (Targeting informational intent for Adsense growth) */}
      <div className="nav-section guide-section">
        <h3 className="widget-header">
          <FaBookOpen style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Financial Guides & Resources
        </h3>

        <ul className="nav-list">
          {QUICK_GUIDES.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="nav-link">
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
