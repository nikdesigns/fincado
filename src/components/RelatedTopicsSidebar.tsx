import articles from '@/data/articles.json';

type Props = {
  currentSlug: string;
  category: string;
};

type Article = {
  slug: string;
  title: string;
  category: string;
};

export default function RelatedTopicsSidebar({ currentSlug, category }: Props) {
  const related = (articles as Article[])
    .filter((a) => a.category === category && a.slug !== currentSlug)
    .slice(0, 6);

  if (related.length === 0) return null;

  return (
    <aside className="side-card">
      <h3>Related Topics</h3>

      <ul className="side-links">
        {related.map((item) => (
          <li key={item.slug}>
            <a href={`/guides/${item.slug}`}>{item.title}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
