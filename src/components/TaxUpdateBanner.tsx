// src/components/TaxUpdateBanner.tsx
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export default function TaxUpdateBanner() {
  return (
    <Alert className="border-blue-200 bg-blue-50 mb-8">
      <Info className="h-4 w-4" />
      <AlertDescription className="text-sm">
        Updated for Tax Year 2026-27 under the new Income Tax Act, 2025.
        <br />
        New regime is now the default • HRA exemption expanded to Bengaluru,
        Pune, Hyderabad & Ahmedabad • Most deductions (80C, HRA, 24(b), 80E)
        only available in Old Regime.
      </AlertDescription>
    </Alert>
  );
}
