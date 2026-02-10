import { MetadataRoute } from 'next';
import articlesData from '@/data/articles.json';
import { banks } from '@/lib/banks';
import { cityDetails } from '@/lib/localData';

export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate once per day (24 hours)

/**
 * ✅ Source of Truth: Non-WWW domain.
 * This matches your server's forced redirect and fixes "Duplicate" errors in GSC.
 */
const BASE_URL = 'https://fincado.com';

/**
 * Excluded slugs from sitemap (duplicates, redirects, or unpublished content)
 */
const excludedSlugs = [
  'home-loan-first-time-buyers',
  'personal-loan-interest-rates',
  'personal-loan-interest-rates-india',
];

/**
 * Helper to ensure consistent URL structure: Non-WWW + Trailing Slash.
 * This resolves the "Page with redirect" errors by pointing directly to the final URL.
 */
const getUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return cleanPath === '' ? `${BASE_URL}/` : `${BASE_URL}/${cleanPath}/`;
};

/**
 * Priority levels for different page types (SEO optimization)
 */
const PRIORITY = {
  HOMEPAGE: 1.0,
  HIGH: 0.9,
  MEDIUM_HIGH: 0.8,
  MEDIUM: 0.7,
  MEDIUM_LOW: 0.6,
  LOW: 0.5,
} as const;

/**
 * Change frequency for different page types
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  /* ---------------- 1. STATIC PAGES (ENGLISH) - HIGH PRIORITY ---------------- */
  const coreCalculators = [
    '/emi-calculator',
    '/sip-calculator',
    '/income-tax-calculator',
    '/home-loan-calculator',
  ].map((route) => ({
    url: getUrl(route),
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: PRIORITY.HIGH,
  }));

  const mainPages = [
    '',
    '/calculators',
    '/guides',
    '/compare-loans',
    '/loans',
    '/credit-score',
  ].map((route) => ({
    url: getUrl(route),
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? PRIORITY.HOMEPAGE : PRIORITY.MEDIUM_HIGH,
  }));

  const investmentCalculators = [
    '/lumpsum-calculator',
    '/swp-calculator',
    '/fd-calculator',
    '/rd-calculator',
    '/ppf-calculator',
    '/elss-calculator',
    '/nsc-calculator',
    '/cagr-calculator',
    '/sukanya-samriddhi',
  ].map((route) => ({
    url: getUrl(route),
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: PRIORITY.MEDIUM,
  }));

  const retirementCalculators = [
    '/epf-calculator',
    '/nps-calculator',
    '/retirement-calculator',
    '/gratuity-calculator',
    '/apy-calculator',
    '/fire-calculator',
    '/goal-planning-calculator',
  ].map((route) => ({
    url: getUrl(route),
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: PRIORITY.MEDIUM,
  }));

  const taxUtilityCalculators = [
    '/hra-calculator',
    '/gst-calculator',
    '/inflation-calculator',
    '/simple-interest-calculator',
    '/compound-interest-calculator',
  ].map((route) => ({
    url: getUrl(route),
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: PRIORITY.MEDIUM,
  }));

  const loanPages = [
    '/loans/home-loan',
    '/loans/personal-loan',
    '/loans/car-loan',
    '/loans/education-loan',
    '/home-loan-rates',
  ].map((route) => ({
    url: getUrl(route),
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: PRIORITY.MEDIUM_HIGH,
  }));

  const informationalPages = [
    '/about',
    '/contact',
    '/locations',
    '/mutual-funds',
    '/terms',
    '/privacy-policy',
    '/disclaimer',
    '/editorial-guidelines',
  ].map((route) => ({
    url: getUrl(route),
    lastModified: currentDate,
    changeFrequency: 'yearly' as const,
    priority: PRIORITY.LOW,
  }));

  /* ---------------- 2. STATIC PAGES (HINDI) ---------------- */
  const hindiCorePages = [
    '/hi',
    '/hi/calculators',
    '/hi/guides',
    '/hi/loans',
  ].map((route) => ({
    url: getUrl(route),
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: PRIORITY.MEDIUM,
  }));

  const hindiCalculators = [
    // Investment
    '/hi/sip-calculator',
    '/hi/lumpsum-calculator',
    '/hi/swp-calculator',
    '/hi/fd-calculator',
    '/hi/rd-calculator',
    '/hi/ppf-calculator',
    '/hi/elss-calculator',
    '/hi/nsc-calculator',
    '/hi/cagr-calculator',
    '/hi/sukanya-samriddhi',
    // Retirement
    '/hi/epf-calculator',
    '/hi/nps-calculator',
    '/hi/retirement-calculator',
    '/hi/gratuity-calculator',
    '/hi/apy-calculator',
    '/hi/fire-calculator',
    '/hi/goal-planning-calculator',
    // Tax & Utility
    '/hi/income-tax-calculator',
    '/hi/hra-calculator',
    '/hi/gst-calculator',
    '/hi/emi-calculator',
    '/hi/home-loan-calculator',
    '/hi/inflation-calculator',
    '/hi/compound-interest-calculator',
    '/hi/simple-interest-calculator',
  ].map((route) => ({
    url: getUrl(route),
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: PRIORITY.MEDIUM_LOW,
  }));

  const hindiOtherPages = [
    '/hi/mutual-funds',
    '/hi/credit-score',
    '/hi/loans/home-loan',
    '/hi/loans/personal-loan',
    '/hi/loans/car-loan',
    '/hi/loans/education-loan',
  ].map((route) => ({
    url: getUrl(route),
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: PRIORITY.MEDIUM_LOW,
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
        lastModified: article.published
          ? new Date(article.published)
          : currentDate,
        changeFrequency: 'monthly' as const,
        priority: PRIORITY.MEDIUM_HIGH,
      };
    });

  /* ---------------- 4. BANK COMPARISON PAGES (HIGH VALUE) ---------------- */
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
  for (let i = 0; i < topBanks.length; i++) {
    for (let j = i + 1; j < topBanks.length; j++) {
      // Only create one comparison per pair (avoid duplicates like sbi-vs-hdfc and hdfc-vs-sbi)
      comparisonRoutes.push({
        url: getUrl(`/compare/${topBanks[i]}-vs-${topBanks[j]}`),
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: PRIORITY.HIGH,
      });
    }
  }

  /* ---------------- 5. CITY EMI PAGES ---------------- */
  const citySlugs = Object.keys(cityDetails).filter((s) => s !== 'default');
  const cityRoutes = citySlugs.map((slug) => ({
    url: getUrl(`/emi-calculator/${slug}`),
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: PRIORITY.MEDIUM_LOW,
  }));

  /* ---------------- 6. BANK & BANK-CITY PAGES (REVENUE ENGINE) ---------------- */
  const bankHubRoutes: MetadataRoute.Sitemap = banks.map((bank) => ({
    url: getUrl(`/bank-emi/${bank.slug}`),
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: PRIORITY.MEDIUM,
  }));

  const bankCityRoutes: MetadataRoute.Sitemap = [];
  banks.forEach((bank) => {
    citySlugs.forEach((city) => {
      bankCityRoutes.push({
        url: getUrl(`/bank-emi/${bank.slug}/${city}`),
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: PRIORITY.LOW,
      });
    });
  });

  /* ---------------- COMBINE ALL ROUTES (ORGANIZED BY PRIORITY) ---------------- */
  return [
    // Tier 1: Homepage & Core Calculators (Highest Priority)
    ...mainPages,
    ...coreCalculators,

    // Tier 2: High-Value Comparison & Loan Pages
    ...comparisonRoutes,
    ...loanPages,

    // Tier 3: All Other Calculators
    ...investmentCalculators,
    ...retirementCalculators,
    ...taxUtilityCalculators,

    // Tier 4: Content & Guides
    ...articleRoutes,

    // Tier 5: Bank Hub Pages
    ...bankHubRoutes,

    // Tier 6: Hindi Content
    ...hindiCorePages,
    ...hindiCalculators,
    ...hindiOtherPages,

    // Tier 7: Location-Based Pages
    ...cityRoutes,
    ...bankCityRoutes,

    // Tier 8: Informational/Legal Pages (Lowest Priority)
    ...informationalPages,
  ];
}
