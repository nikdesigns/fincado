'use client';

import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import GuidesGrid from './GuidesGrid';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import articlesData from '@/data/articles.json';

type Article = {
  slug: string;
  title: string;
  category: string;
  metaDescription: string;
  published: string;
  language?: string;
};

const articles = articlesData as Article[];

export default function GuidesPage() {
  // Filter for English articles
  const englishArticles = articles.filter(
    (article) => article.language === 'en' || !article.language
  );

  const popularGuides = englishArticles.slice(0, 4);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
        ]}
      />

      {/* Hindi Promo */}
      <div
        className="no-print"
        style={{
          marginBottom: '32px',
          padding: '16px 24px',
          background: 'linear-gradient(to right, #fff1f2, #fff)',
          border: '1px solid #fecdd3',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>🇮🇳</span>
          <div>
            <strong
              style={{ color: '#be123c', display: 'block', fontSize: '16px' }}
            >
              हिंदी में पढ़ना चाहते हैं?
            </strong>
            <span style={{ fontSize: '14px', color: '#881337' }}>
              हमारे चुनिंदा गाइड्स अब हिंदी में भी उपलब्ध हैं।
            </span>
          </div>
        </div>
        <Link
          href="/hi"
          style={{
            padding: '10px 20px',
            background: '#e11d48',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '14px',
          }}
        >
          हिंदी गाइड्स देखें →
        </Link>
      </div>

      <div style={{ marginBottom: 24 }} className="no-print">
        <AdSlot id="guides-top-leaderboard" type="leaderboard" />
      </div>

      {/* Hero Section */}
      <section
        style={{
          padding: '48px 32px',
          textAlign: 'center',
          marginBottom: 32,
          background:
            'radial-gradient(circle at 50% 0%, rgba(72, 151, 25, 0.1) 0%, rgba(255,255,255,0) 80%)',
          borderRadius: '20px',
          border: '1px solid var(--color-border)',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 42px)',
            fontWeight: 800,
            marginBottom: 16,
          }}
        >
          Financial Wisdom,{' '}
          <span style={{ color: 'var(--color-brand-green)' }}>Simplified.</span>
        </h1>
        <p
          style={{
            fontSize: 18,
            color: 'var(--color-text-muted)',
            maxWidth: 600,
            margin: '0 auto',
          }}
        >
          Actionable finance guides on loans, investments, and taxes written for
          India.
        </p>
      </section>

      {/* Trending Section */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 20, marginBottom: 16, fontWeight: 700 }}>
          🔥 Trending Now
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 16,
          }}
        >
          {popularGuides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="guide-mini-card"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                border: '1px solid var(--color-border)',
                borderRadius: 12,
                padding: 20,
                background: '#fff',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                {g.category}
              </span>
              <strong style={{ fontSize: 15, lineHeight: 1.4 }}>
                {g.title}
              </strong>
            </Link>
          ))}
        </div>
      </section>

      {/* Main Grid: Pass filtered English articles */}
      <div id="all-guides">
        <GuidesGrid allArticles={englishArticles} />
      </div>

      <style jsx global>{`
        .guide-mini-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
          border-color: var(--color-brand-light) !important;
        }
      `}</style>
    </>
  );
}
