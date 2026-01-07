import React from 'react';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';

export default function HindiGuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Article Content */}
        <div className="lg:col-span-8 min-w-0 my-12">{children}</div>

        {/* Right Column: Sidebar (Nav + Ads) */}
        <aside className="lg:col-span-4 space-y-8 my-12">
          {/* 1. Navigation / Links */}
          <div className="sticky top-24 space-y-8">
            <HindiSidebar />

            {/* 2. Sticky Sidebar Ad */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex justify-center p-4 min-h-62.5 items-center no-print">
              <AdSlot id="hi-guide-sidebar" type="box" />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
