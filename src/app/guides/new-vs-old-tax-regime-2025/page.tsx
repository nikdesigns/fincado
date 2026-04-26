import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

const TARGET = '/guides/new-vs-old-tax-regime-2026/';

export const metadata: Metadata = {
  title: 'Redirecting...',
  description: 'Redirecting to the latest tax regime guide.',
  alternates: {
    canonical: `https://fincado.com${TARGET}`,
  },
  openGraph: {
    title: 'Redirecting...',
    description: 'Redirecting to the latest tax regime guide.',
    url: `https://fincado.com${TARGET}`,
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function TaxRegime2025Redirect() {
  permanentRedirect(TARGET);
}
