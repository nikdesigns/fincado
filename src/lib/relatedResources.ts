type RelatedLocale = 'en' | 'hi';

export type RelatedResource = {
  title: string;
  href: string;
};

type CategoryKey =
  | 'loan'
  | 'tax'
  | 'mutual'
  | 'savings'
  | 'retirement'
  | 'credit'
  | 'gold'
  | 'government'
  | 'insurance'
  | 'literacy';

const CATEGORY_ALIAS_MAP: Record<string, CategoryKey> = {
  'loans & mortgages': 'loan',
  'taxation': 'tax',
  'tax planning': 'tax',
  'tax saving': 'tax',
  'mutual funds': 'mutual',
  'mutual funds & sip': 'mutual',
  'investments': 'mutual',
  'savings & fd': 'savings',
  'retirement': 'retirement',
  'credit score': 'credit',
  'credit cards': 'credit',
  'gold investment': 'gold',
  'government schemes': 'government',
  'insurance': 'insurance',
  'financial literacy': 'literacy',
};

const EN_RESOURCES: Record<CategoryKey, RelatedResource[]> = {
  loan: [
    { title: 'EMI Calculator', href: '/emi-calculator/' },
    { title: 'EMI Prepayment Calculator', href: '/emi-prepayment-calculator/' },
    { title: 'Compare Loan Rates', href: '/compare-loans/' },
    { title: 'Home Loan Guide', href: '/guides/home-loan-guide/' },
    { title: 'Personal Loan Guide', href: '/guides/personal-loan-guide/' }
  ],
  tax: [
    { title: 'Income Tax Calculator', href: '/income-tax-calculator/' },
    { title: 'HRA Calculator', href: '/hra-calculator/' },
    { title: 'New vs Old Tax Regime (2026)', href: '/guides/new-vs-old-tax-regime-2026/' },
    { title: '80C Tax Saving Options', href: '/guides/best-tax-saving-options-80c/' },
    { title: 'ELSS Funds Guide (2026)', href: '/guides/elss-funds-guide-2026/' }
  ],
  mutual: [
    { title: 'SIP Calculator', href: '/sip-calculator/' },
    { title: 'Lumpsum Calculator', href: '/lumpsum-calculator/' },
    { title: 'SWP Calculator', href: '/swp-calculator/' },
    { title: 'Mutual Fund Guide', href: '/guides/mutual-fund-guide/' },
    { title: 'SIP Investment Guide', href: '/guides/sip-investment-guide/' }
  ],
  savings: [
    { title: 'FD Calculator', href: '/fd-calculator/' },
    { title: 'RD Calculator', href: '/rd-calculator/' },
    { title: 'PPF Calculator', href: '/ppf-calculator/' },
    { title: 'NSC Calculator', href: '/nsc-calculator/' },
    { title: 'Fixed Deposit Guide', href: '/guides/fixed-deposit-guide/' }
  ],
  retirement: [
    { title: 'Retirement Calculator', href: '/retirement-calculator/' },
    { title: 'NPS Calculator', href: '/nps-calculator/' },
    { title: 'EPF Calculator', href: '/epf-calculator/' },
    { title: 'FIRE Calculator', href: '/fire-calculator/' },
    { title: 'Retirement Planning Guide', href: '/guides/retirement-planning-india/' }
  ],
  credit: [
    { title: 'Credit Score Hub', href: '/credit-score/' },
    { title: 'Credit Score Guide', href: '/guides/credit-score-guide/' },
    { title: 'How CIBIL Works', href: '/guides/credit-score-guide/' },
    { title: 'Credit Card Guide', href: '/guides/credit-card-guide/' },
    { title: 'Personal Loan Rates Guide', href: '/guides/personal-loan-interest-rates/' }
  ],
  gold: [
    { title: 'Gold Investment Guide', href: '/guides/gold-investment-guide/' },
    { title: 'SGB Guide', href: '/guides/sovereign-gold-bond-sgb-guide/' },
    { title: 'Capital Gains Calculator', href: '/capital-gains-calculator/' },
    { title: 'Investment Guide', href: '/guides/investment-guide/' },
    { title: 'Inflation Calculator', href: '/inflation-calculator/' }
  ],
  government: [
    { title: 'Sukanya Samriddhi Calculator', href: '/sukanya-samriddhi/' },
    { title: 'APY Calculator', href: '/apy-calculator/' },
    { title: 'POMIS Calculator', href: '/pomis-calculator/' },
    { title: 'KVP Calculator', href: '/kvp-calculator/' },
    { title: 'SSY Guide (2026)', href: '/guides/sukanya-samriddhi-yojana-guide-2026/' }
  ],
  insurance: [
    { title: 'Health Insurance Buying Guide', href: '/guides/health-insurance-buying-guide/' },
    { title: 'Income Tax Calculator', href: '/income-tax-calculator/' },
    { title: 'Tax Regime Guide', href: '/guides/new-vs-old-tax-regime-2026/' },
    { title: '80C Tax Saving Guide', href: '/guides/best-tax-saving-options-80c/' },
    { title: 'Retirement Planner', href: '/retirement-calculator/' }
  ],
  literacy: [
    { title: 'Investment Basics', href: '/guides/investment-basics/' },
    { title: 'Investment Guide', href: '/guides/investment-guide/' },
    { title: 'Inflation Guide', href: '/guides/inflation-calculator-guide/' },
    { title: 'Mutual Fund Guide', href: '/guides/mutual-fund-guide/' },
    { title: 'SIP Calculator', href: '/sip-calculator/' }
  ],
};

const HI_RESOURCES: Record<CategoryKey, RelatedResource[]> = {
  loan: [
    { title: 'EMI Calculator (हिंदी)', href: '/hi/emi-calculator/' },
    { title: 'Home Loan (हिंदी)', href: '/hi/loans/home-loan/' },
    { title: 'Personal Loan Guide (हिंदी)', href: '/hi/guides/personal-loan/' },
    { title: 'Home Loan Guide', href: '/guides/home-loan-guide/' }
  ],
  tax: [
    { title: 'Income Tax Calculator (हिंदी)', href: '/hi/income-tax-calculator/' },
    { title: 'Tax Regime Guide (हिंदी)', href: '/hi/guides/new-vs-old-tax-regime/' },
    { title: 'HRA Calculator (हिंदी)', href: '/hi/hra-calculator/' },
    { title: 'Tax Regime Guide (2026)', href: '/guides/new-vs-old-tax-regime-2026/' }
  ],
  mutual: [
    { title: 'SIP Calculator (हिंदी)', href: '/hi/sip-calculator/' },
    { title: 'Lumpsum Calculator (हिंदी)', href: '/hi/lumpsum-calculator/' },
    { title: 'SIP vs FD (हिंदी)', href: '/hi/guides/sip-vs-fd/' },
    { title: 'Mutual Fund Guide', href: '/guides/mutual-fund-guide/' }
  ],
  savings: [
    { title: 'FD Calculator (हिंदी)', href: '/hi/fd-calculator/' },
    { title: 'RD Calculator (हिंदी)', href: '/hi/rd-calculator/' },
    { title: 'PPF Calculator (हिंदी)', href: '/hi/ppf-calculator/' },
    { title: 'NSC Calculator (हिंदी)', href: '/hi/nsc-calculator/' }
  ],
  retirement: [
    { title: 'Retirement Calculator (हिंदी)', href: '/hi/retirement-calculator/' },
    { title: 'NPS Calculator (हिंदी)', href: '/hi/nps-calculator/' },
    { title: 'EPF Calculator (हिंदी)', href: '/hi/epf-calculator/' },
    { title: 'FIRE Calculator (हिंदी)', href: '/hi/fire-calculator/' }
  ],
  credit: [
    { title: 'Credit Score (हिंदी)', href: '/hi/credit-score/' },
    { title: 'Credit Score Guide (हिंदी)', href: '/hi/guides/credit-score/' },
    { title: 'Credit Score Guide', href: '/guides/credit-score-guide/' },
    { title: 'Credit Card Guide', href: '/guides/credit-card-guide/' }
  ],
  gold: [
    { title: 'Gold Bonds Guide (हिंदी)', href: '/hi/guides/sovereign-gold-bonds/' },
    { title: 'Gold Investment Guide', href: '/guides/gold-investment-guide/' },
    { title: 'SGB Guide', href: '/guides/sovereign-gold-bond-sgb-guide/' },
    { title: 'Capital Gains Calculator (हिंदी)', href: '/hi/capital-gains-calculator/' }
  ],
  government: [
    { title: 'Sukanya Calculator (हिंदी)', href: '/hi/sukanya-samriddhi/' },
    { title: 'APY Calculator (हिंदी)', href: '/hi/apy-calculator/' },
    { title: 'POMIS Calculator (हिंदी)', href: '/hi/pomis-calculator/' },
    { title: 'SSY Guide (हिंदी)', href: '/hi/guides/sukanya-samriddhi-yojana/' }
  ],
  insurance: [
    { title: 'Health Insurance Guide (हिंदी)', href: '/hi/guides/health-insurance-buying-guide/' },
    { title: 'Income Tax Calculator (हिंदी)', href: '/hi/income-tax-calculator/' },
    { title: 'Tax Regime Guide (हिंदी)', href: '/hi/guides/new-vs-old-tax-regime/' },
    { title: 'Retirement Calculator (हिंदी)', href: '/hi/retirement-calculator/' }
  ],
  literacy: [
    { title: 'Investment Basics', href: '/guides/investment-basics/' },
    { title: 'Inflation Calculator (हिंदी)', href: '/hi/inflation-calculator/' },
    { title: 'Investment Guide', href: '/guides/investment-guide/' },
    { title: 'SIP Calculator (हिंदी)', href: '/hi/sip-calculator/' }
  ],
};

const DEFAULT_KEY: CategoryKey = 'literacy';

function uniqueByHref(items: RelatedResource[]): RelatedResource[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.href)) return false;
    seen.add(item.href);
    return true;
  });
}

export function getCategoryKeyForInput(input?: string): CategoryKey {
  if (!input) return DEFAULT_KEY;
  return CATEGORY_ALIAS_MAP[input.toLowerCase().trim()] ?? DEFAULT_KEY;
}

export function inferCategoryKeyFromPathname(pathname: string): CategoryKey {
  const path = pathname.toLowerCase();

  if (/loan|emi|compare-loans|home-loan|personal-loan|car-loan|education-loan/.test(path)) {
    return 'loan';
  }
  if (/income-tax|tax|gst|hra|salary|capital-gains/.test(path)) {
    return 'tax';
  }
  if (/sip|mutual|lumpsum|swp|cagr/.test(path)) {
    return 'mutual';
  }
  if (/fd|rd|ppf|nsc|kvp/.test(path)) {
    return 'savings';
  }
  if (/retirement|nps|epf|fire|gratuity|apy|scss/.test(path)) {
    return 'retirement';
  }
  if (/credit|cibil|card/.test(path)) {
    return 'credit';
  }
  if (/gold|sgb/.test(path)) {
    return 'gold';
  }
  if (/sukanya|ssy|pomis/.test(path)) {
    return 'government';
  }
  if (/insurance/.test(path)) {
    return 'insurance';
  }

  return DEFAULT_KEY;
}

export function getRelatedResources(
  category: string,
  locale: RelatedLocale = 'en',
  limit = 5,
): RelatedResource[] {
  const key = getCategoryKeyForInput(category);
  return getRelatedResourcesByKey(key, locale, limit);
}

export function getRelatedResourcesByKey(
  key: CategoryKey,
  locale: RelatedLocale = 'en',
  limit = 5,
): RelatedResource[] {
  const source = locale === 'hi' ? HI_RESOURCES : EN_RESOURCES;
  const defaults = locale === 'hi' ? HI_RESOURCES[DEFAULT_KEY] : EN_RESOURCES[DEFAULT_KEY];
  return uniqueByHref([...(source[key] || []), ...defaults]).slice(0, limit);
}
