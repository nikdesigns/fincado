/* ❌ DO NOT add 'use client' */

import React from 'react';

/* ---------------- HELPERS ---------------- */

// Map keywords to their specific routes based on your project structure
// 💡 Tip: Add longer phrases first to prevent partial matching issues
const LINK_MAP: Record<string, string> = {
  // Loans (Verified paths from src/app/loans/)
  'Home Loan': '/loans/home-loan',
  'Personal Loan': '/loans/personal-loan',
  'Car Loan': '/loans/car-loan',
  'Education Loan': '/loans/education-loan',
  EMI: '/emi-calculator',

  // Investments (SIP/Mutual Funds)
  Lumpsum: '/lumpsum-calculator',
  SWP: '/swp-calculator',
  SIP: '/sip-calculator',
  'Mutual Fund': '/mutual-funds',
  APY: '/apy-calculator',

  // Banking & Deposits
  FD: '/fd-calculator',
  'Fixed Deposit': '/fd-calculator',
  RD: '/rd-calculator',
  'Recurring Deposit': '/rd-calculator',
  Savings: '/savings',

  // Government Schemes / Provident Funds
  PPF: '/ppf-calculator',
  EPF: '/epf-calculator',
  SSY: '/sukanya-samriddhi',
  'Sukanya Samriddhi': '/sukanya-samriddhi',

  // Tax & Economy
  GST: '/gst-calculator',
  Inflation: '/inflation-calculator',

  // Planning
  Retirement: '/retirement-calculator',
  FIRE: '/fire-calculator', // Financial Independence, Retire Early

  // Metrics & Others
  CIBIL: '/credit-score',
  'Credit Score': '/credit-score',
  'Simple Interest': '/simple-interest-calculator',
};

function linkKeywords(html: string): string {
  let output = html;

  // 1. Get keys and sort by length (Longest first) 📏
  // This ensures 'Home Loan' is linked before 'Loan' is matched.
  const keywords = Object.keys(LINK_MAP).sort((a, b) => b.length - a.length);

  keywords.forEach((word) => {
    const url = LINK_MAP[word];
    // 2. Add 'i' flag for case-insensitive matching (Matches 'sip', 'SIP', 'Sip') 🔡
    // The negative lookahead (?!...) ensures we don't double-link inside existing tags
    const regex = new RegExp(`\\b${word}\\b(?![^<]*>)`, 'gi');

    output = output.replace(
      regex,
      // Keep the original matched text case using "$&"
      `<a href="${url}" class="wiki-link">$&</a>`
    );
  });

  return output;
}

/* ---------------- COMPONENT ---------------- */

export default function WikiText({
  content,
  className = '',
}: {
  content: string;
  className?: string;
}) {
  const linkedContent = linkKeywords(content);

  return (
    <div
      className={`wiki-content ${className}`}
      dangerouslySetInnerHTML={{ __html: linkedContent }}
      suppressHydrationWarning={true}
    />
  );
}
