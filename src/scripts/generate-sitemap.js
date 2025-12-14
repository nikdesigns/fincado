const fs = require('fs');
const path = require('path');

const SITE = 'https://www.fincado.com';

// Absolute paths (safe everywhere)
const ARTICLES_PATH = path.join(process.cwd(), 'src', 'data', 'articles.json');
const CITIES_PATH = path.join(process.cwd(), 'src', 'data', 'cities.json');
const OUT = path.join(process.cwd(), 'public', 'sitemap.xml');

// Load JSON safely
const articles = fs.existsSync(ARTICLES_PATH)
  ? JSON.parse(fs.readFileSync(ARTICLES_PATH, 'utf8'))
  : [];

const cities = fs.existsSync(CITIES_PATH)
  ? JSON.parse(fs.readFileSync(CITIES_PATH, 'utf8'))
  : [];

// Static pages
const staticPages = [
  '/',
  '/guides',
  '/emi-calculator',
  '/sip-calculator',
  '/fd-calculator',
  '/credit-score',
];

// Guide pages
const guidePages = articles.map((a) => `/guides/${a.slug}`);

// Category pages
const categoryPages = Array.from(
  new Set(articles.map((a) => `/guides/category/${a.category}`))
);

// City pages (optional)
const cityPages = cities.map((c) => `/emi-calculator/${c.slug}`);

const allPages = [
  ...staticPages,
  ...categoryPages,
  ...guidePages,
  ...cityPages,
];

// Build sitemap
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
