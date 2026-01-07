'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ChevronDown,
  ChevronUp,
  Zap,
  ArrowRight,
  LayoutGrid,
} from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you have a standard cn utility

export default function TaxRegimeWidget() {
  const pathname = usePathname();
  const [showAll, setShowAll] = useState(false);

  const salaries = [
    {
      label: '₹6 Lakh Salary',
      url: '/guides/tax-on-6-lakh-salary',
      badge: 'Zero Tax',
      badgeVariant: 'success', // Custom variant logic below
    },
    {
      label: '₹7.5 Lakh Salary',
      url: '/guides/tax-on-7-5-lakh-salary',
      badge: 'Zero Tax',
      badgeVariant: 'success',
    },
    {
      label: '₹8 Lakh Salary',
      url: '/guides/tax-on-8-lakh-salary',
      badge: 'Trap',
      badgeVariant: 'warning',
    },
    { label: '₹9 Lakh Salary', url: '/guides/tax-on-9-lakh-salary' },
    { label: '₹10 Lakh Salary', url: '/guides/tax-on-10-lakh-salary' },
    { label: '₹12 Lakh Salary', url: '/guides/tax-on-12-lakh-salary' },
    { label: '₹15 Lakh Salary', url: '/guides/tax-on-15-lakh-salary' },
    { label: '₹20 Lakh Salary', url: '/guides/tax-on-20-lakh-salary' },
    // Hidden by default items
    { label: '₹11 Lakh Salary', url: '/guides/tax-on-11-lakh-salary' },
    { label: '₹14 Lakh Salary', url: '/guides/tax-on-14-lakh-salary' },
    { label: '₹16 Lakh Salary', url: '/guides/tax-on-16-lakh-salary' },
    { label: '₹18 Lakh Salary', url: '/guides/tax-on-18-lakh-salary' },
    {
      label: '₹25 Lakh Salary',
      url: '/guides/tax-on-25-lakh-salary',
      badge: 'High',
      badgeVariant: 'info',
    },
    {
      label: '₹30 Lakh Salary',
      url: '/guides/tax-on-30-lakh-salary',
      badge: 'High',
      badgeVariant: 'info',
    },
  ];

  const visibleSalaries = showAll ? salaries : salaries.slice(0, 8);

  // Helper for Badge Styles
  const getBadgeStyles = (variant?: string) => {
    switch (variant) {
      case 'success':
        return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200';
      case 'warning':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200';
      case 'info':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden mb-6">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-5">
        <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
          <LayoutGrid className="h-5 w-5 text-emerald-600" />
          Salary Tax Hub
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="flex flex-col">
          {visibleSalaries.map((item) => {
            const isActive = pathname === item.url;
            return (
              <Link
                key={item.url}
                href={item.url}
                className={cn(
                  'flex items-center justify-between px-5 py-3 text-sm font-medium border-b border-slate-100 transition-colors hover:bg-slate-50 last:border-0',
                  isActive
                    ? 'bg-emerald-50/50 text-emerald-700 border-l-[3px] border-l-emerald-500 pl-4.25' // Adjust padding to account for border
                    : 'text-slate-600 border-l-[3px] border-l-transparent'
                )}
              >
                <div className="flex items-center gap-2">
                  <Zap
                    className={cn(
                      'h-3 w-3',
                      isActive
                        ? 'text-emerald-500 fill-emerald-500'
                        : 'text-slate-400'
                    )}
                  />
                  {item.label}
                </div>

                {item.badge && (
                  <Badge
                    variant="outline"
                    className={cn(
                      'text-[10px] h-5 px-1.5 font-bold uppercase tracking-wider',
                      getBadgeStyles(item.badgeVariant)
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </div>

        <div className="p-4 bg-slate-50/30 border-t border-slate-100 space-y-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="w-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 h-8 text-xs font-semibold"
          >
            {showAll ? (
              <span className="flex items-center gap-1">
                Show Less <ChevronUp className="h-3 w-3" />
              </span>
            ) : (
              <span className="flex items-center gap-1">
                Show All ({salaries.length}) <ChevronDown className="h-3 w-3" />
              </span>
            )}
          </Button>

          <Link href="/guides/new-vs-old-tax-regime-2025" className="block">
            <Button
              variant="outline"
              className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 transition-all font-semibold"
            >
              New vs Old Tax Guide <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
