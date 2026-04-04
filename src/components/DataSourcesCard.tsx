import Link from 'next/link';

interface DataSourcesCardProps {
  bankName?: string;
  bankRateUrl?: string;
  updatedAt?: string;
}

export default function DataSourcesCard({
  bankName,
  bankRateUrl,
  updatedAt,
}: DataSourcesCardProps) {
  return (
    <section className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <h3 className="text-base font-semibold text-slate-900 mb-2">
        Data Sources & Methodology
      </h3>

      <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
        <li>
          RBI reference rates / policy context:{' '}
          <Link
            href="https://www.rbi.org.in/"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            rbi.org.in
          </Link>
        </li>
        {bankName && bankRateUrl && (
          <li>
            {bankName} official rate page:{' '}
            <Link
              href={bankRateUrl}
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              View source
            </Link>
          </li>
        )}
        <li>
          Last tracked update: <strong>{updatedAt || 'N/A'}</strong>
        </li>
      </ul>

      <p className="mt-3 text-xs text-slate-500">
        Rates are indicative and vary by borrower profile, LTV, and lender
        policy.
      </p>
    </section>
  );
}
