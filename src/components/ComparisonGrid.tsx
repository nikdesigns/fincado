import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { banks } from '@/lib/banks';
import { BANK_LOGOS } from '@/lib/bankLogos';

// The ten lenders that have head-to-head comparison pages
const COMPARED_SLUGS = [
  'sbi',
  'hdfc',
  'icici',
  'axis',
  'kotak',
  'pnb',
  'bob',
  'lic-housing',
  'bajaj',
  'idfc-first',
];

type Lender = {
  slug: string;
  name: string;
  rate: number;
  category: string;
};

type Pair = {
  slug: string;
  lower: Lender;
  higher: Lender;
  gap: number;
};

function toCanonicalCompareSlug(s1: string, s2: string): string {
  return [s1, s2].sort().join('-vs-');
}

function buildPairs(lenders: Lender[]): Pair[] {
  const pairs: Pair[] = [];

  for (let i = 0; i < lenders.length; i++) {
    for (let j = i + 1; j < lenders.length; j++) {
      const [lower, higher] =
        lenders[i].rate <= lenders[j].rate
          ? [lenders[i], lenders[j]]
          : [lenders[j], lenders[i]];
      pairs.push({
        slug: toCanonicalCompareSlug(lower.slug, higher.slug),
        lower,
        higher,
        gap: Number((higher.rate - lower.rate).toFixed(2)),
      });
    }
  }

  // Biggest rate gaps first: those are the comparisons where the choice matters most
  return pairs.sort(
    (a, b) => b.gap - a.gap || a.slug.localeCompare(b.slug),
  );
}

function LenderRow({ lender, leads }: { lender: Lender; leads: boolean }) {
  const logo = BANK_LOGOS[lender.slug];
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        {logo ? (
          <Image
            src={logo}
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 shrink-0 rounded-md border border-slate-100 object-contain p-0.5"
          />
        ) : (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-[9px] font-bold text-slate-600">
            {lender.name.slice(0, 3).toUpperCase()}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">
            {lender.name}
          </p>
          <p className="text-[11px] text-slate-400">{lender.category}</p>
        </div>
      </div>
      <p
        className={`shrink-0 text-lg font-bold tracking-tight tabular-nums ${leads ? 'text-slate-900' : 'text-slate-500'}`}
      >
        {lender.rate.toFixed(2)}%
      </p>
    </div>
  );
}

export default function ComparisonGrid() {
  const lenders: Lender[] = COMPARED_SLUGS.flatMap((slug) => {
    const bank = banks.find((b) => b.slug === slug);
    return bank
      ? [
          {
            slug,
            name: bank.name,
            rate: bank.rate,
            category: bank.category ?? 'Lender',
          },
        ]
      : [];
  });
  const pairs = buildPairs(lenders);

  return (
    <div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pairs.map((pair) => {
          const isTie = pair.gap === 0;
          return (
            <li key={pair.slug}>
              <Link
                href={`/compare/${pair.slug}/`}
                title={`Compare ${pair.lower.name} vs ${pair.higher.name} home loan rates`}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:border-brand-500 hover:shadow-xl hover:shadow-slate-900/5"
              >
                <h3 className="sr-only">
                  {pair.lower.name} vs {pair.higher.name}
                </h3>
                <div className="space-y-3">
                  <LenderRow lender={pair.lower} leads={!isTie} />
                  <LenderRow lender={pair.higher} leads={false} />
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                  <p className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    Rate gap
                    <span className="rounded-full bg-brand-400 px-2.5 py-1 text-xs font-semibold text-slate-900 tabular-nums">
                      {isTie ? 'Level' : `${pair.gap.toFixed(2)}%`}
                    </span>
                  </p>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors group-hover:border-brand-400 group-hover:bg-brand-400 group-hover:text-slate-900">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="mt-6 text-center text-xs text-slate-500">
        Starting home loan rates, indicative only. The rate you are offered
        depends on your credit score, income and the lender&apos;s policy.
      </p>

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
            itemListElement: pairs.map((pair, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: `${pair.lower.name} vs ${pair.higher.name} Home Loan Comparison`,
              url: `https://fincado.com/compare/${pair.slug}/`,
            })),
          }),
        }}
      />
    </div>
  );
}

export const COMPARISON_PAIR_COUNT =
  (COMPARED_SLUGS.length * (COMPARED_SLUGS.length - 1)) / 2;
