/**
 * Affiliate / referral offers shown next to calculators.
 *
 * HOW TO ACTIVATE: sign up for a program, paste your personal tracking link
 * into `url`, and the card appears on every page that uses that topic.
 * Offers with an empty `url` are never rendered, so this file is safe to ship
 * before any program has approved you.
 *
 * Programs that fit Fincado's traffic (apply with your own account):
 *  - Demat / investing: Upstox, Angel One, Groww, Zerodha referral programs
 *  - Loans & credit cards: BankBazaar, Paisabazaar, EarnKaro, Cuelinks, INRDeals
 *  - Insurance: PolicyBazaar partner programme
 *  - Tax filing: ClearTax / Quicko partner programmes
 */

export type AffiliateTopic = 'loan' | 'invest' | 'tax' | 'credit-card';

export interface AffiliateOffer {
  id: string;
  topic: AffiliateTopic;
  partner: string;
  headline: string;
  blurb: string;
  cta: string;
  /** Your tracking link. Leave empty to hide the offer. */
  url: string;
}

export const AFFILIATE_OFFERS: AffiliateOffer[] = [
  {
    id: 'demat-1',
    topic: 'invest',
    partner: 'Upstox',
    headline: 'Start your SIP with a free demat account',
    blurb: 'Zero account opening fee and direct mutual funds with no commission.',
    cta: 'Open free account',
    url: '',
  },
  {
    id: 'demat-2',
    topic: 'invest',
    partner: 'Angel One',
    headline: 'Invest in direct mutual funds and stocks',
    blurb: 'Paperless account opening in minutes with Aadhaar e-KYC.',
    cta: 'Open account',
    url: '',
  },
  {
    id: 'loan-1',
    topic: 'loan',
    partner: 'BankBazaar',
    headline: 'Check pre-approved loan offers',
    blurb: 'Compare personal and home loan rates from multiple lenders in one place.',
    cta: 'Check my offers',
    url: '',
  },
  {
    id: 'loan-2',
    topic: 'loan',
    partner: 'Paisabazaar',
    headline: 'Compare loan rates and check your credit score',
    blurb: 'See eligible lenders based on your credit profile. Free credit report included.',
    cta: 'Compare loans',
    url: '',
  },
  {
    id: 'tax-1',
    topic: 'tax',
    partner: 'ClearTax',
    headline: 'File your ITR online in minutes',
    blurb: 'Pre-filled forms from Form 16 and AIS, with expert-assisted filing available.',
    cta: 'File ITR',
    url: '',
  },
  {
    id: 'tax-2',
    topic: 'tax',
    partner: 'Upstox',
    headline: 'Save up to ₹46,800 with ELSS',
    blurb: 'Old-regime taxpayers can claim 80C on ELSS funds with a 3-year lock-in.',
    cta: 'Explore ELSS funds',
    url: '',
  },
  {
    id: 'cc-1',
    topic: 'credit-card',
    partner: 'BankBazaar',
    headline: 'Find a credit card you are likely to get',
    blurb: 'Compare rewards, fees and eligibility across banks.',
    cta: 'Compare cards',
    url: '',
  },
];

export function getAffiliateOffers(topic: AffiliateTopic, limit = 2): AffiliateOffer[] {
  return AFFILIATE_OFFERS.filter((o) => o.topic === topic && o.url.trim() !== '').slice(0, limit);
}
