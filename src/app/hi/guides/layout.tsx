import React from 'react';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';

export default function HindiGuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-50/30 min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 my-12">
          {/* Left Column: Main Content */}
          <div className="lg:col-span-8 min-w-0">{children}</div>

          {/* Right Column: Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              {/* Navigation Sidebar */}
              <HindiSidebar />

              {/* Sticky Ad Box */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex justify-center p-4 min-h-62.5 items-center no-print">
                <AdSlot id="hi-guide-sidebar" type="box" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
