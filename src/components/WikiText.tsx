/* src/components/WikiText.tsx */
'use client'; // Client component for useMemo optimization

import React, { useMemo } from 'react';
import AdSlot from '@/components/AdSlot';

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

// Tailwind classes for the injected links
const LINK_CLASSES =
  'text-emerald-700 font-semibold hover:text-emerald-800 hover:underline decoration-emerald-300 underline-offset-2 transition-colors';

function linkKeywords(html: string): string {
  if (!html) return '';
  let output = html;

  // 1. Sort by length (longest first) to avoid partial matches (e.g. linking "Loan" inside "Home Loan")
  const keywords = Object.keys(LINK_MAP).sort((a, b) => b.length - a.length);

  keywords.forEach((word) => {
    const url = LINK_MAP[word];

    // 2. REGEX EXPLANATION:
    // \b${word}\b       -> Match the whole word boundary
    // (?![^<]*>)        -> Lookahead: Ensure we are NOT inside an HTML tag (like <img src="...">)
    // (?![^<>]*<\/a>)   -> Lookahead: Ensure we are NOT already inside an existing <a> tag
    // 'i' flag only     -> Case insensitive, but removed 'g' (Global) flag to link ONLY the first occurrence

    const regex = new RegExp(`\\b${word}\\b(?![^<]*>|[^<>]*<\/a>)`, 'i');

    // Replace with a standard anchor tag with Tailwind classes
    output = output.replace(
      regex,
      `<a href="${url}" class="${LINK_CLASSES}" title="Learn more about ${word}">$&</a>`
    );
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
  // 1. Optimization: Only re-process text if content changes
  const { firstBlock, secondBlock, showAd } = useMemo(() => {
    const linkedContent = linkKeywords(content);
    const paragraphs = linkedContent.split('</p>');

    // If content is short (less than 4 paragraphs), don't inject ad
    if (paragraphs.length < 4) {
      return {
        firstBlock: linkedContent,
        secondBlock: null,
        showAd: false,
      };
    }

    // Split logic: Inject after the 2nd paragraph
    return {
      firstBlock: paragraphs.slice(0, 2).join('</p>') + '</p>',
      secondBlock: paragraphs.slice(2).join('</p>'),
      showAd: true,
    };
  }, [content]);

  return (
    <div
      className={`prose prose-slate max-w-none leading-relaxed text-slate-700 ${className}`}
    >
      {/* First Block */}
      <div
        dangerouslySetInnerHTML={{ __html: firstBlock }}
        suppressHydrationWarning={true}
      />

      {/* ✅ INJECTED AD */}
      {showAd && (
        <div className="my-10 flex flex-col items-center justify-center gap-2 no-print bg-slate-50 py-6 border-y border-slate-100">
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
            Advertisement
          </span>
          <AdSlot type="square" label="" />
        </div>
      )}

      {/* Second Block */}
      {secondBlock && (
        <div
          dangerouslySetInnerHTML={{ __html: secondBlock }}
          suppressHydrationWarning={true}
        />
      )}
    </div>
  );
}
