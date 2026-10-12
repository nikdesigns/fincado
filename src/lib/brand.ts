// src/lib/brand.ts
// Single source of truth for how Fincado describes itself to people and to
// search engines. Keep the name, one-line description and profile links here so
// titles, structured data and the footer always say the same thing.

export const BRAND = {
  name: 'Fincado',
  // Other names people (and Google) may use for the site
  alternateNames: ['Fincado India', 'fincado.com'],
  url: 'https://fincado.com/',
  tagline: 'Home loan rates and financial calculators for India',
  description:
    'Fincado is an independent Indian personal finance platform: compare home loan rates across banks and NBFCs, and plan EMIs, SIPs, tax and retirement with free calculators in English and Hindi.',
  // Square logo for search results and knowledge panels (1024×1024 PNG)
  logo: {
    url: 'https://fincado.com/icon.png',
    width: 1024,
    height: 1024,
  },
  email: 'support@fincado.com',
  foundingDate: '2024',
} as const;

/**
 * Official Fincado profiles on other platforms.
 *
 * Add each one as soon as the profile exists, e.g.
 *   { name: 'LinkedIn', url: 'https://www.linkedin.com/company/fincado/' },
 *   { name: 'X', url: 'https://x.com/fincado' },
 *   { name: 'YouTube', url: 'https://www.youtube.com/@fincado' },
 *   { name: 'Instagram', url: 'https://www.instagram.com/fincado/' },
 *
 * They are used in the Organization structured data (sameAs), which is how
 * Google connects these profiles to the brand, and are shown in the footer.
 * Only list profiles that are real and belong to Fincado.
 */
export const BRAND_PROFILES: { name: string; url: string }[] = [];
