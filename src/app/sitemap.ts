import { MetadataRoute } from 'next';
import articlesData from '@/data/articles.json';
import { banks } from '@/lib/banks';
import { cityDetails } from '@/lib/localData';

export const dynamic = 'force-static';

/**
 * ✅ Source of Truth: Non-WWW domain.
 * This matches your server's forced redirect and fixes "Duplicate" errors in GSC.
 */
const BASE_URL = 'https://fincado.com';

const excludedSlugs = [
  'home-loan-first-time-buyers',
  'personal-loan-interest-rates',
  'personal-loan-interest-rates-india',
];

/**
 * Helper to ensure consistent URL structure: Non-WWW + Trailing Slash.
 * This resolves the "Page with redirect" errors by pointing directly to the final URL.
 */
const getUrl = (path: string) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return cleanPath === '' ? `${BASE_URL}/` : `${BASE_URL}/${cleanPath}/`;
};

export default function sitemap(): MetadataRoute.Sitemap {
  /* ---------------- 5. BANK COMPARISON PAGES (NEW) ---------------- */
  const topBanks = [
    'sbi',
    'hdfc',
    'icici',
    'axis',
    'kotak',
    'pnb',
    'bob',
    'lic-housing',
    'bajaj',
    'idfc-first',
  ];
  const comparisonRoutes: MetadataRoute.Sitemap = [];

  for (const b1 of topBanks) {
    for (const b2 of topBanks) {
      if (b1 !== b2) {
        comparisonRoutes.push({
          url: getUrl(`/compare/${b1}-vs-${b2}`), // Ensure trailing slash
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.9,
        });
      }
    }
  }

  /* ---------------- 1. STATIC PAGES (ENGLISH) ---------------- */
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/terms',
    '/privacy-policy',
    '/disclaimer',
    '/editorial-guidelines',
    '/calculators',
    '/guides',
    '/loans',
    '/credit-score',
    '/mutual-funds',
    '/compare-loans',
    '/home-loan-rates',
    // Tools
    '/emi-calculator',
    '/sip-calculator',
    '/fd-calculator',
    '/rd-calculator',
    '/ppf-calculator',
    '/epf-calculator',
    '/gst-calculator',
    '/inflation-calculator',
    '/simple-interest-calculator',
    '/lumpsum-calculator',
    '/swp-calculator',
    '/retirement-calculator',
    '/apy-calculator',
    '/fire-calculator',
    '/gratuity-calculator',
    '/compound-interest-calculator',
    '/elss-calculator',
    '/income-tax-calculator',
    // Loans
    '/loans/home-loan',
    '/loans/personal-loan',
    '/loans/car-loan',
    '/loans/education-loan',
  ].map((route) => ({
    url: getUrl(route),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  /* ---------------- 2. STATIC PAGES (HINDI) ---------------- */
  const hindiRoutes = [
    '/hi',
    '/hi/calculators',
    '/hi/guides',
    '/hi/loans',
    '/hi/sip-calculator',
    '/hi/emi-calculator',
    '/hi/ppf-calculator',
    '/hi/fd-calculator',
    '/hi/rd-calculator',
    '/hi/swp-calculator',
    '/hi/retirement-calculator',
  ].map((route) => ({
    url: getUrl(route),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  /* ---------------- 3. GUIDES (DYNAMIC FROM JSON) ---------------- */
  const articleRoutes = articlesData
    .filter((a) => !excludedSlugs.includes(a.slug))
    .map((article) => {
      const path =
        article.language === 'hi'
          ? `/hi/guides/${article.slug}`
          : `/guides/${article.slug}`;

      return {
        url: getUrl(path),
        lastModified: new Date(article.published || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
      };
    });

  /* ---------------- 4. CITY EMI PAGES ---------------- */
  const citySlugs = Object.keys(cityDetails).filter((s) => s !== 'default');
  const cityRoutes = citySlugs.map((slug) => ({
    url: getUrl(`/emi-calculator/${slug}`),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  /* ---------------- 5. BANK & BANK-CITY PAGES (REVENUE ENGINE) ---------------- */
  const bankCityRoutes: MetadataRoute.Sitemap = [];

  banks.forEach((bank) => {
    // Individual Bank Hub (e.g., /bank-emi/sbi/)
    bankCityRoutes.push({
      url: getUrl(`/bank-emi/${bank.slug}`),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    });

    // Localized Bank-City Pages (e.g., /bank-emi/sbi/mumbai/)
    citySlugs.forEach((city) => {
      bankCityRoutes.push({
        url: getUrl(`/bank-emi/${bank.slug}/${city}`),
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
    ...cityRoutes,
    ...comparisonRoutes,
    ...bankCityRoutes,
  ];
}
