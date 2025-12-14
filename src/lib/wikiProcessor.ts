// src/lib/wikiProcessor.ts

/**
 * Converts wiki-style keywords into internal links
 */
export function processWikiHtml(html: string): string {
  if (!html) return '';

  let output = html;

  const wikiMap: Record<string, string> = {
    EMI: '/emi-calculator',
    SIP: '/sip-calculator',
    FD: '/fd-calculator',
    APY: '/apy-calculator',
    CIBIL: '/credit-score',
  };

  Object.entries(wikiMap).forEach(([keyword, url]) => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'g');
    output = output.replace(
      regex,
      `<a href="${url}" class="wiki-link">${keyword}</a>`
    );
  });

  return output;
}
