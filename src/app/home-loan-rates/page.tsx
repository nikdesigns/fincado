import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

const TARGET = '/compare-loans/';

export const metadata: Metadata = {
  title: 'Redirecting...',
  description: 'Redirecting to the latest home loan comparison page.',
  alternates: {
    canonical: `https://fincado.com${TARGET}`,
  },
  openGraph: {
    title: 'Redirecting...',
    description: 'Redirecting to the latest home loan comparison page.',
    url: `https://fincado.com${TARGET}`,
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function HomeLoanRatesRedirectPage() {
  permanentRedirect(TARGET);
}
