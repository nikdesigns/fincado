import articles from '@/data/articles.json';

type Article = {
  slug: string;
  category: string;
  title: string;
  language?: string;
  published?: string;
};

const CATEGORY_HINTS: Record<string, string[]> = {
  'loans & mortgages': ['credit score', 'credit cards', 'taxation', 'tax planning'],
  'credit score': ['loans & mortgages', 'credit cards'],
  'credit cards': ['credit score', 'loans & mortgages'],
  'tax planning': ['taxation', 'tax saving', 'investments'],
  taxation: ['tax planning', 'tax saving', 'investments'],
  'tax saving': ['taxation', 'tax planning', 'mutual funds', 'savings & fd'],
  investments: ['mutual funds', 'mutual funds & sip', 'savings & fd', 'retirement'],
  'mutual funds': ['mutual funds & sip', 'investments', 'tax saving'],
  'mutual funds & sip': ['mutual funds', 'investments', 'tax planning'],
  'savings & fd': ['investments', 'tax saving', 'government schemes'],
  retirement: ['investments', 'mutual funds', 'government schemes'],
  'gold investment': ['investments', 'mutual funds'],
  'government schemes': ['savings & fd', 'retirement', 'tax saving'],
  insurance: ['tax planning', 'financial literacy'],
  'financial literacy': ['investments', 'tax planning'],
};

const STOP_WORDS = new Set([
  'the',
  'and',
  'for',
  'with',
  'from',
  'your',
  'guide',
  'india',
  'best',
  'how',
  'what',
  '2025',
  '2026',
  '2027',
]);

const tokenize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));

const normalizeCategory = (category: string) => category.toLowerCase().trim();

const scoreRecency = (published?: string) => {
  if (!published) return 0;
  const daysOld = Math.max(
    1,
    Math.floor((Date.now() - new Date(published).getTime()) / 86400000),
  );
  return Math.max(0, 6 - Math.log10(daysOld + 1) * 2);
};

const topicKey = (slug: string) =>
  slug
    .replace(/-20\d{2}$/, '')
    .replace(/-fy-\d{4}-\d{2}$/, '');

export function getRelatedGuides(slug: string, category: string, limit = 4) {
  const current = (articles as Article[]).find((a) => a.slug === slug);
  if (!current) return [];

  const currentTokens = new Set(tokenize(current.title));
  const currentLang = current.language || 'en';
  const currentCategory = normalizeCategory(category);
  const hintedCategories = new Set(CATEGORY_HINTS[currentCategory] || []);
  const seenTopics = new Set<string>();

  return (articles as Article[])
    .filter((a) => a.slug !== slug)
    .filter((a) => (a.language || 'en') === currentLang)
    .map((a) => {
      const candidateTokens = tokenize(a.title);
      const shared = candidateTokens.filter((t) => currentTokens.has(t)).length;
      const candidateCategory = normalizeCategory(a.category);

      let score = 0;
      if (candidateCategory === currentCategory) score += 10;
      if (hintedCategories.has(candidateCategory)) score += 5;
      score += Math.min(shared, 5) * 2;
      score += scoreRecency(a.published);

      if (/tax-on-\d/.test(slug) && /tax-on-\d/.test(a.slug)) score += 4;
      if (slug.includes('new-vs-old-tax-regime') && a.slug.startsWith('tax-on-')) {
        score += 3;
      }

      return { article: a, score };
    })
    .sort((a, b) => b.score - a.score)
    .filter(({ article }) => {
      const key = topicKey(article.slug);
      if (seenTopics.has(key)) return false;
      seenTopics.add(key);
      return true;
    })
    .slice(0, limit)
    .map(({ article }) => article);
}
