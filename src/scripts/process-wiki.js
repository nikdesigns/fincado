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
  // Keep meta descriptions plain text and reasonably short for SERP snippets
  return clean.length > 180 ? `${clean.slice(0, 177).trimEnd()}...` : clean;
};

const raw = fs.readFileSync(DATA_PATH, 'utf8');
const articles = JSON.parse(raw);

const processed = articles.map((a) => ({
  ...a,
  // Process full article content for internal wiki links
  content: processWikiHtml(a.content || ''),
  // Keep metaDescription plain text only (no wiki linking)
  metaDescription: normalizeMeta(a.metaDescription || ''),
}));

const nextJson = `${JSON.stringify(processed, null, 2)}\n`;

// Avoid rewriting file when no changes
if (nextJson !== raw) {
  fs.writeFileSync(DATA_PATH, nextJson, 'utf8');
  console.log('✅ Wiki content processed + metaDescription normalized');
} else {
  console.log('ℹ️ No changes needed');
}
