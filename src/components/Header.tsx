'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  GitCompare,
  Menu,
  X,
  ChevronDown,
  Calculator,
  TrendingUp,
  PiggyBank,
  ShieldCheck,
  Landmark,
} from 'lucide-react';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu';

import { Button } from '@/components/ui/button';
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

const CALCULATOR_MENU = [
  {
    category: 'Loans',
    icon: Landmark,
    color: 'text-blue-600',
    items: [
      { label: 'Compare Loan Rates', href: '/compare-loans/', featured: true },
      { label: 'EMI Calculator', href: '/emi-calculator/' },
      { label: 'Home Loan', href: '/home-loan-calculator/' },
      { label: 'Car Loan', href: '/loans/car-loan/' },
      { label: 'Personal Loan', href: '/loans/personal-loan/' },
      { label: 'Education Loan', href: '/loans/education-loan/' },
    ],
  },
  {
    category: 'Investment',
    icon: TrendingUp,
    color: 'text-emerald-600',
    items: [
      { label: 'SIP Calculator', href: '/sip-calculator/' },
      { label: 'Lumpsum Calculator', href: '/lumpsum-calculator/' },
      { label: 'SWP Calculator', href: '/swp-calculator/' },
      { label: 'ELSS Calculator', href: '/elss-calculator/' },
      { label: 'FD Calculator', href: '/fd-calculator/' },
      { label: 'RD Calculator', href: '/rd-calculator/' },
      { label: 'PPF Calculator', href: '/ppf-calculator/' },
      { label: 'NSC Calculator', href: '/nsc-calculator/' },
      { label: 'CAGR Calculator', href: '/cagr-calculator/' },
      { label: 'Sukanya Samriddhi (SSY)', href: '/sukanya-samriddhi/' },
    ],
  },
  {
    category: 'Retirement',
    icon: PiggyBank,
    color: 'text-purple-600',
    items: [
      { label: 'Retirement Planner', href: '/retirement-calculator/' },
      { label: 'NPS Calculator', href: '/nps-calculator/' },
      { label: 'EPF Calculator', href: '/epf-calculator/' },
      { label: 'Gratuity Calculator', href: '/gratuity-calculator/' },
      { label: 'APY Calculator', href: '/apy-calculator/' },
      { label: 'FIRE Calculator', href: '/fire-calculator/' },
      { label: 'Goal Planning', href: '/goal-planning-calculator/' },
    ],
  },
  {
    category: 'Tax & Tools',
    icon: ShieldCheck,
    color: 'text-rose-600',
    items: [
      { label: 'Income Tax Calculator', href: '/income-tax-calculator/' },
      { label: 'HRA Calculator', href: '/hra-calculator/' },
      { label: 'GST Calculator', href: '/gst-calculator/' },
      { label: 'Credit Score', href: '/credit-score/' },
      { label: 'Inflation Calculator', href: '/inflation-calculator/' },
      { label: 'Simple Interest', href: '/simple-interest-calculator/' },
      { label: 'Compound Interest', href: '/compound-interest-calculator/' },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      role="banner"
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? 'bg-white/98 backdrop-blur-xl shadow-lg border-slate-200/80'
          : 'bg-white/95 backdrop-blur-md border-slate-100'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* LOGO - Enhanced with icon */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-xl font-bold tracking-tight text-slate-900 hover:text-emerald-600 transition-colors"
            aria-label="Fincado home"
          >
            <span className="relative">
              Fincado
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-emerald-600 to-emerald-500 group-hover:w-full transition-all duration-300" />
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <NavigationMenu className="hidden lg:flex" role="navigation">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    aria-current={isActive('/') ? 'page' : undefined}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive('/')
                        ? 'text-emerald-700 bg-emerald-50 shadow-sm'
                        : 'text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/70'
                    }`}
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/70 bg-transparent data-[state=open]:bg-emerald-50 data-[state=open]:text-emerald-700 data-[state=open]:shadow-sm rounded-lg transition-all">
                  Calculators
                </NavigationMenuTrigger>
                <NavigationMenuContent className="rounded-2xl bg-white shadow-2xl border border-slate-200/80 overflow-hidden">
                  <div className="grid w-237.5 grid-cols-4 gap-0 p-6">
                    {CALCULATOR_MENU.map((section) => {
                      const Icon = section.icon;
                      return (
                        <div
                          key={section.category}
                          className="p-4 hover:bg-slate-50/50 rounded-xl transition-colors"
                        >
                          <div
                            className={`mb-4 flex items-center gap-2.5 ${section.color}`}
                          >
                            <div
                              className={`w-8 h-8 rounded-lg bg-linear-to-br ${
                                section.color === 'text-blue-600'
                                  ? 'from-blue-50 to-blue-100'
                                  : section.color === 'text-emerald-600'
                                    ? 'from-emerald-50 to-emerald-100'
                                    : section.color === 'text-purple-600'
                                      ? 'from-purple-50 to-purple-100'
                                      : 'from-rose-50 to-rose-100'
                              } flex items-center justify-center`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider">
                              {section.category}
                            </span>
                          </div>
                          <ul className="space-y-2">
                            {section.items.map((item) => (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  className={`group flex items-center gap-2 text-sm font-medium transition-all duration-200 py-1 px-2 -mx-2 rounded-md hover:translate-x-0.5 ${
                                    item.featured
                                      ? 'text-emerald-600 font-bold hover:bg-emerald-50'
                                      : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50'
                                  }`}
                                >
                                  {item.featured && (
                                    <GitCompare className="w-3.5 h-3.5 shrink-0" />
                                  )}
                                  <span className="relative">
                                    {item.label}
                                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300" />
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                  {/* Bottom CTA Strip */}
                  <div className="bg-linear-to-r from-emerald-50 to-teal-50 border-t border-emerald-100 px-6 py-3 flex items-center justify-between">
                    <p className="text-xs text-slate-600 font-medium">
                      💡 All calculators are{' '}
                      <span className="text-emerald-700 font-semibold">
                        100% Free
                      </span>{' '}
                      and updated with latest rates
                    </p>
                    <Link
                      href="/calculators/"
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      View All Calculators
                      <ChevronDown className="w-3 h-3 -rotate-90" />
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/compare-loans/"
                    aria-current={
                      isActive('/compare-loans') ? 'page' : undefined
                    }
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 ${
                      isActive('/compare-loans')
                        ? 'text-emerald-700 bg-emerald-50 shadow-sm'
                        : 'text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/70'
                    }`}
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
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive('/guides')
                        ? 'text-emerald-700 bg-emerald-50 shadow-sm'
                        : 'text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/70'
                    }`}
                  >
                    Guides
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/hi/"
                    className="px-4 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                    lang="hi"
                    aria-label="Switch to Hindi calculators"
                  >
                    हिंदी
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA & MOBILE TRIGGER */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              className="hidden lg:inline-flex bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold shadow-lg shadow-emerald-600/30 hover:shadow-emerald-700/40 hover:scale-105 transition-all duration-200 rounded-lg"
            >
              <Link href="/emi-calculator/" className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                EMI Calculator
              </Link>
            </Button>

            {/* MOBILE MENU */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden hover:bg-slate-100 transition-colors rounded-lg"
                  aria-label="Toggle navigation menu"
                >
                  {mobileOpen ? (
                    <X className="h-6 w-6 text-slate-700" />
                  ) : (
                    <Menu className="h-6 w-6 text-slate-700" />
                  )}
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[320px] p-0 bg-white sm:max-w-sm"
              >
                <VisuallyHidden>
                  <SheetTitle>Navigation menu</SheetTitle>
                </VisuallyHidden>

                <div className="h-full overflow-y-auto">
                  {/* Mobile Header */}
                  <div className="sticky top-0 bg-linear-to-r from-emerald-600 to-emerald-700 px-6 py-4 z-10">
                    <Link
                      href="/"
                      className="flex items-center gap-2.5 text-xl font-bold text-white"
                      onClick={() => setMobileOpen(false)}
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm">
                        <Calculator className="w-4 h-4 text-white" />
                      </div>
                      Fincado
                    </Link>
                  </div>

                  <div className="px-6 py-6 space-y-6">
                    {/* Quick Links */}
                    <div className="space-y-1">
                      <Link
                        href="/"
                        onClick={() => setMobileOpen(false)}
                        className="block text-base font-semibold text-slate-900 hover:text-emerald-700 hover:bg-emerald-50 transition-colors py-2.5 px-3 rounded-lg"
                      >
                        🏠 Home
                      </Link>
                      <Link
                        href="/compare-loans/"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 text-base font-semibold text-slate-900 hover:text-emerald-700 hover:bg-emerald-50 transition-colors py-2.5 px-3 rounded-lg"
                      >
                        <GitCompare className="w-5 h-5" />
                        Compare Rates
                      </Link>
                      <Link
                        href="/guides/"
                        onClick={() => setMobileOpen(false)}
                        className="block text-base font-semibold text-slate-900 hover:text-emerald-700 hover:bg-emerald-50 transition-colors py-2.5 px-3 rounded-lg"
                      >
                        📚 Guides
                      </Link>
                      <Link
                        href="/hi/"
                        onClick={() => setMobileOpen(false)}
                        className="block text-base font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors py-2.5 px-3 rounded-lg"
                        lang="hi"
                      >
                        🇮🇳 हिंदी
                      </Link>
                    </div>

                    {/* Calculator Sections */}
                    {CALCULATOR_MENU.map((section, idx) => {
                      const Icon = section.icon;
                      return (
                        <Collapsible
                          key={section.category}
                          defaultOpen={idx === 0}
                          className="border-t border-slate-200 pt-4"
                        >
                          <CollapsibleTrigger className="flex w-full items-center justify-between text-left group hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                            <div
                              className={`flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider ${section.color}`}
                            >
                              <Icon className="w-4 h-4" />
                              {section.category}
                            </div>
                            <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="mt-3 space-y-1 pl-2">
                            {section.items.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={`block text-sm font-medium transition-colors py-2 px-3 rounded-lg ${
                                  item.featured
                                    ? 'text-emerald-600 font-bold hover:bg-emerald-50'
                                    : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
                                }`}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </CollapsibleContent>
                        </Collapsible>
                      );
                    })}

                    {/* Mobile CTA */}
                    <div className="pt-4 border-t border-slate-200 space-y-3">
                      <Button
                        asChild
                        className="w-full bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold shadow-lg rounded-lg h-12"
                      >
                        <Link
                          href="/emi-calculator/"
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center justify-center gap-2"
                        >
                          <Calculator className="w-5 h-5" />
                          EMI Calculator
                        </Link>
                      </Button>
                      <p className="text-xs text-center text-slate-500">
                        All calculators are free to use 🎉
                      </p>
                    </div>
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
