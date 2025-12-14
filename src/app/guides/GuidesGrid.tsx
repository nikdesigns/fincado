'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import WikiText from '@/components/WikiText';
import {
  FaBookOpen,
  FaHome,
  FaBalanceScale,
  FaMoneyBillWave,
  FaCreditCard,
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

// Icon per category
const getCategoryIcon = (cat: string) => {
  const c = cat.toLowerCase();

  if (c.includes('loan')) return <FaHome color="#1d4ed8" />;
  if (c.includes('invest')) return <FaBalanceScale color="#047857" />;
  if (c.includes('tax')) return <FaMoneyBillWave color="#f59e0b" />;
  if (c.includes('credit')) return <FaCreditCard color="#dc2626" />;
  if (c.includes('calc')) return <FaCalculator color="#6366f1" />;

  return <FaBookOpen color="#64748b" />;
};

// Date formatter (STATIC SAFE)
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/* ---------------- COMPONENT ---------------- */

export default function GuidesGrid({
  allArticles = [],
}: {
  allArticles: Article[];
}) {
  const [activeCategory, setActiveCategory] = useState('All');

  /* -------- UNIQUE CATEGORIES -------- */

  const categories = useMemo(() => {
    if (!Array.isArray(allArticles)) return ['All'];

    const unique = new Set(
      allArticles
        .map((a) => a.category)
        .filter(Boolean)
        .map((c) => c.toLowerCase())
    );

    return ['All', ...Array.from(unique)];
  }, [allArticles]);

  /* -------- FILTERED ARTICLES -------- */

  const filteredArticles = useMemo(() => {
    if (!Array.isArray(allArticles)) return [];

    if (activeCategory === 'All') return allArticles;

    return allArticles.filter(
      (a) =>
        a.category && a.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [activeCategory, allArticles]);

  /* ---------------- RENDER ---------------- */

  return (
    <div>
      {/* ---------- CATEGORY PILLS ---------- */}
      <div
        className="no-scrollbar"
        style={{
          display: 'flex',
          gap: 12,
          overflowX: 'auto',
          paddingBottom: 24,
          marginBottom: 16,
          flexWrap: 'wrap',
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '8px 20px',
              borderRadius: '999px',
              border:
                activeCategory === cat
                  ? '1px solid var(--color-action-cta)'
                  : '1px solid var(--color-border)',
              background:
                activeCategory === cat ? 'var(--color-action-cta)' : '#fff',
              color:
                activeCategory === cat ? '#fff' : 'var(--color-text-muted)',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textTransform: 'capitalize',
            }}
          >
            {cat === 'All' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* ---------- EMPTY STATE ---------- */}
      {filteredArticles.length === 0 && (
        <p style={{ color: '#64748b', fontSize: 14 }}>
          No guides match your selection.
        </p>
      )}

      {/* ---------- GUIDES GRID ---------- */}
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
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
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
                transition:
                  'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
              }}
            >
              {/* HEADER */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 12,
                }}
              >
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
                    textTransform: 'uppercase',
                    color: 'var(--color-text-muted)',
                    fontWeight: 600,
                    letterSpacing: 0.5,
                  }}
                >
                  {guide.category}
                </span>
              </div>

              {/* TITLE */}
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  marginBottom: 12,
                  lineHeight: 1.4,
                }}
              >
                {guide.title}
              </h3>

              {/* DESCRIPTION */}
              <div style={{ flexGrow: 1, marginBottom: 16 }}>
                <WikiText
                  content={guide.metaDescription}
                  className="text-sm text-gray-500"
                />
              </div>

              {/* FOOTER */}
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
                  }}
                >
                  Read Guide →
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* ---------- HOVER EFFECT ---------- */}
      <style jsx global>{`
        .guide-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.08);
          border-color: var(--color-brand-light);
        }
        .guide-card .wiki-content a {
          color: var(--color-brand-green);
          border-bottom: 1px dotted var(--color-brand-green);
        }
      `}</style>
    </div>
  );
}
