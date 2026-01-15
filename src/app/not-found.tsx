import Link from 'next/link';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileQuestion, Calculator, TrendingUp, Home } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found | Fincado',
  description:
    'The page you are looking for does not exist. Use our free financial calculators.',
};

export default function NotFound() {
  return (
    <main className="container mx-auto flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center">
      {/* Icon */}
      <div className="bg-slate-50 p-6 rounded-full mb-6 ring-1 ring-slate-100 shadow-sm">
        <FileQuestion className="w-16 h-16 text-slate-400" />
      </div>

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
        Page Not Found
      </h1>

      {/* Description */}
      <p className="text-lg text-slate-600 mb-10 max-w-md leading-relaxed">
        Oops! We couldn&apos;t find the page you were looking for. However, we
        can still help you plan your finances.
      </p>

      {/* Quick Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mb-10">
        <Link href="/emi-calculator/" className="group">
          <Card className="hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer h-full border-slate-200">
            <CardContent className="p-4 flex items-center justify-center gap-3">
              <div className="p-2 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                <Calculator className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="font-bold text-slate-700 group-hover:text-emerald-700 transition-colors">
                EMI Calculator
              </span>
            </CardContent>
          </Card>
        </Link>

        <Link href="/sip-calculator/" className="group">
          <Card className="hover:border-blue-400 hover:shadow-md transition-all cursor-pointer h-full border-slate-200">
            <CardContent className="p-4 flex items-center justify-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-bold text-slate-700 group-hover:text-blue-700 transition-colors">
                SIP Calculator
              </span>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Home Button */}
      <Link href="/">
        <Button
          size="lg"
          className="bg-slate-900 hover:bg-slate-800 text-white font-semibold gap-2"
        >
          <Home className="w-4 h-4" />
          Go to Homepage
        </Button>
      </Link>
    </main>
  );
}
