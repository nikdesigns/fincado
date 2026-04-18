import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

const TARGET = '/privacy-policy/';

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
