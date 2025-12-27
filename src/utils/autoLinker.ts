import internalLinksData from '@/data/internalLinks.json';

// Define the shape to satisfy TypeScript
type InternalLink = {
  keyword: string;
  url: string;
};

// Cast the imported JSON to the typed array
const internalLinks = internalLinksData as InternalLink[];

export function autoLinkContent(content: string): string {
  if (!content) return '';

  let linkedContent = content;

  // 1. Filter out any items that might be missing the keyword (Safety Check)
  // 2. Sort by length (longest first) to prevent partial replacement
  const sortedLinks = internalLinks
    .filter((item) => item.keyword && typeof item.keyword === 'string')
    .sort((a, b) => b.keyword.length - a.keyword.length);

  sortedLinks.forEach((item) => {
    // Regex explanation:
    // \b(${item.keyword})\b -> The keyword as a whole word
    // (?![^<]*>|[^<>]*<\\/a>) -> Ensure we are not inside an HTML tag or already inside an <a> tag
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
