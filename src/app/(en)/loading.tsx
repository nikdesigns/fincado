import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full gap-4">
      <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
      <p className="text-slate-500 text-sm font-medium animate-pulse">
        Loading...
      </p>
    </div>
  );
}
