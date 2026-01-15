import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import WikiText from '@/components/WikiText';
import AdSlot from '@/components/AdSlot';
import articles from '@/data/articles.json';

const SITE_URL = 'https://fincado.com';

/* ---------------- TYPES ---------------- */

type Article = {
  slug: string;
  title: string;
  category: string;
  metaDescription: string;
};

type Props = {
  params: Promise<{ category: string }>;
};

/* ---------------- HELPERS ---------------- */

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const formatCategory = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/* ---------------- METADATA ---------------- */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const normalized = normalize(category);

  const canonical = `${SITE_URL}/guides/category/${normalized}`;

  return {
    title: `${formatCategory(normalized)} Guides | Fincado`,
    description: `Expert ${formatCategory(
      normalized
    )} guides to help you make smarter financial decisions.`,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${formatCategory(normalized)} Guides`,
      url: canonical,
    },
  };
}

/* ---------------- PAGE ---------------- */

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const normalized = normalize(category);

  const guides = (articles as Article[]).filter((a) =>
    normalize(a.category).includes(normalized)
  );

  if (guides.length === 0) notFound();

  return (
    <main className="container" style={{ paddingBottom: 80 }}>
      <header style={{ marginBottom: 40 }}>
        <h1>{formatCategory(normalized)} Guides</h1>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: 680 }}>
          Learn everything about {formatCategory(normalized)} with step-by-step
          guides written for Indian users.
        </p>
      </header>

      <div className="no-print" style={{ marginBottom: 32 }}>
        <AdSlot id={`guides-category-${normalized}-top`} type="leaderboard" />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 24,
        }}
      >
        {guides.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}/`}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              background: '#fff',
              border: '1px solid var(--color-border)',
              borderRadius: 14,
              padding: 20,
            }}
          >
            <h3>{g.title}</h3>
            <WikiText
              content={g.metaDescription}
              className="text-sm text-gray-500"
            />
          </Link>
        ))}
      </div>

      <div
        className="no-print"
        style={{
          marginTop: 48,
          paddingTop: 24,
          borderTop: '1px solid #e2e8f0',
        }}
      >
        <AdSlot
          id={`guides-category-${normalized}-bottom`}
          type="leaderboard"
        />
      </div>
    </main>
  );
}

/* ---------------- STATIC PARAMS ---------------- */

export async function generateStaticParams() {
  const categories = Array.from(
    new Set(
      (articles as Article[]).map((a) => normalize(a.category)).filter(Boolean)
    )
  );

  return categories.map((category) => ({ category }));
}
