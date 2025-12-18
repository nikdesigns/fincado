const fs = require('fs');
const path = require('path');

// -------------------------------------
// 1. CONFIGURATION
// -------------------------------------
const SITE = 'https://www.fincado.com';

const ARTICLES_PATH = path.join(process.cwd(), 'src', 'data', 'articles.json');
const CITIES_PATH = path.join(process.cwd(), 'src', 'data', 'cities.json');
const OUT = path.join(process.cwd(), 'public', 'sitemap.xml');

// -------------------------------------
// 2. DATA LOADING
// -------------------------------------
const articles = fs.existsSync(ARTICLES_PATH)
  ? JSON.parse(fs.readFileSync(ARTICLES_PATH, 'utf8'))
  : [];

const cities = fs.existsSync(CITIES_PATH)
  ? JSON.parse(fs.readFileSync(CITIES_PATH, 'utf8'))
  : [];

// Bank Slugs (Must match src/lib/banks.ts)
// We hardcode them here to avoid TypeScript import issues in this Node script.
const bankSlugs = [
  'sbi',
  'hdfc',
  'icici',
  'axis',
  'kotak',
  'pnb',
  'bob',
  'canara',
  'union',
  'indusind',
  'idfc',
  'yes',
  'bajaj',
  'boi',
  'indian',
  'central',
  'bom',
  'federal',
  'tata',
  'abc',
];

// -------------------------------------
// 3. URL GENERATION
// -------------------------------------

// A. Static Pages (English)
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
  '/simple-interest-calculator',
  '/inflation-calculator',
  '/lumpsum-calculator',
  '/swp-calculator',
  '/retirement-calculator',
  '/apy-calculator',
  '/sukanya-samriddhi',
  '/fire-calculator',
  // Loan Pages
  '/loans/home-loan',
  '/loans/personal-loan',
  '/loans/car-loan',
  '/loans/education-loan',
  '/compare-loans',
];

// B. Hindi Pages (New Expansion)
const hindiPages = [
  '/hi', // 👈 The New Hub
  '/hi/sip-calculator',
  '/hi/emi-calculator',
  '/hi/ppf-calculator',
  '/hi/fd-calculator',
];

// C. Guide Pages (Dynamic)
const guidePages = articles.map((a) => `/guides/${a.slug}`);

// D. Category Pages (Dynamic)
const categoryPages = Array.from(
  new Set(
    articles.map((a) => `/guides/category/${encodeURIComponent(a.category)}`)
  )
);

// E. City EMI Pages (e.g., /emi-calculator/mumbai)
const cityPages = cities.map((c) => `/emi-calculator/${c.slug}`);

// F. Bank Pages (e.g., /bank-emi/sbi)
const bankPages = bankSlugs.map((b) => `/bank-emi/${b}`);

// G. Bank + City Pages (e.g., /bank-emi/sbi/mumbai) - Massive SEO Boost 🚀
const bankCityPages = [];
bankSlugs.forEach((bank) => {
  cities.forEach((city) => {
    bankCityPages.push(`/bank-emi/${bank}/${city.slug}`);
  });
});

// -------------------------------------
// 4. COMBINE & BUILD XML
// -------------------------------------
const allPages = [
  ...staticPages,
  ...hindiPages,
  ...categoryPages,
  ...guidePages,
  ...cityPages,
  ...bankPages,
  ...bankCityPages,
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
    <priority>${url === '/' ? '1.0' : '0.8'}</priority>
  </url>
`
  )
  .join('')}
</urlset>`;

// Write to File
fs.writeFileSync(OUT, sitemap.trim());
console.log(`✅ Sitemap generated successfully with ${allPages.length} URLs!`);
