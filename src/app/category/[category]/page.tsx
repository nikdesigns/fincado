import articlesData from '@/data/articles.json';
import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';

type Article = {
  category: string;
};

const SITE_URL = 'https://fincado.com';

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export async function generateStaticParams() {
  const categories = Array.from(
    new Set(
      (articlesData as Article[])
        .map((article) => article.category)
        .filter(Boolean),
    ),
  );

  return categories.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const normalized = normalize(decodeURIComponent(category));
  const canonical = `${SITE_URL}/guides/category/${normalized}/`;

  return {
    title: 'Redirecting...',
    description: 'Redirecting to the canonical guide category page.',
    alternates: { canonical },
    openGraph: {
      title: 'Redirecting...',
      description: 'Redirecting to the canonical guide category page.',
      url: canonical,
      type: 'website',
    },
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}

export default async function CategoryRedirectPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const normalized = normalize(decodeURIComponent(category));

  if (!normalized) notFound();

  permanentRedirect(`/guides/category/${normalized}/`);
}
