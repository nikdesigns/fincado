import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import WikiText from '@/components/WikiText';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import AuthorBio from '@/components/AuthorBio';
import articles from '@/data/articles.json';
import { getRelatedGuides } from '@/lib/relatedGuides';
import { getRelatedResources } from '@/lib/relatedResources';
import { autoLinkContent } from '@/utils/autoLinker';

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

  const baseUrl = 'https://fincado.com';
  // ✅ Ensure trailing slashes for Hreflang
  const enUrl = `${baseUrl}/guides/${article.slug}/`;
  const hiUrl = `${baseUrl}/hi/guides/${article.slug}/`;

  return {
    title: article.seoTitle || article.title,
    description: article.metaDescription,
    alternates: {
      canonical: hiUrl, // Self-referencing canonical
      languages: {
        en: enUrl, // Connects to English version
        hi: hiUrl, // Connects to Hindi version
        'x-default': enUrl, // Fallback for other languages
      },
    },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      type: 'article',
      url: hiUrl,
      publishedTime: article.published,
      locale: 'hi_IN',
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
  const processedContent = autoLinkContent(article.content, {
    excludeUrls: [`/hi/guides/${article.slug}/`, `/guides/${article.slug}/`],
    maxLinks: 10,
    maxPerKeyword: 1,
  });

  // ✅ 3. Get Related Hindi Guides
  const related = getRelatedGuides(article.slug, article.category).filter(
    (g) => g.language === 'hi'
  );
  const relatedTools = getRelatedResources(article.category, 'hi', 5).filter(
    (resource) => resource.href !== `/hi/guides/${article.slug}/`,
  );

  // ✅ 4. JSON-LD Schema (Structured Data)
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.published,
    dateModified: article.published,
    inLanguage: 'hi-IN',
    articleSection: article.category,
    isAccessibleForFree: true,
    publishingPrinciples: 'https://fincado.com/editorial-guidelines/',
    reviewedBy: {
      '@type': 'Organization',
      name: 'Fincado Research Team',
      url: 'https://fincado.com/about/',
    },
    author: {
      '@type': 'Organization',
      name: 'Fincado',
      url: 'https://fincado.com',
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
      '@id': `https://fincado.com/hi/guides/${article.slug}/`,
    },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'हिंदी (Hindi)', url: 'https://fincado.com/hi/' },
          {
            name: article.title,
            url: `https://fincado.com/hi/guides/${article.slug}/`,
          }
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
                  {/* ✅ FIX: Added trailing slash to internal link */}
                  <Link
                    href={`/hi/guides/${g.slug}/`}
                    style={{
                      fontSize: 18,
                      color: '#2563eb',
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

        {relatedTools.length > 0 && (
          <section
            style={{
              marginTop: 40,
              paddingTop: 24,
              borderTop: '1px solid #e2e8f0',
            }}
          >
            <h3 style={{ marginBottom: 20, fontSize: 22, color: '#1e293b' }}>
              उपयोगी टूल्स (Related Calculators & Tools)
            </h3>
            <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
              {relatedTools.map((tool) => (
                <li key={tool.href} style={{ marginBottom: 12 }}>
                  <Link
                    href={tool.href}
                    style={{
                      fontSize: 18,
                      color: '#2563eb',
                      textDecoration: 'none',
                      fontWeight: 500,
                    }}
                  >
                    👉 {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <AuthorBio />

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
  return (articles as Article[])
    .filter((a) => a.language === 'hi')
    .map((a) => ({
      slug: a.slug,
    }));
}
