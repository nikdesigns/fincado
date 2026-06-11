import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

const TARGET = '/guides/gst-guide/';

export const metadata: Metadata = {
  title: 'Redirecting...',
  alternates: {
    canonical: `https://fincado.com${TARGET}`,
  },
  openGraph: {
    title: 'Redirecting...',
    description: 'Redirecting to the canonical GST guide.',
    url: `https://fincado.com${TARGET}`,
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function GSTExplainedRedirect() {
  permanentRedirect(TARGET);
}
