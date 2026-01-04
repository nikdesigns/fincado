'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

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
      { label: 'EMI Calculator', href: '/emi-calculator/' },
      { label: 'Home Loan', href: '/loans/home-loan/' },
      { label: 'Car Loan', href: '/loans/car-loan/' },
      { label: 'Personal Loan', href: '/loans/personal-loan/' },
      { label: 'Education Loan', href: '/loans/education-loan/' },
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
      { label: 'Sukanya Samriddhi (SSY)', href: '/sukanya-samriddhi/' },
    ],
  },
  {
    category: 'Retirement',
    items: [
      { label: 'Retirement Planner', href: '/retirement-calculator/' },
      { label: 'EPF Calculator', href: '/epf-calculator/' },
      { label: 'APY Calculator', href: '/apy-calculator/' },
      { label: 'Gratuity Calculator', href: '/gratuity-calculator/' },
      { label: 'FIRE Calculator', href: '/fire-calculator/' },
    ],
  },
  {
    category: 'Tools & Tax',
    items: [
      { label: 'Income Tax Calculator', href: '/income-tax-calculator/' },
      { label: 'Credit Score', href: '/credit-score/' },
      { label: 'GST Calculator', href: '/gst-calculator/' },
      { label: 'Inflation Calculator', href: '/inflation-calculator/' },
      { label: 'Simple Interest', href: '/simple-interest-calculator/' },
      { label: 'Compound Interest', href: '/compound-interest-calculator/' },
      { label: 'All Calculators', href: '/calculators/' },
    ],
  },
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
      className={`sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur ${
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

          {/* DESKTOP NAV — NEXT TO LOGO */}
          <NavigationMenu className="hidden lg:flex ml-16">
            <NavigationMenuList className="gap-4">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className={`text-sm font-medium ${
                      isActive('/') ? 'text-emerald-700' : 'text-slate-700'
                    }`}
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Calculators</NavigationMenuTrigger>

                <NavigationMenuContent className="rounded-xl bg-white shadow-xl">
                  <div className="grid w-240 grid-cols-4 gap-6 p-6">
                    {CALCULATOR_MENU.map((section) => (
                      <div key={section.category}>
                        <div className="mb-3 text-sm font-semibold text-slate-900">
                          {section.category}
                        </div>
                        <ul className="space-y-2">
                          {section.items.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                className="block text-sm font-medium text-slate-600 hover:text-slate-900"
                              >
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
                    href="/guides/"
                    className={`text-sm font-medium ${
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
                    className="text-sm font-semibold text-rose-600"
                  >
                    हिंदी
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* ACTIONS */}
          <div className="ml-auto flex items-center gap-3">
            <Button asChild className="hidden lg:inline-flex">
              <Link href="/emi-calculator/">EMI Calculator</Link>
            </Button>

            {/* MOBILE MENU */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  ☰
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[320px] p-0 bg-white">
                <VisuallyHidden>
                  <SheetTitle>Mobile navigation</SheetTitle>
                </VisuallyHidden>

                <div className="h-full overflow-y-auto px-5 py-6 space-y-6">
                  <Link href="/" className="block text-base font-semibold">
                    Home
                  </Link>

                  <Link
                    href="/hi/"
                    className="block text-base font-semibold text-rose-600"
                  >
                    हिंदी (Hindi Calculators)
                  </Link>

                  {CALCULATOR_MENU.map((section) => (
                    <div key={section.category}>
                      <div className="mb-2 text-xs font-semibold uppercase text-slate-500">
                        {section.category}
                      </div>
                      <div className="space-y-3">
                        {section.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block text-sm text-slate-700"
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
