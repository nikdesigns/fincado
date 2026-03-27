import { getCurrentFiscalYear, getAssessmentYear } from '@/lib/fiscalYear';

export default function LegalNote() {
  const fy = getCurrentFiscalYear();
  const ay = getAssessmentYear();
  return (
    <div className="mt-8 rounded-lg border border-slate-100 bg-slate-50 p-4 text-xs text-slate-500">
      <p className="font-semibold text-slate-700 mb-1">
        Disclaimer & Data Accuracy ({fy.budgetYear})
      </p>
      <p className="leading-relaxed">
        Calculations are based on{' '}
        <strong>
          {fy.fullFormat} ({ay.fullFormat})
        </strong>{' '}
        tax laws and standard banking formulas. Fincado is an informational tool
        and does not constitute financial advice. Investment returns (SIP/Mutual
        Funds) are market-linked and not guaranteed. Please consult a Chartered
        Accountant (CA) or SEBI-registered advisor before making financial
        decisions.
      </p>
    </div>
  );
}
