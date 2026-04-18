import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import WikiText from '@/components/WikiText';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import articles from '@/data/articles.json';
import { getRelatedGuides } from '@/lib/relatedGuides';
import { getRelatedResources } from '@/lib/relatedResources';
import { autoLinkContent } from '@/utils/autoLinker';
import { addHeadingIds } from '@/utils/addHeadingIds';

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const article = (articles as Article[]).find(
    (a) => a.slug === slug && (!a.language || a.language === 'en'),
  );

  if (!article) return {};

  const baseUrl = 'https://fincado.com';
  const enUrl = `${baseUrl}/guides/${article.slug}/`;
  const hiUrl = `${baseUrl}/hi/guides/${article.slug}/`;

  return {
    title: article.seoTitle || article.title,
    description: article.metaDescription,
    alternates: {
      canonical: enUrl,
      languages: {
        en: enUrl,
        hi: hiUrl,
        'x-default': enUrl,
      },
    },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      type: 'article',
      url: enUrl,
      publishedTime: article.published,
      locale: 'en_IN',
    },
  };
}

export default async function GuidePost({ params }: Props) {
  const { slug } = await params;

  // Keep same filter as metadata to avoid language mismatches
  const article = (articles as Article[]).find(
    (a) => a.slug === slug && (!a.language || a.language === 'en'),
  );

  if (!article) notFound();

  const processedContent = addHeadingIds(
    autoLinkContent(article.content, {
      excludeUrls: [`/guides/${article.slug}/`],
      maxLinks: 10,
      maxPerKeyword: 1,
    }),
  );
  const related = getRelatedGuides(article.slug, article.category);
  const relatedTools = getRelatedResources(article.category, 'en', 5).filter(
    (resource) => resource.href !== `/guides/${article.slug}/`,
  );

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
            url: `https://fincado.com/guides/${article.slug}/`,
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
              fontWeight: 'bold',
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

        <WikiText content={processedContent} className="guide-body" />

        {related.length > 0 && (
          <section style={{ marginTop: 64 }}>
            <h2
              style={{
                marginBottom: 16,
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#0f172a',
              }}
            >
              Related Guides
            </h2>
            <ul style={{ paddingLeft: 18 }}>
              {related.map((g) => (
                <li key={g.slug} style={{ marginBottom: 8 }}>
                  <Link
                    href={`/guides/${g.slug}/`}
                    className="text-blue-600 hover:underline"
                  >
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {relatedTools.length > 0 && (
          <section style={{ marginTop: 40 }}>
            <h2
              style={{
                marginBottom: 16,
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#0f172a',
              }}
            >
              Related Calculators & Tools
            </h2>
            <ul style={{ paddingLeft: 18 }}>
              {relatedTools.map((tool) => (
                <li key={tool.href} style={{ marginBottom: 8 }}>
                  <Link href={tool.href} className="text-blue-600 hover:underline">
                    {tool.title}
                  </Link>
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
  return (articles as Article[])
    .filter((a) => !a.language || a.language === 'en')
    .map((a) => ({
      slug: a.slug,
    }));
}
