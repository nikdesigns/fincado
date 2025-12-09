import articles from '@/data/articles.json';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import AdSlot from '@/components/AdSlot';

/* -------------------------
   Types
--------------------------*/
type Article = {
  slug: string;
  title: string;
  category: string;
  seoTitle: string;
  metaDescription: string;
  content: string; // HTML
};

/* -------------------------
   Static params
--------------------------*/
export async function generateStaticParams() {
  return (articles as Article[]).map((article) => ({
    slug: article.slug,
  }));
}

/* -------------------------
   Auto internal links (RESTORED)
--------------------------*/
function autoLinkContent(html: string) {
  const links: Record<string, string> = {
    'EMI Calculator': '/emi-calculator',
    'SIP Calculator': '/sip-calculator',
    'FD Calculator': '/fd-calculator',
    'Personal Loan': '/loans/personal-loan',
    'Home Loan': '/loans/home-loan',
    'Credit Score': '/credit-score',
    Investing: '/investing',
    Savings: '/savings',
  };

  let updated = html;

  Object.entries(links).forEach(([text, url]) => {
    const regex = new RegExp(`\\b${text}\\b`, 'g');
    updated = updated.replace(
      regex,
      `<a href="${url}" class="auto-link">${text}</a>`
    );
  });

  return updated;
}

/* -------------------------
   FAQ Extractor
--------------------------*/
function extractFAQs(html: string) {
  const faqs: { question: string; answer: string }[] = [];
  const h3Regex = /<h3[^>]*>(.*?)<\/h3>/gi;
  let match: RegExpExecArray | null;

  while ((match = h3Regex.exec(html))) {
    const q = match[1].trim();
    const rest = html.slice(h3Regex.lastIndex);
    const pMatch = /^([\s\S]*?)<p[^>]*>([\s\S]*?)<\/p>/i.exec(rest);
    if (pMatch) {
      const answerText = pMatch[2].replace(/<[^>]+>/g, '').trim();
      if (answerText.length > 0) {
        faqs.push({
          question: q.replace(/<[^>]+>/g, '').trim(),
          answer: answerText,
        });
      }
    }
  }

  return faqs;
}

/* -------------------------
   Metadata
--------------------------*/
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = (articles as Article[]).find((a) => a.slug === slug);

  if (!article) return { title: 'Article Not Found' };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const url = `${siteUrl}/guides/${article.slug}`;

  return {
    title: article.seoTitle,
    description: article.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: article.seoTitle,
      description: article.metaDescription,
      url,
      siteName: 'Fincado',
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title: article.seoTitle,
      description: article.metaDescription,
    },
  };
}

/* -------------------------
   Page Component
--------------------------*/
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = (articles as Article[]).find((a) => a.slug === slug);
  if (!article) return notFound();

  const parts = article.content.split('<!-- AD -->');
  const faqs = extractFAQs(article.content);

  return (
    <main className="container">
      <article className="article">
        {parts.map((part, index) => (
          <div key={index} style={{ marginBottom: 16 }}>
            <div
              dangerouslySetInnerHTML={{
                __html: autoLinkContent(part),
              }}
            />

            {index !== parts.length - 1 && (
              <div style={{ margin: '40px 0' }}>
                <AdSlot label="In-Article Ad" />
              </div>
            )}
          </div>
        ))}

        <div style={{ marginTop: 48 }}>
          <AdSlot label="End of Article Ad" />
        </div>

        {/* ✅ JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: article.title,
              description: article.metaDescription,
            }),
          }}
        />

        {faqs.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: faqs.map((f) => ({
                  '@type': 'Question',
                  name: f.question,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: f.answer,
                  },
                })),
              }),
            }}
          />
        )}
      </article>
    </main>
  );
}
