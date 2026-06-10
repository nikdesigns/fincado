'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import articlesData from '@/data/articles.json';

interface Article {
  slug: string;
  title: string;
  category?: string;
  metaDescription?: string;
  hidden?: boolean;
  language?: string;
}

interface GuideCard {
  slug: string;
  title: string;
  desc: string;
  tag: string;
  img: string;
  href: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  'Loans & Mortgages': 'bg-brand-500/20 text-brand-300 ring-brand-500/30',
  'Credit Score':      'bg-blue-500/20 text-blue-300 ring-blue-500/30',
  'Tax Saving':        'bg-orange-500/20 text-orange-300 ring-orange-500/30',
  'Mutual Funds':      'bg-violet-500/20 text-violet-300 ring-violet-500/30',
  'Savings & FD':      'bg-cyan-500/20 text-cyan-300 ring-cyan-500/30',
  'Retirement':        'bg-amber-500/20 text-amber-300 ring-amber-500/30',
  'Investment':        'bg-indigo-500/20 text-indigo-300 ring-indigo-500/30',
};

function categoryColor(cat: string): string {
  return CATEGORY_COLORS[cat] ?? 'bg-slate-500/20 text-slate-300 ring-slate-500/30';
}

const GUIDE_IMAGES: Record<string, string> = {
  'best-tax-saving-options-80c':          '/images/guides/tax/tax-benefits-80c-24b.webp',
  'car-loan-guide':                        '/images/guides/car-loan/car-loan-guide-hero.webp',
  'credit-score-guide':                    '/images/guides/credit-score/credit-score-guide-hero.webp',
  'education-loan-guide':                  '/images/guides/education-loan/education-loan-guide-hero.webp',
  'elss-funds-guide-2025':                 '/images/guides/elss/elss-guide-hero-2026.webp',
  'elss-funds-guide-2026':                 '/images/guides/elss/elss-guide-hero-2026.webp',
  'elss-vs-fd':                            '/images/guides/elss/elss-guide-hero.webp',
  'epf-guide':                             '/images/guides/epf/epf-guide-hero.webp',
  'fixed-deposit-guide':                   '/images/guides/fd/fd-laddering-hero.webp',
  'fd-truths':                             '/images/guides/fd/fd-laddering-hero.webp',
  'gold-investment-guide':                 '/images/guides/gold/gold-investment-hero.webp',
  'gst-explained':                         '/images/guides/gst/gst-guide-hero.webp',
  'gst-guide':                             '/images/guides/gst/gst-guide-hero.webp',
  'health-insurance-buying-guide':         '/images/guides/health-insurance/health-insurance-guide-hero.webp',
  'home-loan-first-time-buyers':           '/images/guides/home-loan/first-time-buyer-celebration.webp',
  'home-loan-for-first-time-buyers':       '/images/guides/home-loan/first-time-buyer-celebration.webp',
  'home-loan-guide':                       '/images/guides/home-loan/home-loan-guide-hero.webp',
  'how-credit-score-affects-loans':        '/images/guides/credit-score/credit-score-guide-hero.webp',
  'how-credit-score-works-india':          '/images/guides/credit-score/credit-score-guide-hero.webp',
  'credit-card-guide':                     '/images/guides/credit-score/credit-score-guide-hero.webp',
  'inflation-calculator-guide':            '/images/guides/mf/mutual-fund-guide-hero.webp',
  'investment-basics':                     '/images/guides/mf/mutual-fund-guide-hero.webp',
  'investment-guide':                      '/images/guides/mf/mutual-fund-guide-hero.webp',
  'mutual-fund-guide':                     '/images/guides/mf/direct-vs-regular-hero.webp',
  'new-vs-old-tax-regime-2025':            '/images/guides/tax/hero-tax-regime.webp',
  'new-vs-old-tax-regime-2026':            '/images/guides/tax/hero-tax-regime.webp',
  'nps-guide':                             '/images/guides/nps/nps-guide-hero.webp',
  'personal-loan-guide':                   '/images/guides/personal-loan/personal-loan-guide-hero.webp',
  'personal-loan-interest-rates':          '/images/guides/personal-loan/personal-loan-interest-factors.webp',
  'personal-loan-interest-rates-india':    '/images/guides/personal-loan/personal-loan-guide-hero.webp',
  'ppf-guide':                             '/images/guides/ppf/ppf-guide-hero.webp',
  'retirement-planning-india':             '/images/guides/retirement/retirement-planning.webp',
  'sip-for-1-crore-in-10-years':           '/images/guides/sip/sip-1cr-10years-hero.webp',
  'sip-for-1-crore-in-15-years':           '/images/guides/sip/sip-1cr-15years-hero.webp',
  'sip-for-1-crore-in-20-years':           '/images/guides/sip/sip-guide-hero.webp',
  'sip-investing-guide':                   '/images/guides/sip/sip-guide-hero.webp',
  'sip-investment-guide':                  '/images/guides/sip/sip-guide-hero.webp',
  'sip-vs-fd':                             '/images/guides/sip/sip-guide-hero.webp',
  'sovereign-gold-bond-sgb-guide':         '/images/guides/sgb/sgb-hero.webp',
  'ssy-guide':                             '/images/guides/ssy/ssy-concept-hero.webp',
  'sukanya-samriddhi-yojana-guide-2025':   '/images/guides/ssy/ssy-guide-hero-2026.webp',
  'sukanya-samriddhi-yojana-guide-2026':   '/images/guides/ssy/ssy-guide-hero-2026.webp',
  'swp-guide':                             '/images/guides/swp/swp-guide-hero.webp',
  'emi-calculator-guide':                  '/images/guides/emi/emi-guide-hero-2026.webp',
  'tax-on-6-lakh-salary':                  '/images/guides/tax/tax-on-6-lakh-salary-hero.webp',
  'tax-on-7-5-lakh-salary':               '/images/guides/tax/tax-on-7-5-lakh-salary-hero.webp',
  'tax-on-8-lakh-salary':                  '/images/guides/tax/tax-on-8-lakh-salary-hero.webp',
  'tax-on-9-lakh-salary':                  '/images/guides/tax/tax-on-9-lakh-salary-hero.webp',
  'tax-on-10-lakh-salary':                 '/images/guides/tax/tax-on-10-lakh-salary-hero.webp',
  'tax-on-11-lakh-salary':                 '/images/guides/tax/tax-on-11-lakh-salary-hero.webp',
  'tax-on-12-lakh-salary':                 '/images/guides/tax/tax-on-12-lakh-salary-hero.webp',
  'tax-on-14-lakh-salary':                 '/images/guides/tax/tax-on-14-lakh-salary-hero.webp',
  'tax-on-15-lakh-salary':                 '/images/guides/tax/tax-on-15-lakh-salary-hero.webp',
  'tax-on-16-lakh-salary':                 '/images/guides/tax/tax-on-16-lakh-salary-hero.webp',
  'tax-on-18-lakh-salary':                 '/images/guides/tax/tax-on-18-lakh-salary-hero.webp',
  'tax-on-20-lakh-salary':                 '/images/guides/tax/tax-on-20-lakh-salary-hero.webp',
  'tax-on-25-lakh-salary':                 '/images/guides/tax/tax-on-25-lakh-salary-hero.webp',
  'tax-on-30-lakh-salary':                 '/images/guides/tax/tax-on-30-lakh-salary-hero.webp',
};

function pickImage(slug: string): string {
  return GUIDE_IMAGES[slug] ?? '/images/guides/home-loan/home-loan-guide-hero.webp';
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const VISIBLE_ARTICLES: GuideCard[] = (articlesData as Article[])
  .filter((a) => !a.hidden && (!a.language || a.language === 'en'))
  .map((a) => ({
    slug: a.slug,
    title: a.title ?? a.slug,
    desc:  a.metaDescription ?? '',
    tag:   a.category ?? 'Guide',
    img:   pickImage(a.slug),
    href:  `/guides/${a.slug}/`,
  }));

// Skeleton placeholder while JS hasn't run yet
function GuideSkeleton({ large }: { large?: boolean }) {
  return (
    <div
      className={`animate-pulse overflow-hidden rounded-2xl bg-slate-200 ${large ? 'h-80 lg:h-full lg:min-h-120' : 'h-36'}`}
    />
  );
}

export default function GuidesShowcase() {
  const [cards, setCards] = useState<GuideCard[] | null>(null);

  useEffect(() => {
    setCards(shuffle(VISIBLE_ARTICLES).slice(0, 4));
  }, []);

  const [featured, ...rest] = cards ?? [];

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
      {/* Large featured card */}
      {cards === null ? (
        <div className="lg:col-span-5 lg:row-span-3">
          <GuideSkeleton large />
        </div>
      ) : (
        <Link
          href={featured.href}
          className="group relative overflow-hidden rounded-2xl lg:col-span-5 lg:row-span-3"
        >
          <div className="relative h-72 w-full lg:h-full lg:min-h-120">
            <Image
              src={featured.img}
              alt={featured.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <span
                className={`mb-3 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ring-1 ${categoryColor(featured.tag)}`}
              >
                {featured.tag}
              </span>
              <h3 className="mb-2 text-2xl font-bold leading-snug text-white">
                {featured.title}
              </h3>
              {featured.desc && (
                <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-300">
                  {featured.desc}
                </p>
              )}
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400 transition-colors group-hover:text-brand-300">
                Read guide{' '}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </Link>
      )}

      {/* Three smaller horizontal cards */}
      {cards === null
        ? [0, 1, 2].map((i) => (
            <div key={i} className="lg:col-span-7">
              <GuideSkeleton />
            </div>
          ))
        : rest.map((g) => (
            <Link
              key={g.slug}
              href={g.href}
              className="group relative overflow-hidden rounded-2xl lg:col-span-7"
            >
              <div className="flex h-full flex-col sm:flex-row">
                <div className="relative h-44 shrink-0 sm:h-auto sm:w-52">
                  <Image
                    src={g.img}
                    alt={g.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center rounded-r-2xl border border-l-0 border-slate-200 bg-white p-5 transition-colors group-hover:border-brand-200 group-hover:bg-brand-50/20">
                  <span className="mb-2 inline-flex w-fit items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    {g.tag}
                  </span>
                  <h3 className="mb-1.5 text-base font-bold text-slate-900 group-hover:text-brand-800">
                    {g.title}
                  </h3>
                  {g.desc && (
                    <p className="line-clamp-2 text-sm leading-relaxed text-slate-500">
                      {g.desc}
                    </p>
                  )}
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 opacity-0 transition-all group-hover:opacity-100">
                    Read guide <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
    </div>
  );
}
