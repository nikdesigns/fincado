/**
 * Indian income tax engine for salaried resident individuals (below 60).
 *
 * Rules for FY 2026-27 (AY 2027-28). Budget 2026 left slabs, the standard
 * deduction and the Section 87A rebate unchanged from FY 2025-26; the
 * Income-tax Act, 2025 (in force from 1 April 2026) renumbers sections but
 * keeps these rates. Section numbers below use the familiar 1961-Act names.
 */

export type Regime = 'new' | 'old';

export interface Slab {
  upTo: number; // upper bound of the slab (Infinity for the last one)
  rate: number;
}

export const TAX_RULES = {
  fy: 'FY 2026-27',
  ay: 'AY 2027-28',
  lastReviewed: '2026-10-13',
  lastReviewedLabel: 'October 2026',
  cess: 0.04,
  new: {
    standardDeduction: 75_000,
    rebateLimit: 12_00_000,
    rebateMax: 60_000,
    maxSurcharge: 0.25,
    slabs: [
      { upTo: 4_00_000, rate: 0 },
      { upTo: 8_00_000, rate: 0.05 },
      { upTo: 12_00_000, rate: 0.1 },
      { upTo: 16_00_000, rate: 0.15 },
      { upTo: 20_00_000, rate: 0.2 },
      { upTo: 24_00_000, rate: 0.25 },
      { upTo: Infinity, rate: 0.3 },
    ] as Slab[],
  },
  old: {
    standardDeduction: 50_000,
    rebateLimit: 5_00_000,
    rebateMax: 12_500,
    maxSurcharge: 0.37,
    slabs: [
      { upTo: 2_50_000, rate: 0 },
      { upTo: 5_00_000, rate: 0.05 },
      { upTo: 10_00_000, rate: 0.2 },
      { upTo: Infinity, rate: 0.3 },
    ] as Slab[],
  },
  surcharge: [
    { above: 5_00_00_000, rate: 0.37 },
    { above: 2_00_00_000, rate: 0.25 },
    { above: 1_00_00_000, rate: 0.15 },
    { above: 50_00_000, rate: 0.1 },
  ],
  /** Employer NPS 80CCD(2) cap as a share of basic + DA (private sector). */
  employerNpsCap: { new: 0.14, old: 0.1 },
  limits: { sec80C: 1_50_000, sec80D: 25_000, sec80CCD1B: 50_000, homeLoanInterest: 2_00_000 },
} as const;

export interface SlabRow {
  from: number;
  to: number; // portion of income that falls in this slab ends here
  rate: number;
  taxed: number; // amount of income taxed in this slab
  tax: number;
}

export interface TaxResult {
  regime: Regime;
  gross: number;
  standardDeduction: number;
  deductions: number;
  taxable: number;
  rows: SlabRow[];
  slabTax: number;
  rebate: number;
  marginalRelief: number;
  surcharge: number;
  cess: number;
  total: number;
  /** total / gross */
  effectiveRate: number;
  /** rate applied to the next rupee of taxable income, including cess */
  marginalRate: number;
}

const round = (n: number) => Math.round(n);

export function slabRows(taxable: number, slabs: readonly Slab[]): SlabRow[] {
  const rows: SlabRow[] = [];
  let from = 0;
  for (const slab of slabs) {
    if (taxable <= from) break;
    const to = Math.min(taxable, slab.upTo);
    const taxed = to - from;
    rows.push({ from, to, rate: slab.rate, taxed, tax: taxed * slab.rate });
    from = slab.upTo;
  }
  return rows;
}

function slabTaxOf(taxable: number, slabs: readonly Slab[]) {
  return slabRows(taxable, slabs).reduce((s, r) => s + r.tax, 0);
}

/** Tax after 87A rebate and rebate marginal relief, before surcharge. */
function baseTax(taxable: number, regime: Regime) {
  const rules = TAX_RULES[regime];
  const slabTax = slabTaxOf(taxable, rules.slabs);
  let rebate = 0;
  let marginalRelief = 0;
  if (taxable <= rules.rebateLimit) {
    rebate = Math.min(slabTax, rules.rebateMax);
  } else if (regime === 'new') {
    // New regime: tax may not exceed the income earned above ₹12 lakh.
    const cap = taxable - rules.rebateLimit;
    if (slabTax > cap) marginalRelief = slabTax - cap;
  }
  return { slabTax, rebate, marginalRelief, tax: slabTax - rebate - marginalRelief };
}

function surchargeOn(taxable: number, tax: number, regime: Regime) {
  const tier = TAX_RULES.surcharge.find((t) => taxable > t.above);
  if (!tier) return 0;
  const rate = Math.min(tier.rate, TAX_RULES[regime].maxSurcharge);
  const surcharge = tax * rate;
  // Marginal relief: tax + surcharge may not exceed the tax payable at the
  // threshold plus the income earned above it.
  const atThreshold = baseTax(tier.above, regime).tax;
  const lowerTier = TAX_RULES.surcharge.find((t) => tier.above > t.above);
  const lowerRate = lowerTier ? Math.min(lowerTier.rate, TAX_RULES[regime].maxSurcharge) : 0;
  const cap = atThreshold * (1 + lowerRate) + (taxable - tier.above);
  return Math.max(0, Math.min(surcharge, cap - tax));
}

/**
 * @param gross annual gross salary
 * @param deductions deductions beyond the standard deduction (new regime:
 *   only employer NPS 80CCD(2) and similar allowed items)
 */
export function computeTax(gross: number, regime: Regime, deductions = 0): TaxResult {
  const rules = TAX_RULES[regime];
  const standardDeduction = Math.min(rules.standardDeduction, gross);
  const taxable = Math.max(0, gross - standardDeduction - deductions);
  const rows = slabRows(taxable, rules.slabs);
  const b = baseTax(taxable, regime);
  const surcharge = surchargeOn(taxable, b.tax, regime);
  const cess = (b.tax + surcharge) * TAX_RULES.cess;
  const total = round(b.tax + surcharge + cess);

  const next = baseTax(taxable + 1000, regime).tax;
  const nextTotal = (next + surchargeOn(taxable + 1000, next, regime)) * (1 + TAX_RULES.cess);
  const marginalRate = Math.max(0, (nextTotal - (b.tax + surcharge + cess)) / 1000);

  return {
    regime,
    gross,
    standardDeduction,
    deductions,
    taxable,
    rows,
    slabTax: round(b.slabTax),
    rebate: round(b.rebate),
    marginalRelief: round(b.marginalRelief),
    surcharge: round(surcharge),
    cess: round(cess),
    total,
    effectiveRate: gross > 0 ? total / gross : 0,
    marginalRate,
  };
}

/**
 * Smallest deductions (beyond the ₹50,000 standard deduction) at which the
 * old regime costs no more than the new regime. Returns null if the new
 * regime is zero tax and old cannot beat it.
 */
export function oldRegimeBreakEven(gross: number): number | null {
  const target = computeTax(gross, 'new').total;
  if (computeTax(gross, 'old', 0).total <= target) return 0;
  const max = Math.max(0, gross - TAX_RULES.old.standardDeduction);
  if (computeTax(gross, 'old', max).total > target) return null;
  let lo = 0;
  let hi = max;
  while (hi - lo > 100) {
    const mid = (lo + hi) / 2;
    if (computeTax(gross, 'old', mid).total <= target) hi = mid;
    else lo = mid;
  }
  return Math.ceil(hi / 1000) * 1000;
}

export interface SalaryAssumptions {
  basicShare: number; // basic pay as a share of gross
  pfRate: number; // employee PF as a share of basic
  professionalTax: number; // per year
}

export const DEFAULT_ASSUMPTIONS: SalaryAssumptions = {
  basicShare: 0.5,
  pfRate: 0.12,
  professionalTax: 2_400,
};

export interface InHand {
  gross: number;
  basic: number;
  employeePf: number;
  professionalTax: number;
  tax: number;
  annual: number;
  monthly: number;
}

export function inHand(
  gross: number,
  regime: Regime,
  deductions = 0,
  a: SalaryAssumptions = DEFAULT_ASSUMPTIONS,
): InHand {
  const basic = gross * a.basicShare;
  const employeePf = round(basic * a.pfRate);
  const tax = computeTax(gross, regime, deductions).total;
  const annual = gross - employeePf - a.professionalTax - tax;
  return {
    gross,
    basic: round(basic),
    employeePf,
    professionalTax: a.professionalTax,
    tax,
    annual: round(annual),
    monthly: round(annual / 12),
  };
}

/** Indian digit grouping: ₹1,50,800 */
export function inr(n: number): string {
  const sign = n < 0 ? '-' : '';
  return `${sign}₹${Math.round(Math.abs(n)).toLocaleString('en-IN')}`;
}

/** ₹17.25 lakh / ₹1.2 crore */
export function lakh(n: number): string {
  if (n >= 1_00_00_000) return `₹${trim(n / 1_00_00_000)} crore`;
  return `₹${trim(n / 1_00_000)} lakh`;
}

function trim(v: number) {
  return v.toFixed(2).replace(/\.?0+$/, '');
}

export function pct(v: number, digits = 1): string {
  return `${(v * 100).toFixed(digits).replace(/\.0+$/, '')}%`;
}
