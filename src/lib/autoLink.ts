import linksData from '@/data/internalLinks.json';

type LinkItem = {
  keyword: string;
  url: string;
};

// Sort by length (longest first) to prevent partial replacement issues
const SORTED_LINKS = (linksData as LinkItem[]).sort(
  (a, b) => b.keyword.length - a.keyword.length
);

export function autoLinkContent(html: string): string {
  if (!html) return '';

  // 1. Protect existing tags (don't link inside <a href="...">...</a> or other tags)
  // We split by HTML tags to isolate text nodes
  const parts = html.split(/(<[^>]+>)/g);

  return parts
    .map((part) => {
      // If it's a tag, return as is
      if (part.startsWith('<')) return part;

      // Process text content
      let processedPart = part;

      SORTED_LINKS.forEach(({ keyword, url }) => {
        // Match whole word, case insensitive
        const regex = new RegExp(`\\b(${escapeRegExp(keyword)})\\b`, 'gi');

        // Replace with link, keeping original casing
        processedPart = processedPart.replace(
          regex,
          `<a href="${url}" class="auto-link" title="Calculate ${keyword}">$1</a>`
        );
      });

      return processedPart;
    })
    .join('');
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
