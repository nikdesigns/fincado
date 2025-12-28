'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

type Article = {
  slug: string;
  title: string;
  category: string;
  metaDescription: string;
  published: string;
  hidden?: boolean; // ✅ Added optional property
};

export default function GuidesClient({ articles }: { articles: Article[] }) {
  const [activeCategory, setActiveCategory] = useState('All');

  // ✅ 1. Initial Clean: Remove hidden articles immediately
  const visibleArticles = useMemo(() => {
    return articles.filter((a) => !a.hidden);
  }, [articles]);

  // 2. Extract Unique Categories (from visible articles only)
  const categories = useMemo(() => {
    const uniqueCats = Array.from(
      new Set(visibleArticles.map((a) => a.category))
    );
    return ['All', ...uniqueCats.sort()];
  }, [visibleArticles]);

  // 3. Filter Logic (Category based)
  const filteredArticles = useMemo(() => {
    if (activeCategory === 'All') return visibleArticles;
    return visibleArticles.filter((a) => a.category === activeCategory);
  }, [activeCategory, visibleArticles]);

  return (
    <div>
      {/* --- FILTER PILLS --- */}
      <div className="filter-scroll-container">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* --- GUIDES GRID --- */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '32px',
        }}
      >
        {filteredArticles.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            style={{ textDecoration: 'none' }}
            className="guide-card-wrapper"
          >
            <article
              style={{
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              className="guide-card-inner" // Added class for hover effects if needed later
            >
              <div style={{ padding: '24px', flexGrow: 1 }}>
                <div style={{ marginBottom: '16px' }}>
                  <span
                    style={{
                      background: '#f0fdf4',
                      color: '#166534',
                      fontSize: '12px',
                      fontWeight: 700,
                      padding: '6px 12px',
                      borderRadius: '100px',
                    }}
                  >
                    {guide.category}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#1e293b',
                    marginBottom: '12px',
                    lineHeight: 1.4,
                  }}
                >
                  {guide.title}
                </h3>

                <p
                  style={{
                    fontSize: '15px',
                    color: '#64748b',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {guide.metaDescription
                    .replace(/<[^>]+>/g, '')
                    .substring(0, 120)}
                  ...
                </p>
              </div>

              <div
                style={{
                  padding: '16px 24px',
                  background: '#f8fafc',
                  borderTop: '1px solid #f1f5f9',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#94a3b8',
                }}
              >
                <span>
                  {new Date(guide.published).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                <span style={{ color: '#16a34a', fontWeight: 600 }}>
                  Read Article →
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#64748b',
          }}
        >
          <p style={{ fontSize: '18px' }}>No guides found in this category.</p>
          <button
            onClick={() => setActiveCategory('All')}
            style={{
              marginTop: '10px',
              color: '#16a34a',
              background: 'none',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            View All Guides
          </button>
        </div>
      )}

      {/* --- STYLES FOR PILLS --- */}
      <style jsx>{`
        .guide-card-wrapper:hover article {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.1);
          border-color: #cbd5e1 !important;
        }

        .filter-scroll-container {
          display: flex;
          gap: 12px;
          margin-bottom: 40px;
          overflow-x: auto;
          padding-bottom: 4px;
          flex-wrap: wrap; /* Wraps on desktop */
          justify-content: center;
          scrollbar-width: none; /* Firefox */
        }

        /* Mobile specific: No wrap, horizontal scroll */
        @media (max-width: 768px) {
          .filter-scroll-container {
            flex-wrap: nowrap;
            justify-content: flex-start;
            padding-left: 4px;
            padding-right: 4px;
          }
        }

        /* Hide Scrollbar for Chrome/Safari/Edge */
        .filter-scroll-container::-webkit-scrollbar {
          display: none;
        }

        .filter-pill {
          padding: 10px 20px;
          border-radius: 100px;
          border: 1px solid #e2e8f0;
          background: #fff;
          color: #64748b;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .filter-pill:hover {
          border-color: #cbd5e1;
          background: #f8fafc;
          transform: translateY(-1px);
        }

        .filter-pill.active {
          border-color: #16a34a;
          background: #16a34a;
          color: #fff;
          box-shadow: 0 4px 6px -1px rgba(22, 163, 74, 0.2);
        }

        .filter-pill.active:hover {
          background: #15803d;
        }
      `}</style>
    </div>
  );
}
