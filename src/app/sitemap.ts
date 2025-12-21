import { MetadataRoute } from 'next';
import articlesData from '@/data/articles.json';

// ⚠️ REQUIRED for output: 'export'
export const dynamic = 'force-static';

// Configuration
const BASE_URL = 'https://www.fincado.com';

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

const excludedSlugs = [
  'home-loan-first-time-buyers',
  'home-loan-for-first-time-buyers',
  'personal-loan-interest-rates',
  'personal-loan-interest-rates-india',
];

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. Static English Pages
  const staticRoutes = [
    '',
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
    // Tools
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
    // Loans
    '/loans/home-loan',
    '/loans/personal-loan',
    '/loans/car-loan',
    '/loans/education-loan',
    '/compare-loans',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Static Hindi Pages
  const hindiRoutes = [
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
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 3. Dynamic Articles (English & Hindi)
  const articleRoutes = articlesData
    .filter((article) => !excludedSlugs.includes(article.slug))
    .map((article) => {
      const isHindi = article.language === 'hi';
      const path = isHindi
        ? `/hi/guides/${article.slug}`
        : `/guides/${article.slug}`;

      return {
        url: `${BASE_URL}${path}`,
        lastModified: new Date(article.published || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
      };
    });

  // 4. Category Pages
  const categories = Array.from(new Set(articlesData.map((a) => a.category)));
  const categoryRoutes = categories.map((cat) => ({
    url: `${BASE_URL}/guides/category/${encodeURIComponent(cat)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 5. City EMI Pages
  const cityRoutes = supportedCitySlugs.map((slug) => ({
    url: `${BASE_URL}/emi-calculator/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // 6. Bank Pages
  const bankRoutes = bankSlugs.map((slug) => ({
    url: `${BASE_URL}/bank-emi/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 7. Bank + City Pages
  const bankCityRoutes: MetadataRoute.Sitemap = [];
  bankSlugs.forEach((bank) => {
    supportedCitySlugs.forEach((city) => {
      bankCityRoutes.push({
        url: `${BASE_URL}/bank-emi/${bank}/${city}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      });
    });
  });

  return [
    ...staticRoutes,
    ...hindiRoutes,
    ...articleRoutes,
    ...categoryRoutes,
    ...cityRoutes,
    ...bankRoutes,
    ...bankCityRoutes,
  ];
}
