'use client';

import React from 'react';
import Link from 'next/link';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className="container"
      style={{ padding: '40px 20px', maxWidth: 1180, margin: '0 auto' }}
    >
      {/* ✅ FIXED: Replaced inline styles with 'page-layout-grid' class.
          This allows the CSS in globals.css to switch to 1 column on mobile.
      */}
      <div className="page-layout-grid">
        {/* LEFT COLUMN: Main Content */}
        <div className="main-content" style={{ minWidth: 0 }}>
          {children}
        </div>

        {/* RIGHT COLUMN: Sidebar */}
        <aside className="sidebar no-print">
          {/* Sticky Ad Wrapper */}
          <div style={{ marginBottom: 24, position: 'sticky', top: '24px' }}>
            <AdSlot id="guides-sidebar-sticky" type="box" />
          </div>

          <FinancialNavWidget />

          {/* Navigation Helper */}
          <div
            style={{
              marginTop: 24,
              padding: 20,
              background: '#f8fafc',
              borderRadius: 12,
              border: '1px solid #e2e8f0',
            }}
          >
            <h4
              style={{
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 12,
                color: '#0f172a',
                textTransform: 'uppercase',
              }}
            >
              Academy
            </h4>
            <Link
              href="/guides"
              style={{
                fontSize: 14,
                color: 'var(--color-brand-green)', // Ensure this var exists or use #16a34a
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              ← View All Guides
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
