function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const LINK_RULES = [
  { term: 'EMI', href: '/emi-calculator/' },
  { term: 'SIP', href: '/sip-calculator/' },
  { term: 'FD', href: '/fd-calculator/' },
  { term: 'Credit Score', href: '/credit-score/' },
  { term: 'PPF', href: '/ppf-calculator/' },
  { term: 'NPS', href: '/nps-calculator/' },
  { term: 'GST', href: '/gst-calculator/' },
  { term: 'Home Loan', href: '/home-loan-calculator/' },
  { term: 'Income Tax', href: '/income-tax-calculator/' },
  { term: 'Lumpsum', href: '/lumpsum-calculator/' },
];

function processWikiHtml(html = '') {
  if (!html || typeof html !== 'string') return '';

  // Normalize spacing only lightly (avoid damaging markup structure)
  let output = html.replace(/\s{2,}/g, ' ').trim();

  // Protect existing anchors first (so we don't relink inside them)
  const anchorBlocks = [];
  output = output.replace(/<a\b[^>]*>[\s\S]*?<\/a>/gi, (m) => {
    const token = `__ANCHOR_BLOCK_${anchorBlocks.length}__`;
    anchorBlocks.push(m);
    return token;
  });

  // Apply link rules on remaining text
  for (const { term, href } of LINK_RULES) {
    const re = new RegExp(`\\b${escapeRegex(term)}\\b`, 'gi');
    output = output.replace(re, (match) => `<a href="${href}">${match}</a>`);
  }

  // Restore original anchor blocks
  output = output.replace(
    /__ANCHOR_BLOCK_(\d+)__/g,
    (_, idx) => anchorBlocks[Number(idx)],
  );

  return output;
}

module.exports = { processWikiHtml };
