// src/lib/creditCards.ts

export interface CreditCard {
  name: string;
  slug: string;
  issuer: string;
  network?: string;
  joiningFee: string;
  annualFee: string;
  feeWaiver?: string;
  rewards: string;
  eligibility: string;
  bestFor: string;
  standout: string;
  officialUrl: string;
  tags: string[]; // e.g. 'student', 'cashback', 'fuel', 'lounge', 'under-500', 'online-shopping', 'lifetime-free'
}

// Card facts last checked against issuer pages — July 2026.
// Fees, rewards and eligibility criteria are set by issuers and change without notice.
export const CARDS_LAST_VERIFIED = 'July 2026';

export const CARD_DATA_DISCLAIMER =
  'Fees, reward rates and eligibility criteria are set by card issuers and can change at any time. Figures on this page were last checked in July 2026 — always confirm current terms on the issuer’s official page before applying.';

export const creditCards: CreditCard[] = [
  {
    name: 'SBI Card Unnati',
    slug: 'sbi-card-unnati',
    issuer: 'SBI Card',
    joiningFee: 'Nil',
    annualFee: 'Nil for first 4 years',
    feeWaiver: 'No fee for 4 years; renewal fee applies after',
    rewards: '1 reward point per ₹100 spent; ₹500 milestone cashback on ₹50,000 annual spend; 1% fuel surcharge waiver',
    eligibility: 'No income proof needed — issued against a Fixed Deposit of ₹25,000 minimum; ID and address proof required',
    bestFor: 'Students, homemakers, freelancers and anyone with no credit history',
    standout: 'FD-backed and reports to credit bureaus, so it builds a CIBIL history from zero',
    officialUrl: 'https://www.sbicard.com/en/personal/credit-cards/shopping/sbi-card-unnati.page',
    tags: ['student', 'under-500', 'lifetime-free', 'secured'],
  },
  {
    name: 'SBI SimplyCLICK',
    slug: 'sbi-simplyclick',
    issuer: 'SBI Card',
    joiningFee: '₹499 + GST',
    annualFee: '₹499 + GST',
    feeWaiver: '₹500 Amazon e-gift voucher issued on fee payment offsets the cost',
    rewards: '10X reward points (~5% value back) at Amazon, Cleartrip, BookMyShow and other partners; 5X points on other online spend; up to ₹4,000 in vouchers on ₹2 lakh annual online spend',
    eligibility: 'Typical entry-level unsecured card income band (~₹20,000-₹25,000/month); confirm current criteria on issuer page',
    bestFor: 'Digital-first shoppers who want a low-fee online rewards card',
    standout: 'Strong 10X multiplier on partner sites for a sub-₹500 card',
    officialUrl: 'https://www.sbicard.com/en/personal/credit-cards/shopping/simplyclick-sbi-card.page',
    tags: ['cashback', 'under-500', 'online-shopping'],
  },
  {
    name: 'HDFC Millennia',
    slug: 'hdfc-millennia',
    issuer: 'HDFC Bank',
    joiningFee: '₹1,000 + GST',
    annualFee: '₹1,000 + GST',
    feeWaiver: 'Waived on ₹1,00,000 spend in the preceding 12 months',
    rewards: 'Up to 5% cashback on 10 partner merchants (Amazon, Flipkart, Myntra, Swiggy and more, capped ₹1,000/month); 1% cashback on other spends (capped ₹750/month); ₹1,000 voucher on ₹1 lakh spend/quarter',
    eligibility: 'Salaried: net monthly income above ₹35,000 (confirm exact figure on issuer page); self-employed: ITR income above ₹6 lakh p.a.; age 21+',
    bestFor: 'Young salaried professionals with broad online spending',
    standout: 'Complimentary domestic lounge access plus wide partner-merchant cashback net',
    officialUrl: 'https://www.hdfcbank.com/personal/pay/cards/millennia-cards/millennia-cc-new',
    tags: ['cashback', 'online-shopping', 'lounge'],
  },
  {
    name: 'Swiggy HDFC Bank Credit Card',
    slug: 'swiggy-hdfc',
    issuer: 'HDFC Bank',
    joiningFee: '₹500 + GST',
    annualFee: '₹500 + GST',
    feeWaiver: 'Waived on ₹2 lakh annual spend',
    rewards: '10% cashback on Swiggy app — food delivery, Instamart, Dineout, Genie (capped ₹1,500/billing cycle); 5% on other online spends; 1% on other categories; 3 months free Swiggy One on joining',
    eligibility: 'Confirm current minimum income/age on issuer page — not published for this variant at time of writing',
    bestFor: 'Frequent Swiggy and online-delivery users',
    standout: 'One of the highest food-delivery cashback rates (10%) for a ₹500 card',
    officialUrl: 'https://www.hdfcbank.com/personal/pay/cards/credit-cards/swiggy-hdfc-bank-credit-card',
    tags: ['cashback', 'under-500', 'online-shopping'],
  },
  {
    name: 'IndianOil HDFC Bank Credit Card',
    slug: 'indianoil-hdfc',
    issuer: 'HDFC Bank',
    joiningFee: '₹500 + GST',
    annualFee: '₹500 + GST',
    feeWaiver: 'Waived on ₹50,000 annual spend',
    rewards: '5% value back as Fuel Points at IndianOil outlets (capped monthly), 5% on groceries, 5% on bill payments; 1% fuel surcharge waiver up to ₹250/cycle',
    eligibility: 'Salaried: minimum net monthly income ₹12,000; self-employed: ITR income above ₹6 lakh p.a.; age under 60 (salaried)/65 (self-employed)',
    bestFor: 'Regular IndianOil fuel buyers with modest income requirements',
    standout: 'Low income threshold with an uncapped-transaction fuel earning structure',
    officialUrl: 'https://www.hdfcbank.com/personal/pay/cards/credit-cards/indianoil-hdfc-bank-credit-card',
    tags: ['fuel', 'under-500'],
  },
  {
    name: 'BPCL SBI Card OCTANE',
    slug: 'bpcl-sbi-card-octane',
    issuer: 'SBI Card',
    joiningFee: '₹1,499 + GST (confirm on issuer page)',
    annualFee: '₹1,499 + GST',
    feeWaiver: 'Waived on ₹2 lakh annual spend',
    rewards: '25X reward points (~7.25% value back including surcharge waiver) at BPCL pumps and Bharat Gas; 10X points on groceries, department stores, movies and dining; 6,000 bonus points on joining',
    eligibility: 'Confirm current minimum income/age on issuer page',
    bestFor: 'High fuel spenders who also want lounge access',
    standout: 'Uncapped high fuel cashback (~7.25%) at 17,000+ BPCL outlets plus lounge access',
    officialUrl: 'https://www.sbicard.com/en/personal/credit-cards/travel/bpcl-sbi-card-octane.page',
    tags: ['fuel'],
  },
  {
    name: 'Amazon Pay ICICI Bank Credit Card',
    slug: 'amazon-pay-icici',
    issuer: 'ICICI Bank',
    joiningFee: 'Nil',
    annualFee: 'Nil (lifetime free)',
    rewards: '5% back on Amazon.in for Prime members, 3% for non-Prime; 2% cashback at 100+ Amazon Pay partner merchants; 1% on all other spends; 1% fuel surcharge waiver',
    eligibility: 'Age 21-65; salaried minimum monthly income ₹20,000, self-employed ₹30,000; invite-only — cannot be applied for directly, requires an ICICI/Amazon invitation',
    bestFor: 'Amazon-heavy shoppers who receive an invitation',
    standout: 'Genuinely fee-free for life with no minimum spend required to keep it that way',
    officialUrl: 'https://www.icicibank.com/personal-banking/cards/credit-card/amazon-pay-credit-card',
    tags: ['cashback', 'under-500', 'lifetime-free', 'online-shopping'],
  },
  {
    name: 'Flipkart Axis Bank Credit Card',
    slug: 'flipkart-axis',
    issuer: 'Axis Bank',
    joiningFee: '₹500 + GST',
    annualFee: '₹500 + GST',
    feeWaiver: 'Confirm current renewal waiver terms on issuer page',
    rewards: '7.5% cashback on Myntra (capped ₹4,000/quarter); 5% on Flipkart and Cleartrip (capped ₹4,000/quarter each); unlimited 4% on preferred merchants; unlimited 1.5% on everything else; 4 complimentary domestic lounge visits/year',
    eligibility: 'Age 18-70; confirm current minimum income on issuer page for this specific variant',
    bestFor: 'Flipkart, Myntra and general online shoppers',
    standout: 'Unusually high uncapped 1.5% base cashback rate for a ₹500 entry-tier card',
    officialUrl: 'https://www.axisbank.com/retail/cards/credit-card/flipkart-axisbank-credit-card',
    tags: ['cashback', 'under-500', 'online-shopping'],
  },
  {
    name: 'HDFC Regalia Gold',
    slug: 'hdfc-regalia-gold',
    issuer: 'HDFC Bank',
    joiningFee: '₹2,500 + GST',
    annualFee: '₹2,500 + GST',
    feeWaiver: 'Waived on ₹4 lakh annual spend; ₹2,500 welcome voucher offsets first-year cost',
    rewards: '4 reward points per ₹150 spend (general), 20 points per ₹150 at select merchants; ₹1,500 voucher per quarter at ₹1.5 lakh spend; ₹5,000 flight voucher at ₹5 lakh annual spend',
    eligibility: 'Age 21+ (salaried max 60, self-employed max 65); salaried net monthly income ₹1 lakh (govt) / ₹1.5 lakh (private); self-employed ITR income ₹18 lakh p.a.',
    bestFor: 'Mid-to-high spenders who travel occasionally',
    standout: 'Complimentary domestic and limited international lounge access via Priority Pass, plus milestone flight vouchers',
    officialUrl: 'https://www.hdfcbank.com/personal/pay/cards/credit-cards/regalia-gold-credit-card',
    tags: ['lounge'],
  },
  {
    name: 'Axis Bank Magnus',
    slug: 'axis-magnus',
    issuer: 'Axis Bank',
    joiningFee: '₹12,500 + GST',
    annualFee: '₹12,500 + GST',
    feeWaiver: 'Waived on ₹25 lakh preceding-year spend',
    rewards: '12 EDGE Reward Points per ₹200 spent up to ₹1.5 lakh/month; 35 EDGE points per ₹200 on incremental spend above that',
    eligibility: 'Net salary or ITR income of ₹24 lakh p.a. (indicative, not a guarantee of approval)',
    bestFor: 'Very high spenders wanting maximum reward acceleration and lounge access',
    standout: 'Nearly 3x reward rate once monthly spend crosses ₹1.5 lakh, plus extensive complimentary lounge access',
    officialUrl: 'https://www.axisbank.com/retail/cards/credit-card/magnus-axis-bank-credit-card',
    tags: ['lounge'],
  },
];

export function getCardsByTag(tag: string): CreditCard[] {
  return creditCards.filter((c) => c.tags.includes(tag));
}

export function getCardBySlug(slug: string): CreditCard | undefined {
  return creditCards.find((c) => c.slug === slug);
}
