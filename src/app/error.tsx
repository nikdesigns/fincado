'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Home, RefreshCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      {/* Icon */}
      <div className="mb-6 rounded-full bg-red-50 p-6 ring-1 ring-red-100 shadow-sm animate-in zoom-in-50 duration-300">
        <AlertTriangle className="h-12 w-12 text-red-500" />
      </div>

      {/* Text Content */}
      <h2 className="mb-3 text-3xl font-extrabold text-slate-900 tracking-tight">
        Something went wrong!
      </h2>

      <p className="mb-8 max-w-md text-slate-600 leading-relaxed text-lg">
        Don&apos;t worry, it&apos;s not you - it&apos;s us. We encountered an
        unexpected error while processing your request.
      </p>

      {/* Error Details (Optional - helpful for dev) */}
      <div className="mb-8 max-w-lg overflow-hidden rounded-lg bg-slate-100 p-4 text-left text-xs font-mono text-slate-500 border border-slate-200">
        <p className="font-bold text-slate-700 mb-1">Error Digest:</p>
        <p className="break-all">
          {error.digest || error.message || 'Unknown error'}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={() => reset()}
          size="lg"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 shadow-md hover:shadow-lg transition-all"
        >
          <RefreshCcw className="w-4 h-4" />
          Try Again
        </Button>

        <Link href="/">
          <Button
            variant="outline"
            size="lg"
            className="border-slate-300 text-slate-700 hover:bg-slate-50 gap-2 font-semibold"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </main>
  );
}
