import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

const TARGET = '/loans/home-loan/';

export const metadata: Metadata = {
  title: 'Redirecting...',
  alternates: {
    canonical: `https://fincado.com${TARGET}`,
  },
  openGraph: {
    title: 'Redirecting...',
    description: 'Redirecting to the canonical page.',
    url: `https://fincado.com${TARGET}`,
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function EMIRedirectPage() {
  permanentRedirect(TARGET);
}
