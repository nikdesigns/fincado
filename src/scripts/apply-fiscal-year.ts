/**
 * Dry run:
 *   npx tsx src/scripts/apply-fiscal-year.ts
 *
 * Write:
 *   npx tsx src/scripts/apply-fiscal-year.ts --write
 */

import fs from 'node:fs';
import path from 'node:path';
import {
  getCurrentFiscalYear,
  getAssessmentYear,
  getBudgetYearText,
} from '../lib/fiscalYear';

const WRITE = process.argv.includes('--write');
const ROOT = process.cwd();

const fy = getCurrentFiscalYear();
const ay = getAssessmentYear();
const budgetText = getBudgetYearText();

const TARGETS = [
  'src/components/LegalNote.tsx',
  'src/components/InlineTaxCalculator.tsx',
  'src/components/LiveRateTable.tsx',
  'src/components/FinancialNavWidget.tsx',
  'src/components/TaxRegimeWidget.tsx',
  'src/app/terms/page.tsx',
  'src/app/privacy-policy/page.tsx',
  'src/app/disclaimer/page.tsx',
  'src/app/cookie-policy/page.tsx',
];

function replaceContent(input: string): string {
  let out = input;

  // FY / AY literals
  out = out.replace(/\bFY\s+\d{4}-\d{2}\b/g, fy.fullFormat);
  out = out.replace(/\bAY\s+\d{4}-\d{2}\b/g, ay.fullFormat);

  // Budget literals
  out = out.replace(/\bBudget\s+\d{4}\b/g, budgetText);
  out = out.replace(
    /\bUnion Budget\s+\d{4}\b/g,
    `Union Budget ${fy.budgetYear}`,
  );

  // Year-only labels (careful broad replacement)
  out = out.replace(
    /\bInterest Rates\s+20\d{2}\b/g,
    `Interest Rates ${fy.budgetYear}`,
  );
  out = out.replace(/\bRates\s+20\d{2}\b/g, `Rates ${fy.budgetYear}`);

  // Last updated constants (Month Year)
  const monthYear = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  out = out.replace(
    /const\s+LAST_UPDATED\s*=\s*['"][A-Za-z]+\s+\d{4}['"]/g,
    `const LAST_UPDATED = '${monthYear}'`,
  );

  // dateTime="YYYY-MM-DD"
  const isoToday = new Date().toISOString().slice(0, 10);
  out = out.replace(
    /dateTime=["']\d{4}-\d{2}-\d{2}["']/g,
    `dateTime="${isoToday}"`,
  );

  return out;
}

let changed = 0;
let scanned = 0;

for (const rel of TARGETS) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) {
    console.log(`⚠️ Missing: ${rel}`);
    continue;
  }

  scanned++;
  const before = fs.readFileSync(file, 'utf8');
  const after = replaceContent(before);

  if (before !== after) {
    changed++;
    if (WRITE) {
      fs.writeFileSync(file, after, 'utf8');
      console.log(`✅ Updated: ${rel}`);
    } else {
      console.log(`🟡 Would update: ${rel}`);
    }
  } else {
    console.log(`— No change: ${rel}`);
  }
}

console.log('\nSummary');
console.log(`Scanned: ${scanned}`);
console.log(`Changed: ${changed}`);
console.log(`Mode: ${WRITE ? 'WRITE' : 'DRY RUN'}`);
console.log(
  `Using FY: ${fy.fullFormat}, AY: ${ay.fullFormat}, Budget: ${fy.budgetYear}`,
);
