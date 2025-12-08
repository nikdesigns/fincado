import articles from '@/data/articles.json';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import AdSlot from '@/components/AdSlot';

/* ✅ TYPE */
type Article = {
  slug: string;
  title: string;
  category: string;
  seoTitle: string;
  metaDescription: string;
  content: string;
};

/* ✅ STATIC PARAMS (BUILD TIME) */
export async function generateStaticParams() {
  return (articles as Article[]).map((article) => ({
    slug: article.slug,
  }));
}

/* ✅ SEO METADATA (NEXT 15 SAFE) */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const article = (articles as Article[]).find((a) => a.slug === slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.seoTitle,
    description: article.metaDescription,
  };
}

/* ✅ ✅ ✅ NEXT.JS 15 SAFE PAGE COMPONENT */
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = (articles as Article[]).find((a) => a.slug === slug);

  if (!article) return notFound();

  return (
    <main className="container">
      <article className="article">
        <h1>{article.title}</h1>

        {/* ✅ ARTICLE HTML CONTENT */}
        <div dangerouslySetInnerHTML={{ __html: article.content }} />

        {/* ✅ ADSENSE PLACEHOLDER */}
        <AdSlot label="Article Ad" />
      </article>
    </main>
  );
}
