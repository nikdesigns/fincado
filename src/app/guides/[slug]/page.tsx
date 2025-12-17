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

  // ✅ SEO Critical: Canonical must match next.config.ts trailingSlash: true
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

  // ✅ Schema.org Structured Data
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
    <div className="container" style={{ padding: '40px 20px' }}>
      {/* ✅ Breadcrumbs (Single Source of Truth) */}
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

      {/* ✅ JSON-LD Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      {/* ✅ Layout Grid: Article Left, Sidebar Right */}
      <div className="layout-grid">
        {/* -------- LEFT COLUMN: ARTICLE CONTENT -------- */}
        <article className="article main-content">
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

            <p
              style={{
                fontSize: 18,
                color: 'var(--color-text-muted)',
                lineHeight: 1.6,
              }}
            >
              {article.metaDescription}
            </p>
          </header>

          {/* Top Ad */}
          <div className="no-print" style={{ marginBottom: 32 }}>
            <AdSlot id={`guide-top-${article.slug}`} type="leaderboard" />
          </div>

          {/* Main Content Body */}
          <WikiText content={article.content} className="guide-body" />

          {/* Related Guides Section */}
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

          {/* Bottom Ad */}
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

        {/* -------- RIGHT COLUMN: STICKY SIDEBAR -------- */}
        <aside className="sidebar no-print">
          {/* Navigation Widget */}
          <div
            style={{
              background: '#f8fafc',
              padding: '24px',
              borderRadius: '12px',
              marginBottom: '24px',
              border: '1px solid #e2e8f0',
            }}
          >
            <h4 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>
              Popular Tools
            </h4>
            <ul
              style={{
                paddingLeft: '20px',
                margin: 0,
                fontSize: '15px',
                lineHeight: '1.8',
              }}
            >
              <li>
                <Link href="/emi-calculator">EMI Calculator</Link>
              </li>
              <li>
                <Link href="/sip-calculator">SIP Calculator</Link>
              </li>
              <li>
                <Link href="/fd-calculator">FD Calculator</Link>
              </li>
              <li>
                <Link href="/credit-score">Check Credit Score</Link>
              </li>
            </ul>
          </div>

          {/* 💰 Sticky Sidebar Ad (High Revenue) */}
          <div style={{ position: 'sticky', top: '24px' }}>
            <AdSlot id="guide-sidebar-sticky" type="box" />
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ---------------- STATIC PATHS ---------------- */

export async function generateStaticParams() {
  return (articles as Article[]).map((a) => ({
    slug: a.slug,
  }));
}
