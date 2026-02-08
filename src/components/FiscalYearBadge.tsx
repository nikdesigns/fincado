import { Badge } from '@/components/ui/badge';
import { getUpdatedForFYText, getCurrentFiscalYear } from '@/lib/fiscalYear';

interface FiscalYearBadgeProps {
  variant?: 'updated' | 'budget' | 'verified' | 'year';
  className?: string;
  showDot?: boolean;
}

export default function FiscalYearBadge({
  variant = 'updated',
  className = '',
  showDot = false,
}: FiscalYearBadgeProps) {
  const fy = getCurrentFiscalYear();

  const getText = () => {
    switch (variant) {
      case 'updated':
        return getUpdatedForFYText();
      case 'budget':
        return `Budget ${fy.budgetYear}`;
      case 'verified':
        return `Verified for Budget ${fy.budgetYear}`;
      case 'year':
        return fy.shortYear.toString();
      default:
        return getUpdatedForFYText();
    }
  };

  return (
    <Badge
      variant="outline"
      className={`flex items-center gap-2 border-emerald-200 bg-emerald-50 text-emerald-800 px-3 py-1.5 text-[13px] font-semibold ${className}`}
    >
      {showDot && <span className="h-2 w-2 rounded-full bg-emerald-600" />}
      {getText()}
    </Badge>
  );
}
