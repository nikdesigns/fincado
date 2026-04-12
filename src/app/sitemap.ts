// src/app/sitemap.ts

import { MetadataRoute } from 'next';
import articlesData from '@/data/articles.json';
import { banks } from '@/lib/banks';

export const dynamic = 'force-static';
export const revalidate = 86400;

const BASE_URL = 'https://fincado.com';
const ENABLE_ALTERNATES = process.env.SITEMAP_ALTERNATES === 'true';

const getUrl = (path: string): string => {
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
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

type SitemapItem = MetadataRoute.Sitemap[number];
type RoutePair = [string, string?];
type ArticleLanguage = 'en' | 'hi';

interface ArticleEntry {
  slug: string;
  language?: ArticleLanguage;
  hidden?: boolean;
  published?: string;
  updated?: string;
  modified?: string;
  title?: string;
  seoTitle?: string;
  metaDescription?: string;
}

interface ArticleLangGroup {
  en?: ArticleEntry;
  hi?: ArticleEntry;
}

const DEFAULT_LAST_MODIFIED = new Date();

const makeEntry = (
  route: string,
  options: {
    lastModified?: Date | string;
    changeFrequency: SitemapItem['changeFrequency'];
    priority: number;
    alternates?: SitemapItem['alternates'];
  },
): SitemapItem => ({
  url: getUrl(route),
  lastModified: options.lastModified ?? DEFAULT_LAST_MODIFIED,
  changeFrequency: options.changeFrequency,
  priority: options.priority,
  ...(options.alternates ? { alternates: options.alternates } : {}),
});

const parseDate = (value?: string | null): Date => {
  if (!value) return DEFAULT_LAST_MODIFIED;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? DEFAULT_LAST_MODIFIED : parsed;
};

const withLangAlternates = (
  enPath: string,
  hiPath?: string,
): SitemapItem['alternates'] | undefined => {
  if (!hiPath) return undefined;
  if (!ENABLE_ALTERNATES || !hiPath) return undefined;

  return {
    languages: {
      en: getUrl(enPath),
      hi: getUrl(hiPath),
    },
  };
};

export default function sitemap(): MetadataRoute.Sitemap {
  /* ---------------- 1. STATIC PAGES (ENGLISH) ---------------- */
  const coreCalculatorPairs: RoutePair[] = [
    ['/emi-calculator', '/hi/emi-calculator'],
    ['/sip-calculator', '/hi/sip-calculator'],
    ['/income-tax-calculator', '/hi/income-tax-calculator'],
    ['/home-loan-calculator', '/hi/home-loan-calculator'],
  ];

  const coreCalculators: MetadataRoute.Sitemap = coreCalculatorPairs.map(
    ([en, hi]) =>
      makeEntry(en, {
        lastModified: DEFAULT_LAST_MODIFIED,
        changeFrequency: 'weekly',
        priority: PRIORITY.HIGH,
        alternates: withLangAlternates(en, hi),
      }),
  );

  const mainPages: MetadataRoute.Sitemap = [
    '',
    '/calculators',
    '/guides',
    '/compare-loans',
    '/loans',
    '/credit-score',
    '/bank-emi',
  ].map((route) =>
    makeEntry(route, {
      lastModified: DEFAULT_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: route === '' ? PRIORITY.HOMEPAGE : PRIORITY.MEDIUM_HIGH,
      alternates:
        route === '/calculators'
          ? withLangAlternates('/calculators', '/hi/calculators')
          : route === '/guides'
            ? withLangAlternates('/guides', '/hi/guides')
            : route === '/credit-score'
              ? withLangAlternates('/credit-score', '/hi/credit-score')
              : undefined,
    }),
  );

  const investmentCalculatorPairs: RoutePair[] = [
    ['/lumpsum-calculator', '/hi/lumpsum-calculator'],
    ['/swp-calculator', '/hi/swp-calculator'],
    ['/fd-calculator', '/hi/fd-calculator'],
    ['/rd-calculator', '/hi/rd-calculator'],
    ['/ppf-calculator', '/hi/ppf-calculator'],
    ['/elss-calculator', '/hi/elss-calculator'],
    ['/nsc-calculator', '/hi/nsc-calculator'],
    ['/cagr-calculator', '/hi/cagr-calculator'],
    ['/sukanya-samriddhi', '/hi/sukanya-samriddhi'],
  ];

  const investmentCalculators: MetadataRoute.Sitemap =
    investmentCalculatorPairs.map(([en, hi]) =>
      makeEntry(en, {
        lastModified: DEFAULT_LAST_MODIFIED,
        changeFrequency: 'monthly',
        priority: PRIORITY.MEDIUM,
        alternates: withLangAlternates(en, hi),
      }),
    );

  const retirementCalculatorPairs: RoutePair[] = [
    ['/epf-calculator', '/hi/epf-calculator'],
    ['/nps-calculator', '/hi/nps-calculator'],
    ['/retirement-calculator', '/hi/retirement-calculator'],
    ['/gratuity-calculator', '/hi/gratuity-calculator'],
    ['/apy-calculator', '/hi/apy-calculator'],
    ['/fire-calculator', '/hi/fire-calculator'],
    ['/goal-planning-calculator', '/hi/goal-planning-calculator'],
  ];

  const retirementCalculators: MetadataRoute.Sitemap =
    retirementCalculatorPairs.map(([en, hi]) =>
      makeEntry(en, {
        lastModified: DEFAULT_LAST_MODIFIED,
        changeFrequency: 'monthly',
        priority: PRIORITY.MEDIUM,
        alternates: withLangAlternates(en, hi),
      }),
    );

  const taxUtilityCalculatorPairs: RoutePair[] = [
    ['/hra-calculator', '/hi/hra-calculator'],
    ['/gst-calculator', '/hi/gst-calculator'],
    ['/inflation-calculator', '/hi/inflation-calculator'],
    ['/simple-interest-calculator', '/hi/simple-interest-calculator'],
    ['/compound-interest-calculator', '/hi/compound-interest-calculator'],
  ];

  const taxUtilityCalculators: MetadataRoute.Sitemap =
    taxUtilityCalculatorPairs.map(([en, hi]) =>
      makeEntry(en, {
        lastModified: DEFAULT_LAST_MODIFIED,
        changeFrequency: 'monthly',
        priority: PRIORITY.MEDIUM,
        alternates: withLangAlternates(en, hi),
      }),
    );

  const loanPagePairs: RoutePair[] = [
    ['/loans/home-loan', '/hi/loans/home-loan'],
    ['/loans/personal-loan', '/hi/loans/personal-loan'],
    ['/loans/car-loan', '/hi/loans/car-loan'],
    ['/loans/education-loan', '/hi/loans/education-loan'],
    ['/home-loan-rates'],
  ];

  const loanPages: MetadataRoute.Sitemap = loanPagePairs.map(([en, hi]) =>
    makeEntry(en, {
      lastModified: DEFAULT_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: PRIORITY.MEDIUM_HIGH,
      alternates: withLangAlternates(en, hi),
    }),
  );

  const informationalPages: MetadataRoute.Sitemap = [
    '/about',
    '/contact',
    '/locations',
    '/mutual-funds',
    '/terms',
    '/privacy-policy',
    '/disclaimer',
    '/editorial-guidelines',
  ].map((route) =>
    makeEntry(route, {
      lastModified: DEFAULT_LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: PRIORITY.LOW,
    }),
  );

  /* ---------------- 2. HINDI STANDALONE PAGES ---------------- */
  const hindiStandalonePages: MetadataRoute.Sitemap = [
    '/hi',
    '/hi/calculators',
    '/hi/guides',
    '/hi/mutual-funds',
    '/hi/credit-score',
  ].map((route) =>
    makeEntry(route, {
      lastModified: DEFAULT_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: PRIORITY.MEDIUM_LOW,
    }),
  );

  /* ---------------- 3. GUIDES (DYNAMIC FROM JSON) ---------------- */
  const typedArticles = articlesData as ArticleEntry[];
  const articlesBySlug = new Map<string, ArticleLangGroup>();

  for (const article of typedArticles.filter((article) => !article.hidden)) {
    const existing = articlesBySlug.get(article.slug) ?? {};
    if (article.language === 'hi') existing.hi = article;
    else existing.en = article;
    articlesBySlug.set(article.slug, existing);
  }

  const articleRoutes: MetadataRoute.Sitemap = [];

  for (const [slug, pair] of articlesBySlug.entries()) {
    if (pair.en) {
      const lastModified = parseDate(
        pair.en.updated || pair.en.modified || pair.en.published,
      );

      articleRoutes.push(
        makeEntry(`/guides/${slug}`, {
          lastModified,
          changeFrequency: 'monthly',
          priority: PRIORITY.MEDIUM_HIGH,
          alternates:
            ENABLE_ALTERNATES && pair.hi
              ? {
                  languages: {
                    en: getUrl(`/guides/${slug}`),
                    hi: getUrl(`/hi/guides/${slug}`),
                  },
                }
              : undefined,
        }),
      );
    }

    if (pair.hi && !pair.en) {
      const lastModified = parseDate(
        pair.hi.updated || pair.hi.modified || pair.hi.published,
      );

      articleRoutes.push(
        makeEntry(`/hi/guides/${slug}`, {
          lastModified,
          changeFrequency: 'monthly',
          priority: PRIORITY.MEDIUM,
        }),
      );
    }
  }

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
      comparisonRoutes.push(
        makeEntry(`/compare/${topBanks[i]}-vs-${topBanks[j]}`, {
          lastModified: DEFAULT_LAST_MODIFIED,
          changeFrequency: 'weekly',
          priority: PRIORITY.HIGH,
        }),
      );
    }
  }

  /* ---------------- 5. BANK HUB PAGES ---------------- */
  const bankHubRoutes: MetadataRoute.Sitemap = banks.map((bank) =>
    makeEntry(`/bank-emi/${bank.slug}`, {
      lastModified: DEFAULT_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: PRIORITY.HIGH,
    }),
  );

  /* ---------------- COMBINE & DEDUPE ---------------- */
  const allRoutes: MetadataRoute.Sitemap = [
    ...mainPages,
    ...coreCalculators,
    ...comparisonRoutes,
    ...loanPages,
    ...investmentCalculators,
    ...retirementCalculators,
    ...taxUtilityCalculators,
    ...articleRoutes,
    ...bankHubRoutes,
    ...hindiStandalonePages,
    ...informationalPages,
  ];

  return Array.from(
    new Map(allRoutes.map((item) => [item.url, item])).values(),
  );
}
