import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

const TARGET = '/guides/home-loan-first-time-buyers/';

export const metadata: Metadata = {
  title: 'Redirecting...',
  alternates: {
    canonical: `https://fincado.com${TARGET}`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function HomeLoanRedirectPage() {
  permanentRedirect(TARGET);
}
