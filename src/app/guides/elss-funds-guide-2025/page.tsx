import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

const TARGET = '/guides/elss-funds-guide-2026/';

export const metadata: Metadata = {
  title: 'Redirecting...',
  description: 'Redirecting to the latest ELSS guide.',
  alternates: {
    canonical: `https://fincado.com${TARGET}`,
  },
  openGraph: {
    title: 'Redirecting...',
    description: 'Redirecting to the latest ELSS guide.',
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

export default function ElssGuide2025Redirect() {
  permanentRedirect(TARGET);
}
