import articles from '@/data/articles.json';

type Article = {
  slug: string;
  category: string;
  title: string;
  language?: string;
  published?: string;
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
]);

const tokenize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));

const scoreRecency = (published?: string) => {
  if (!published) return 0;
  const daysOld = Math.max(
    1,
    Math.floor((Date.now() - new Date(published).getTime()) / 86400000),
  );
  return 365 / daysOld;
};

export function getRelatedGuides(slug: string, category: string, limit = 4) {
  const current = (articles as Article[]).find((a) => a.slug === slug);
  if (!current) return [];

  const currentTokens = new Set(tokenize(current.title));
  const currentLang = current.language || 'en';

  return (articles as Article[])
    .filter((a) => a.slug !== slug)
    .filter((a) => (a.language || 'en') === currentLang)
    .map((a) => {
      const candidateTokens = tokenize(a.title);
      const shared = candidateTokens.filter((t) => currentTokens.has(t)).length;

      let score = 0;
      if (a.category === category) score += 6;
      score += Math.min(shared, 4) * 2;
      score += scoreRecency(a.published);

      return { article: a, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ article }) => article);
}
