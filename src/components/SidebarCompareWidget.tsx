import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowRight, GitCompare, TrendingDown } from 'lucide-react';

type ComparisonItem = {
  b1: string;
  b2: string;
  slug: string;
  insight: string;
};

const TOP_COMPARISONS: ComparisonItem[] = [
  {
    b1: 'SBI',
    b2: 'HDFC',
    slug: 'sbi-vs-hdfc',
    insight: 'Track effective EMI spread before lender finalization.',
  },
  {
    b1: 'ICICI',
    b2: 'Axis',
    slug: 'icici-vs-axis',
    insight: 'Useful for urban salary and balance transfer scenarios.',
  },
  {
    b1: 'PNB',
    b2: 'Bank of Baroda',
    slug: 'pnb-vs-bob',
    insight: 'Public-bank focused comparison with fee visibility.',
  },
  {
    b1: 'HDFC',
    b2: 'Kotak',
    slug: 'hdfc-vs-kotak',
    insight: 'Compare processing fee and floating-rate behavior.',
  },
];

export default function SidebarCompareWidget() {
  return (
    <Card className="mt-8 overflow-hidden border-slate-200 bg-white shadow-sm no-print">
      <CardHeader className="border-b border-slate-200 bg-linear-to-br from-white to-brand-50/40 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
              <GitCompare className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">Compare & Save Desk</div>
              <p className="mt-0.5 text-xs font-medium text-slate-600">
                Benchmark lender options before applying.
              </p>
            </div>
          </div>
          <Badge className="border border-brand-200 bg-brand-50 text-[10px] font-bold text-brand-700 hover:bg-brand-50">
            Loan Rates
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-2.5">
          {TOP_COMPARISONS.map((item, index) => (
            <Link
              key={item.slug}
              href={`/compare/${item.slug}/`}
              className="group flex items-start gap-3 rounded-xl border border-slate-100 bg-white px-3 py-2.5 transition-all hover:border-brand-200 hover:bg-brand-50/40"
            >
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-600 group-hover:bg-brand-100 group-hover:text-brand-700">
                {index + 1}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-slate-800 group-hover:text-brand-800">
                  {item.b1} <span className="font-normal text-slate-400">vs</span> {item.b2}
                </div>
                <p className="mt-0.5 line-clamp-2 text-xs font-medium leading-relaxed text-slate-500">
                  {item.insight}
                </p>
              </div>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-300 group-hover:text-brand-700" />
            </Link>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-brand-100 bg-brand-50/50 p-3">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-brand-800">
            <TrendingDown className="h-3.5 w-3.5" />
            Rate Optimization Tip
          </div>
          <p className="text-xs font-medium leading-relaxed text-slate-600">
            Even a small rate difference can materially change total repayment over long tenure.
          </p>
          <Link
            href="/compare-loans/"
            className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-brand-700 hover:text-brand-800"
          >
            View All 90+ Comparisons
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
