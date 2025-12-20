/* ❌ src/components/WikiText.tsx - DO NOT add 'use client' */

import React from 'react';

const LINK_MAP: Record<string, string> = {
  'Home Loan': '/loans/home-loan',
  'Personal Loan': '/loans/personal-loan',
  'Car Loan': '/loans/car-loan',
  'Education Loan': '/loans/education-loan',
  EMI: '/emi-calculator',
  Lumpsum: '/lumpsum-calculator',
  SWP: '/swp-calculator',
  SIP: '/sip-calculator',
  'Mutual Fund': '/mutual-funds',
  APY: '/apy-calculator',
  FD: '/fd-calculator',
  'Fixed Deposit': '/fd-calculator',
  RD: '/rd-calculator',
  'Recurring Deposit': '/rd-calculator',
  Savings: '/savings',
  PPF: '/ppf-calculator',
  EPF: '/epf-calculator',
  SSY: '/sukanya-samriddhi',
  'Sukanya Samriddhi': '/sukanya-samriddhi',
  GST: '/gst-calculator',
  Inflation: '/inflation-calculator',
  Retirement: '/retirement-calculator',
  FIRE: '/fire-calculator',
  CIBIL: '/credit-score',
  'Credit Score': '/credit-score',
  'Simple Interest': '/simple-interest-calculator',
};

function linkKeywords(html: string): string {
  if (!html) return '';
  let output = html;

  const keywords = Object.keys(LINK_MAP).sort((a, b) => b.length - a.length);

  keywords.forEach((word) => {
    const url = LINK_MAP[word];
    // This regex ensures we match whole words and DO NOT replace words already inside an <a> tag or other HTML tags
    const regex = new RegExp(`\\b${word}\\b(?![^<]*>|[^<>]*</a>)`, 'gi');

    output = output.replace(regex, `<a href="${url}" class="wiki-link">$&</a>`);
  });

  return output;
}

export default function WikiText({
  content,
  className = '',
}: {
  content: string;
  className?: string;
}) {
  // ✅ FIX 1: Run the linker
  const linkedContent = linkKeywords(content);

  return (
    <div
      className={`wiki-content ${className}`}
      // ✅ FIX 2: Use the LINKED content, not the original raw content
      dangerouslySetInnerHTML={{ __html: linkedContent }}
      suppressHydrationWarning={true}
    />
  );
}
