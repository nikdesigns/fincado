'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import WikiText from '@/components/WikiText';

/* ---------- TYPES ---------- */
type Article = {
  slug: string;
  title: string;
  category: string;
  metaDescription: string;
  published: string; // YYYY-MM-DD
  language?: string;
};

/* ---------- HYDRATION-SAFE DATE FORMAT ---------- */
const MONTHS: Record<string, string> = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec',
};

function formatDateSafe(dateString: string) {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day} ${MONTHS[month]} ${year}`;
}

/* ---------- COMPONENT ---------- */
export default function GuidesGrid({
  allArticles = [],
}: {
  allArticles?: Article[];
}) {
  const [activeCategory, setActiveCategory] = useState('All');

  /* Always safe array */
  const articles = useMemo(
    () => (Array.isArray(allArticles) ? allArticles : []),
    [allArticles]
  );

  /* Categories */
  const categories = useMemo(() => {
    const set = new Set(articles.map((a) => a.category));
    return ['All', ...Array.from(set)];
  }, [articles]);

  /* Filtered articles */
  const filteredArticles = useMemo(() => {
    if (activeCategory === 'All') return articles;
    return articles.filter((a) => a.category === activeCategory);
  }, [activeCategory, articles]);

  /* Empty state */
  if (!articles.length) {
    return (
      <div
        style={{
          padding: 60,
          textAlign: 'center',
          color: '#64748b',
        }}
      >
        No guides available right now.
      </div>
    );
  }

  return (
    <div>
      {/* ---------- FILTER PILLS ---------- */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          marginBottom: 32,
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '8px 18px',
              borderRadius: 999,
              border:
                activeCategory === cat
                  ? '1px solid var(--color-brand-green)'
                  : '1px solid var(--color-border)',
              background:
                activeCategory === cat ? 'var(--color-brand-green)' : '#fff',
              color:
                activeCategory === cat ? '#fff' : 'var(--color-text-muted)',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ---------- GRID ---------- */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 24,
        }}
      >
        {filteredArticles.map((guide) => (
          // Use a unique key combining slug and language (default 'en' if missing)
          <Link
            key={`${guide.slug}-${guide.language || 'en'}`}
            href={`/guides/${guide.slug}`}
          >
            <article className="guide-card">
              {/* CATEGORY */}
              <div style={{ marginBottom: 16 }}>
                <span className="category-pill">{guide.category}</span>
              </div>

              {/* TITLE */}
              <h3 className="guide-title">{guide.title}</h3>

              {/* DESCRIPTION */}
              <div className="guide-desc">
                <WikiText content={guide.metaDescription} />
              </div>

              {/* FOOTER */}
              <footer className="guide-footer">
                <span>{formatDateSafe(guide.published)}</span>
                <span className="read-more">Read →</span>
              </footer>
            </article>
          </Link>
        ))}
      </div>

      {/* ---------- STYLES ---------- */}
      <style jsx global>{`
        .guide-link {
          text-decoration: none;
          color: inherit;
        }

        .guide-card {
          background: #fff;
          border: 1px solid var(--color-border);
          border-radius: 16px;
          padding: 24px;
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
        }

        .guide-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
          border-color: var(--color-brand-light);
        }

        .category-pill {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--color-brand-green);
          background: var(--color-success-bg);
          padding: 4px 12px;
          border-radius: 999px;
          letter-spacing: 0.5px;
        }

        .guide-title {
          font-size: 18px;
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: 12px;
          color: var(--color-text-main);
        }

        .guide-desc {
          flex-grow: 1;
          font-size: 14px;
          color: var(--color-text-muted);
        }

        .guide-desc p {
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .guide-footer {
          margin-top: 16px;
          padding-top: 12px;
          border-top: 1px solid #f1f5f9;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #94a3b8;
        }

        .read-more {
          color: var(--color-brand-green);
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
