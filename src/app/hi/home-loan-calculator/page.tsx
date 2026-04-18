import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

const TARGET = '/hi/loans/home-loan/';

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

export default function RedirectPage() {
  permanentRedirect(TARGET);
}
