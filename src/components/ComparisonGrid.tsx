import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, GitCompare } from 'lucide-react';

/**
 * ✅ SEO HUB COMPONENT
 * Generates an internal linking grid for high-CPC bank comparison pairs.
 * Matches the lime/Slate theme of Fincado.
 */
export default function ComparisonGrid() {
  const topBanks = [
    { slug: 'sbi', name: 'SBI' },
    { slug: 'hdfc', name: 'HDFC' },
    { slug: 'icici', name: 'ICICI' },
    { slug: 'axis', name: 'Axis' },
    { slug: 'kotak', name: 'Kotak' },
    { slug: 'pnb', name: 'PNB' },
    { slug: 'bob', name: 'BOB' },
    { slug: 'lic-housing', name: 'LIC Housing' },
    { slug: 'bajaj', name: 'Bajaj' },
    { slug: 'idfc-first', name: 'IDFC First' },
  ];

  const pairs = [];
  for (let i = 0; i < topBanks.length; i++) {
    for (let j = i + 1; j < topBanks.length; j++) {
      pairs.push({ b1: topBanks[i], b2: topBanks[j] });
    }
  }

  return (
    <section className="py-12 bg-transparent">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pairs.map((pair) => (
          <Card
            key={`${pair.b1.slug}-${pair.b2.slug}`}
            className="group border-slate-200 hover:border-lime-300 hover:shadow-xl transition-all duration-300 overflow-hidden bg-white shadow-sm"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Expert Analysis
                  </span>
                  <h3 className="text-xl font-medium text-slate-900 leading-tight">
                    {pair.b1.name}{' '}
                    <span className="text-lime-600 font-medium">vs</span>{' '}
                    {pair.b2.name}
                  </h3>
                </div>
                <div className="h-10 w-10 rounded-xl bg-lime-50 flex items-center justify-center text-lime-600 group-hover:bg-lime-600 group-hover:text-white transition-all duration-300">
                  <GitCompare className="w-5 h-5" />
                </div>
              </div>

              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                Compare {pair.b1.name} and {pair.b2.name} on interest rates,
                hidden processing fees, and real-world disbursal timelines.
              </p>

              <Button
                asChild
                variant="outline"
                className="w-full border-slate-200 text-slate-700 hover:bg-lime-600 hover:text-white hover:border-lime-600 rounded-xl font-bold h-11 transition-all flex items-center justify-center"
              >
                <Link href={`/compare/${pair.b1.slug}-vs-${pair.b2.slug}/`}>
                  Compare Now{' '}
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
