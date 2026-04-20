import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

const TARGET = '/hi/mutual-funds/';

export const metadata: Metadata = {
  title: 'Redirecting...',
  alternates: {
    canonical: `https://fincado.com${TARGET}`,
  },
  openGraph: {
    title: 'Redirecting...',
    description: 'Redirecting to the canonical Hindi investing page.',
    url: `https://fincado.com${TARGET}`,
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function HindiInvestingRedirectPage() {
  permanentRedirect(TARGET);
}

