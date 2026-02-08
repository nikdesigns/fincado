'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GitCompare, Menu } from 'lucide-react';

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

const CALCULATOR_MENU = [
  {
    category: 'Loans',
    items: [
      { label: 'Compare Loan Rates', href: '/compare-loans/' },
      { label: 'EMI Calculator', href: '/emi-calculator/' },
      { label: 'Home Loan', href: '/loans/home-loan/' },
      { label: 'Car Loan', href: '/loans/car-loan/' },
      { label: 'Personal Loan', href: '/loans/personal-loan/' },
      { label: 'Education Loan', href: '/loans/education-loan/' }
    ],
  },
  {
    category: 'Investment',
    items: [
      { label: 'SIP Calculator', href: '/sip-calculator/' },
      { label: 'ELSS Calculator', href: '/elss-calculator/' },
      { label: 'FD Calculator', href: '/fd-calculator/' },
      { label: 'RD Calculator', href: '/rd-calculator/' },
      { label: 'PPF Calculator', href: '/ppf-calculator/' },
      { label: 'Lumpsum Calculator', href: '/lumpsum-calculator/' },
      { label: 'SWP Calculator', href: '/swp-calculator/' },
      { label: 'Sukanya Samriddhi (SSY)', href: '/sukanya-samriddhi/' }
    ],
  },
  {
    category: 'Retirement',
    items: [
      { label: 'Retirement Planner', href: '/retirement-calculator/' },
      { label: 'NPS Calculator', href: '/nps-calculator/' }, // ✅ Added
      { label: 'EPF Calculator', href: '/epf-calculator/' },
      { label: 'Gratuity Calculator', href: '/gratuity-calculator/' },
      { label: 'APY Calculator', href: '/apy-calculator/' },
      { label: 'FIRE Calculator', href: '/fire-calculator/' }
    ],
  },
  {
    category: 'Tax & Tools',
    items: [
      { label: 'Income Tax Calculator', href: '/income-tax-calculator/' },
      { label: 'HRA Calculator', href: '/hra-calculator/' }, // ✅ Added
      { label: 'GST Calculator', href: '/gst-calculator/' },
      { label: 'Credit Score', href: '/credit-score/' },
      { label: 'Inflation Calculator', href: '/inflation-calculator/' },
      { label: 'Simple Interest', href: '/simple-interest-calculator/' },
      { label: 'Compound Interest', href: '/compound-interest-calculator/' }
    ],
  }
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur transition-all duration-200 ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="mx-auto max-w-300 px-4">
        <div className="flex h-16 items-center gap-8">
          {/* LOGO */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-slate-900"
          >
            Fincado
          </Link>

          {/* DESKTOP NAV */}
          <NavigationMenu className="hidden lg:flex ml-16">
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className={`px-4 py-2 text-sm font-medium transition-colors hover:text-emerald-700 ${
                      isActive('/') ? 'text-emerald-700' : 'text-slate-700'
                    }`}
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-slate-700 hover:text-emerald-700 bg-transparent">
                  Calculators
                </NavigationMenuTrigger>
                <NavigationMenuContent className="rounded-xl bg-white shadow-xl border border-slate-100">
                  <div className="grid w-200 grid-cols-4 gap-6 p-6">
                    {CALCULATOR_MENU.map((section) => (
                      <div key={section.category}>
                        <div className="mb-3 text-sm font-bold text-slate-900 uppercase tracking-wider">
                          {section.category}
                        </div>
                        <ul className="space-y-2">
                          {section.items.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                className={`block text-sm font-medium transition-colors hover:text-emerald-700 ${
                                  item.href === '/compare-loans/'
                                    ? 'text-lime-600 font-bold flex items-center gap-2'
                                    : 'text-slate-600'
                                }`}
                              >
                                {item.href === '/compare-loans/' && (
                                  <GitCompare className="w-3 h-3" />
                                )}
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/compare-loans/"
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      isActive('/compare-loans')
                        ? 'text-lime-600'
                        : 'text-slate-700 hover:text-lime-600'
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
                    className={`px-4 py-2 text-sm font-medium transition-colors hover:text-emerald-700 ${
                      isActive('/guides')
                        ? 'text-emerald-700'
                        : 'text-slate-700'
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
                    className="px-4 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                  >
                    हिंदी
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* ACTIONS */}
          <div className="ml-auto flex items-center gap-3">
            <Button
              asChild
              className="hidden lg:inline-flex bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
            >
              <Link href="/emi-calculator/">EMI Calculator</Link>
            </Button>

            {/* MOBILE MENU */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6 text-slate-700" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[320px] p-0 bg-white sm:max-w-xs"
              >
                <VisuallyHidden>
                  <SheetTitle>Mobile navigation</SheetTitle>
                </VisuallyHidden>

                <div className="h-full overflow-y-auto px-5 py-6 space-y-8">
                  <div className="space-y-4">
                    <Link
                      href="/"
                      className="block text-lg font-bold text-slate-900"
                    >
                      Home
                    </Link>
                    <Link
                      href="/compare-loans/"
                      className="block text-lg font-bold text-lime-600 items-center gap-2"
                    >
                      <GitCompare className="w-5 h-5" /> Compare Rates
                    </Link>
                    <Link
                      href="/hi/"
                      className="block text-lg font-bold text-rose-600"
                    >
                      हिंदी (Hindi Calculators)
                    </Link>
                  </div>

                  {CALCULATOR_MENU.map((section) => (
                    <div
                      key={section.category}
                      className="border-t border-slate-100 pt-6"
                    >
                      <div className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                        {section.category}
                      </div>
                      <div className="space-y-3">
                        {section.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`block text-sm font-medium ${
                              item.href === '/compare-loans/'
                                ? 'text-lime-600 font-bold'
                                : 'text-slate-600'
                            }`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
