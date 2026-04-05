import { MetadataRoute } from 'next';
import articlesData from '@/data/articles.json';
import { banks } from '@/lib/banks';
import { cityDetails } from '@/lib/localData';

export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate once per day (24 hours)

const BASE_URL = 'https://fincado.com';

const getUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return cleanPath === '' ? `${BASE_URL}/` : `${BASE_URL}/${cleanPath}/`;
};

const PRIORITY = {
  HOMEPAGE: 1.0,
  HIGH: 0.9,
  MEDIUM_HIGH: 0.8,
  MEDIUM: 0.7,
  MEDIUM_LOW: 0.6,
  LOW: 0.5,
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  /* ---------------- 1. STATIC PAGES (ENGLISH) ---------------- */
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
    // '/hi/loans', // removed: include only if actual route exists
  ].map((route) => ({
    url: getUrl(route),
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: PRIORITY.MEDIUM,
  }));

  const hindiCalculators = [
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

    '/hi/epf-calculator',
    '/hi/nps-calculator',
    '/hi/retirement-calculator',
    '/hi/gratuity-calculator',
    '/hi/apy-calculator',
    '/hi/fire-calculator',
    '/hi/goal-planning-calculator',

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
  const seenArticleUrls = new Set<string>();

  const articleRoutes = articlesData
    .filter((article) => !article.hidden)
    .map((article) => {
      const path =
        article.language === 'hi'
          ? `/hi/guides/${article.slug}`
          : `/guides/${article.slug}`;

      const url = getUrl(path);

      // Deduplicate exact URLs
      if (seenArticleUrls.has(url)) return null;
      seenArticleUrls.add(url);

      const parsedDate = article.published
        ? new Date(article.published)
        : currentDate;
      const lastModified = Number.isNaN(parsedDate.getTime())
        ? currentDate
        : parsedDate;

      return {
        url,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: PRIORITY.MEDIUM_HIGH,
      };
    })
    .filter(Boolean) as MetadataRoute.Sitemap;

  /* ---------------- 4. BANK COMPARISON PAGES ---------------- */
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

  /* ---------------- 6. BANK & BANK-CITY PAGES ---------------- */
  /* These are now high-value content pages after our updates */
  const bankHubRoutes: MetadataRoute.Sitemap = banks.map((bank) => ({
    url: getUrl(`/bank-emi/${bank.slug}`),
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: PRIORITY.MEDIUM_HIGH, // ← Increased
  }));

  const bankCityRoutes: MetadataRoute.Sitemap = [];
  banks.forEach((bank) => {
    citySlugs.forEach((city) => {
      bankCityRoutes.push({
        url: getUrl(`/bank-emi/${bank.slug}/${city}`),
        lastModified: currentDate,
        changeFrequency: 'weekly' as const, // ← Changed from monthly
        priority: PRIORITY.MEDIUM, // ← Increased from LOW
      });
    });
  });

  /* ---------------- COMBINE ALL ROUTES ---------------- */
  return [
    ...mainPages,
    ...coreCalculators,

    ...comparisonRoutes,
    ...loanPages,

    ...investmentCalculators,
    ...retirementCalculators,
    ...taxUtilityCalculators,

    ...articleRoutes,

    ...bankHubRoutes,

    ...hindiCorePages,
    ...hindiCalculators,
    ...hindiOtherPages,

    ...cityRoutes,
    ...bankCityRoutes,

    ...informationalPages,
  ];
}
