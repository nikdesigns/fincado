'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';
import HindiSidebar from '@/components/HindiSidebar';
import articlesData from '@/data/articles.json';

// --- DATA: CALCULATORS (Static) ---
const HINDI_TOOLS = [
  {
    title: 'SIP कैलकुलेटर',
    desc: 'जानें आपकी छोटी बचत भविष्य में कितनी बड़ी रकम बनेगी।',
    href: '/hi/sip-calculator',
    icon: '📈',
  },
  {
    title: 'EMI कैलकुलेटर',
    desc: 'होम लोन या पर्सनल लोन की सटीक मासिक किस्त (EMI) जानें।',
    href: '/hi/emi-calculator',
    icon: '🏠',
  },
  {
    title: 'PPF कैलकुलेटर',
    desc: 'पब्लिक प्रोविडेंट फंड (PPF) की ब्याज और मैच्योरिटी गणना।',
    href: '/hi/ppf-calculator',
    icon: '💰',
  },
  {
    title: 'SSY (सुकन्या) कैलकुलेटर',
    desc: 'बेटियों के उज्ज्वल भविष्य के लिए सरकारी योजना की गणना।',
    href: '/hi/sukanya-samriddhi',
    icon: '👧',
  },
  {
    title: 'FD कैलकुलेटर',
    desc: 'फिक्स्ड डिपॉजिट (FD) पर मिलने वाले कुल रिटर्न को जानें।',
    href: '/hi/fd-calculator',
    icon: '🏦',
  },
  {
    title: 'GST कैलकुलेटर',
    desc: 'आसानी से GST जोड़ें या हटाएं (Exclusive/Inclusive)।',
    href: '/hi/gst-calculator',
    icon: '🧾',
  },
];

export default function HindiHubPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  // 1. Prepare Data (Memoized)
  const allGuides = useMemo(() => {
    return articlesData
      .filter((article) => article.language === 'hi')
      .map((article) => ({
        slug: article.slug,
        title: article.title,
        desc:
          article.metaDescription.replace(/<[^>]*>?/gm, '').substring(0, 150) +
          '...',
        href: `/hi/guides/${article.slug}`,
        category: article.category,
        published: article.published || '2025-01-01',
      }));
  }, []);

  // 2. Extract Categories
  const categories = useMemo(() => {
    const uniqueCats = Array.from(new Set(allGuides.map((g) => g.category)));
    return ['All', ...uniqueCats];
  }, [allGuides]);

  // 3. Filter Logic
  const filteredGuides = useMemo(() => {
    if (activeCategory === 'All') return allGuides;
    return allGuides.filter((g) => g.category === activeCategory);
  }, [activeCategory, allGuides]);

  return (
    <main className="container" style={{ padding: '40px 20px' }}>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'हिंदी (Hindi)', url: 'https://www.fincado.com/hi' },
        ]}
      />

      {/* --- HERO HEADER --- */}
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
            letterSpacing: '0.5px',
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
            lineHeight: 1.2,
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
            lineHeight: 1.6,
          }}
        >
          अब फाइनेंस को समझना हुआ आसान। अपनी भाषा में निवेश, लोन और बचत की सटीक
          गणना करें और एक्सपर्ट गाइड्स पढ़ें।
        </p>
        <ShareTools title="Fincado हिंदी गाइड्स और टूल्स" />
      </header>

      <div className="layout-grid">
        {/* --- LEFT: CONTENT --- */}
        <div className="main-content">
          <div className="no-print">
            <AdSlot type="leaderboard" />
          </div>

          {/* SECTION 1: POPULAR CALCULATORS */}
          <section style={{ marginTop: 40 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px',
              }}
            >
              <h2
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#0f172a',
                  margin: 0,
                }}
              >
                🧮 प्रमुख कैलकुलेटर
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '16px',
              }}
            >
              {HINDI_TOOLS.map((tool) => (
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

          {/* AD BREAK */}
          <div style={{ margin: '40px 0' }} className="no-print">
            <AdSlot type="leaderboard" />
          </div>

          {/* SECTION 2: LATEST GUIDES */}
          <section>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#0f172a',
                marginBottom: '24px',
              }}
            >
              📚 नवीनतम लेख (Latest Guides)
            </h2>

            {/* --- FILTER PILLS (New) --- */}
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

            {/* --- GUIDES GRID --- */}
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
                      {/* Category Tag */}
                      <div style={{ marginBottom: '12px' }}>
                        <span className="category-pill">{guide.category}</span>
                      </div>

                      <h3 className="guide-title">{guide.title}</h3>

                      <p className="guide-desc">{guide.desc}</p>

                      <div className="guide-footer">
                        <span>
                          {new Date(guide.published).toLocaleDateString(
                            'hi-IN',
                            { year: 'numeric', month: 'short', day: 'numeric' }
                          )}
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
          </section>

          {/* SECTION 3: WHY FINCADO HINDI */}
          <section
            style={{
              marginTop: 60,
              padding: '32px',
              background: '#f8fafc',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
            }}
          >
            <h3
              style={{
                margin: '0 0 12px 0',
                fontSize: '20px',
                color: '#334155',
              }}
            >
              Fincado हिंदी क्यों?
            </h3>
            <p
              style={{
                color: '#475569',
                lineHeight: '1.7',
                fontSize: '15px',
                margin: 0,
              }}
            >
              भारत में वित्तीय साक्षरता (Financial Literacy) को बढ़ावा देने के
              लिए हमने अपने प्रमुख टूल्स को हिंदी में उपलब्ध कराया है। अक्सर
              फाइनेंस की जटिल शर्तें आम लोगों को समझ नहीं आतीं। Fincado का
              प्रयास है कि <strong>SIP</strong>, <strong>EMI</strong> और{' '}
              <strong>Tax</strong>
              जैसे विषयों को आप अपनी मातृभाषा में आसानी से समझ सकें।
            </p>
          </section>
        </div>

        {/* --- RIGHT: SIDEBAR --- */}
        <aside className="sidebar">
          <HindiSidebar />
          <div style={{ marginTop: 24, position: 'sticky', top: '24px' }}>
            <AdSlot id="hindi-sidebar-sticky" type="box" />
          </div>
        </aside>
      </div>

      {/* --- LOCAL STYLES --- */}
      <style jsx global>{`
        /* TOOL CARDS */
        .tool-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all 0.2s ease;
        }
        .tool-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
          border-color: #cbd5e1;
        }
        .tool-icon {
          width: 44px;
          height: 44px;
          background: #f0fdf4;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
        }
        .tool-title {
          font-size: 17px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 4px 0;
        }
        .tool-desc {
          font-size: 13px;
          color: #64748b;
          margin: 0;
          line-height: 1.5;
        }

        /* GUIDE CARDS */
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
          border-color: #bbf7d0; /* Light Green Border */
        }
        .category-pill {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          color: #15803d;
          background: #dcfce7;
          padding: 4px 10px;
          border-radius: 6px;
          letter-spacing: 0.5px;
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
    </main>
  );
}
