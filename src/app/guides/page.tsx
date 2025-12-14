import type { Metadata } from 'next';
import React from 'react';
import AdSlot from '@/components/AdSlot';
import { Suspense } from 'react';
import GuidesGrid from './GuidesGrid';
import articles from '@/data/articles.json';

export const metadata: Metadata = {
  title: 'Financial Guides & Wisdom – Fincado',
  description:
    'Expert guides on Home Loans, SIPs, Credit Scores, and Tax Planning. Master your personal finance with our in-depth tutorials.',
};

export default function GuidesPage() {
  // ✅ HARDEN JSON IMPORT
  const safeArticles = Array.isArray(articles) ? articles : [];

  return (
    <main className="container" style={{ paddingBottom: 80 }}>
      {/* --- HERO SECTION --- */}
      <section
        style={{
          position: 'relative',
          padding: '80px 24px 40px',
          textAlign: 'center',
          background:
            'radial-gradient(circle at 50% 0%, rgba(72, 151, 25, 0.08) 0%, rgba(255,255,255,0) 70%)',
          marginBottom: 40,
        }}
      >
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
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
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 800,
              marginBottom: 16,
            }}
          >
            Financial Wisdom,
            <br />
            <span style={{ color: 'var(--color-brand-green)' }}>
              Simplified.
            </span>
          </h1>

          <p style={{ fontSize: 18, color: 'var(--color-text-muted)' }}>
            Clear, actionable guides to help you navigate loans, investments,
            and tax planning without jargon.
          </p>
        </div>
      </section>

      <div className="layout-grid">
        <div className="main-content">
          {/* ✅ PASS SAFE DATA */}
          <Suspense fallback={null}>
            <GuidesGrid allArticles={safeArticles} />
          </Suspense>

          <div style={{ marginTop: 60 }}>
            <AdSlot id="guides-bottom" type="leaderboard" />
          </div>
        </div>

        <aside className="sidebar">
          <AdSlot id="guides-sidebar" type="box" />
        </aside>
      </div>
    </main>
  );
}
