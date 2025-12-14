function processWikiHtml(html = '') {
  if (!html || typeof html !== 'string') return '';

  return html
    .replace(/\s+/g, ' ')
    .replace(/\bEMI\b/g, `<a href="/emi-calculator">EMI</a>`)
    .replace(/\bSIP\b/g, `<a href="/sip-calculator">SIP</a>`)
    .replace(/\bFD\b/g, `<a href="/fd-calculator">FD</a>`)
    .replace(/\bCredit Score\b/gi, `<a href="/credit-score">Credit Score</a>`)
    .trim();
}

module.exports = { processWikiHtml };
