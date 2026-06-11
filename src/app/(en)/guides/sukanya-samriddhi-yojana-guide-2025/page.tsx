import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

const TARGET = '/guides/sukanya-samriddhi-yojana-guide-2026/';

export const metadata: Metadata = {
  title: 'Redirecting...',
  description: 'Redirecting to the latest SSY guide.',
  alternates: {
    canonical: `https://fincado.com${TARGET}`,
  },
  openGraph: {
    title: 'Redirecting...',
    description: 'Redirecting to the latest SSY guide.',
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

export default function SsyGuide2025Redirect() {
  permanentRedirect(TARGET);
}
