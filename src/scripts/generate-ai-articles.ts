// src/scripts/generate-ai-articles.ts
// CommonJS-style script but written in TypeScript with explicit types
// Run with: npx ts-node --transpile-only src/scripts/generate-ai-articles.ts

const fs = require('fs');
const path = require('path');

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
  // This template deliberately includes AD placeholders for later replacement/adsense injection
  const safeSeed = escapeHtml(seed);
  const safeTitle = escapeHtml(title);

  return `\n<h1>${safeTitle}</h1>\n\n<p>Detailed and practical guide on <strong>${safeSeed}</strong>. This article includes worked examples, clear steps, pros &amp; cons, and FAQs to help you act with confidence.</p>\n\n<h2>Why this matters</h2>\n<p>Short explanation of why ${safeSeed.toLowerCase()} matters for an Indian user. Key considerations and what to watch.</p>\n\n<!-- AD -->\n\n<h2>How ${safeSeed} works — step by step</h2>\n<ol>\n<li>Step 1 — what to enter</li>\n<li>Step 2 — how to interpret output</li>\n<li>Step 3 — next actions</li>\n</ol>\n\n<h2>Worked example</h2>\n<p>Example: If you borrow ₹5,00,000 at 10% for 3 years, the EMI will be ... (show calculation).</p>\n\n<!-- AD -->\n\n<h2>Pros &amp; Cons</h2>\n<table class="rate-table">\n<tr><th>Pros</th><th>Cons</th></tr>\n<tr><td>Fast planning</td><td>Estimates only</td></tr>\n</table>\n\n<h2>Practical tips</h2>\n<ul>\n<li>Tip 1</li>\n<li>Tip 2</li>\n</ul>\n\n<!-- AD -->\n\n<h2>FAQs</h2>\n<h3>Is this accurate?</h3>\n<p>Yes for planning — banks may differ on exact numbers.</p>\n\n<h2>Conclusion</h2>\n<p>Use the tool, compare offers, and check your credit score before applying.</p>\n`;
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

// Number of articles to generate in one run
const NUM = 12;

function ensureUniqueSlug(base: string, existing: Set<string>): string {
  let candidate = base;
  let i = 1;
  while (existing.has(candidate)) {
    candidate = `${base}-${i}`;
    i += 1;
  }
  return candidate;
}

function main(): void {
  const newArticles: Article[] = [];

  // read existing if any
  let existing: Article[] = [];
  if (fs.existsSync(OUT_PATH)) {
    try {
      const raw = fs.readFileSync(OUT_PATH, 'utf8');
      existing = JSON.parse(raw) as Article[];
    } catch (err) {
      console.warn(
        `Warning: couldn't parse existing ${OUT_PATH} — will overwrite with fresh array.`
      );
      existing = [];
    }
  }

  const existingSlugs = new Set<string>((existing || []).map((a) => a.slug));

  for (let i = 0; i < NUM; i++) {
    const s = seeds[i % seeds.length];
    const title = genTitle(s.seed);
    const baseSlug = slugify(title);
    const uniqueSlug = ensureUniqueSlug(
      `${baseSlug}-${Date.now().toString().slice(-5)}-${Math.random()
        .toString(36)
        .slice(2, 6)}`,
      existingSlugs
    );

    existingSlugs.add(uniqueSlug);

    const article: Article = {
      slug: uniqueSlug,
      title,
      category: s.category,
      seoTitle: `${title} | Fincado`,
      metaDescription: `Practical ${s.seed} guide — examples and FAQs.`,
      content: generateContent(s.seed, title),
      published: new Date().toISOString(),
    };

    newArticles.push(article);
  }

  const merged = Array.isArray(existing)
    ? existing.concat(newArticles)
    : newArticles;

  // ensure directory exists and write file
  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(merged, null, 2), 'utf8');

  console.log(
    `✅ Generated ${newArticles.length} articles. Total now: ${merged.length}`
  );
  console.log(`Wrote ${OUT_PATH}`);
}

main();
