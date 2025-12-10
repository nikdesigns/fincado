// simple, robust auto-linker that does not clobber existing <a> tags
export function autoLinkContent(html: string) {
  const links: Record<string, string> = {
    'EMI Calculator': '/emi-calculator',
    'SIP Calculator': '/sip-calculator',
    'FD Calculator': '/fd-calculator',
    'Personal Loan': '/loans/personal-loan',
    'Home Loan': '/loans/home-loan',
    'Credit Score': '/credit-score',
    Investing: '/investing',
    Savings: '/savings',
  };

  // Split by <a to avoid modifying anchor contents
  const parts = html.split(/(<a\b[^>]*>[\s\S]*?<\/a>)/gi);
  const out = parts
    .map((segment) => {
      // If this segment is an anchor tag, leave untouched
      if (segment.startsWith('<a') && segment.includes('</a>')) return segment;

      // Otherwise replace matches
      let updated = segment;

      Object.entries(links).forEach(([text, url]) => {
        // word boundary match, global
        const regex = new RegExp(`\\b${escapeRegExp(text)}\\b`, 'g');
        updated = updated.replace(
          regex,
          `<a href="${url}" class="auto-link">${text}</a>`
        );
      });

      return updated;
    })
    .join('');

  return out;
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
