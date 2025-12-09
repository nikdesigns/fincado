'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import articles from '@/data/articles.json';
import RelatedTopicsSidebar from '@/components/RelatedTopicsSidebar';

type Article = {
  slug: string;
  title: string;
  category: string;
};

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const slug = pathname.split('/').pop();

  const article = (articles as Article[]).find((a) => a.slug === slug);

  return (
    <main
      style={{
        maxWidth: 1180,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gap: 24,
        padding: '36px 20px',
      }}
    >
      {/* ✅ LEFT: ARTICLE CONTENT */}
      <div style={{ minWidth: 0 }}>{children}</div>

      {/* ✅ RIGHT: STICKY SIDEBAR */}
      <aside style={{ position: 'sticky', top: 90, height: 'fit-content' }}>
        {/* ✅ TOP AD */}
        <div className="ad-box">Advertisement</div>

        {/* ✅ POPULAR CALCULATORS (KEPT AS IS) */}
        <div className="card" style={{ marginTop: 24 }}>
          <h3>Popular Calculators</h3>
          <ul>
            <li>
              <Link href="/emi-calculator">EMI Calculator</Link>
            </li>
            <li>
              <Link href="/sip-calculator">SIP Calculator</Link>
            </li>
            <li>
              <Link href="/fd-calculator">FD Calculator</Link>
            </li>
          </ul>
        </div>

        {/* ✅ ✅ ✅ RELATED TOPICS (REPLACES CREDIT & LOANS) */}
        {article && (
          <div style={{ marginTop: 24 }}>
            <RelatedTopicsSidebar
              currentSlug={article.slug}
              category={article.category}
            />
          </div>
        )}
      </aside>
    </main>
  );
}
