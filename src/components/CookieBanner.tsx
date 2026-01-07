'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has already accepted
    const consent = localStorage.getItem('fincado_cookie_consent');

    // Add a small delay so it doesn't jar the user immediately upon load
    if (!consent) {
      const timer = setTimeout(() => {
        setShow(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('fincado_cookie_consent', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-100 flex justify-center no-print">
      <div className="max-w-4xl w-full bg-slate-900/95 backdrop-blur-md text-white p-5 rounded-2xl shadow-2xl border border-slate-700/50 flex flex-col sm:flex-row items-center gap-5 sm:gap-8 animate-in slide-in-from-bottom-10 fade-in duration-700">
        {/* Icon & Content */}
        <div className="flex items-start gap-4 flex-1">
          <div className="p-3 bg-slate-800 rounded-xl shrink-0 text-emerald-400 hidden sm:block">
            <Cookie className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-base flex items-center gap-2 sm:block">
              <Cookie className="w-5 h-5 text-emerald-400 sm:hidden" />
              We value your privacy
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              We use cookies to enhance your browsing experience and analyze our
              traffic. By continuing to use our site, you accept our{' '}
              <Link
                href="/privacy-policy"
                className="text-white underline decoration-emerald-500 underline-offset-4 hover:text-emerald-400 transition-colors font-medium"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full sm:w-auto shrink-0">
          <Button
            onClick={accept}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-5 rounded-xl transition-all shadow-lg hover:shadow-emerald-900/20"
          >
            Accept Cookies
          </Button>
        </div>
      </div>
    </div>
  );
}
