// src/app/guides/layout.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
// NOTE: articles.json path assumed to be correct for data lookup
import articles from '@/data/articles.json';
import FinancialNavWidget from '@/components/FinancialNavWidget';
// Assuming components like LegalNote and FinancialNavWidget might also be available/used here

// Type declaration needed for accessing JSON data
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
  // Robust slug extraction: filters out empty strings from the path array
  const slug = pathname.split('/').filter(Boolean).pop();

  // Find article data only if a specific slug is present (not on /guides/ root)
  // Casting articles to Article[] to ensure type safety in the find function
  const article = slug
    ? (articles as Article[]).find((a) => a.slug === slug)
    : undefined;

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

        {/* ✅ POPULAR CALCULATORS (Styled to look like FinancialNavWidget) */}
        <div
          className="nav-section calculator-section"
          style={{ marginTop: 24 }}
        >
          <h3 className="widget-header">Popular Tools</h3>
          <ul
            className="nav-list"
            style={{ listStyle: 'none', padding: 0, margin: 0 }}
          >
            <li style={{ borderBottom: '1px solid #f3f4f6' }}>
              <Link
                href="/emi-calculator"
                className="nav-link"
                style={{ padding: '10px 16px' }}
              >
                EMI Calculator
              </Link>
            </li>
            <li style={{ borderBottom: '1px solid #f3f4f6' }}>
              <Link
                href="/sip-calculator"
                className="nav-link"
                style={{ padding: '10px 16px' }}
              >
                SIP Calculator
              </Link>
            </li>
            <li style={{ borderBottom: '1px solid #f3f4f6' }}>
              <Link
                href="/fd-calculator"
                className="nav-link"
                style={{ padding: '10px 16px' }}
              >
                FD Calculator
              </Link>
            </li>
            <li>
              <Link
                href="/retirement-calculator"
                className="nav-link"
                style={{ padding: '10px 16px' }}
              >
                Retirement Planner
              </Link>
            </li>
          </ul>
        </div>

        {/* ✅ RELATED TOPICS (Only appears if article data is found) */}
        {article && (
          <div style={{ marginTop: 24 }}>
            {/* The RelatedTopicsSidebar component must be a client component */}
            <FinancialNavWidget />
          </div>
        )}
      </aside>
    </main>
  );
}
