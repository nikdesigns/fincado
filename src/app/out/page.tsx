import { Suspense } from 'react';
import type { Metadata } from 'next';
import OutClient from './OutClient';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Redirecting...',
  description: 'Redirecting to the selected lender website.',
  alternates: {
    canonical: 'https://fincado.com/out/',
  },
  openGraph: {
    title: 'Redirecting...',
    description: 'Redirecting to the selected lender website.',
    url: 'https://fincado.com/out/',
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function OutPage() {
  return (
    <Suspense fallback={<RedirectFallback />}>
      <OutClient />
    </Suspense>
  );
}

function RedirectFallback() {
  return (
    <main style={{ padding: '80px 20px', textAlign: 'center' }}>
      <h1>Redirecting…</h1>
      <p>Please wait while we take you to the lender website.</p>
    </main>
  );
}
