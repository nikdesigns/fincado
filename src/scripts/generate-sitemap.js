const fs = require('fs');
const path = require('path');

const SITE = 'https://www.fincado.com';

const ARTICLES_PATH = path.join(process.cwd(), 'src', 'data', 'articles.json');
const CITIES_PATH = path.join(process.cwd(), 'src', 'data', 'cities.json');
const OUT = path.join(process.cwd(), 'public', 'sitemap.xml');

const articles = fs.existsSync(ARTICLES_PATH)
  ? JSON.parse(fs.readFileSync(ARTICLES_PATH, 'utf8'))
  : [];
const cities = fs.existsSync(CITIES_PATH)
  ? JSON.parse(fs.readFileSync(CITIES_PATH, 'utf8'))
  : [];

// ✅ FIX 1: Add trailing slashes to static pages
const staticPages = [
  '/',
  '/guides/',
  '/emi-calculator/',
  '/sip-calculator/',
  '/fd-calculator/',
  '/credit-score/',
];

// ✅ FIX 2: Add trailing slash to dynamic pages
const guidePages = articles.map((a) => `/guides/${a.slug}/`);

// ✅ FIX 3: Add trailing slash + Encode URI (Clean version)
const categoryPages = Array.from(
  new Set(
    articles.map((a) => `/guides/category/${encodeURIComponent(a.category)}/`)
  )
);

const cityPages = cities.map((c) => `/emi-calculator/${c.slug}/`);

const allPages = [
  ...staticPages,
  ...categoryPages,
  ...guidePages,
  ...cityPages,
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (url) => `
  <url>
    <loc>${SITE}${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`
  )
  .join('')}
</urlset>
`;

fs.writeFileSync(OUT, sitemap.trim());
console.log(`✅ Sitemap generated (${allPages.length} URLs)`);
