const fs = require('fs');
const path = require('path');

interface Article {
  slug: string;
  title: string;
  category: string;
  seoTitle: string;
  metaDescription: string;
  content: string;
}

const OUT_PATH = path.join(process.cwd(), 'src/data/articles.json');

/* ✅ TOPIC ENGINE (REAL FINANCE TOPICS) */
const topics = [
  { seed: 'Personal Loan', category: 'loans' },
  { seed: 'Home Loan', category: 'loans' },
  { seed: 'SIP Investment', category: 'investing' },
  { seed: 'FD Interest Rates', category: 'investing' },
  { seed: 'EMI Calculator', category: 'calculators' },
];

const variations = [
  'Complete Guide',
  'Eligibility, Interest & Tips',
  'How It Works in India',
  'Benefits, Risks & Tax',
  'Beginner to Advanced Guide',
];

const NEW_PER_RUN = 8;

/* ✅ UTILITIES */
function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|$)/g, '');
}

function rnd(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ✅ HIGH-QUALITY FINANCE CONTENT ENGINE */
function buildProfessionalContent(title: string, topic: string) {
  return `
<h1>${title}</h1>

<p>${topic} is one of the most commonly used financial tools in India. Whether you're salaried or self-employed, understanding how ${topic.toLowerCase()} works helps you save money and avoid bad debt.</p>

<h2>What is ${topic}?</h2>
<p>${topic} is a financial product that allows individuals to access funds for specific purposes while repaying through monthly EMIs or systematic investments depending on the category.</p>

<h2>How ${topic} Works in India</h2>
<ul>
  <li>Interest is calculated using RBI approved methods</li>
  <li>Tenure ranges from 6 months to 30 years</li>
  <li>Your CIBIL score directly impacts approval</li>
</ul>

<!-- AD -->

<h2>Eligibility Criteria</h2>
<ul>
  <li>Age: 21–65 years</li>
  <li>Minimum monthly income</li>
  <li>Stable job or business proof</li>
  <li>Credit score above 700 preferred</li>
</ul>

<h2>Interest Rates in 2025</h2>
<p>Interest rates typically range between 8.45% to 24% depending on your profile and lender.</p>

<!-- AD -->

<h2>How EMI / Returns Are Calculated</h2>
<p>You can calculate monthly EMIs or investment returns using standard formulas or by using our in-built calculators.</p>

<h2>Advantages</h2>
<ul>
  <li>Quick access to funds</li>
  <li>Predictable monthly payments</li>
  <li>Tax benefits in applicable cases</li>
</ul>

<h2>Risks & Common Mistakes</h2>
<ul>
  <li>Taking longer tenure than necessary</li>
  <li>Ignoring foreclosure charges</li>
  <li>Missing EMIs leading to credit damage</li>
</ul>

<!-- AD -->

<h2>Tax Benefits (If Applicable)</h2>
<ul>
  <li>Section 80C – Principal benefits</li>
  <li>Section 24 – Interest benefits</li>
</ul>

<h2>Final Verdict</h2>
<p>${topic} can be a powerful financial tool when used wisely. Always compare multiple lenders, calculate your EMI properly, and ensure the repayment fits your income.</p>
`;
}

/* ✅ GENERATE ARTICLES */
const newArticles: Article[] = [];

for (let i = 0; i < NEW_PER_RUN; i++) {
  const t = topics[i % topics.length];
  const variation = rnd(variations);
  const title = `${t.seed} – ${variation}`;

  const slug = `${slugify(title)}-${Math.random().toString(36).slice(2, 7)}`;

  newArticles.push({
    slug,
    title,
    category: t.category,
    seoTitle: `${title} | Fincado`,
    metaDescription: `Learn everything about ${t.seed} including eligibility, interest rates, EMI calculation, risks and benefits in India.`,
    content: buildProfessionalContent(title, t.seed),
  });
}

/* ✅ MERGE WITH EXISTING */
let existing: Article[] = [];
if (fs.existsSync(OUT_PATH)) {
  try {
    existing = JSON.parse(fs.readFileSync(OUT_PATH, 'utf8'));
  } catch {
    existing = [];
  }
}

const merged = [...existing, ...newArticles];

fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
fs.writeFileSync(OUT_PATH, JSON.stringify(merged, null, 2), 'utf8');

console.log(
  `✅ Generated ${newArticles.length} HIGH-QUALITY financial articles`
);
console.log(`✅ Total articles now: ${merged.length}`);
