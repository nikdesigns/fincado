import { Info } from 'lucide-react';

export default function LegalNote() {
  return (
    <div className="flex items-start gap-3 p-4 mt-6 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500 leading-relaxed no-print">
      <Info className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
      <p>
        <strong className="font-semibold text-slate-600">Disclaimer:</strong>{' '}
        Rates shown are indicative and for educational purposes only. Actual
        interest rates and terms may vary based on bank policy, RBI guidelines,
        and individual customer credit profiles.
      </p>
    </div>
  );
}
