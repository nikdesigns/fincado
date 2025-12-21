import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import WikiText from '@/components/WikiText';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import articles from '@/data/articles.json';
import { getRelatedGuides } from '@/lib/relatedGuides';
import { autoLinkContent } from '@/utils/autoLinker'; // ✅ Connects Internal Links

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

/* ---------------- METADATA (SEO) ---------------- */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // ✅ Filter for Hindi Article
  const article = (articles as Article[]).find(
    (a) => a.slug === slug && a.language === 'hi'
  );

  if (!article) return {};

  const canonical = `https://www.fincado.com/hi/guides/${article.slug}/`;

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
      locale: 'hi_IN', // ✅ Hindi Locale
    },
  };
}

/* ---------------- PAGE COMPONENT ---------------- */

export default async function HindiGuidePost({ params }: Props) {
  const { slug } = await params;

  // ✅ 1. Find the Hindi Article
  const article = (articles as Article[]).find(
    (a) => a.slug === slug && a.language === 'hi'
  );

  if (!article) notFound();

  // ✅ 2. Inject Internal Links (Auto-Linker)
  const processedContent = autoLinkContent(article.content);

  // ✅ 3. Get Related Hindi Guides
  // (Ensure your getRelatedGuides util handles language filtering,
  // or simply filter the result here if needed)
  const related = getRelatedGuides(article.slug, article.category).filter(
    (g) => g.language === 'hi'
  );

  // ✅ 4. JSON-LD Schema (Structured Data)
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.published,
    dateModified: article.published,
    inLanguage: 'hi', // ✅ Mark as Hindi
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
      '@id': `https://www.fincado.com/hi/guides/${article.slug}/`,
    },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'हिंदी (Hindi)', url: 'https://www.fincado.com/hi' },
          {
            name: article.title,
            url: `https://www.fincado.com/hi/guides/${article.slug}`,
          },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

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
              color: '#0f172a',
            }}
          >
            {article.title}
          </h1>

          <div
            style={{
              fontSize: 18,
              color: '#64748b',
              lineHeight: 1.6,
            }}
          >
            {/* Display description nicely at the top */}
            <p>{article.metaDescription.replace(/<[^>]*>?/gm, '')}</p>
          </div>
        </header>

        {/* Top Ad */}
        <div className="no-print" style={{ marginBottom: 32 }}>
          <AdSlot id={`hindi-guide-top-${article.slug}`} type="leaderboard" />
        </div>

        {/* Main Content (With Auto-Links) */}
        <WikiText content={processedContent} className="guide-body" />

        {/* Related Posts */}
        {related.length > 0 && (
          <section
            style={{
              marginTop: 64,
              paddingTop: 32,
              borderTop: '1px solid #e2e8f0',
            }}
          >
            <h3 style={{ marginBottom: 20, fontSize: 22, color: '#1e293b' }}>
              संबंधित लेख (Related Guides)
            </h3>
            <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
              {related.map((g) => (
                <li key={g.slug} style={{ marginBottom: 12 }}>
                  <Link
                    href={`/hi/guides/${g.slug}`}
                    style={{
                      fontSize: 18,
                      color: '#2563eb', // Standard blue link
                      textDecoration: 'none',
                      fontWeight: 500,
                    }}
                  >
                    👉 {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Bottom Ad */}
        <div
          className="no-print"
          style={{
            marginTop: 48,
            paddingTop: 24,
          }}
        >
          <AdSlot
            id={`hindi-guide-bottom-${article.slug}`}
            type="leaderboard"
          />
        </div>
      </article>
    </>
  );
}

/* ---------------- STATIC GENERATION ---------------- */

export async function generateStaticParams() {
  // ✅ Only generate paths for Hindi articles
  return (articles as Article[])
    .filter((a) => a.language === 'hi')
    .map((a) => ({
      slug: a.slug,
    }));
}
