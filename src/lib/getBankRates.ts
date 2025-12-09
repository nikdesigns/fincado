import { BANK_RATES } from '@/data/live-rates';

export async function getBankRates() {
  try {
    // ✅ REAL API CAN BE USED HERE LATER
    // const res = await fetch(process.env.BANK_API_URL!, { cache: 'no-store' })
    // const data = await res.json()
    // return data

    return BANK_RATES;
  } catch (err) {
    console.error('Bank rate API failed, using fallback');
    return BANK_RATES;
  }
}
