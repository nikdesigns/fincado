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
import { cn } from '@/lib/utils';

type SalaryItem = {
  label: string;
  url: string;
  badge?: string;
  badgeVariant?: 'success' | 'warning' | 'info' | 'default';
};

export default function TaxRegimeWidget() {
  const pathname = usePathname();
  const [showAll, setShowAll] = useState(false);

  const salaries: SalaryItem[] = [
    {
      label: '₹6 Lakh Salary',
      url: '/guides/tax-on-6-lakh-salary',
      badge: 'Zero Tax',
      badgeVariant: 'success',
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
      badge: 'Zero Tax',
      badgeVariant: 'success',
    },
    {
      label: '₹9 Lakh Salary',
      url: '/guides/tax-on-9-lakh-salary',
      badge: 'Zero Tax',
      badgeVariant: 'success',
    },
    {
      label: '₹10 Lakh Salary',
      url: '/guides/tax-on-10-lakh-salary',
      badge: 'Zero Tax',
      badgeVariant: 'success',
    },
    {
      label: '₹11 Lakh Salary',
      url: '/guides/tax-on-11-lakh-salary',
      badge: 'Zero Tax',
      badgeVariant: 'success',
    },
    {
      label: '₹12 Lakh Salary',
      url: '/guides/tax-on-12-lakh-salary',
      badge: 'Zero Tax',
      badgeVariant: 'success',
    },
    {
      label: '₹14 Lakh Salary',
      url: '/guides/tax-on-14-lakh-salary',
      badge: 'Low Tax',
      badgeVariant: 'warning',
    },
    {
      label: '₹15 Lakh Salary',
      url: '/guides/tax-on-15-lakh-salary',
      badge: 'Low Tax',
      badgeVariant: 'warning',
    },
    {
      label: '₹16 Lakh Salary',
      url: '/guides/tax-on-16-lakh-salary',
      badge: 'Low Tax',
      badgeVariant: 'warning',
    },
    {
      label: '₹18 Lakh Salary',
      url: '/guides/tax-on-18-lakh-salary',
      badge: 'Low Tax',
      badgeVariant: 'warning',
    },
    {
      label: '₹20 Lakh Salary',
      url: '/guides/tax-on-20-lakh-salary',
      badge: 'Low Tax',
      badgeVariant: 'warning',
    },
    {
      label: '₹25 Lakh Salary',
      url: '/guides/tax-on-25-lakh-salary',
      badge: 'High Tax',
      badgeVariant: 'info',
    },
    {
      label: '₹30 Lakh Salary',
      url: '/guides/tax-on-30-lakh-salary',
      badge: 'High Tax',
      badgeVariant: 'info',
    },
  ];

  const visibleSalaries = showAll ? salaries : salaries.slice(0, 8);

  const getBadgeStyles = (variant?: string) => {
    switch (variant) {
      case 'success':
        return 'bg-[#EFFBE2] text-[#577A30] hover:bg-[#DFF7C6] border-[#DFF7C6]';
      case 'warning':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200';
      case 'info':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden my-8">
      <CardHeader className="bg-slate-50 border-b py-4 px-5">
        <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
          <LayoutGrid className="h-5 w-5 text-emerald-600" />
          Salary Tax Hub
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y divide-slate-100">
          {visibleSalaries.map((item) => {
            const isActive = pathname === item.url;
            return (
              <Link
                key={item.url}
                href={item.url}
                className={cn(
                  'flex items-center justify-between px-5 py-3.5 text-sm font-medium transition-all hover:bg-slate-50',
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 border-l-4 border-l-emerald-500'
                    : 'text-slate-700 hover:text-slate-900',
                )}
              >
                <div className="flex items-center gap-2">
                  <Zap
                    className={cn(
                      'h-4 w-4',
                      isActive ? 'text-emerald-500' : 'text-slate-400',
                    )}
                  />
                  {item.label}
                </div>

                {item.badge && (
                  <Badge
                    variant="outline"
                    className={cn(
                      'text-[10px] font-semibold px-2.5 py-0.5 rounded-md',
                      getBadgeStyles(item.badgeVariant),
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="w-full text-slate-600 hover:text-slate-900 hover:bg-white text-xs font-medium"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp className="ml-1 h-3 w-3" />
              </>
            ) : (
              <>
                Show All {salaries.length} Guides{' '}
                <ChevronDown className="ml-1 h-3 w-3" />
              </>
            )}
          </Button>

          <Link href="/guides/new-vs-old-tax-regime-2025" className="block">
            <Button
              variant="outline"
              className="w-full border-[#DFF7C6] text-[#577A30] hover:bg-[#F7FDF1] hover:border-[#D0F4A9] font-medium"
            >
              Full New vs Old Regime Guide
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
