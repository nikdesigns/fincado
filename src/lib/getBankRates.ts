// src/lib/getBankRates.ts
import { BANK_RATES, type BankRate } from '@/data/live-rates';

export async function getBankRates(): Promise<BankRate[]> {
  try {
    // TODO: When you have a real external API, replace this with:
    // const res = await fetch(process.env.BANK_API_URL!, {
    //   cache: 'no-store',   // or 'force-cache' if rates don't change often
    // });
    // return await res.json();

    // For now we use the static rates from live-rates.ts
    return BANK_RATES;
  } catch (err) {
    console.error('Failed to fetch live bank rates, using fallback data:', err);
    return BANK_RATES; // Safe fallback — never break the site
  }
}

// Optional helper (already used in your pages)
export function getLatestHomeRate(bankSlug: string, fallback = 9.0): number {
  const rate = BANK_RATES.find((r) => r.bank === bankSlug);
  return rate ? rate.homeLoan : fallback;
}
