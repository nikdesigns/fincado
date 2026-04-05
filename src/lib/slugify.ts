export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '') // remove quotes
    .replace(/[^a-z0-9\u0900-\u097F\s-]/g, '') // keep Hindi + English + hyphen
    .replace(/\s+/g, '-') // spaces → hyphen
    .replace(/-+/g, '-'); // collapse multiple hyphens
}
