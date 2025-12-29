// src/components/AdBlockDetector.tsx
'use client';

import { useState } from 'react';
import { useAdBlocker } from '@/hooks/useAdBlocker';

export default function AdBlockDetector() {
  const isAdBlockEnabled = useAdBlocker();
  const [isClosed, setIsClosed] = useState(false);

  // If no adblock detected OR user closed the popup, show nothing
  if (!isAdBlockEnabled || isClosed) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-fade-in-up no-print">
      <div className="bg-white border-l-4 border-red-500 shadow-xl rounded-lg p-4 relative">
        <button
          onClick={() => setIsClosed(true)}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          ✕
        </button>
        <div className="flex items-start">
          <div className="flex-shrink-0 text-2xl mr-3">❤️</div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm">
              Please Support Fincado
            </h3>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              We rely on ads to keep these premium calculators free. Please
              consider disabling your ad blocker.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
