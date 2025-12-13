/* eslint-disable no-console */
/**
 * Run with:
 * npx ts-node --transpile-only src/scripts/generate-ai-articles.ts
 *
 * This file is a Node-only script (not part of Next.js runtime)
 */

import fs from 'node:fs';
import path from 'node:path';

export {}; // ⬅️ ensures this file is treated as a module

type Article = {
  slug: string;
  title: string;
  category: string;
  seoTitle: string;
  metaDescription: string;
  content: string;
  published?: string;
};

const OUT_PATH = path.join(process.cwd(), 'src', 'data', 'articles.json');

const seeds: { seed: string; category: string }[] = [
  { seed: 'EMI Calculator', category: 'calculators' },
  { seed: 'Personal Loan', category: 'loans' },
  { seed: 'SIP Investment', category: 'investing' },
];

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function generateContent(seed: string, title: string): string {
  const safeSeed = escapeHtml(seed);
  const safeTitle = escapeHtml(title);

  return `
<h1>${safeTitle}</h1>

<p>Detailed and practical guide on <strong>${safeSeed}</strong>. This article includes worked examples, clear steps, pros &amp; cons, and FAQs to help you act with confidence.</p>

<h2>Why this matters</h2>
<p>Short explanation of why ${safeSeed.toLowerCase()} matters for an Indian user.</p>

<!-- AD -->

<h2>How ${safeSeed} works — step by step</h2>
<ol>
<li>Step 1 — what to enter</li>
<li>Step 2 — how to interpret output</li>
<li>Step 3 — next actions</li>
</ol>

<h2>Worked example</h2>
<p>Example: If you borrow ₹5,00,000 at 10% for 3 years, the EMI will be ...</p>

<!-- AD -->

<h2>Pros &amp; Cons</h2>
<table class="rate-table">
<tr><th>Pros</th><th>Cons</th></tr>
<tr><td>Fast planning</td><td>Estimates only</td></tr>
</table>

<h2>FAQs</h2>
<p>Use the tool, compare offers, and check your credit score before applying.</p>
`;
}

const adjectives = ['Practical', 'Updated', 'Quick', 'Essential', 'Complete'];
const templates = [
  '{adj} {seed} Guide',
  '{seed} — {adj} Steps',
  '{adj} {seed} Explained',
];

function genTitle(seed: string): string {
  const adj = pick(adjectives);
  const tpl = pick(templates);
  return tpl.replace('{adj}', adj).replace('{seed}', seed);
}

const NUM = 12;

function ensureUniqueSlug(base: string, existing: Set<string>): string {
  let candidate = base;
  let i = 1;
  while (existing.has(candidate)) {
    candidate = `${base}-${i++}`;
  }
  return candidate;
}

function main(): void {
  let existing: Article[] = [];

  if (fs.existsSync(OUT_PATH)) {
    try {
      existing = JSON.parse(fs.readFileSync(OUT_PATH, 'utf8')) as Article[];
    } catch {
      console.warn('⚠️ Existing articles file invalid — overwriting.');
    }
  }

  const existingSlugs = new Set(existing.map((a) => a.slug));
  const newArticles: Article[] = [];

  for (let i = 0; i < NUM; i++) {
    const s = seeds[i % seeds.length];
    const title = genTitle(s.seed);

    const uniqueSlug = ensureUniqueSlug(
      `${slugify(title)}-${Date.now().toString().slice(-5)}-${Math.random()
        .toString(36)
        .slice(2, 6)}`,
      existingSlugs
    );

    existingSlugs.add(uniqueSlug);

    newArticles.push({
      slug: uniqueSlug,
      title,
      category: s.category,
      seoTitle: `${title} | Fincado`,
      metaDescription: `Practical ${s.seed} guide — examples and FAQs.`,
      content: generateContent(s.seed, title),
      published: new Date().toISOString(),
    });
  }

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(
    OUT_PATH,
    JSON.stringify(existing.concat(newArticles), null, 2),
    'utf8'
  );

  console.log(`✅ Generated ${newArticles.length} articles`);
}

main();
