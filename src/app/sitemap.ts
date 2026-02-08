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
  'personal-loan-interest-rates-india'
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
    'idfc-first'
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
    '/locations',
    '/guides',
    '/loans',
    '/credit-score',
    '/mutual-funds',
    '/compare-loans',
    '/home-loan-rates',
    // Tools - Investment
    '/sip-calculator',
    '/lumpsum-calculator',
    '/swp-calculator',
    '/fd-calculator',
    '/rd-calculator',
    '/ppf-calculator',
    '/elss-calculator',
    '/sukanya-samriddhi', // ✅ Added
    // Tools - Retirement
    '/epf-calculator',
    '/nps-calculator', // ✅ Added
    '/retirement-calculator',
    '/gratuity-calculator',
    '/apy-calculator',
    '/fire-calculator',
    // Tools - Tax & Utility
    '/income-tax-calculator',
    '/hra-calculator', // ✅ Added
    '/gst-calculator',
    '/inflation-calculator',
    '/emi-calculator',
    '/simple-interest-calculator',
    '/compound-interest-calculator',
    // Loans
    '/loans/home-loan',
    '/loans/personal-loan',
    '/loans/car-loan',
    '/loans/education-loan'
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
    // Hindi Tools - Investment
    '/hi/sip-calculator',
    '/hi/lumpsum-calculator',
    '/hi/swp-calculator',
    '/hi/fd-calculator',
    '/hi/rd-calculator',
    '/hi/ppf-calculator',
    '/hi/elss-calculator',
    '/hi/mutual-funds',
    '/hi/sukanya-samriddhi', // ✅ Added
    // Hindi Tools - Retirement
    '/hi/epf-calculator',
    '/hi/nps-calculator', // ✅ Added
    '/hi/retirement-calculator',
    '/hi/gratuity-calculator', // ✅ Added
    '/hi/apy-calculator', // ✅ Added
    '/hi/fire-calculator', // ✅ Added
    // Hindi Tools - Tax & Utility
    '/hi/income-tax-calculator', // ✅ Added
    '/hi/hra-calculator', // ✅ Added
    '/hi/gst-calculator', // ✅ Added
    '/hi/emi-calculator',
    '/hi/credit-score', // ✅ Added
    '/hi/inflation-calculator', // ✅ Added
    '/hi/compound-interest-calculator', // ✅ Added
    '/hi/simple-interest-calculator', // ✅ Added
    // Hindi Loans
    '/hi/loans/home-loan',
    '/hi/loans/personal-loan',
    '/hi/loans/car-loan',
    '/hi/loans/education-loan'
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
    ...bankCityRoutes
  ];
}
