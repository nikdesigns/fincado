// src/components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getUnionBudgetText } from '@/lib/fiscalYear';
import {
  Calculator,
  TrendingUp,
  PiggyBank,
  FileText,
  Mail,
  ShieldCheck,
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="border-t bg-linear-to-b from-slate-50 to-slate-100 text-slate-700 no-print"
    >
      {/* MAIN FOOTER */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-7">
          {/* BRAND */}
          <div className="lg:col-span-2 md:col-span-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xl font-semibold text-slate-900 hover:text-[#74A046] transition-colors"
            >
              Fincado
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed font-medium text-slate-600">
              India&apos;s most comprehensive financial planning platform.
              Bank-grade calculators for Loans, Investments, Retirement, and Tax
              Planning — all 100% free.
            </p>

            {/* KEY FEATURES */}
            <div className="mt-5 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D0F4A9] text-[#111827]">
                  ✓
                </span>
                <span>Updated with latest rates & regulations</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D0F4A9] text-[#111827]">
                  ✓
                </span>
                <span>40+ Financial Calculators</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D0F4A9] text-[#111827]">
                  ✓
                </span>
                <span>Available in Hindi & English</span>
              </div>
            </div>

            {/* SOCIAL */}
            <div className="mt-6 flex items-center gap-3">
              <Link
                href="/contact/"
                aria-label="Contact us"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 shadow-sm transition hover:bg-[#F7FDF1] hover:text-[#577A30] hover:border-[#DFF7C6]"
              >
                <Mail className="w-4 h-4" />
              </Link>
            </div>

            {/* TRUST BADGES */}
            <div className="mt-6 flex flex-wrap gap-3 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-slate-200">
                🔒 SSL Secured
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-slate-200">
                <Image
                  src="/images/india.svg"
                  alt="India flag"
                  width={20}
                  height={20}
                  className="object-contain"
                />
                Made for India
              </span>
            </div>
          </div>

          {/* LOANS & EMI */}
          <FooterColumn title="Loans" icon={Calculator}>
            <FooterLink href="/compare-loans/" highlight>
              Compare Loan Rates
            </FooterLink>
            <FooterLink href="/emi-calculator/">EMI Calculator</FooterLink>
            <FooterLink href="/emi-prepayment-calculator/">
              EMI Prepayment
            </FooterLink>
            <FooterLink href="/home-loan-calculator/">Home Loan</FooterLink>
            <FooterLink href="/loans/personal-loan/">Personal Loan</FooterLink>
            <FooterLink href="/loans/car-loan/">Car Loan</FooterLink>
            <FooterLink href="/loans/education-loan/">
              Education Loan
            </FooterLink>
            <FooterLink href="/credit-score/">Credit Score</FooterLink>
          </FooterColumn>

          {/* INVESTMENTS */}
          <FooterColumn title="Investments" icon={TrendingUp}>
            <FooterLink href="/sip-calculator/">SIP Calculator</FooterLink>
            <FooterLink href="/lumpsum-calculator/">
              Lumpsum Calculator
            </FooterLink>
            <FooterLink href="/swp-calculator/">SWP Calculator</FooterLink>
            <FooterLink href="/elss-calculator/">ELSS Calculator</FooterLink>
            <FooterLink href="/fd-calculator/">FD Calculator</FooterLink>
            <FooterLink href="/rd-calculator/">RD Calculator</FooterLink>
            <FooterLink href="/ppf-calculator/">PPF Calculator</FooterLink>
            <FooterLink href="/pomis-calculator/">POMIS Calculator</FooterLink>
            <FooterLink href="/nsc-calculator/">NSC Calculator</FooterLink>
            <FooterLink href="/kvp-calculator/">KVP Calculator</FooterLink>
            <FooterLink href="/cagr-calculator/">CAGR Calculator</FooterLink>
            <FooterLink href="/sukanya-samriddhi/">SSY Calculator</FooterLink>
          </FooterColumn>

          {/* RETIREMENT */}
          <FooterColumn title="Retirement" icon={PiggyBank}>
            <FooterLink href="/retirement-calculator/">
              Retirement Planner
            </FooterLink>
            <FooterLink href="/scss-calculator/">SCSS Calculator</FooterLink>
            <FooterLink href="/nps-calculator/">NPS Calculator</FooterLink>
            <FooterLink href="/epf-calculator/">EPF Calculator</FooterLink>
            <FooterLink href="/gratuity-calculator/">
              Gratuity Calculator
            </FooterLink>
            <FooterLink href="/apy-calculator/">APY Calculator</FooterLink>
            <FooterLink href="/fire-calculator/">FIRE Calculator</FooterLink>
            <FooterLink href="/goal-planning-calculator/">
              Goal Planning
            </FooterLink>
          </FooterColumn>

          {/* TAX & TOOLS */}
          <FooterColumn title="Tax & Tools" icon={ShieldCheck}>
            <FooterLink href="/income-tax-calculator/">
              Income Tax Calculator
            </FooterLink>
            <FooterLink href="/salary-calculator/">
              Salary Calculator
            </FooterLink>
            <FooterLink href="/capital-gains-calculator/">
              Capital Gains Tax
            </FooterLink>
            <FooterLink href="/brokerage-calculator/">
              Brokerage Calculator
            </FooterLink>
            <FooterLink href="/hra-calculator/">HRA Calculator</FooterLink>
            <FooterLink href="/rent-receipt-generator/">
              Rent Receipt Generator
            </FooterLink>
            <FooterLink href="/gst-calculator/">GST Calculator</FooterLink>
            <FooterLink href="/inflation-calculator/">
              Inflation Calculator
            </FooterLink>
          </FooterColumn>

          {/* RESOURCES */}
          <FooterColumn title="Resources" icon={FileText}>
            <FooterLink href="/guides/">Financial Guides</FooterLink>
            <FooterLink href="/calculators/">All Calculators</FooterLink>
            <FooterLink href="/hi/">हिंदी में</FooterLink>
            <FooterLink href="/about/">About Us</FooterLink>
            <FooterLink href="/editorial-guidelines/">
              Editorial Guidelines
            </FooterLink>
            <FooterLink href="/contact/">Contact Support</FooterLink>
            <FooterLink href="/privacy-policy/">Privacy Policy</FooterLink>
            <FooterLink href="/terms/">Terms of Use</FooterLink>
            <FooterLink href="/disclaimer/">Disclaimer</FooterLink>
          </FooterColumn>
        </div>

        {/* POPULAR SEARCHES */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-900">
            Popular Calculators
          </h4>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'EMI Calculator', href: '/emi-calculator/' },
              { label: 'SIP Calculator', href: '/sip-calculator/' },
              { label: 'Income Tax', href: '/income-tax-calculator/' },
              { label: 'Salary Calculator', href: '/salary-calculator/' },
              { label: 'EMI Prepayment', href: '/emi-prepayment-calculator/' },
              { label: 'SCSS Calculator', href: '/scss-calculator/' },
              { label: 'PPF Calculator', href: '/ppf-calculator/' },
              { label: 'Home Loan', href: '/home-loan-calculator/' },
              { label: 'KVP Calculator', href: '/kvp-calculator/' },
              { label: 'Capital Gains', href: '/capital-gains-calculator/' },
              { label: 'FD Calculator', href: '/fd-calculator/' },
              { label: 'Rent Receipt', href: '/rent-receipt-generator/' },
            ].map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-white rounded-full border border-slate-200 hover:bg-[#F7FDF1] hover:text-[#577A30] hover:border-[#DFF7C6] transition-all"
              >
                {calc.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
            {/* COPYRIGHT */}
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-900">
                © {currentYear} Fincado. All rights reserved.
              </p>
              <p className="text-xs text-slate-500 font-medium">
                Updated as per {getUnionBudgetText()} norms.
              </p>
            </div>

            {/* DISCLAIMER */}
            <div className="max-w-2xl">
              <p className="text-xs leading-relaxed text-slate-500 font-medium">
                <strong className="text-slate-700">Disclaimer:</strong> Fincado
                provides financial calculators and educational content for
                informational purposes only. We are not SEBI registered
                investment advisors. Always consult a certified financial
                planner before making investment or loan decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- HELPERS ---------- */

function FooterColumn({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2 font-medium">
        <Icon className="w-4 h-4 text-[#577A30]" />
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900">
          {title}
        </h4>
      </div>
      <ul className="space-y-2.5 font-medium">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  highlight = false,
}: {
  href: string;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        className={`text-sm transition-colors hover:text-[#577A30] inline-flex items-center gap-1 group ${
          highlight
            ? 'font-semibold text-[#577A30]'
            : 'text-slate-600 hover:translate-x-0.5'
        }`}
      >
        {children}
        {highlight && (
          <span className="text-xs bg-[#EFFBE2] text-[#577A30] px-1.5 py-0.5 rounded font-bold">
            NEW
          </span>
        )}
      </Link>
    </li>
  );
}
