import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import GuidesGrid from './GuidesGrid';
import { getPopularGuides } from '@/lib/popularGuides';
import articles from '@/data/articles.json';

export const metadata: Metadata = {
  title: 'Financial Guides & Wisdom – Fincado',
  description:
    'Expert guides on Loans, SIPs, Credit Scores, and Tax Planning. Learn personal finance the smart way.',
};

export default function GuidesPage() {
  const popularGuides = getPopularGuides(5);

  return (
    <main className="container" style={{ paddingBottom: 80 }}>
      {/* ---------- HERO ---------- */}
      <section
        style={{
          padding: '80px 24px 40px',
          textAlign: 'center',
          marginBottom: 40,
          background:
            'radial-gradient(circle at 50% 0%, rgba(72,151,25,0.08), transparent 70%)',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 800,
            marginBottom: 12,
          }}
        >
          Financial Wisdom,
          <br />
          <span style={{ color: 'var(--color-brand-green)' }}>Simplified.</span>
        </h1>
        <p
          style={{
            fontSize: 18,
            color: 'var(--color-text-muted)',
            maxWidth: 680,
            margin: '0 auto',
          }}
        >
          Actionable finance guides on loans, investments, and taxes — written
          for India.
        </p>
      </section>

      {/* ---------- POPULAR GUIDES ---------- */}
      <section style={{ marginBottom: 56 }}>
        <h2 style={{ marginBottom: 16 }}>Popular Guides</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 20,
          }}
        >
          {popularGuides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                border: '1px solid var(--color-border)',
                borderRadius: 14,
                padding: 20,
                background: '#fff',
                transition: 'box-shadow 0.2s',
              }}
            >
              <strong style={{ display: 'block', marginBottom: 6 }}>
                {g.title}
              </strong>
              <span
                style={{
                  fontSize: 12,
                  color: 'var(--color-text-muted)',
                  textTransform: 'capitalize',
                }}
              >
                {g.category}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- MAIN GRID ---------- */}
      <div className="layout-grid">
        <div className="main-content">
          <GuidesGrid allArticles={articles || []} />

          <div style={{ marginTop: 60 }}>
            <AdSlot id="guides-bottom" type="leaderboard" />
          </div>
        </div>

        {/* ---------- SIDEBAR ---------- */}
        <aside className="sidebar">
          <div className="ad-box" style={{ minHeight: 600 }}>
            <AdSlot id="guides-sidebar" type="box" />
          </div>
        </aside>
      </div>
    </main>
  );
}
