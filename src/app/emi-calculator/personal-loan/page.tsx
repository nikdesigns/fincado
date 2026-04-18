import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

const TARGET = '/loans/personal-loan/';

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

export default function EMIRedirectPage() {
  permanentRedirect(TARGET);
}
