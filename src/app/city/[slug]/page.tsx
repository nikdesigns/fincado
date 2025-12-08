import pages from '@/data/cities.json';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import AdSlot from '@/components/AdSlot';

/* ✅ TYPE */
type CityPage = {
  slug: string;
  loanType: string;
  city: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  content: string;
};

/* ✅ ✅ ✅ REQUIRED FOR output: "export" */
export async function generateStaticParams() {
  return (pages as CityPage[]).map((p) => ({
    slug: p.slug,
  }));
}

/* ✅ SEO METADATA (NEXT 15 SAFE) */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const page = (pages as CityPage[]).find((p) => p.slug === slug);

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: page.seoTitle,
    description: page.metaDescription,
  };
}

/* ✅ ✅ ✅ NEXT 15 + EXPORT SAFE PAGE */
export default async function CityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const page = (pages as CityPage[]).find((p) => p.slug === slug);

  if (!page) return notFound();

  return (
    <main className="container">
      <article className="article">
        <h1>{page.title}</h1>

        <div dangerouslySetInnerHTML={{ __html: page.content }} />

        {/* ✅ MONEY CTA */}
        <div className="loan-btn-row">
          <a href="/emi-calculator">
            <button className="primary-cta">Calculate EMI</button>
          </a>

          <a href="/compare-loans">
            <button className="apply-btn">Compare Offers</button>
          </a>
        </div>

        {/* ✅ ADSENSE */}
        <AdSlot label="City Page Ad" />
      </article>
    </main>
  );
}
