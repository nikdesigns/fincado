// src/components/AdBlockDetector.tsx
'use client';

import { useEffect, useState } from 'react';

export default function AdBlockDetector() {
  const [isAdBlockEnabled, setIsAdBlockEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Create "bait" element
    const bait = document.createElement('div');
    bait.setAttribute(
      'class',
      'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links'
    );
    bait.setAttribute(
      'style',
      'width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;'
    );
    document.body.appendChild(bait);

    // 2. Wrap check in setTimeout to avoid "setState in Effect" warning
    // and give AdBlockers time to act.
    const timer = setTimeout(() => {
      if (
        bait.offsetParent === null ||
        bait.offsetHeight === 0 ||
        bait.offsetLeft === 0 ||
        bait.offsetTop === 0 ||
        bait.offsetWidth === 0 ||
        bait.clientHeight === 0 ||
        bait.clientWidth === 0
      ) {
        setIsAdBlockEnabled(true);
        setIsVisible(true);
      }

      // 3. Clean up the DOM element
      if (document.body.contains(bait)) {
        document.body.removeChild(bait);
      }
    }, 500); // 500ms delay

    return () => {
      clearTimeout(timer);
      if (document.body.contains(bait)) {
        document.body.removeChild(bait);
      }
    };
  }, []);

  if (!isAdBlockEnabled || !isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-fade-in-up no-print">
      <div className="bg-white border-l-4 border-red-500 shadow-xl rounded-lg p-4 relative">
        <button
          onClick={() => setIsVisible(false)}
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
              consider disabling your ad blocker for our site.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
