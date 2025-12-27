import { MetadataRoute } from 'next';
import articlesData from '@/data/articles.json';

export const dynamic = 'force-static';

const BASE_URL = 'https://fincado.com';

const excludedSlugs = [
  'home-loan-first-time-buyers',
  'personal-loan-interest-rates',
  'personal-loan-interest-rates-india',
];

const getUrl = (path: string) =>
  path === '' ? `${BASE_URL}/` : `${BASE_URL}${path}/`;

export default function sitemap(): MetadataRoute.Sitemap {
  /* ---------------- STATIC PAGES (ENGLISH) ---------------- */
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/terms',
    '/privacy-policy',
    '/disclaimer',
    '/calculators',
    '/guides',
    '/credit-score',
    '/mutual-funds',
    '/loans',

    // Calculators
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
    '/elss-calculator', // ✅ Added
    '/income-tax-calculator', // ✅ Added

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

  /* ---------------- HINDI PAGES ---------------- */
  const hindiRoutes = [
    '/hi',
    '/hi/calculators', // ✅ New Hub
    '/hi/guides', // ✅ New Hub

    // Investment & Saving
    '/hi/sip-calculator',
    '/hi/elss-calculator', // ✅ Added
    '/hi/fd-calculator',
    '/hi/rd-calculator',
    '/hi/ppf-calculator',
    '/hi/epf-calculator',
    '/hi/swp-calculator',
    '/hi/lumpsum-calculator', // ✅ Added
    '/hi/sukanya-samriddhi',
    '/hi/mutual-funds',

    // Retirement
    '/hi/retirement-calculator',
    '/hi/apy-calculator',
    '/hi/fire-calculator',
    '/hi/gratuity-calculator',

    // Tax & Tools
    '/hi/income-tax-calculator', // ✅ Added
    '/hi/inflation-calculator',
    '/hi/gst-calculator',
    '/hi/credit-score',
    '/hi/simple-interest-calculator', // ✅ Added
    '/hi/compound-interest-calculator', // ✅ Added

    // Loans
    '/hi/emi-calculator',
    '/hi/loans/home-loan', // ✅ Added
    '/hi/loans/car-loan', // ✅ Added
    '/hi/loans/personal-loan', // ✅ Added
    '/hi/loans/education-loan', // ✅ Added
  ].map((route) => ({
    url: getUrl(route),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  /* ---------------- GUIDES (DYNAMIC) ---------------- */
  // This automatically picks up the new guides from articles.json
  const articleRoutes = articlesData
    .filter((a) => !excludedSlugs.includes(a.slug))
    .map((article) => {
      const path =
        article.language === 'hi'
          ? `/hi/guides/${article.slug}`
          : `/guides/${article.slug}`;

      return {
        url: getUrl(path),
        lastModified: new Date(article.published),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
      };
    });

  return [...staticRoutes, ...hindiRoutes, ...articleRoutes];
}
