import Link from 'next/link';
import type { ReactNode } from 'react';
import { CalendarDays, ShieldCheck } from 'lucide-react';

type TocItem = {
  id: string;
  label: string;
};

type PolicyShellProps = {
  title: string;
  subtitle: string;
  lastUpdated: string;
  toc: TocItem[];
  children: ReactNode;
};

const TRUST_CENTER_LINKS = [
  { href: '/privacy-policy/', label: 'Privacy Policy' },
  { href: '/terms/', label: 'Terms of Use' },
  { href: '/disclaimer/', label: 'Disclaimer' },
  { href: '/editorial-guidelines/', label: 'Editorial Guidelines' },
  { href: '/faq/', label: 'FAQ' },
  { href: '/contact/', label: 'Contact Support' },
];

export default function PolicyShell({
  title,
  subtitle,
  lastUpdated,
  toc,
  children,
}: PolicyShellProps) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <header className="mb-8 rounded-2xl border border-slate-200 bg-linear-to-br from-brand-50/70 to-white p-6 shadow-sm lg:p-8">
        <div className="mb-3 inline-flex items-center rounded-full border border-brand-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-700">
          Trust Center
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 lg:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 lg:text-base">
          {subtitle}
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600">
          <CalendarDays className="h-3.5 w-3.5 text-brand-700" />
          Last updated: <span className="font-semibold text-slate-800">{lastUpdated}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-4 lg:sticky lg:top-24 lg:h-max">
          <nav
            aria-label="Table of contents"
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
              On This Page
            </div>
            <ul className="space-y-1.5">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="block rounded-md px-2 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-800"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-700" />
              Related Policies
            </div>
            <ul className="space-y-1.5">
              {TRUST_CENTER_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-md px-2 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-800"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <article className="space-y-4">{children}</article>
      </div>
    </main>
  );
}
