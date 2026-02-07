// src/utils/formatMonthYear.ts
export function getCurrentMonthYearLabel() {
  const date = new Date();
  const month = date.toLocaleString('en-IN', { month: 'short' }); // Feb, Mar, etc.
  const year = date.getFullYear();
  return `${month} ${year}`;
}
