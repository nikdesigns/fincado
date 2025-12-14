// src/app/guides/layout.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // ✅ CHECK: Are we on the main listing page?
  const isIndexPage = pathname === '/guides' || pathname === '/guides/';

  // 1. If on Main Guides Page -> Pass through (Let page.tsx handle layout/hero)
  if (isIndexPage) {
    return <>{children}</>;
  }

  // 2. If on Article Page -> Render with Sidebar Layout
  return (
    <main className="container" style={{ padding: '40px 20px' }}>
      <div className="layout-grid">
        {/* LEFT: Article Content */}
        <div className="main-content" style={{ minWidth: 0 }}>
          {children}
        </div>

        {/* RIGHT: Sidebar (For Articles) */}
        <aside className="sidebar">
          {/* Ad Slot */}
          <div style={{ marginBottom: 24 }}>
            <AdSlot id="article-sidebar-top" type="box" />
          </div>

          {/* Navigation Widget */}
          <FinancialNavWidget />

          {/* "Back to Guides" Helper */}
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
                letterSpacing: '0.5px',
              }}
            >
              Explore More
            </h4>
            <Link
              href="/guides"
              style={{
                fontSize: 14,
                color: 'var(--color-brand-green)',
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
