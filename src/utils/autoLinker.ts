import internalLinksData from '@/data/internalLinks.json';

// Define the shape to satisfy TypeScript
type InternalLink = {
  keyword: string;
  url: string;
};

// Cast the imported JSON to the typed array
const internalLinks = internalLinksData as InternalLink[];

type AutoLinkOptions = {
  excludeUrls?: string[];
  maxLinks?: number;
  maxPerKeyword?: number;
};

const HTML_TAG_REGEX = /<[^>]+>/;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeAttr(value: string): string {
  return value.replace(/"/g, '&quot;');
}

export function autoLinkContent(
  content: string,
  options: AutoLinkOptions = {},
): string {
  if (!content) return '';

  const maxLinks = options.maxLinks ?? 12;
  const maxPerKeyword = options.maxPerKeyword ?? 1;
  const excluded = new Set(
    (options.excludeUrls ?? []).map((url) => url.replace(/\/+$/, '') || '/'),
  );

  // 1. Filter out any items that might be missing the keyword (Safety Check)
  // 2. Sort by length (longest first) to prevent partial replacement
  const sortedLinks = internalLinks
    .filter((item) => item.keyword && typeof item.keyword === 'string' && item.url)
    .filter((item) => {
      const normalized = item.url.replace(/\/+$/, '') || '/';
      return !excluded.has(normalized);
    })
    .sort((a, b) => b.keyword.length - a.keyword.length);

  if (sortedLinks.length === 0) return content;

  const segments = content.split(/(<[^>]+>)/g);
  let anchorDepth = 0;
  let totalLinked = 0;

  sortedLinks.forEach((item) => {
    if (totalLinked >= maxLinks) return;

    const escapedKeyword = escapeRegExp(item.keyword.trim()).replace(/\s+/g, '\\s+');
    if (!escapedKeyword) return;

    const regex = new RegExp(`\\b(${escapedKeyword})\\b`, 'gi');
    let perKeywordLinked = 0;

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      if (!segment) continue;

      if (HTML_TAG_REGEX.test(segment)) {
        if (/^<a\b/i.test(segment)) anchorDepth++;
        if (/^<\/a>/i.test(segment)) anchorDepth = Math.max(0, anchorDepth - 1);
        continue;
      }

      if (anchorDepth > 0) continue;
      if (totalLinked >= maxLinks || perKeywordLinked >= maxPerKeyword) break;

      segments[i] = segment.replace(regex, (match) => {
        if (totalLinked >= maxLinks || perKeywordLinked >= maxPerKeyword) {
          return match;
        }

        totalLinked++;
        perKeywordLinked++;

        return `<a href="${item.url}" class="internal-link" title="${escapeAttr(match)}">${match}</a>`;
      });
    }
  });

  return segments.join('');
}
