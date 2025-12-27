'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import articlesData from '@/data/articles.json';
import LanguageToggle from '@/components/LanguageToggle';

// Note: Using client component here for the category filter functionality
export default function HindiGuidesPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const allGuides = useMemo(() => {
    return articlesData
      .filter((article) => article.language === 'hi')
      .map((article) => ({
        slug: article.slug,
        title: article.title,
        desc:
          article.metaDescription.replace(/<[^>]*>?/gm, '').substring(0, 150) +
          '...',
        href: `/hi/guides/${article.slug}/`,
        category: article.category,
        published: article.published || '2025-01-01',
      }));
  }, []);

  const categories = useMemo(() => {
    const uniqueCats = Array.from(new Set(allGuides.map((g) => g.category)));
    return ['All', ...uniqueCats];
  }, [allGuides]);

  const filteredGuides = useMemo(() => {
    if (activeCategory === 'All') return allGuides;
    return allGuides.filter((g) => g.category === activeCategory);
  }, [activeCategory, allGuides]);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://www.fincado.com/hi' },
          {
            name: 'आर्टिकल्स (Guides)',
            url: 'https://www.fincado.com/hi/guides',
          },
        ]}
      />

      <header style={{ marginBottom: '32px' }}>
        <LanguageToggle path="/guides" />
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 800,
            color: '#1e293b',
            marginBottom: '16px',
          }}
        >
          फाइनेंशियल <span style={{ color: '#16a34a' }}>ज्ञान (Guides)</span>
        </h1>
        <p style={{ color: '#64748b', fontSize: '18px' }}>
          SIP, लोन और टैक्स की जटिल दुनिया को अपनी आसान भाषा में समझें।
        </p>
      </header>

      {/* CATEGORY FILTERS */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '32px',
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: '999px',
              border:
                activeCategory === cat
                  ? '1px solid #16a34a'
                  : '1px solid #e2e8f0',
              background: activeCategory === cat ? '#16a34a' : '#fff',
              color: activeCategory === cat ? '#fff' : '#64748b',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {cat === 'All' ? 'सभी (All)' : cat}
          </button>
        ))}
      </div>

      {/* GUIDES GRID */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
        }}
      >
        {filteredGuides.length > 0 ? (
          filteredGuides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              style={{ textDecoration: 'none' }}
            >
              <article className="guide-card">
                <div style={{ marginBottom: '12px' }}>
                  <span className="category-pill">{guide.category}</span>
                </div>
                <h3 className="guide-title">{guide.title}</h3>
                <p className="guide-desc">{guide.desc}</p>
                <div className="guide-footer">
                  <span>
                    {new Date(guide.published).toLocaleDateString('hi-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <span style={{ color: '#16a34a', fontWeight: 600 }}>
                    पढ़ें →
                  </span>
                </div>
              </article>
            </Link>
          ))
        ) : (
          <p style={{ color: '#64748b' }}>कोई लेख उपलब्ध नहीं है।</p>
        )}
      </div>

      <style jsx global>{`
        .guide-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 24px;
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: all 0.2s ease;
        }
        .guide-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
          border-color: #bbf7d0;
        }
        .category-pill {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          color: #15803d;
          background: #dcfce7;
          padding: 4px 10px;
          border-radius: 6px;
        }
        .guide-title {
          font-size: 18px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 10px 0;
          line-height: 1.4;
        }
        .guide-desc {
          font-size: 14px;
          color: #64748b;
          line-height: 1.6;
          margin: 0 0 16px 0;
          flex-grow: 1;
        }
        .guide-footer {
          padding-top: 16px;
          border-top: 1px solid #f1f5f9;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #94a3b8;
        }
      `}</style>
    </>
  );
}
