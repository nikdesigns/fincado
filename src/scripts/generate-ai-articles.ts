const fs = require('fs');
const path = require('path');

/* ✅ TYPE */
type Article = {
  slug: string;
  title: string;
  category: string;
  seoTitle: string;
  metaDescription: string;
  content: string;
};

const OUT_PATH = path.join(process.cwd(), 'src/data/articles.json');

/* ✅ MASS KEYWORD DATABASE */
const topics = {
  calculators: [
    'EMI Calculator for Education Loan',
    'EMI Calculator for Bike Loan',
    'EMI Calculator with Prepayment',
    'EMI Calculator for Self Employed',
  ],
  loans: [
    'Personal Loan for Salaried',
    'Personal Loan for Students',
    'Home Loan with PMAY Subsidy',
    'Home Loan for First Time Buyers',
  ],
  investing: [
    'SIP vs FD',
    'Best Mutual Funds for 2025',
    'SIP for Beginners',
    'Long Term vs Short Term Investing',
  ],
};

/* ✅ AI STYLE CONTENT TEMPLATE (SAFE & FAST) */
function aiGenerateArticle(topic: string, category: string): Article {
  const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const content = `
<h2>${topic} – Complete Guide</h2>
<p>This detailed guide explains everything about ${topic.toLowerCase()} including how it works, benefits, risks and expert tips.</p>

<h2>Who Should Use ${topic}?</h2>
<ul>
  <li>Salaried individuals</li>
  <li>Self-employed professionals</li>
  <li>First-time investors</li>
</ul>

<h2>Key Benefits</h2>
<ul>
  <li>Better financial planning</li>
  <li>Lower interest burden</li>
  <li>Smart investment decisions</li>
</ul>

<h2>How to Use ${topic}</h2>
<p>Using ${topic.toLowerCase()} is simple. Enter your amount, tenure and rate to get instant results.</p>

<h2>Common Mistakes</h2>
<ul>
  <li>Ignoring credit score</li>
  <li>Choosing wrong tenure</li>
  <li>Not comparing lenders</li>
</ul>

<h2>FAQs</h2>
<h3>Is ${topic.toLowerCase()} accurate?</h3>
<p>Yes, it provides accurate estimates for planning purposes.</p>

<h3>Is it free?</h3>
<p>Yes, all tools on Fincado are completely free.</p>

<h2>Conclusion</h2>
<p>${topic} helps you take smarter financial decisions with confidence.</p>
`;

  return {
    slug,
    title: topic,
    category,
    seoTitle: `${topic} – Calculator, Guide & Expert Tips`,
    metaDescription: `Complete guide on ${topic.toLowerCase()} with benefits, examples, FAQs and expert financial tips.`,
    content,
  };
}

/* ✅ GENERATE 1000+ SCALE */
const output: Article[] = [];

Object.entries(topics).forEach(([category, list]) => {
  list.forEach((topic) => {
    output.push(aiGenerateArticle(topic, category));
  });
});

/* ✅ MERGE WITH EXISTING ARTICLES */
let existing: Article[] = [];
if (fs.existsSync(OUT_PATH)) {
  existing = JSON.parse(fs.readFileSync(OUT_PATH, 'utf8'));
}

const merged = [...existing, ...output];

/* ✅ SAVE */
fs.writeFileSync(OUT_PATH, JSON.stringify(merged, null, 2));

console.log(`✅ ${output.length} AI Articles Generated & Merged Successfully`);
