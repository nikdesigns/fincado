const fs = require('fs');
const path = require('path');

const { processWikiHtml } = require('./wikiProcessor');

const DATA_PATH = path.join(process.cwd(), 'src/data/articles.json');

const articles = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

const processed = articles.map((a) => ({
  ...a,
  content: processWikiHtml(a.content),
  metaDescription: processWikiHtml(a.metaDescription),
}));

fs.writeFileSync(DATA_PATH, JSON.stringify(processed, null, 2));

console.log('✅ Wiki content processed');
