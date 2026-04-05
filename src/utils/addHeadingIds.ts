// src/utils/addHeadingIds.ts
import { slugify } from '@/lib/slugify';

export function addHeadingIds(html: string): string {
  if (!html) return html;

  // Add id to <h2>
  let processed = html.replace(
    /<h2([^>]*)>(.*?)<\/h2>/gi,
    (match, attributes, content) => {
      const text = content.replace(/<[^>]+>/g, '').trim();
      const id = slugify(text);
      return `<h2 id="${id}"${attributes}>${content}</h2>`;
    },
  );

  // Add id to <h3>
  processed = processed.replace(
    /<h3([^>]*)>(.*?)<\/h3>/gi,
    (match, attributes, content) => {
      const text = content.replace(/<[^>]+>/g, '').trim();
      const id = slugify(text);
      return `<h3 id="${id}"${attributes}>${content}</h3>`;
    },
  );

  return processed;
}
