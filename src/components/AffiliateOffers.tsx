import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getAffiliateOffers, type AffiliateTopic } from '@/lib/affiliates';

interface AffiliateOffersProps {
  topic: AffiliateTopic;
  title?: string;
  limit?: number;
  className?: string;
}

/**
 * Partner offer cards placed right after a calculator result, where intent
 * is highest. Renders nothing until a tracking link is set in lib/affiliates.ts.
 */
export default function AffiliateOffers({
  topic,
  title = 'Next step',
  limit = 2,
  className = '',
}: AffiliateOffersProps) {
  const offers = getAffiliateOffers(topic, limit);
  if (offers.length === 0) return null;

  return (
    <aside
      aria-label="Partner offers"
      className={`rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 ${className}`}
    >
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        <span className="text-xs text-slate-500">Partner offers</span>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {offers.map((o) => (
          <li key={o.id}>
            <a
              href={o.url}
              target="_blank"
              rel="sponsored nofollow noopener"
              data-affiliate={o.id}
              className="group flex h-full flex-col rounded-xl border border-slate-200 p-4 transition-colors hover:border-brand-500"
            >
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {o.partner}
              </span>
              <span className="mt-1 font-semibold text-slate-900">{o.headline}</span>
              <span className="mt-1 flex-1 text-sm text-slate-600">{o.blurb}</span>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 group-hover:underline">
                {o.cta}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-slate-500">
        Fincado may earn a commission if you sign up through these links, at no extra cost
        to you. It never changes our calculations.{' '}
        <Link href="/disclaimer/#ads-affiliates" className="underline">
          Learn more
        </Link>
      </p>
    </aside>
  );
}
