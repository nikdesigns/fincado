import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  GitCompare,
  TrendingDown,
  Clock,
  Shield,
} from 'lucide-react';

/**
 * ✅ ENHANCED SEO HUB COMPONENT
 * Generates an internal linking grid for high-CPC bank comparison pairs.
 * Optimized for search engines with proper semantic HTML and rich content.
 */

type Bank = {
  slug: string;
  name: string;
  fullName: string;
  type: 'PSU' | 'Private' | 'NBFC';
  avgRate?: number;
};

export default function ComparisonGrid() {
  const topBanks: Bank[] = [
    {
      slug: 'sbi',
      name: 'SBI',
      fullName: 'State Bank of India',
      type: 'PSU',
      avgRate: 8.5,
    },
    {
      slug: 'hdfc',
      name: 'HDFC',
      fullName: 'HDFC Bank',
      type: 'Private',
      avgRate: 8.6,
    },
    {
      slug: 'icici',
      name: 'ICICI',
      fullName: 'ICICI Bank',
      type: 'Private',
      avgRate: 8.7,
    },
    {
      slug: 'axis',
      name: 'Axis',
      fullName: 'Axis Bank',
      type: 'Private',
      avgRate: 8.75,
    },
    {
      slug: 'kotak',
      name: 'Kotak',
      fullName: 'Kotak Mahindra Bank',
      type: 'Private',
      avgRate: 8.8,
    },
    {
      slug: 'pnb',
      name: 'PNB',
      fullName: 'Punjab National Bank',
      type: 'PSU',
      avgRate: 8.4,
    },
    {
      slug: 'bob',
      name: 'BOB',
      fullName: 'Bank of Baroda',
      type: 'PSU',
      avgRate: 8.45,
    },
    {
      slug: 'lic-housing',
      name: 'LIC Housing',
      fullName: 'LIC Housing Finance',
      type: 'NBFC',
      avgRate: 8.5,
    },
    {
      slug: 'bajaj',
      name: 'Bajaj',
      fullName: 'Bajaj Finserv',
      type: 'NBFC',
      avgRate: 9.0,
    },
    {
      slug: 'idfc-first',
      name: 'IDFC First',
      fullName: 'IDFC First Bank',
      type: 'Private',
      avgRate: 8.75,
    },
  ];

  // Generate comparison pairs
  const pairs = [];
  for (let i = 0; i < topBanks.length; i++) {
    for (let j = i + 1; j < topBanks.length; j++) {
      pairs.push({ b1: topBanks[i], b2: topBanks[j] });
    }
  }

  // Helper to determine if comparison is cross-type (PSU vs Private)
  const isCrossTypeComparison = (b1: Bank, b2: Bank) => {
    return (
      (b1.type === 'PSU' && b2.type === 'Private') ||
      (b1.type === 'Private' && b2.type === 'PSU')
    );
  };

  // Helper to calculate rate difference
  const getRateDifference = (b1: Bank, b2: Bank) => {
    if (b1.avgRate && b2.avgRate) {
      return Math.abs(b1.avgRate - b2.avgRate).toFixed(2);
    }
    return null;
  };

  return (
    <section className="py-8" aria-label="Bank Loan Comparison Directory">
      {/* Section Header */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          Compare {pairs.length}+ Bank Combinations
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Detailed side-by-side comparisons of home loan interest rates,
          processing fees, approval timelines, and hidden charges. Updated for
          2026.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {pairs.map((pair) => {
          const rateDiff = getRateDifference(pair.b1, pair.b2);
          const isCrossType = isCrossTypeComparison(pair.b1, pair.b2);

          return (
            <Card
              key={`${pair.b1.slug}-${pair.b2.slug}`}
              className="group border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 overflow-hidden bg-white"
            >
              <CardContent className="p-5">
                {/* Header Section */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant="secondary"
                        className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5"
                      >
                        {pair.b1.type} vs {pair.b2.type}
                      </Badge>
                      {isCrossType && (
                        <Badge className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">
                      {pair.b1.name}{' '}
                      <span className="text-emerald-600 font-extrabold">
                        vs
                      </span>{' '}
                      {pair.b2.name}
                    </h3>
                  </div>

                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shrink-0 shadow-sm">
                    <GitCompare className="w-5 h-5" />
                  </div>
                </div>

                {/* Key Stats */}
                <div className="mb-4 space-y-2">
                  {rateDiff && (
                    <div className="flex items-center gap-2 text-xs">
                      <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-slate-600">
                        Rate difference:{' '}
                        <strong className="text-emerald-700">
                          {rateDiff}%
                        </strong>
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-slate-600">
                      Approval time compared
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Shield className="w-3.5 h-3.5 text-purple-600" />
                    <span className="text-slate-600">
                      Processing fees analyzed
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  Compare {pair.b1.fullName} and {pair.b2.fullName} home loan
                  rates, eligibility criteria, and real customer approval rates.
                </p>

                {/* CTA Button */}
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-slate-200 text-slate-700 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 font-semibold h-10 transition-all flex items-center justify-center group/btn"
                >
                  <Link
                    href={`/compare/${pair.b1.slug}-vs-${pair.b2.slug}/`}
                    title={`Compare ${pair.b1.fullName} vs ${pair.b2.fullName} home loan rates`}
                  >
                    <span>View Comparison</span>
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bottom Info */}
      <div className="mt-10 text-center bg-slate-50 border border-slate-200 rounded-xl p-6">
        <p className="text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
          <strong className="text-slate-900">💡 Pro Tip:</strong> PSU banks
          (SBI, PNB, BOB) typically offer lower long-term rates, while private
          banks (HDFC, ICICI, Axis) provide faster approvals and digital
          convenience. Choose based on your priority.
        </p>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Bank Loan Comparison Directory',
            description:
              'Compare home loan interest rates across major Indian banks',
            numberOfItems: pairs.length,
            itemListElement: pairs.slice(0, 10).map((pair, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: `${pair.b1.name} vs ${pair.b2.name} Home Loan Comparison`,
              url: `https://fincado.com/compare/${pair.b1.slug}-vs-${pair.b2.slug}/`,
            })),
          }),
        }}
      />
    </section>
  );
}
