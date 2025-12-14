'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import WikiText from '@/components/WikiText';
import {
  FaBookOpen,
  FaShieldAlt,
  FaHome,
  FaCreditCard,
  FaBalanceScale,
  FaMoneyBillWave,
  FaCalculator,
} from 'react-icons/fa';

/* ---------------- TYPES ---------------- */

type Article = {
  slug: string;
  title: string;
  category: string;
  metaDescription: string;
  published: string;
};

/* ---------------- HELPERS ---------------- */

const getCategoryIcon = (cat: string) => {
  const c = cat.toLowerCase();
  if (c.includes('loan')) return <FaHome />;
  if (c.includes('invest')) return <FaBalanceScale />;
  if (c.includes('tax')) return <FaMoneyBillWave />;
  if (c.includes('credit')) return <FaCreditCard />;
  if (c.includes('calc')) return <FaCalculator />;
  return <FaBookOpen />;
};

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

/* ---------------- COMPONENT ---------------- */

export default function GuidesGrid({
  allArticles = [],
}: {
  allArticles: Article[];
}) {
  const [activeCategory, setActiveCategory] = useState('all');

  /* Categories */
  const categories = useMemo(() => {
    const cats = new Set(
      allArticles.map((a) => a.category?.toLowerCase()).filter(Boolean)
    );
    return ['all', ...Array.from(cats)];
  }, [allArticles]);

  /* Filter */
  const filteredArticles = useMemo(() => {
    if (activeCategory === 'all') return allArticles;
    return allArticles.filter(
      (a) => a.category?.toLowerCase() === activeCategory
    );
  }, [activeCategory, allArticles]);

  return (
    <div>
      {/* CATEGORY PILLS */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          marginBottom: 24,
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '8px 18px',
              borderRadius: 999,
              border: '1px solid var(--color-border)',
              background:
                activeCategory === cat ? 'var(--color-action-cta)' : '#fff',
              color:
                activeCategory === cat ? '#fff' : 'var(--color-text-muted)',
              cursor: 'pointer',
              textTransform: 'capitalize',
              fontWeight: 500,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GUIDES GRID */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 24,
        }}
      >
        {filteredArticles.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="guide-link"
          >
            {/* ✅ Link directly wraps article — hydration safe */}
            <article
              className="guide-card"
              style={{
                background: '#fff',
                border: '1px solid var(--color-border)',
                borderRadius: 16,
                padding: 24,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s ease',
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: 'var(--color-bg-soft)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                  }}
                >
                  {getCategoryIcon(guide.category)}
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: 'var(--color-text-muted)',
                    textTransform: 'uppercase',
                  }}
                >
                  {guide.category}
                </span>
              </div>

              {/* Title */}
              <h3 style={{ fontSize: 18, marginBottom: 12 }}>{guide.title}</h3>

              {/* Description */}
              <div style={{ flexGrow: 1 }}>
                <WikiText
                  content={guide.metaDescription}
                  className="text-sm text-gray-500"
                />
              </div>

              {/* Footer */}
              <div
                style={{
                  marginTop: 16,
                  paddingTop: 12,
                  borderTop: '1px solid #f1f5f9',
                  fontSize: 12,
                  color: '#94a3b8',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>{formatDate(guide.published)}</span>
                <span style={{ color: 'var(--color-brand-green)' }}>
                  Read →
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Hover effect */}
      <style jsx global>{`
        .guide-link {
          text-decoration: none;
          color: inherit;
        }
        .guide-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.08);
          border-color: var(--color-brand-light);
        }
      `}</style>
    </div>
  );
}
