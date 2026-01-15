'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GitCompare } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function StickyCompareFooter({
  bankName,
  bankSlug,
}: {
  bankName: string;
  bankSlug: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show only after scrolling down 300px so it doesn't block the header
      if (window.scrollY > 300) setShow(true);
      else setShow(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] lg:hidden no-print animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Don&apos;t overpay
          </p>
          <p className="text-xs font-semibold text-slate-800 line-clamp-1">
            Compare {bankName} vs Others
          </p>
        </div>
        <Button
          asChild
          size="sm"
          className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-100 h-9 px-4 rounded-lg"
        >
          <Link href={`/compare/${bankSlug}-vs-hdfc/`}>
            {' '}
            {/* Defaults to HDFC as competitor */}
            <GitCompare className="w-3.5 h-3.5 mr-2" />
            Compare
          </Link>
        </Button>
      </div>
    </div>
  );
}
