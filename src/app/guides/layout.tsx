'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import TaxRegimeWidget from '@/components/TaxRegimeWidget';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, ArrowLeft, ListTree } from 'lucide-react';
import GuideToc from '@/components/GuideToc';
// Optional: create this component to render h2/h3 links from article

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showTaxWidget =
    pathname?.includes('tax') || pathname?.includes('salary');

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-8 min-w-0">{children}</div>

        <aside className="lg:col-span-4 no-print mb-10 lg:self-start">
          {/* Keep non-sticky section outside sticky container */}
          <div className="space-y-6">
            {showTaxWidget && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <TaxRegimeWidget />
              </div>
            )}

            {/* Sticky + scrollable panel */}
            <div className="lg:sticky lg:top-24 z-10 space-y-6">
              {/* remove overflow/max-h from this inner wrapper */}
              <div className="space-y-6">
                <div className="rounded-xl  overflow-hidden shadow-sm border border-slate-100 bg-white min-h-62.5 flex items-center justify-center">
                  <AdSlot id="guides-sidebar-sticky" type="box" />
                </div>

                <Card className="border-slate-200 bg-white shadow-sm">
                  <CardHeader className="pb-2 pt-5 px-5">
                    <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                      <ListTree className="h-4 w-4 text-emerald-600" />
                      On this page
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-5 px-5">
                    <GuideToc />
                  </CardContent>
                </Card>

                <FinancialNavWidget />

                <Card className="border-slate-200 bg-slate-50/50 shadow-sm">
                  <CardHeader className="pb-2 pt-5 px-5">
                    <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-emerald-600" />
                      Fincado Academy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-5 px-5">
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                      Explore our comprehensive library of financial guides and
                      tutorials.
                    </p>
                    <Link href="/guides/" className="block w-full">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-emerald-700 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800 font-semibold transition-colors"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to All Guides
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
