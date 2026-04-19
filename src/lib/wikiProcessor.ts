// src/lib/wikiProcessor.ts
//
// Converts wiki-style keywords in HTML strings into internal anchor links.
// Mirrors the logic in src/scripts/wikiProcessor.js so the TypeScript
// runtime layer stays in sync with the build-time script.
//
// Rules:
//  - Existing <a> tags are protected and never re-linked.
//  - Matching is whole-word, case-insensitive.
//  - Longer terms are matched before shorter ones to avoid partial replacements
//    (e.g. "Home Loan Guide" wins over "Home Loan").

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

interface LinkRule {
  term: string;
  href: string;
}

// Keep in sync with src/data/internalLinks.json and
// src/scripts/wikiProcessor.js. Sort longest-first so partial matches
// don't shadow full phrases (this list is sorted at runtime below).
const LINK_RULES: LinkRule[] = [
  // ── Calculators ────────────────────────────────────────────────────────
  { term: 'Income Tax Calculator', href: '/income-tax-calculator/' },
  { term: 'ELSS Calculator', href: '/elss-calculator/' },
  { term: 'EMI Calculator', href: '/emi-calculator/' },
  { term: 'SIP Calculator', href: '/sip-calculator/' },
  { term: 'FD Calculator', href: '/fd-calculator/' },
  { term: 'RD Calculator', href: '/rd-calculator/' },
  { term: 'PPF Calculator', href: '/ppf-calculator/' },
  { term: 'EPF Calculator', href: '/epf-calculator/' },
  { term: 'GST Calculator', href: '/gst-calculator/' },
  { term: 'FIRE Calculator', href: '/fire-calculator/' },
  { term: 'APY', href: '/apy-calculator/' },
  { term: 'NPS', href: '/nps-calculator/' },
  { term: 'SWP', href: '/swp-calculator/' },
  { term: 'EMI', href: '/emi-calculator/' },
  { term: 'SIP', href: '/sip-calculator/' },
  { term: 'FD', href: '/fd-calculator/' },

  // ── Loans ───────────────────────────────────────────────────────────────
  { term: 'Education Loan', href: '/loans/education-loan/' },
  { term: 'Personal Loan', href: '/loans/personal-loan/' },
  { term: 'Home Loan', href: '/loans/home-loan/' },
  { term: 'Car Loan', href: '/loans/car-loan/' },

  // ── Investing & savings ─────────────────────────────────────────────────
  { term: 'Mutual Funds', href: '/mutual-funds/' },
  { term: 'ELSS Mutual Funds', href: '/elss-calculator/' },
  { term: 'Sukanya Samriddhi', href: '/sukanya-samriddhi/' },
  { term: 'Lumpsum', href: '/lumpsum-calculator/' },
  { term: 'Inflation', href: '/inflation-calculator/' },
  { term: 'Atal Pension Yojana', href: '/apy-calculator/' },

  // ── Credit & tax ────────────────────────────────────────────────────────
  { term: 'CIBIL Score', href: '/credit-score/' },
  { term: 'Credit Score', href: '/credit-score/' },
  { term: 'SSY', href: '/sukanya-samriddhi/' },

  // ── Guides ──────────────────────────────────────────────────────────────
  { term: 'Retirement Planning', href: '/guides/retirement-planning-india/' },
  {
    term: 'Health Insurance Guide',
    href: '/guides/health-insurance-buying-guide/',
  },
  { term: 'EMI Calculator Guide', href: '/guides/emi-calculator-guide/' },
  { term: 'SIP Investment Guide', href: '/guides/sip-investment-guide/' },
  { term: 'Home Loan Guide', href: '/guides/home-loan-first-time-buyers/' },
  { term: 'Mutual Fund Guide', href: '/guides/mutual-fund-guide/' },
  { term: 'Personal Loan Guide', href: '/guides/personal-loan-guide/' },
  { term: 'Education Loan Guide', href: '/guides/education-loan-guide/' },
  { term: 'Car Loan Guide', href: '/guides/car-loan-guide/' },
  { term: 'National Pension System', href: '/guides/nps-guide/' },
  { term: 'Sovereign Gold Bond', href: '/guides/gold-investment-guide/' },
  { term: 'Tax Saving Funds', href: '/guides/elss-funds-guide-2026/' },
  { term: 'ELSS Funds', href: '/guides/elss-funds-guide-2026/' },
  { term: 'New Tax Regime', href: '/guides/new-vs-old-tax-regime-2026/' },
  { term: 'Old Tax Regime', href: '/guides/new-vs-old-tax-regime-2026/' },
  { term: 'SSY Guide', href: '/guides/sukanya-samriddhi-yojana-guide-2026/' },
  { term: 'NPS Guide', href: '/guides/nps-guide/' },
  { term: 'GST Guide', href: '/guides/gst-explained/' },
  { term: 'SWP Guide', href: '/guides/swp-guide/' },
  { term: 'SIP vs FD', href: '/guides/sip-vs-fd/' },
  { term: 'SGB', href: '/guides/gold-investment-guide/' },
  { term: 'Mediclaim', href: '/guides/health-insurance-buying-guide/' },
  { term: 'Improve Credit Score', href: '/guides/credit-score-guide/' }
];

// Sort longest term first to prevent "Home Loan" matching inside "Home Loan Guide"
const SORTED_RULES = [...LINK_RULES].sort(
  (a, b) => b.term.length - a.term.length,
);

export function processWikiHtml(html: string): string {
  if (!html || typeof html !== 'string') return '';

  let output = html;

  // 1. Protect existing <a>…</a> blocks so we never nest links
  const anchorBlocks: string[] = [];
  output = output.replace(/<a\b[^>]*>[\s\S]*?<\/a>/gi, (match) => {
    const token = `__ANCHOR_BLOCK_${anchorBlocks.length}__`;
    anchorBlocks.push(match);
    return token;
  });

  // 2. Apply link rules to the remaining (unprotected) text
  for (const { term, href } of SORTED_RULES) {
    const re = new RegExp(`\\b${escapeRegex(term)}\\b`, 'gi');
    output = output.replace(
      re,
      (match) => `<a href="${href}" class="wiki-link">${match}</a>`,
    );
  }

  // 3. Restore original anchor blocks
  output = output.replace(
    /__ANCHOR_BLOCK_(\d+)__/g,
    (_, idx) => anchorBlocks[Number(idx)],
  );

  return output;
}
