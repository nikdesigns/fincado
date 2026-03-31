/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const { processWikiHtml } = require('./wikiProcessor');

const DATA_PATH = path.join(process.cwd(), 'src/data/articles.json');

const stripHtml = (value = '') =>
  String(value)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const normalizeMeta = (value = '') => {
  const clean = stripHtml(value);
  // Optional: keep snippets readable for SERP
  return clean.length > 180 ? `${clean.slice(0, 177).trimEnd()}...` : clean;
};

const raw = fs.readFileSync(DATA_PATH, 'utf8');
const articles = JSON.parse(raw);

const processed = articles.map((a) => ({
  ...a,
  // ✅ process full article HTML content
  content: processWikiHtml(a.content || ''),
  // ✅ keep meta description plain text only
  metaDescription: normalizeMeta(a.metaDescription || ''),
}));

const nextJson = `${JSON.stringify(processed, null, 2)}\n`;

// Optional: avoid unnecessary rewrite
if (nextJson !== raw) {
  fs.writeFileSync(DATA_PATH, nextJson, 'utf8');
  console.log('✅ Wiki content processed + metaDescription normalized');
} else {
  console.log('ℹ️ No changes needed');
}
