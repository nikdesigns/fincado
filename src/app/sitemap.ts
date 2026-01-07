import { MetadataRoute } from 'next';
import articlesData from '@/data/articles.json';

export const dynamic = 'force-static';

// ✅ UPDATED: Added 'www' to match your page canonicals
const BASE_URL = 'https://www.fincado.com';

const excludedSlugs = [
  'home-loan-first-time-buyers',
  'personal-loan-interest-rates',
  'personal-loan-interest-rates-india',
];

// Helper to ensure clean URLs
const getUrl = (path: string) => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return cleanPath === '' ? `${BASE_URL}/` : `${BASE_URL}/${cleanPath}/`;
};

export default function sitemap(): MetadataRoute.Sitemap {
  /* ---------------- STATIC PAGES (ENGLISH) ---------------- */
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/terms',
    '/privacy-policy',
    '/disclaimer',

    // Hubs
    '/calculators',
    '/guides',
    '/loans',
    '/credit-score',
    '/mutual-funds',

    // Financial Calculators
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

    // Loan Pages
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
    '/hi/calculators',
    '/hi/guides',
    '/hi/loans', // ✅ Added: Hindi Loans Hub

    // Investment & Saving
    '/hi/sip-calculator',
    '/hi/elss-calculator',
    '/hi/fd-calculator',
    '/hi/rd-calculator',
    '/hi/ppf-calculator',
    '/hi/epf-calculator',
    '/hi/swp-calculator',
    '/hi/lumpsum-calculator',
    '/hi/sukanya-samriddhi',
    '/hi/mutual-funds',

    // Retirement
    '/hi/retirement-calculator',
    '/hi/apy-calculator',
    '/hi/fire-calculator',
    '/hi/gratuity-calculator',

    // Tax & Tools
    '/hi/income-tax-calculator',
    '/hi/inflation-calculator',
    '/hi/gst-calculator',
    '/hi/credit-score',
    '/hi/simple-interest-calculator',
    '/hi/compound-interest-calculator',

    // Loans (Specific)
    '/hi/emi-calculator',
    '/hi/loans/home-loan',
    '/hi/loans/personal-loan',
    '/hi/loans/car-loan',
    '/hi/loans/education-loan',
  ].map((route) => ({
    url: getUrl(route),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  /* ---------------- GUIDES (DYNAMIC FROM JSON) ---------------- */
  const articleRoutes = articlesData
    .filter((a) => !excludedSlugs.includes(a.slug))
    .map((article) => {
      const path =
        article.language === 'hi'
          ? `/hi/guides/${article.slug}`
          : `/guides/${article.slug}`;

      return {
        url: getUrl(path),
        // Use the actual published date for lastModified if available, else now
        lastModified: new Date(article.published || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
      };
    });

  return [...staticRoutes, ...hindiRoutes, ...articleRoutes];
}
