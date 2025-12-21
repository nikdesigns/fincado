import internalLinks from '@/data/internalLinks.json';

export function autoLinkContent(content: string): string {
  if (!content) return '';

  let linkedContent = content;

  // Sort by length (longest first) to prevent partial replacement
  // e.g. "SIP Investment" should be linked before just "SIP"
  const sortedLinks = [...internalLinks].sort(
    (a, b) => b.keyword.length - a.keyword.length
  );

  sortedLinks.forEach((item) => {
    // Regex explanation:
    // (?<!<a[^>]*>)  -> Lookbehind: Ensure we are NOT currently inside an opening <a> tag
    // (?<![^<]</a>)  -> (Simplified check) We try to avoid double linking.
    // \b(${item.keyword})\b -> The keyword as a whole word (so "SIP" doesn't match "GOSSIP")
    // (?!([^<]+)?>)  -> Lookahead: Ensure we are not inside an HTML tag (like <img src="...keyword...">)

    // Note: Parsing HTML with Regex is tricky. This is a safe "good enough" version for standard text.
    const regex = new RegExp(
      `\\b(${item.keyword})\\b(?![^<]*>|[^<>]*<\\/a>)`,
      'gi'
    );

    // Replace with a standard link
    linkedContent = linkedContent.replace(regex, (match) => {
      return `<a href="${item.url}" class="internal-link" title="${match}">${match}</a>`;
    });
  });

  return linkedContent;
}
