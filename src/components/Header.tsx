'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Calculator,
  ChevronDown,
  GitCompare,
  Home,
  Landmark,
  Languages,
  Menu,
  PiggyBank,
  ShieldCheck,
  TrendingUp,
  X,
} from 'lucide-react';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import BrandLogo from '@/components/BrandLogo';

const CALCULATOR_MENU = [
  {
    category: 'Loans',
    icon: Landmark,
    items: [
      { label: 'EMI Calculator', href: '/emi-calculator/' },
      { label: 'EMI Prepayment', href: '/emi-prepayment-calculator/' },
      { label: 'Home Loan', href: '/loans/home-loan/' },
      { label: 'Car Loan', href: '/loans/car-loan/' },
      { label: 'Personal Loan', href: '/loans/personal-loan/' },
      { label: 'Education Loan', href: '/loans/education-loan/' }
    ],
  },
  {
    category: 'Investment',
    icon: TrendingUp,
    items: [
      { label: 'SIP Calculator', href: '/sip-calculator/' },
      { label: 'Lumpsum Calculator', href: '/lumpsum-calculator/' },
      { label: 'SWP Calculator', href: '/swp-calculator/' },
      { label: 'ELSS Calculator', href: '/elss-calculator/' },
      { label: 'FD Calculator', href: '/fd-calculator/' },
      { label: 'RD Calculator', href: '/rd-calculator/' },
      { label: 'PPF Calculator', href: '/ppf-calculator/' },
      { label: 'POMIS Calculator', href: '/pomis-calculator/' },
      { label: 'NSC Calculator', href: '/nsc-calculator/' },
      { label: 'KVP Calculator', href: '/kvp-calculator/' },
      { label: 'CAGR Calculator', href: '/cagr-calculator/' },
      { label: 'Sukanya Samriddhi (SSY)', href: '/sukanya-samriddhi/' }
    ],
  },
  {
    category: 'Retirement',
    icon: PiggyBank,
    items: [
      { label: 'Retirement Planner', href: '/retirement-calculator/' },
      { label: 'SCSS Calculator', href: '/scss-calculator/' },
      { label: 'NPS Calculator', href: '/nps-calculator/' },
      { label: 'EPF Calculator', href: '/epf-calculator/' },
      { label: 'Gratuity Calculator', href: '/gratuity-calculator/' },
      { label: 'APY Calculator', href: '/apy-calculator/' },
      { label: 'FIRE Calculator', href: '/fire-calculator/' },
      { label: 'Goal Planning', href: '/goal-planning-calculator/' }
    ],
  },
  {
    category: 'Tax & Tools',
    icon: ShieldCheck,
    items: [
      { label: 'Income Tax Calculator', href: '/income-tax-calculator/' },
      { label: 'Salary Calculator', href: '/salary-calculator/' },
      { label: 'Capital Gains Tax', href: '/capital-gains-calculator/' },
      { label: 'Brokerage Calculator', href: '/brokerage-calculator/' },
      { label: 'HRA Calculator', href: '/hra-calculator/' },
      { label: 'Rent Receipt Generator', href: '/rent-receipt-generator/' },
      { label: 'GST Calculator', href: '/gst-calculator/' },
      { label: 'Credit Score', href: '/credit-score/' },
      { label: 'Inflation Calculator', href: '/inflation-calculator/' },
      { label: 'Simple Interest', href: '/simple-interest-calculator/' },
      { label: 'Compound Interest', href: '/compound-interest-calculator/' }
    ],
  }
];

const TOTAL_CALCULATORS = CALCULATOR_MENU.reduce(
  (sum, section) => sum + section.items.length,
  0,
);

const NAV_LINK =
  'rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150';
const NAV_IDLE = 'text-slate-600 hover:bg-slate-100 hover:text-slate-900';
const NAV_ACTIVE = 'bg-slate-100 text-slate-900';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Calculators dropdown: which category's links are showing.
  // Opens on the category of the page you are on, when there is one.
  const [activeCat, setActiveCat] = useState(() => {
    const idx = CALCULATOR_MENU.findIndex((section) =>
      section.items.some((item) => item.href === pathname),
    );
    return idx === -1 ? 0 : idx;
  });

  const isHindi = pathname === '/hi' || pathname.startsWith('/hi/');
  const isCompareActive =
    pathname.startsWith('/compare-loans') || pathname.startsWith('/compare/');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const navClass = (active: boolean) =>
    `${NAV_LINK} ${active ? NAV_ACTIVE : NAV_IDLE}`;

  const closeMobile = () => setMobileOpen(false);

  // Language switch: Hindi pages link back to English, and vice versa
  const langHref = isHindi ? '/' : '/hi/';
  const langLabel = isHindi ? 'English' : 'हिंदी';

  return (
    <header
      role="banner"
      className={`sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md transition-shadow duration-200 ${
        scrolled
          ? 'border-slate-200 shadow-sm shadow-slate-900/5'
          : 'border-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          {/* LOGO */}
          <Link
            href="/"
            className="inline-flex shrink-0 items-center"
            aria-label="Fincado home"
          >
            <BrandLogo
              variant="horizontal"
              width={172}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* DESKTOP NAV */}
          <NavigationMenu className="hidden lg:flex" role="navigation">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    aria-current={isActive('/') ? 'page' : undefined}
                    className={navClass(isActive('/'))}
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-9 rounded-lg bg-transparent px-3 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 data-[state=open]:bg-slate-100 data-[state=open]:text-slate-900">
                  Calculators
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-0">
                  <div className="flex w-[760px]">
                    {/* Category rail */}
                    <div className="flex w-[232px] shrink-0 flex-col border-r border-slate-200 bg-slate-50 p-3">
                      <div className="space-y-1">
                        {CALCULATOR_MENU.map((section, idx) => {
                          const Icon = section.icon;
                          const selected = idx === activeCat;
                          return (
                            <button
                              key={section.category}
                              type="button"
                              onMouseEnter={() => setActiveCat(idx)}
                              onFocus={() => setActiveCat(idx)}
                              onClick={() => setActiveCat(idx)}
                              aria-pressed={selected}
                              className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${
                                selected
                                  ? 'border-slate-200 bg-white shadow-sm shadow-slate-900/5'
                                  : 'border-transparent hover:bg-white/70'
                              }`}
                            >
                              <span
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                                  selected
                                    ? 'bg-slate-900 text-brand-400'
                                    : 'bg-slate-200 text-slate-600'
                                }`}
                              >
                                <Icon className="h-4 w-4" />
                              </span>
                              <span className="flex-1 text-sm font-semibold text-slate-900">
                                {section.category}
                              </span>
                              <span className="text-xs font-medium text-slate-400 tabular-nums">
                                {section.items.length}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <Link
                        href="/calculators/"
                        className="group mt-auto flex items-center justify-between gap-2 rounded-xl bg-brand-400 px-3 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-brand-500"
                      >
                        All {TOTAL_CALCULATORS} calculators
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>

                    {/* Links for the selected category */}
                    <div className="min-h-[304px] flex-1 p-5">
                      {CALCULATOR_MENU.map((section, idx) => (
                        <div
                          key={section.category}
                          className={idx === activeCat ? 'block' : 'hidden'}
                        >
                          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                            {section.category} calculators
                          </p>
                          <ul className="grid grid-cols-2 gap-x-2 gap-y-0.5">
                            {section.items.map((item) => {
                              const active = pathname === item.href;
                              return (
                                <li key={item.href}>
                                  <Link
                                    href={item.href}
                                    aria-current={active ? 'page' : undefined}
                                    className={`group/item flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                                      active
                                        ? 'bg-brand-100 font-semibold text-slate-900'
                                        : 'font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                                    }`}
                                  >
                                    {item.label}
                                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 opacity-0 transition-opacity group-hover/item:opacity-100" />
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/compare-loans/"
                    aria-current={isCompareActive ? 'page' : undefined}
                    className={navClass(isCompareActive)}
                  >
                    Compare Rates
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/guides/"
                    aria-current={isActive('/guides') ? 'page' : undefined}
                    className={navClass(isActive('/guides'))}
                  >
                    Guides
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* RIGHT: language, CTA, mobile trigger */}
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href={langHref}
              lang={isHindi ? 'en' : 'hi'}
              aria-label={
                isHindi ? 'Switch to English' : 'Switch to Hindi calculators'
              }
              className="hidden h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900 lg:inline-flex"
            >
              <Languages className="h-4 w-4" />
              {langLabel}
            </Link>

            <Link
              href="/emi-calculator/"
              className="hidden h-9 items-center gap-2 rounded-lg bg-brand-400 px-4 text-sm font-semibold text-slate-900 transition-colors hover:bg-brand-500 lg:inline-flex"
            >
              <Calculator className="h-4 w-4" />
              EMI Calculator
            </Link>

            {/* MOBILE MENU */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900 lg:hidden"
                  aria-label="Toggle navigation menu"
                >
                  {mobileOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[340px] bg-white p-0 sm:max-w-sm"
              >
                <VisuallyHidden>
                  <SheetTitle>Navigation menu</SheetTitle>
                </VisuallyHidden>

                <div className="flex h-full flex-col">
                  {/* Mobile header */}
                  <div className="border-b border-slate-200 px-5 py-4">
                    <Link
                      href="/"
                      className="inline-flex items-center"
                      onClick={closeMobile}
                    >
                      <BrandLogo
                        variant="horizontal"
                        width={150}
                        height={35}
                        className="h-7 w-auto"
                      />
                    </Link>
                  </div>

                  <div className="flex-1 overflow-y-auto px-3 py-4">
                    {/* Main links */}
                    <nav aria-label="Main" className="space-y-1">
                      {[
                        { label: 'Home', href: '/', icon: Home, active: isActive('/') },
                        { label: 'Compare Rates', href: '/compare-loans/', icon: GitCompare, active: isCompareActive },
                        { label: 'Guides', href: '/guides/', icon: BookOpen, active: isActive('/guides') },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeMobile}
                          aria-current={item.active ? 'page' : undefined}
                          className={`flex items-center gap-3 rounded-xl px-3 py-3 text-base font-semibold transition-colors ${
                            item.active
                              ? 'bg-slate-100 text-slate-900'
                              : 'text-slate-900 hover:bg-slate-100'
                          }`}
                        >
                          <item.icon className="h-5 w-5 text-slate-500" />
                          {item.label}
                        </Link>
                      ))}
                      <Link
                        href={langHref}
                        onClick={closeMobile}
                        lang={isHindi ? 'en' : 'hi'}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-base font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                      >
                        <Languages className="h-5 w-5 text-slate-500" />
                        {langLabel}
                      </Link>
                    </nav>

                    {/* Calculator sections */}
                    <p className="mt-6 mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Calculators
                    </p>
                    <div className="space-y-1">
                      {CALCULATOR_MENU.map((section, idx) => {
                        const Icon = section.icon;
                        return (
                          <Collapsible
                            key={section.category}
                            defaultOpen={idx === 0}
                          >
                            <CollapsibleTrigger className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-slate-100">
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-brand-400">
                                <Icon className="h-4 w-4" />
                              </span>
                              <span className="text-sm font-semibold text-slate-900">
                                {section.category}
                              </span>
                              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                                {section.items.length}
                              </span>
                              <ChevronDown className="ml-auto h-4 w-4 text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="mt-1 mb-2 ml-7 space-y-0.5 border-l border-slate-200 pl-4">
                              {section.items.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={closeMobile}
                                  className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </CollapsibleContent>
                          </Collapsible>
                        );
                      })}
                    </div>
                  </div>

                  {/* Mobile CTA */}
                  <div className="border-t border-slate-200 p-4">
                    <Link
                      href="/emi-calculator/"
                      onClick={closeMobile}
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand-400 text-sm font-semibold text-slate-900 transition-colors hover:bg-brand-500"
                    >
                      <Calculator className="h-5 w-5" />
                      EMI Calculator
                    </Link>
                    <p className="mt-3 text-center text-xs text-slate-500">
                      All {TOTAL_CALCULATORS} calculators are free to use
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
