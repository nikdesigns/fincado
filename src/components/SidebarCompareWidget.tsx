import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, GitCompare } from 'lucide-react';

export default function SidebarCompareWidget() {
  // High-CPC pairs that advertisers pay well for
  const topComparisons = [
    { b1: 'SBI', b2: 'HDFC', slug: 'sbi-vs-hdfc' },
    { b1: 'ICICI', b2: 'Axis', slug: 'icici-vs-axis' },
    { b1: 'PNB', b2: 'Bank of Baroda', slug: 'pnb-vs-bob' },
    { b1: 'HDFC', b2: 'Kotak', slug: 'hdfc-vs-kotak' }
  ];

  return (
    <Card className="border-slate-100 bg-white shadow-sm overflow-hidden mt-8 no-print">
      <CardHeader className="pb-3 border-b border-slate-100/50">
        <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
          <GitCompare className="w-4 h-4 text-lime-600" />
          Compare & Save
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4 bg-white/50">
          <p className="text-xs text-slate-500 leading-relaxed mb-3">
            Found your EMI? Now check which bank gives you the lowest rate for
            that EMI.
          </p>
          <ul className="space-y-2">
            {topComparisons.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/compare/${item.slug}/`}
                  className="flex items-center justify-between group p-2 rounded-lg hover:bg-white hover:shadow-xs border border-transparent hover:border-lime-100 transition-all"
                >
                  <span className="text-xs font-semibold text-slate-700 group-hover:text-lime-700">
                    {item.b1}{' '}
                    <span className="text-slate-400 font-normal">vs</span>{' '}
                    {item.b2}
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-lime-500" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-lime-100/50 p-3 text-center">
          <Button
            asChild
            variant="link"
            className="text-[10px] font-bold text-lime-700 h-auto p-0 hover:no-underline"
          >
            <Link href="/compare-loans/">View All 90+ Comparisons →</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
