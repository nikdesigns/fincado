import React from 'react';
import Link from 'next/link';
import articles from '@/data/articles.json';

type Article = {
  slug: string;
  title: string;
  category: string;
};

export default function RelatedTopicsSidebar({
  category,
  currentSlug,
}: {
  category?: string;
  currentSlug?: string;
}) {
  const all = articles as Article[];

  // related: same category, max 6
  const related = all
    .filter((a) => a.category === category && a.slug !== currentSlug)
    .slice(0, 6);

  // popular calculators (static)
  const calculators = [
    { title: 'EMI Calculator', href: '/emi-calculator' },
    { title: 'SIP Calculator', href: '/sip-calculator' },
    { title: 'FD Calculator', href: '/fd-calculator' },
  ];

  return (
    <aside className="related-sidebar">
      <div className="ad-box">Advertisement</div>

      <div className="card related-card">
        <h3>Related Topics</h3>
        <ul>
          {related.length > 0 ? (
            related.map((r) => (
              <li key={r.slug}>
                <Link href={`/guides/${r.slug}`}>{r.title}</Link>
              </li>
            ))
          ) : (
            <li>No related topics yet</li>
          )}
        </ul>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Popular Calculators</h3>
        <ul>
          {calculators.map((c) => (
            <li key={c.href}>
              <Link href={c.href}>{c.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Trending Guides</h3>
        <div id="trending-guides-root">
          {/* Will be hydrated client-side by TrendingGuides if available */}
        </div>
      </div>
    </aside>
  );
}
