import articles from '@/data/articles.json';

type Article = {
  slug: string;
  title: string;
  category: string;
  published: string;
  priority?: number;
};

const CATEGORY_WEIGHT: Record<string, number> = {
  loans: 5,
  investing: 4,
  tax: 3,
  credit: 2,
};

export function getPopularGuides(limit = 6) {
  return (articles as Article[])
    .map((a) => {
      const ageScore = a.published
        ? Math.max(
            0,
            365 -
              Math.floor(
                (Date.now() - new Date(a.published).getTime()) /
                  (1000 * 60 * 60 * 24)
              )
          )
        : 0;

      return {
        ...a,
        score:
          (a.priority ?? 0) * 10 +
          (CATEGORY_WEIGHT[a.category?.toLowerCase()] ?? 1) * 5 +
          ageScore,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
