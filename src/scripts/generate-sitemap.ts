import * as fs from 'fs';
import * as path from 'path';

const SITE_URL = 'https://fincado.com'; // ✅ replace later with real domain

const ARTICLES_PATH = path.join(process.cwd(), 'src/data/articles.json');
const CITIES_PATH = path.join(process.cwd(), 'src/data/cities.json');
const OUT_PATH = path.join(process.cwd(), 'public/sitemap.xml');

// ✅ Load data
const articles = fs.existsSync(ARTICLES_PATH)
  ? JSON.parse(fs.readFileSync(ARTICLES_PATH, 'utf8'))
  : [];

const cities = fs.existsSync(CITIES_PATH)
  ? JSON.parse(fs.readFileSync(CITIES_PATH, 'utf8'))
  : [];

// ✅ Static core pages
const staticPages = [
  '/',
  '/emi-calculator',
  '/sip-calculator',
  '/fd-calculator',
  '/credit-score',
  '/savings',
];

// ✅ Category pages
const categories = Array.from(
  new Set(articles.map((a: any) => `/category/${a.category}`))
);

// ✅ Article pages
const articlePages = articles.map((a: any) => `/guides/${a.slug}`);

// ✅ City pages
const cityPages = cities.map((c: any) => `/city/${c.slug}`);

const allPages = [...staticPages, ...categories, ...articlePages, ...cityPages];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (url) => `
  <url>
    <loc>${SITE_URL}${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`
  )
  .join('')}
</urlset>
`;

fs.writeFileSync(OUT_PATH, sitemap.trim());

console.log(`✅ Sitemap generated with ${allPages.length} URLs`);
