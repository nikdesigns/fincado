import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import WikiText from '@/components/WikiText';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import articles from '@/data/articles.json';
import { getRelatedGuides } from '@/lib/relatedGuides';

/* ---------------- TYPES ---------------- */

type Article = {
  slug: string;
  title: string;
  category: string;
  seoTitle: string;
  metaDescription: string;
  content: string;
  published: string;
};

type Props = {
  params: Promise<{ slug: string }>;
};

/* ---------------- METADATA ---------------- */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = (articles as Article[]).find((a) => a.slug === slug);

  if (!article) return {};

  const canonical = `https://www.fincado.com/guides/${article.slug}/`;

  return {
    title: article.seoTitle || article.title,
    description: article.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      type: 'article',
      url: canonical,
      publishedTime: article.published,
    },
  };
}

/* ---------------- PAGE ---------------- */

export default async function GuidePost({ params }: Props) {
  const { slug } = await params;
  const article = (articles as Article[]).find((a) => a.slug === slug);

  if (!article) notFound();

  const related = getRelatedGuides(article.slug, article.category);

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.published,
    dateModified: article.published,
    articleSection: article.category,
    author: {
      '@type': 'Organization',
      name: 'Fincado',
      url: 'https://www.fincado.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Fincado',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.fincado.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.fincado.com/guides/${article.slug}/`,
    },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          {
            name: article.title,
            url: `https://www.fincado.com/guides/${article.slug}`,
          },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      {/* ONLY CONTENT: Grid and Sidebar are handled by layout.tsx */}
      <article className="article">
        <header
          style={{
            marginBottom: 32,
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: 24,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--color-brand-green)',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            {article.category}
          </div>

          <h1
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            {article.title}
          </h1>

          <div
            style={{
              fontSize: 18,
              color: 'var(--color-text-muted)',
              lineHeight: 1.6,
            }}
          >
            <WikiText content={article.metaDescription} />
            {/* <WikiText content={article.content} className="guide-body" /> */}
          </div>
        </header>

        <div className="no-print" style={{ marginBottom: 32 }}>
          <AdSlot id={`guide-top-${article.slug}`} type="leaderboard" />
        </div>

        <WikiText content={article.content} className="guide-body" />

        {related.length > 0 && (
          <section style={{ marginTop: 64 }}>
            <h3 style={{ marginBottom: 16 }}>Related Guides</h3>
            <ul style={{ paddingLeft: 18 }}>
              {related.map((g) => (
                <li key={g.slug} style={{ marginBottom: 8 }}>
                  <Link href={`/guides/${g.slug}`}>{g.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div
          className="no-print"
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: '1px solid #e2e8f0',
          }}
        >
          <AdSlot id={`guide-bottom-${article.slug}`} type="leaderboard" />
        </div>
      </article>
    </>
  );
}

export async function generateStaticParams() {
  return (articles as Article[]).map((a) => ({
    slug: a.slug,
  }));
}
