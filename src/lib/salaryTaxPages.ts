/** Salary levels that have a "Tax on ₹X lakh salary" guide. */
export interface SalaryTaxPage {
  lakh: number;
  slug: string;
  href: string;
  published: string;
}

const LEVELS: { lakh: number; published: string }[] = [
  { lakh: 6, published: '2025-02-15' },
  { lakh: 7.5, published: '2025-02-15' },
  { lakh: 8, published: '2025-02-15' },
  { lakh: 9, published: '2025-02-15' },
  { lakh: 10, published: '2025-02-15' },
  { lakh: 11, published: '2025-02-15' },
  { lakh: 12, published: '2025-02-15' },
  { lakh: 12.75, published: '2026-10-13' },
  { lakh: 13, published: '2026-10-13' },
  { lakh: 14, published: '2025-02-15' },
  { lakh: 15, published: '2025-02-15' },
  { lakh: 16, published: '2025-02-15' },
  { lakh: 18, published: '2025-02-15' },
  { lakh: 20, published: '2025-02-15' },
  { lakh: 22, published: '2026-10-13' },
  { lakh: 25, published: '2025-02-15' },
  { lakh: 30, published: '2025-02-15' },
  { lakh: 35, published: '2026-10-13' },
  { lakh: 40, published: '2026-10-13' },
  { lakh: 50, published: '2026-10-13' },
];

export const salarySlug = (lakh: number) =>
  `tax-on-${String(lakh).replace('.', '-')}-lakh-salary`;

export const SALARY_TAX_PAGES: SalaryTaxPage[] = LEVELS.map((l) => {
  const slug = salarySlug(l.lakh);
  return { ...l, slug, href: `/guides/${slug}/` };
});

export function getSalaryTaxPage(lakh: number): SalaryTaxPage {
  const page = SALARY_TAX_PAGES.find((p) => p.lakh === lakh);
  if (!page) throw new Error(`No salary tax page for ${lakh} lakh`);
  return page;
}
