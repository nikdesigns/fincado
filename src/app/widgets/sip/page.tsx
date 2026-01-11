'use client';

import SIPClient from '@/app/sip-calculator/SIPClient';

export default function SIPWidget() {
  return (
    <div
      style={{ padding: '20px', background: '#fff', fontFamily: 'sans-serif' }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <h2 style={{ fontSize: '18px', margin: 0, color: '#0f172a' }}>
          SIP Calculator
        </h2>
        <a
          href="https://fincado.com/sip-calculator/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '12px', color: '#64748b', textDecoration: 'none' }}
        >
          Powered by Fincado
        </a>
      </div>

      <div className="widget-mode">
        <SIPClient />
      </div>

      <style jsx global>{`
        body {
          background: transparent !important;
          margin: 0;
        }
        .sidebar,
        header,
        footer,
        .share-widget,
        .mobile-only-suggestions {
          display: none !important;
        }
        .calculator-card {
          box-shadow: none !important;
          border: 1px solid #e2e8f0;
        }
        .article-content {
          display: none;
        }
      `}</style>
    </div>
  );
}
