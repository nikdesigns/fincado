'use client';

import { useState } from 'react';
import { useAdBlocker } from '@/hooks/useAdBlocker';
import { X, HeartHandshake } from 'lucide-react';

export default function AdBlockDetector() {
  const isAdBlockEnabled = useAdBlocker();
  const [isClosed, setIsClosed] = useState(false);

  // REMOVED: The 'mounted' state check.
  // 'useAdBlocker' naturally handles the client-side check,
  // so we don't need to manually force a second render.

  // Don't render if:
  // 1. AdBlock not detected
  // 2. User manually closed it
  if (!isAdBlockEnabled || isClosed) return null;

  return (
    <div className="fixed bottom-4 right-4 z-100 w-full max-w-95 px-4 sm:px-0 no-print">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-5 relative overflow-hidden animate-in slide-in-from-bottom-8 fade-in duration-700">
        {/* Decorative Background Glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

        <div className="flex gap-4 relative z-10">
          {/* Icon Area */}
          <div className="shrink-0">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 ring-1 ring-emerald-100">
              <HeartHandshake className="w-6 h-6" />
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 pt-0.5">
            <h3 className="font-bold text-slate-900 text-sm mb-1">
              Support Free Tools
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              We rely on ads to keep these premium calculators free for
              everyone. Please consider whitelisting{' '}
              <strong className="text-emerald-600 font-semibold">
                Fincado
              </strong>
              .
            </p>

            <button
              onClick={() => setIsClosed(true)}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600 underline underline-offset-2 transition-colors"
            >
              I understand, close this
            </button>
          </div>

          {/* Top Right Close X */}
          <button
            onClick={() => setIsClosed(true)}
            className="absolute top-0 right-0 p-3 text-slate-300 hover:text-slate-500 transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
