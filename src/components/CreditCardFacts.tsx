import Link from 'next/link';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { CreditCard } from '@/lib/creditCards';
import { CARD_DATA_DISCLAIMER, CARDS_LAST_VERIFIED } from '@/lib/creditCards';
import CreditCardVisual from '@/components/CreditCardVisual';

export function CardVerifiedNote() {
  return (
    <div className="mb-8 flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
      <p>
        <strong className="text-slate-900">Facts checked: {CARDS_LAST_VERIFIED}.</strong>{' '}
        {CARD_DATA_DISCLAIMER}
      </p>
    </div>
  );
}

export function CardFactCard({ card, rank }: { card: CreditCard; rank?: number }) {
  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-lg text-slate-900">
            {rank ? `${rank}. ` : ''}
            {card.name}
          </CardTitle>
          <Badge variant="secondary" className="shrink-0 bg-slate-100 text-slate-700">
            {card.issuer}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-slate-700 space-y-3">
        <CreditCardVisual card={card} className="mb-1" />

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <span className="block text-xs font-medium uppercase tracking-wide text-slate-500">
              Joining / Annual Fee
            </span>
            <span className="text-slate-900">
              {card.joiningFee} / {card.annualFee}
            </span>
          </div>
          <div>
            <span className="block text-xs font-medium uppercase tracking-wide text-slate-500">
              Best For
            </span>
            <span className="text-slate-900">{card.bestFor}</span>
          </div>
        </div>

        {card.feeWaiver && (
          <div>
            <span className="block text-xs font-medium uppercase tracking-wide text-slate-500">
              Fee Waiver
            </span>
            <span>{card.feeWaiver}</span>
          </div>
        )}

        <div>
          <span className="block text-xs font-medium uppercase tracking-wide text-slate-500">
            Rewards
          </span>
          <span>{card.rewards}</span>
        </div>

        <div>
          <span className="block text-xs font-medium uppercase tracking-wide text-slate-500">
            Eligibility
          </span>
          <span>{card.eligibility}</span>
        </div>

        <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-3">
          <span className="block text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Standout Feature
          </span>
          <span className="text-emerald-900">{card.standout}</span>
        </div>

        <Link
          href={card.officialUrl}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm"
        >
          View official card page <ExternalLink className="h-3 w-3" />
        </Link>
      </CardContent>
    </Card>
  );
}

export function CardCompareTable({ cards }: { cards: CreditCard[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50">
            <TableHead>Card</TableHead>
            <TableHead>Annual Fee</TableHead>
            <TableHead>Headline Reward</TableHead>
            <TableHead>Best For</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cards.map((card) => (
            <TableRow key={card.slug}>
              <TableCell className="whitespace-normal font-medium text-slate-900">{card.name}</TableCell>
              <TableCell className="whitespace-normal">{card.annualFee}</TableCell>
              <TableCell className="max-w-xs whitespace-normal wrap-break-word">{card.rewards.split(';')[0]}</TableCell>
              <TableCell className="whitespace-normal">{card.bestFor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function CardClusterNav() {
  const links = [
    { href: '/guides/credit-card-guide/', label: 'Credit Card Guide (Basics)' },
    { href: '/guides/best-cashback-credit-cards/', label: 'Best Cashback Cards' },
    { href: '/guides/best-credit-cards-for-students/', label: 'Best Cards for Students' },
    { href: '/guides/best-credit-cards-for-airport-lounge-access/', label: 'Best Lounge Access Cards' },
    { href: '/guides/best-fuel-credit-cards/', label: 'Best Fuel Cards' },
    { href: '/guides/best-credit-cards-under-500-annual-fee/', label: 'Best Cards Under ₹500 Fee' },
    { href: '/guides/best-credit-cards-for-online-shopping/', label: 'Best Cards for Online Shopping' },
    { href: '/guides/sbi-vs-icici-credit-cards/', label: 'SBI vs ICICI Credit Cards' },
    { href: '/guides/hdfc-millennia-vs-swiggy-hdfc-credit-card/', label: 'HDFC Millennia vs Swiggy HDFC' },
    { href: '/guides/hdfc-regalia-vs-axis-magnus/', label: 'HDFC Regalia vs Axis Magnus' },
    { href: '/credit-card-eligibility-calculator/', label: 'Eligibility Calculator' },
  ];

  return (
    <Card className="border-slate-200 bg-slate-50/50 no-print">
      <CardContent className="p-6">
        <p className="mb-3 text-sm font-semibold text-slate-900">More in this series</p>
        <div className="flex flex-wrap gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-blue-300 hover:text-blue-700"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
