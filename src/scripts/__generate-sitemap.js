const fs = require('fs');
const path = require('path');

// -------------------------------------
// 1. CONFIGURATION
// -------------------------------------
const SITE = 'https://www.fincado.com';

const ARTICLES_PATH = path.join(process.cwd(), 'src', 'data', 'articles.json');
const OUT = path.join(process.cwd(), 'public', 'sitemap.xml');

// -------------------------------------
// 2. DATA LOADING
// -------------------------------------
const articles = fs.existsSync(ARTICLES_PATH)
  ? JSON.parse(fs.readFileSync(ARTICLES_PATH, 'utf8'))
  : [];

// Bank Slugs (Must match src/lib/banks.ts)
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

// ✅ SUPPORTED CITIES (Must match keys in src/lib/localData.ts)
const supportedCitySlugs = [
  'mumbai',
  'delhi',
  'bangalore',
  'chennai',
  'hyderabad',
  'kolkata',
  'pune',
  'ahmedabad',
  'gurgaon',
  'noida',
  'thane',
  'navi-mumbai',
  'jaipur',
  'lucknow',
  'kanpur',
  'chandigarh',
  'indore',
  'bhopal',
  'nagpur',
  'surat',
  'vadodara',
  'rajkot',
  'visakhapatnam',
  'coimbatore',
  'kochi',
  'mysore',
  'patna',
  'bhubaneswar',
  'ranchi',
  'guwahati',
  'dehradun',
  'ludhiana',
  'amritsar',
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

// B. Hindi Pages
const hindiPages = [
  '/hi',
  '/hi/sip-calculator',
  '/hi/emi-calculator',
  '/hi/ppf-calculator',
  '/hi/fd-calculator',
  '/hi/rd-calculator',
  '/hi/gst-calculator',
  '/hi/lumpsum-calculator',
  '/hi/swp-calculator',
  '/hi/sukanya-samriddhi',
  '/hi/simple-interest-calculator',
  '/hi/guides/credit-score',
  '/hi/guides/personal-loan',
  '/hi/guides/sip-vs-fd',
];

// C. Guide Pages (Dynamic with Filtering)
// 🛑 FIX: Exclude pages that are now redirects
const excludedSlugs = [
  'home-loan-first-time-buyers',
  'home-loan-for-first-time-buyers',
  'personal-loan-interest-rates',
  'personal-loan-interest-rates-india',
];

const guidePages = articles
  .filter((a) => !excludedSlugs.includes(a.slug)) // Remove redirect URLs
  .map((a) => `/guides/${a.slug}`);

// D. Category Pages
const categoryPages = Array.from(
  new Set(
    articles.map((a) => `/guides/category/${encodeURIComponent(a.category)}`)
  )
);

// E. City EMI Pages
const cityPages = supportedCitySlugs.map((slug) => `/emi-calculator/${slug}`);

// F. Bank Pages
const bankPages = bankSlugs.map((b) => `/bank-emi/${b}`);

// G. Bank + City Pages
const bankCityPages = [];
bankSlugs.forEach((bank) => {
  supportedCitySlugs.forEach((citySlug) => {
    bankCityPages.push(`/bank-emi/${bank}/${citySlug}`);
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
