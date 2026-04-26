import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  GitCompare,
  ShieldCheck,
  Timer,
  TrendingDown,
} from 'lucide-react';

type Bank = {
  slug: string;
  name: string;
  fullName: string;
  type: 'PSU' | 'Private' | 'NBFC';
  avgRate?: number;
};

type ComparisonPair = {
  b1: Bank;
  b2: Bank;
  rateDiff: number | null;
  isCrossType: boolean;
  isStrategic: boolean;
};

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

function getRateDifference(b1: Bank, b2: Bank): number | null {
  if (b1.avgRate && b2.avgRate) return Number(Math.abs(b1.avgRate - b2.avgRate).toFixed(2));
  return null;
}

function isCrossTypeComparison(b1: Bank, b2: Bank): boolean {
  return (
    (b1.type === 'PSU' && b2.type === 'Private') ||
    (b1.type === 'Private' && b2.type === 'PSU')
  );
}

function toCanonicalCompareSlug(s1: string, s2: string): string {
  return [s1, s2].sort().join('-vs-');
}

function buildPairs(banks: Bank[]): ComparisonPair[] {
  const pairs: ComparisonPair[] = [];

  for (let i = 0; i < banks.length; i++) {
    for (let j = i + 1; j < banks.length; j++) {
      const b1 = banks[i];
      const b2 = banks[j];
      const rateDiff = getRateDifference(b1, b2);
      const isCrossType = isCrossTypeComparison(b1, b2);

      pairs.push({
        b1,
        b2,
        rateDiff,
        isCrossType,
        isStrategic: isCrossType || (rateDiff !== null && rateDiff >= 0.25),
      });
    }
  }

  return pairs.sort(
    (a, b) =>
      Number(b.isStrategic) - Number(a.isStrategic) ||
      Number(b.isCrossType) - Number(a.isCrossType) ||
      (a.rateDiff ?? 0) - (b.rateDiff ?? 0),
  );
}

export default function ComparisonGrid() {
  const pairs = buildPairs(topBanks);

  return (
    <section
      className="compare-grid-shell px-4 py-8 sm:px-6"
      aria-label="Bank Loan Comparison Directory"
    >
      <div className="mx-auto mb-8 max-w-3xl text-center">
        <h2 className="mb-3 text-2xl font-semibold text-slate-900">
          Compare {pairs.length}+ Bank Combinations
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          Enterprise-style decision pages covering interest-rate spread, fee
          exposure, approval timeline, and borrower-fit context. Updated for{' '}
          {new Date().getFullYear()}.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2">
        {pairs.map((pair) => {
          const canonicalCompareSlug = toCanonicalCompareSlug(
            pair.b1.slug,
            pair.b2.slug,
          );

          return (
            <Card
              key={`${pair.b1.slug}-${pair.b2.slug}`}
              className="compare-unique-card group overflow-hidden border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg"
            >
              <CardContent className="p-5">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-slate-100 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-slate-700 uppercase"
                      >
                        {pair.b1.type} vs {pair.b2.type}
                      </Badge>
                      {pair.isStrategic && (
                        <Badge className="border border-brand-200 bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700 uppercase">
                          Strategic Match
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-lg leading-tight font-semibold text-slate-900">
                      {pair.b1.name}{' '}
                      <span className="font-extrabold text-brand-700">vs</span>{' '}
                      {pair.b2.name}
                    </h3>
                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-brand-300 shadow-sm transition-all duration-300 group-hover:bg-brand-700 group-hover:text-white">
                    <GitCompare className="h-5 w-5" />
                  </div>
                </div>

                <div className="mb-4 space-y-2">
                  {pair.rateDiff !== null && (
                    <div className="flex items-center gap-2 text-xs">
                      <TrendingDown className="h-3.5 w-3.5 text-brand-700" />
                      <span className="text-slate-600">
                        Rate difference:{' '}
                        <strong className="text-brand-700">
                          {pair.rateDiff.toFixed(2)}%
                        </strong>
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs">
                    <Timer className="h-3.5 w-3.5 text-brand-700" />
                    <span className="text-slate-600">
                      Approval time compared
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <ShieldCheck className="h-3.5 w-3.5 text-brand-700" />
                    <span className="text-slate-600">
                      Processing fees analyzed
                    </span>
                  </div>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-slate-600">
                  Compare {pair.b1.fullName} and {pair.b2.fullName} home loan
                  rates with fee sensitivity, servicing quality, and borrower
                  eligibility context.
                </p>

                <Button
                  asChild
                  variant="outline"
                  className="group/btn h-10 w-full border-slate-300 font-semibold text-slate-700 transition-all hover:border-slate-900 hover:bg-slate-900 hover:text-white"
                >
                  <Link
                    href={`/compare/${canonicalCompareSlug}/`}
                    title={`Compare ${pair.b1.fullName} vs ${pair.b2.fullName} home loan rates`}
                  >
                    <span>View Comparison</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="compare-note-rail mt-10 rounded-xl border border-slate-200 p-6 text-center">
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600">
          <strong className="text-slate-900">Decision heuristic:</strong> PSU
          lenders often stay cost-competitive over long tenures; private
          lenders can lead on turnaround and digital experience. Optimize for
          your true bottleneck.
        </p>
      </div>

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
              url: `https://fincado.com/compare/${toCanonicalCompareSlug(
                pair.b1.slug,
                pair.b2.slug,
              )}/`,
            })),
          }),
        }}
      />
    </section>
  );
}
