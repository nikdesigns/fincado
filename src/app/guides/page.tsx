import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import GuidesGrid from './GuidesGrid';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import articlesData from '@/data/articles.json';

// --- TYPE DEFINITION ---
type Article = {
  slug: string;
  title: string;
  category: string;
  metaDescription: string;
  published: string;
};

// --- DATA PREPARATION ---
// Cast JSON data to Article type to fix TypeScript errors
const articles = articlesData as Article[];

export const metadata: Metadata = {
  title: 'Financial Guides & Wisdom – Fincado',
  description:
    'Expert guides on Loans, SIPs, Credit Scores, and Tax Planning. Learn personal finance the smart way with Fincado Academy.',
  alternates: {
    canonical: 'https://www.fincado.com/guides',
  },
  openGraph: {
    title: 'Financial Guides & Wisdom – Fincado',
    description:
      'Expert guides on Loans, SIPs, Credit Scores, and Tax Planning.',
    url: 'https://www.fincado.com/guides',
    type: 'website',
  },
};

export default function GuidesPage() {
  // Top 4 articles for the "Trending" section
  const popularGuides = articles.slice(0, 4);

  return (
    <main
      style={{
        maxWidth: 1180,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        gap: 24,
        padding: '20px',
      }}
      className="container"
    >
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
        ]}
      />

      {/* --- LEFT COLUMN: CONTENT --- */}
      <div style={{ minWidth: 0 }}>
        {/* Top Ad */}
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
          <span
            style={{
              display: 'inline-block',
              padding: '6px 14px',
              background: 'var(--color-success-bg)',
              color: 'var(--color-brand-green)',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '100px',
              marginBottom: 16,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              border: '1px solid #dcfce7',
            }}
          >
            Fincado Academy
          </span>
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 42px)',
              fontWeight: 800,
              marginBottom: 16,
              color: 'var(--color-text-main)',
              lineHeight: 1.1,
            }}
          >
            Financial Wisdom,{' '}
            <span style={{ color: 'var(--color-brand-green)' }}>
              Simplified.
            </span>
          </h1>
          <p
            style={{
              fontSize: 18,
              color: 'var(--color-text-muted)',
              maxWidth: 600,
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Actionable finance guides on loans, investments, and taxes — written
            for India.
          </p>
        </section>

        {/* Trending Guides Section */}
        <section style={{ marginBottom: 48 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 16,
            }}
          >
            <span style={{ fontSize: 20 }}>🔥</span>
            <h2 style={{ fontSize: 20, margin: 0, fontWeight: 700 }}>
              Trending Now
            </h2>
          </div>

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
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  border: '1px solid var(--color-border)',
                  borderRadius: 12,
                  padding: 20,
                  background: '#fff',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
                className="guide-mini-card"
              >
                <div>
                  <span
                    style={{
                      fontSize: 11,
                      color: 'var(--color-text-muted)',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      display: 'block',
                      marginBottom: 8,
                    }}
                  >
                    {g.category}
                  </span>
                  <strong
                    style={{
                      display: 'block',
                      fontSize: 15,
                      lineHeight: 1.4,
                      color: 'var(--color-text-main)',
                    }}
                  >
                    {g.title}
                  </strong>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Main Guides Grid - Shows ALL articles */}
        <div id="all-guides">
          <GuidesGrid allArticles={articles} />
        </div>

        {/* Mid Ad */}
        <div style={{ margin: '40px 0' }} className="no-print">
          <AdSlot id="guides-mid-leaderboard" type="leaderboard" />
        </div>

        {/* SEO Text */}
        <section className="article" style={{ marginTop: 24 }}>
          <h2>Why Financial Literacy Matters?</h2>
          <p>
            Making informed financial decisions is crucial in today&apos;s
            complex economic environment. Whether you are planning to take a{' '}
            <Link href="/loans/home-loan">Home Loan</Link> or starting a{' '}
            <Link href="/sip-calculator">SIP investment</Link>, understanding
            the underlying math can save you lakhs in interest and help you grow
            your wealth faster.
          </p>
        </section>
      </div>

      {/* --- RIGHT COLUMN: SIDEBAR --- */}
      <aside className="sidebar">
        <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
          <AdSlot id="guides-sidebar-sticky" type="box" />
        </div>
        <FinancialNavWidget />
      </aside>

      <style>{`
        .guide-mini-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
          border-color: var(--color-brand-light) !important;
        }
      `}</style>
    </main>
  );
}
