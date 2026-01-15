import articlesData from '@/data/articles.json';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';

/* ✅ TYPE - Updated to match articles.json */
type Article = {
  slug: string;
  title: string;
  category: string;
  metaDescription: string;
  published: string;
};

// Safe cast for data
const articles = articlesData as unknown as Article[];

/* ✅ STATIC PARAMS */
export async function generateStaticParams() {
  // Get unique categories
  const categories = Array.from(new Set(articles.map((a) => a.category)));

  return categories.map((category) => ({
    // Next.js automatically encodes this for the URL
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
  const decodedCategory = decodeURIComponent(category);

  return {
    title: `${decodedCategory} Guides | Fincado`,
    description: `Read all ${decodedCategory} related financial guides, calculators and expert tips on Fincado.`,
  };
}

/* ✅ CATEGORY PAGE */
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  // Filter articles by category
  const filtered = articles.filter((a) => a.category === decodedCategory);

  if (!filtered.length) return notFound();

  return (
    <main className="container" style={{ padding: '40px 20px' }}>
      {/* Header */}
      <div
        style={{
          marginBottom: 40,
          borderBottom: '1px solid #eee',
          paddingBottom: 20,
        }}
      >
        <span
          style={{
            fontSize: 13,
            textTransform: 'uppercase',
            color: '#64748b',
            fontWeight: 600,
          }}
        >
          Category
        </span>
        <h1 style={{ margin: '8px 0 0', fontSize: 32 }}>{decodedCategory}</h1>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px',
        }}
      >
        {filtered.map((a) => (
          <Link
            key={a.slug}
            href={`/guides/${a.slug}/`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div
              className="card"
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: 24,
                border: '1px solid var(--color-border)',
                borderRadius: 12,
                transition: 'transform 0.2s',
              }}
            >
              <h3 style={{ fontSize: 18, marginBottom: 12, lineHeight: 1.4 }}>
                {a.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.6,
                  flexGrow: 1,
                }}
              >
                {a.metaDescription}
              </p>
              <div
                style={{
                  marginTop: 16,
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--color-brand-green)',
                }}
              >
                Read Article &rarr;
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Ad Placeholder */}
      <div style={{ marginTop: 60 }}>
        <AdSlot id="category-footer-ad" type="leaderboard" />
      </div>
    </main>
  );
}
