import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import WikiText from '@/components/WikiText';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import articles from '@/data/articles.json';
import { getRelatedGuides } from '@/lib/relatedGuides';
import { autoLinkContent } from '@/utils/autoLinker'; // ✅ Imported

/* ---------------- TYPES ---------------- */

type Article = {
  slug: string;
  title: string;
  category: string;
  seoTitle: string;
  metaDescription: string;
  content: string;
  published: string;
  language?: string;
};

type Props = {
  params: Promise<{ slug: string }>;
};

/* ---------------- METADATA ---------------- */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // 1. Find the article (Safely filter for English to avoid grabbing Hindi by mistake)
  const article = (articles as Article[]).find(
    (a) => a.slug === slug && (!a.language || a.language === 'en')
  );

  if (!article) return {};

  const baseUrl = 'https://fincado.com/';
  // 2. Define URLs with trailing slashes
  const enUrl = `${baseUrl}/guides/${article.slug}/`;
  const hiUrl = `${baseUrl}/hi/guides/${article.slug}/`;

  return {
    title: article.seoTitle || article.title,
    description: article.metaDescription,

    // 3. ✅ FIX: Add Hreflang Tags
    alternates: {
      canonical: enUrl,
      languages: {
        en: enUrl, // Current Page (English)
        hi: hiUrl, // Alternate Page (Hindi)
        'x-default': enUrl, // Default fallback
      },
    },

    openGraph: {
      title: article.title,
      description: article.metaDescription,
      type: 'article',
      url: enUrl,
      publishedTime: article.published,
      locale: 'en_IN', // Explicitly set locale
    },
  };
}

/* ---------------- PAGE ---------------- */

export default async function GuidePost({ params }: Props) {
  const { slug } = await params;
  const article = (articles as Article[]).find((a) => a.slug === slug);

  if (!article) notFound();

  // ✅ ACTION: Process the content to inject internal links automatically
  const processedContent = autoLinkContent(article.content);

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
      url: 'https://fincado.com/',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Fincado',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://fincado.com/guides/${article.slug}/`,
    },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: article.title,
            url: `https://fincado.com/guides/${article.slug}`,
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
          </div>
        </header>

        <div className="no-print" style={{ marginBottom: 32 }}>
          <AdSlot id={`guide-top-${article.slug}`} type="leaderboard" />
        </div>

        {/* ✅ Updated: Using processedContent instead of article.content */}
        <WikiText content={processedContent} className="guide-body" />

        {related.length > 0 && (
          <section style={{ marginTop: 64 }}>
            <h3 style={{ marginBottom: 16 }}>Related Guides</h3>
            <ul style={{ paddingLeft: 18 }}>
              {related.map((g) => (
                <li key={g.slug} style={{ marginBottom: 8 }}>
                  <Link href={`/guides/${g.slug}/`}>{g.title}</Link>
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
