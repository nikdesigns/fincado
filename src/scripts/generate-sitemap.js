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

// ✅ UPDATED: All your static pages and calculators
const staticPages = [
  '/',
  '/about',
  '/contact',
  '/terms',
  '/privacy-policy',
  '/disclaimer',
  '/cookie-policy',
  '/calculators',
  '/guides',
  '/credit-score',
  '/home-loan-rates',
  '/investing',
  '/mutual-funds',
  '/savings',
  '/loans',
  // Calculators
  '/sip-calculator',
  '/emi-calculator',
  '/fd-calculator',
  '/rd-calculator',
  '/ppf-calculator',
  '/epf-calculator',
  '/gst-calculator',
  '/hra-calculator',
  '/gratuity-calculator',
  '/simple-interest-calculator',
  '/compound-interest-calculator',
  '/inflation-calculator',
  '/lumpsum-calculator',
  '/swp-calculator',
  '/step-up-sip-calculator',
  '/retirement-calculator',
  '/apy-calculator',
  '/sukanya-samriddhi',
  '/fire-calculator',
  // Loan Pages
  '/loans/home-loan',
  '/loans/personal-loan',
  '/loans/car-loan',
  '/loans/education-loan',
  '/loans/gold-loan',
  '/loans/business-loan',
  '/loans/loan-against-property',
  '/compare-loans',
];

// Guide pages (Dynamic)
const guidePages = articles.map((a) => `/guides/${a.slug}`);

// Category pages (Dynamic)
const categoryPages = Array.from(
  new Set(
    articles.map((a) => `/guides/category/${encodeURIComponent(a.category)}`)
  )
);

// City pages (Dynamic)
const cityPages = cities.map((c) => `/emi-calculator/${c.slug}`);

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
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`
  )
  .join('')}
</urlset>
`;

fs.writeFileSync(OUT, sitemap.trim());
console.log(`✅ Sitemap generated successfully with ${allPages.length} URLs!`);
