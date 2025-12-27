import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import ShareTools from '@/components/ShareTools';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { HINDI_CALCULATOR_CATEGORIES } from '@/data/hindiTools';
import articlesData from '@/data/articles.json';

export const metadata: Metadata = {
  title: 'Fincado हिंदी: फाइनेंशियल कैलकुलेटर और गाइड्स',
  description:
    'Fincado पर हिंदी में सभी वित्तीय कैलकुलेटर और गाइड्स प्राप्त करें। SIP, EMI, PPF, Sukanya Samriddhi और होम लोन की जानकारी अपनी भाषा में।',
  alternates: { canonical: 'https://www.fincado.com/hi/' },
};

export default function HindiHubPage() {
  // Fetch only top 3 recent guides for the home page
  const recentGuides = articlesData
    .filter((a) => a.language === 'hi')
    .slice(0, 3);

  return (
    <main className="container" style={{ padding: '40px 20px' }}>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'हिंदी', url: 'https://www.fincado.com/hi/' },
        ]}
      />

      {/* HERO SECTION */}
      <header
        style={{
          marginBottom: 40,
          padding: '40px 32px',
          background:
            'radial-gradient(circle at 10% 20%, rgba(254, 243, 199, 0.4) 0%, rgba(255, 255, 255, 0) 80%)',
          border: '1px solid #f3f4f6',
          borderRadius: '20px',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            background: '#dcfce7',
            color: '#166534',
            fontSize: '13px',
            fontWeight: 700,
            padding: '6px 12px',
            borderRadius: '999px',
            marginBottom: '16px',
          }}
        >
          FINCADO HINDI 🇮🇳
        </span>
        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 42px)',
            fontWeight: 800,
            color: '#1e293b',
            marginBottom: '16px',
          }}
        >
          फाइनेंशियल{' '}
          <span style={{ color: '#16a34a' }}>कैलकुलेटर और गाइड्स</span>
        </h1>
        <p
          style={{
            fontSize: '18px',
            color: '#64748b',
            maxWidth: '600px',
            margin: '0 auto 24px auto',
          }}
        >
          अब फाइनेंस को समझना हुआ आसान। अपनी भाषा में निवेश, लोन और बचत की सटीक
          गणना करें।
        </p>
        <div
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Link href="/hi/calculators" className="primary-cta">
            सारे कैलकुलेटर
          </Link>
          <Link href="/hi/guides" className="secondary-cta">
            हिंदी गाइड्स
          </Link>
        </div>
      </header>

      <div className="layout-grid">
        <div className="main-content">
          {/* SECTION: TOP TOOLS (Only show first category preview) */}
          <section style={{ marginBottom: '40px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>
                🔥 लोकप्रिय टूल्स
              </h2>
              <Link
                href="/hi/calculators"
                style={{
                  color: '#16a34a',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                सभी देखें →
              </Link>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '16px',
              }}
            >
              {/* Show only first 6 tools from first category for cleaner home page */}
              {HINDI_CALCULATOR_CATEGORIES[1].tools.slice(0, 6).map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  style={{ textDecoration: 'none' }}
                >
                  <div className="tool-card">
                    <div className="tool-icon">{tool.icon}</div>
                    <div>
                      <h3 className="tool-title">{tool.title}</h3>
                      <p className="tool-desc">{tool.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <AdSlot type="leaderboard" />

          {/* SECTION: RECENT GUIDES */}
          <section style={{ marginTop: '40px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>
                📚 हालिया लेख
              </h2>
              <Link
                href="/hi/guides"
                style={{
                  color: '#16a34a',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                सभी लेख पढ़ें →
              </Link>
            </div>

            <div style={{ display: 'grid', gap: '24px' }}>
              {recentGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/hi/guides/${guide.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <article className="guide-card-horizontal">
                    <div>
                      <span className="category-pill">{guide.category}</span>
                      <h3 className="guide-title" style={{ marginTop: '8px' }}>
                        {guide.title}
                      </h3>
                      <p className="guide-desc">
                        {guide.metaDescription
                          .replace(/<[^>]*>?/gm, '')
                          .substring(0, 120)}
                        ...
                      </p>
                    </div>
                    <span
                      style={{
                        color: '#16a34a',
                        fontWeight: 600,
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      पढ़ें →
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        </div>
        <aside className="sidebar">
          <HindiSidebar />
        </aside>
      </div>

      <style>{`
        .primary-cta { background: #16a34a; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; }
        .secondary-cta { background: white; color: #16a34a; border: 1px solid #16a34a; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; }
        .tool-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; display: flex; align-items: center; gap: 16px; transition: all 0.2s; }
        .tool-card:hover { transform: translateY(-3px); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .tool-icon { font-size: 24px; background: #f0fdf4; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 8px; flex-shrink: 0; }
        .tool-title { font-size: 15px; font-weight: 700; color: #1e293b; margin: 0; }
        .tool-desc { font-size: 12px; color: #64748b; margin: 2px 0 0 0; }
        .guide-card-horizontal { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; display: flex; justify-content: space-between; align-items: center; transition: all 0.2s; }
        .guide-card-horizontal:hover { border-color: #16a34a; }
        .category-pill { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #15803d; background: #dcfce7; padding: 4px 10px; border-radius: 6px; }
      `}</style>
    </main>
  );
}
