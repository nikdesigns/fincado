import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { HINDI_CALCULATOR_CATEGORIES } from '@/data/hindiTools';
import LanguageToggle from '@/components/LanguageToggle';

export const metadata: Metadata = {
  title: 'सभी फाइनेंशियल कैलकुलेटर (Hindi Calculators) - Fincado',
  description:
    'SIP, EMI, PPF, GST, होम लोन और इनकम टैक्स के लिए सर्वश्रेष्ठ हिंदी कैलकुलेटर। अपनी बचत और निवेश की सटीक गणना करें।',
  alternates: {
    canonical: 'https://www.fincado.com/hi/calculators',
  },
};

export default function HindiCalculatorsPage() {
  return (
    <main className="container" style={{ padding: '40px 20px' }}>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://www.fincado.com/hi' },
          { name: 'कैलकुलेटर', url: 'https://www.fincado.com/hi/calculators' },
        ]}
      />

      <div className="layout-grid">
        <div className="main-content">
          <LanguageToggle path="/calculators" />
          <h1
            style={{ fontSize: '32px', marginBottom: '24px', color: '#1e293b' }}
          >
            वित्तीय कैलकुलेटर{' '}
            <span style={{ color: '#16a34a' }}>(Financial Tools)</span>
          </h1>
          <p
            style={{ color: '#64748b', marginBottom: '32px', fontSize: '18px' }}
          >
            निवेश, लोन और टैक्स की गणना के लिए भारत के सबसे सटीक टूल्स।
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {HINDI_CALCULATOR_CATEGORIES.map((cat) => (
              <section key={cat.name}>
                <h2
                  style={{
                    fontSize: '22px',
                    fontWeight: 700,
                    color: '#0f172a',
                    marginBottom: '20px',
                    borderBottom: '2px solid #f1f5f9',
                    paddingBottom: '10px',
                  }}
                >
                  {cat.name}
                </h2>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns:
                      'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: '16px',
                  }}
                >
                  {cat.tools.map((tool) => (
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
            ))}
          </div>
        </div>

        <aside className="sidebar">
          <HindiSidebar />
          <div style={{ marginTop: 24 }}>
            <AdSlot type="box" />
          </div>
        </aside>
      </div>

      <style>{`
        .tool-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; height: 100%; display: flex; align-items: center; gap: 16px; transition: all 0.2s ease; }
        .tool-card:hover { transform: translateY(-3px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); border-color: #cbd5e1; }
        .tool-icon { width: 44px; height: 44px; background: #f0fdf4; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; }
        .tool-title { font-size: 16px; font-weight: 700; color: #1e293b; margin: 0 0 2px 0; }
        .tool-desc { font-size: 12px; color: #64748b; margin: 0; line-height: 1.4; }
      `}</style>
    </main>
  );
}
