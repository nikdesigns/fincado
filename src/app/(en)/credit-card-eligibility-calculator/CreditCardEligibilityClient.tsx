'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { RefreshCcw, Calculator, ShieldCheck, ArrowRight } from 'lucide-react';
import { getCardBySlug } from '@/lib/creditCards';
import { CardFactCard } from '@/components/CreditCardFacts';

type Employment = 'salaried' | 'self-employed';
type CibilBand = 'none' | 'below-650' | '650-750' | '750-plus';

interface Tier {
  name: string;
  description: string;
  cardSlugs: string[];
}

const CIBIL_OPTIONS: { value: CibilBand; label: string }[] = [
  { value: 'none', label: 'No history' },
  { value: 'below-650', label: 'Below 650' },
  { value: '650-750', label: '650-750' },
  { value: '750-plus', label: '750+' },
];

const TIERS: Record<string, Tier> = {
  secured: {
    name: 'Secured / Credit-Building',
    description:
      'With no credit history or a lower CIBIL score, an FD-backed secured card is the realistic starting point. It reports to bureaus, so responsible use for 6-12 months typically opens the door to unsecured cards.',
    cardSlugs: ['sbi-card-unnati'],
  },
  entry: {
    name: 'Entry-Level Unsecured',
    description:
      'Your profile likely qualifies for lifetime-free or low-fee unsecured cards, without needing prior credit history in some cases.',
    cardSlugs: ['sbi-simplyclick', 'swiggy-hdfc', 'indianoil-hdfc', 'flipkart-axis'],
  },
  mid: {
    name: 'Mid-Tier Rewards',
    description:
      'You likely qualify for cashback and rewards cards with stronger benefits, and possibly invite-only options.',
    cardSlugs: ['hdfc-millennia', 'bpcl-sbi-card-octane', 'amazon-pay-icici'],
  },
  premium: {
    name: 'Premium / Lounge Access',
    description:
      'Your income and credit profile put you in range for premium travel and lifestyle cards with lounge access.',
    cardSlugs: ['hdfc-regalia-gold'],
  },
  superPremium: {
    name: 'Super-Premium',
    description:
      'At this income level, top-tier cards with accelerated rewards and extensive lounge access become realistic, subject to the issuer’s own underwriting.',
    cardSlugs: ['axis-magnus'],
  },
};

function computeTier(monthlyIncome: number, employment: Employment, age: number, cibil: CibilBand): keyof typeof TIERS {
  if (age < 18) return 'secured';
  if (cibil === 'none' || cibil === 'below-650') return 'secured';

  if (employment === 'self-employed') {
    const annualIncome = monthlyIncome * 12;
    if (annualIncome >= 2400000 && cibil === '750-plus') return 'superPremium';
    if (annualIncome >= 1800000 && cibil === '750-plus') return 'premium';
    if (annualIncome >= 600000) return 'mid';
    return 'entry';
  }

  if (monthlyIncome >= 100000 && cibil === '750-plus') return 'superPremium';
  if (monthlyIncome >= 50000 && cibil === '750-plus') return 'premium';
  if (monthlyIncome >= 25000) return 'mid';
  if (monthlyIncome >= 12000) return 'entry';
  return 'secured';
}

const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number.isFinite(val) ? val : 0);

export default function CreditCardEligibilityClient() {
  const [monthlyIncome, setMonthlyIncome] = useState(30000);
  const [employment, setEmployment] = useState<Employment>('salaried');
  const [age, setAge] = useState(26);
  const [cibil, setCibil] = useState<CibilBand>('650-750');

  const tierKey = useMemo(
    () => computeTier(monthlyIncome, employment, age, cibil),
    [monthlyIncome, employment, age, cibil],
  );

  const tier = TIERS[tierKey];
  const cards = tier.cardSlugs.map((slug) => getCardBySlug(slug)).filter(Boolean);

  const reset = () => {
    setMonthlyIncome(30000);
    setEmployment('salaried');
    setAge(26);
    setCibil('650-750');
  };

  return (
    <div className="space-y-6">
      <Card className="border-border shadow-sm bg-card">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2 text-slate-800">
              <Calculator className="h-5 w-5 text-brand-500" />
              Check Your Eligibility
            </CardTitle>
            <button
              onClick={reset}
              className="text-xs text-slate-500 flex items-center gap-1 hover:text-brand-500 transition-colors"
            >
              <RefreshCcw className="w-3 h-3" /> Reset
            </button>
          </div>
        </CardHeader>

        <CardContent className="p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* --- LEFT: INPUTS --- */}
            <div className="space-y-8">
              <div className="space-y-3">
                <Label>Monthly Income (₹)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-semibold">₹</span>
                  <Input
                    type="number"
                    min={0}
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Math.max(0, Number(e.target.value) || 0))}
                    className="pl-8 h-11 text-lg font-medium"
                  />
                </div>
                {employment === 'self-employed' && (
                  <p className="text-xs text-slate-600">Enter average monthly income from your ITR.</p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium text-slate-700">Employment Type</Label>
                <Tabs value={employment} onValueChange={(v) => setEmployment(v as Employment)} className="w-full">
                  <TabsList className="w-full grid grid-cols-2 gap-2 bg-transparent p-0 border border-slate-200 rounded-md">
                    <TabsTrigger
                      value="salaried"
                      className="w-full px-4 py-2 text-sm font-semibold rounded-md data-[state=active]:bg-brand-50 data-[state=active]:text-brand-600 data-[state=active]:border-brand-400 data-[state=active]:shadow-sm border border-transparent text-slate-600 hover:bg-slate-50 transition"
                    >
                      Salaried
                    </TabsTrigger>
                    <TabsTrigger
                      value="self-employed"
                      className="w-full px-4 py-2 text-sm font-semibold rounded-md data-[state=active]:bg-brand-50 data-[state=active]:text-brand-600 data-[state=active]:border-brand-400 data-[state=active]:shadow-sm border border-transparent text-slate-600 hover:bg-slate-50 transition"
                    >
                      Self-Employed
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="space-y-3">
                <Label>Age</Label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={age}
                  onChange={(e) => setAge(Math.max(0, Number(e.target.value) || 0))}
                  className="h-11"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium text-slate-700">CIBIL Score Range</Label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {CIBIL_OPTIONS.map((opt) => (
                    <Badge
                      key={opt.value}
                      variant={cibil === opt.value ? 'default' : 'outline'}
                      className={`cursor-pointer px-3 py-1.5 transition ${
                        cibil === opt.value
                          ? 'bg-brand-500 hover:bg-brand-600 text-white'
                          : 'text-slate-600 hover:bg-brand-50'
                      }`}
                      onClick={() => setCibil(opt.value)}
                    >
                      {opt.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* --- RIGHT: RESULT --- */}
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5 text-slate-400" />
                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  Likely Tier
                </span>
              </div>

              <div className="flex-1 bg-white border border-slate-200 rounded-xl p-6">
                <Badge className="mb-3 bg-brand-500 hover:bg-brand-600">{tier.name}</Badge>
                <p className="text-sm text-slate-700 leading-relaxed">{tier.description}</p>
              </div>

              <div className="mt-4 flex gap-2 items-start text-xs text-slate-800 bg-white border border-slate-100 p-3 rounded-lg shadow-sm">
                <ArrowRight className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <p>
                  Based on {formatINR(monthlyIncome)}/month, {employment === 'salaried' ? 'salaried' : 'self-employed'} income,
                  age {age}, and a CIBIL band of {CIBIL_OPTIONS.find((o) => o.value === cibil)?.label.toLowerCase()}.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Cards Worth Checking</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {cards.map((card) => card && <CardFactCard key={card.slug} card={card} />)}
        </div>
      </div>

      <Card className="border-slate-200 bg-slate-50">
        <CardContent className="flex items-start gap-3 pt-6 text-sm text-slate-600">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
          <p>
            This is a simplified heuristic based on typical, publicly stated issuer criteria — not an actual
            eligibility check by any bank. Each issuer applies its own underwriting, and actual approval depends
            on your complete credit report, existing obligations, and internal policy.{' '}
            <Link href="/guides/credit-card-guide/" className="text-brand-600 hover:underline">
              Read the full credit card guide
            </Link>{' '}
            before applying.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
