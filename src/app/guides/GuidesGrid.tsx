'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import WikiText from '@/components/WikiText';
import Icon, { IconName } from '@/components/Icon';

// --- Types ---
type Article = {
  slug: string;
  title: string;
  category: string;
  metaDescription: string;
  published: string;
};

// --- Helpers ---

// 1. Map your category names to your Icon component names
const getCategoryIcon = (cat: string): IconName => {
  if (!cat) return 'file'; // Default fallback
  const c = cat.toLowerCase();

  if (c.includes('loan')) return 'homeLoan'; // Matches 'Loans & Mortgages'
  if (c.includes('invest')) return 'sip'; // Matches 'Investment Strategy'
  if (c.includes('tax')) return 'tax'; // Matches 'Tax Planning'
  if (c.includes('credit')) return 'creditScore';
  if (c.includes('retire')) return 'retirement';
  if (c.includes('calc')) return 'emi';

  return 'file';
};

// 2. Format Date for India
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export default function GuidesGrid({
  allArticles,
}: {
  allArticles?: Article[];
}) {
  const [activeCategory, setActiveCategory] = useState('All');

  // ✅ CRITICAL FIX: Ensure 'articles' is always an array
  // This prevents the "Cannot read properties of undefined (reading 'map')" error.
  const articles = useMemo(
    () => (Array.isArray(allArticles) ? allArticles : []),
    [allArticles]
  );

  // --- Logic ---

  // 1. Extract Unique Categories for Filter Pills
  const categories = useMemo(() => {
    // We map over the safe 'articles' array
    const cats = new Set(articles.map((a) => a.category));
    // Capitalize and sort if needed, here we just return unique values
    return ['All', ...Array.from(cats)];
  }, [articles]);

  // 2. Filter Articles based on selection
  const filteredArticles = useMemo(() => {
    if (activeCategory === 'All') return articles;
    return articles.filter((a) => a.category === activeCategory);
  }, [activeCategory, articles]);

  // --- Render ---

  // Empty State
  if (articles.length === 0) {
    return (
      <div
        style={{
          padding: 60,
          textAlign: 'center',
          color: 'var(--color-text-muted)',
        }}
      >
        <p>No guides found. Please check back later.</p>
      </div>
    );
  }

  return (
    <div>
      {/* --- 1. FILTER PILLS --- */}
      <div
        className="no-scrollbar"
        style={{
          display: 'flex',
          gap: 12,
          overflowX: 'auto',
          paddingBottom: 24,
          marginBottom: 12,
          flexWrap: 'wrap',
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '8px 20px',
              borderRadius: '50px',
              border:
                activeCategory === cat
                  ? '1px solid var(--color-action-cta)'
                  : '1px solid var(--color-border)',
              background:
                activeCategory === cat ? 'var(--color-action-cta)' : 'white',
              color:
                activeCategory === cat ? 'white' : 'var(--color-text-muted)',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s',
              textTransform: 'capitalize',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* --- 2. GRID OF CARDS --- */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px',
        }}
      >
        {filteredArticles.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div
              className="guide-card"
              style={{
                background: 'white',
                border: '1px solid var(--color-border)',
                borderRadius: 16,
                padding: 24,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition:
                  'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
              }}
            >
              {/* Card Header: Icon + Category */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    background: 'var(--color-bg-soft)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-brand-green)',
                  }}
                >
                  <Icon
                    name={getCategoryIcon(guide.category)}
                    className="w-6 h-6"
                  />
                </div>
                <div
                  style={{
                    fontSize: 11,
                    textTransform: 'uppercase',
                    color: 'var(--color-text-muted)',
                    fontWeight: 600,
                    letterSpacing: 0.5,
                  }}
                >
                  {guide.category}
                </div>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: 'var(--color-text-main)',
                  marginBottom: 12,
                  lineHeight: 1.4,
                }}
              >
                {guide.title}
              </h3>

              {/* Description (WikiText auto-links content here too!) */}
              <div style={{ flexGrow: 1, marginBottom: 20 }}>
                <WikiText
                  content={guide.metaDescription}
                  className="card-desc"
                />
              </div>

              {/* Footer: Date + Read More */}
              <div
                style={{
                  paddingTop: 16,
                  borderTop: '1px solid var(--color-bg-soft)',
                  fontSize: 12,
                  color: '#94a3b8',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>{formatDate(guide.published)}</span>
                <span
                  style={{
                    color: 'var(--color-brand-green)',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  Read &rarr;
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* --- 3. STYLES --- */}
      <style jsx global>{`
        /* Card Hover Effect */
        .guide-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.08);
          border-color: var(--color-brand-light);
        }

        /* Helper for Icon size if not global */
        .w-6 {
          width: 24px;
        }
        .h-6 {
          height: 24px;
        }

        /* Description Line Clamping & Link Styling */
        .card-desc p {
          margin: 0;
          font-size: 14px;
          color: var(--color-text-muted);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .card-desc a {
          color: var(--color-text-main);
          border-bottom: 1px dotted var(--color-brand-green);
          text-decoration: none;
        }
        .card-desc a:hover {
          color: var(--color-brand-green);
          background: var(--color-success-bg);
        }
      `}</style>
    </div>
  );
}
