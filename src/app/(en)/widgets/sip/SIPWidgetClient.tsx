'use client';

import SIPClient from '@/app/(en)/sip-calculator/SIPClient';

export default function SIPWidgetClient() {
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
        <h2 style={{ fontSize: '18px', margin: 0, color: '#111827' }}>
          SIP Calculator
        </h2>
        <a
          href="https://fincado.com/sip-calculator/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '12px', color: '#6b7280', textDecoration: 'none' }}
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
          border: 1px solid #e5e7eb;
        }
        .article-content {
          display: none;
        }
      `}</style>
    </div>
  );
}
