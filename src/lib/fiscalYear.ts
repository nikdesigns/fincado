/**
 * Fiscal Year utilities for Indian Financial Year (April 1 - March 31)
 */

/**
 * Get the current Indian Fiscal Year
 * FY runs from April 1 to March 31
 * @returns Object with current FY details
 */
export function getCurrentFiscalYear() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-indexed (0 = January, 3 = April)

  // If current month is April (3) or later, we're in FY starting this year
  // If before April, we're still in FY that started last year
  const fyStartYear = currentMonth >= 3 ? currentYear : currentYear - 1;
  const fyEndYear = fyStartYear + 1;

  return {
    startYear: fyStartYear,
    endYear: fyEndYear,
    fullFormat: `FY ${fyStartYear}-${fyEndYear.toString().slice(-2)}`, // "FY 2025-26"
    longFormat: `FY ${fyStartYear}-${fyEndYear}`, // "FY 2025-2026"
    shortYear: fyEndYear, // 2026
    budgetYear: fyEndYear, // "Budget 2026"
  };
}

/**
 * Get next fiscal year
 */
export function getNextFiscalYear() {
  const current = getCurrentFiscalYear();
  return {
    startYear: current.startYear + 1,
    endYear: current.endYear + 1,
    fullFormat: `FY ${current.startYear + 1}-${(current.endYear + 1).toString().slice(-2)}`,
    longFormat: `FY ${current.startYear + 1}-${current.endYear + 1}`,
    shortYear: current.endYear + 1,
    budgetYear: current.endYear + 1,
  };
}

/**
 * Get a formatted string for "Updated for FY" badges
 */
export function getUpdatedForFYText(): string {
  const fy = getCurrentFiscalYear();
  return `Updated for ${fy.fullFormat}`;
}

/**
 * Get Budget year text
 */
export function getBudgetYearText(): string {
  const fy = getCurrentFiscalYear();
  return `Budget ${fy.budgetYear}`;
}

/**
 * Get the year for Union Budget references
 */
export function getUnionBudgetText(): string {
  const fy = getCurrentFiscalYear();
  return `Union Budget ${fy.budgetYear}`;
}

/**
 * Check if we're in a specific fiscal year
 */
export function isInFiscalYear(year: number): boolean {
  const current = getCurrentFiscalYear();
  return current.startYear === year || current.endYear === year;
}

/**
 * Get assessment year (one year ahead of fiscal year)
 */
export function getAssessmentYear() {
  const fy = getCurrentFiscalYear();
  return {
    startYear: fy.startYear + 1,
    endYear: fy.endYear + 1,
    fullFormat: `AY ${fy.startYear + 1}-${(fy.endYear + 1).toString().slice(-2)}`,
  };
}
