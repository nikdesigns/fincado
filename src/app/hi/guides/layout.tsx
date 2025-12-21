import React from 'react';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';

export default function HindiGuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container" style={{ padding: '40px 20px' }}>
      <div className="layout-grid">
        {/* Left Column: Article Content */}
        <div className="main-content">{children}</div>

        {/* Right Column: Sidebar (Nav + Ads) */}
        <aside className="sidebar">
          {/* 1. Navigation / Links */}
          <HindiSidebar />

          {/* 2. Sticky Sidebar Ad */}
          <div
            className="no-print"
            style={{ marginTop: 24, position: 'sticky', top: '20px' }}
          >
            <AdSlot id="hi-guide-sidebar" type="box" />
          </div>
        </aside>
      </div>
    </main>
  );
}
