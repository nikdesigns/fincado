import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import articlesData from '@/data/articles.json';
import GuidesClient from './GuidesClient'; // ✅ Import Client Component

// --- METADATA (Server Side) ---
export const metadata: Metadata = {
  title: 'Financial Guides & Wisdom | Fincado',
  description:
    'Expert guides on Home Loans, SIP, Income Tax, and Credit Scores. Simplify your financial decisions with Fincado.',
  keywords: [
    'financial guides',
    'personal finance articles',
    'investment guides india',
    'home loan guides',
    'SIP investment tips',
    'tax planning guides',
    'credit score tips',
    'financial literacy india',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/guides',
  },
};

export default function GuidesPage() {
  // 1. PREPARE DATA (Server Side)
  const uniqueArticles = new Map();
  articlesData.forEach((article) => {
    if (!article.language || article.language === 'en') {
      uniqueArticles.set(article.slug, article);
    }
  });

  // Sort by Newest
  const sortedGuides = Array.from(uniqueArticles.values()).sort(
    (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
  );

  return (
    <main className="container" style={{ padding: '40px 20px' }}>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
        ]}
      />

      {/* --- HINDI PROMO --- */}
      <div
        className="no-print"
        style={{
          marginBottom: '40px',
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

      <div style={{ marginBottom: 40 }} className="no-print">
        <AdSlot id="guides-top-leaderboard" type="leaderboard" />
      </div>

      {/* --- HERO SECTION --- */}
      <header
        style={{
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto 40px auto',
        }}
      >
        <span
          style={{
            color: '#16a34a',
            fontWeight: 700,
            textTransform: 'uppercase',
            fontSize: '13px',
            letterSpacing: '1px',
            display: 'block',
            marginBottom: '12px',
          }}
        >
          Financial Wisdom
        </span>
        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 800,
            color: '#0f172a',
            marginBottom: '16px',
            lineHeight: 1.2,
          }}
        >
          Read. Learn. <span style={{ color: '#16a34a' }}>Grow.</span>
        </h1>
        <p
          style={{
            fontSize: '18px',
            color: '#64748b',
            lineHeight: 1.6,
          }}
        >
          Demystifying money with simple, actionable guides on Loans,
          Investments, and Tax Planning.
        </p>
      </header>

      {/* --- CLIENT GRID & FILTER --- */}
      <GuidesClient articles={sortedGuides} />

      <div style={{ marginTop: 60 }}>
        {/* 🔴 FIXED: Added ID */}
        <AdSlot id="guides-bottom-leaderboard" type="leaderboard" />
      </div>
    </main>
  );
}
