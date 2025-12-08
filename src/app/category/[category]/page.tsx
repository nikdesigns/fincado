import articles from '@/data/articles.json';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

/* ✅ TYPE */
type Article = {
  slug: string;
  title: string;
  category: string;
  seoTitle: string;
  metaDescription: string;
  content: string;
};

/* ✅ STATIC PARAMS */
export async function generateStaticParams() {
  const categories = Array.from(
    new Set((articles as Article[]).map((a) => a.category))
  );

  return categories.map((category) => ({
    category,
  }));
}

/* ✅ SEO METADATA */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;

  return {
    title: `${category.toUpperCase()} Guides | Fincado`,
    description: `Read all ${category} related financial guides, calculators and expert tips on Fincado.`,
  };
}

/* ✅ CATEGORY PAGE */
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const filtered = (articles as Article[]).filter(
    (a) => a.category === category
  );

  if (!filtered.length) return notFound();

  return (
    <main className="container">
      <h1 style={{ marginBottom: '30px' }}>{category.toUpperCase()} Guides</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
        }}
      >
        {filtered.map((a) => (
          <a
            key={a.slug}
            href={`/guides/${a.slug}`}
            className="card"
            style={{ textDecoration: 'none' }}
          >
            <h3>{a.title}</h3>
            <p>{a.metaDescription}</p>
          </a>
        ))}
      </div>

      {/* ✅ ADSENSE PLACEHOLDER */}
      <div className="ad-box" style={{ marginTop: '50px' }}>
        AdSense Category Ad
      </div>
    </main>
  );
}
