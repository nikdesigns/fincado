export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/<[^>]+>/g, '') // remove inner tags
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9\u0900-\u097F\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function addHeadingIds(html: string) {
  return html.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (full, level, attrs, inner) => {
      // keep existing id if already present
      if (/id\s*=\s*["'][^"']+["']/i.test(attrs)) return full;
      const text = inner.replace(/<[^>]+>/g, '');
      const id = slugifyHeading(text);
      return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
    },
  );
}
