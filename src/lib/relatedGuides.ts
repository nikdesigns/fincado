import articles from '@/data/articles.json';

type Article = {
  slug: string;
  category: string;
  title: string;
};

export function getRelatedGuides(slug: string, category: string, limit = 4) {
  return (articles as Article[])
    .filter((a) => a.slug !== slug && a.category === category)
    .slice(0, limit);
}
