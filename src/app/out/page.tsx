import { Suspense } from 'react';
import OutClient from './OutClient';

export const dynamic = 'force-static';

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
