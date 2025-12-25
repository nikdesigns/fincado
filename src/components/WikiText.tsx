/* src/components/WikiText.tsx */
import React from 'react';
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

function linkKeywords(html: string): string {
  if (!html) return '';
  let output = html;

  // Sort by length to avoid replacing substrings (e.g., matching "Loan" inside "Home Loan")
  const keywords = Object.keys(LINK_MAP).sort((a, b) => b.length - a.length);

  keywords.forEach((word) => {
    const url = LINK_MAP[word];
    // Regex: Match whole word, NOT inside existing tags or <a> links
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
  // 1. Run the auto-linker on the full content first
  const linkedContent = linkKeywords(content);

  // 2. Logic to split content and inject Ad
  // We split by closing paragraph tags </p> to ensure we don't break HTML structure
  const paragraphs = linkedContent.split('</p>');

  // If the article is short (less than 4 paragraphs), just show it all without insertion
  if (paragraphs.length < 4) {
    return (
      <div
        className={`wiki-content ${className}`}
        dangerouslySetInnerHTML={{ __html: linkedContent }}
        suppressHydrationWarning={true}
      />
    );
  }

  // 3. Inject Ad after the 2nd paragraph (index 0 and 1)
  const firstBlock = paragraphs.slice(0, 2).join('</p>') + '</p>';
  const secondBlock = paragraphs.slice(2).join('</p>');

  return (
    <div className={`wiki-content ${className}`}>
      {/* First Block of Text */}
      <div
        dangerouslySetInnerHTML={{ __html: firstBlock }}
        suppressHydrationWarning={true}
      />

      {/* ✅ IN-ARTICLE AD SLOT (Using 'square' to match your approved unit) */}
      <div className="my-8 no-print flex justify-center">
        <AdSlot type="square" label="Advertisement" />
      </div>

      {/* Remaining Text */}
      <div
        dangerouslySetInnerHTML={{ __html: secondBlock }}
        suppressHydrationWarning={true}
      />
    </div>
  );
}
