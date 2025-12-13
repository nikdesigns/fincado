import * as fs from 'fs';
import * as path from 'path';

/* ✅ ARTICLE TYPE */
type Article = {
  slug: string;
  title: string;
  category: string;
  seoTitle: string;
  metaDescription: string;
  content: string; // HTML content
};

/* ✅ WHERE DATA IS STORED */
const DATA_PATH = path.join(process.cwd(), 'src/data/articles.json');

/* ✅ YOUR SEO TOPICS (ADD UNLIMITED) */
const topics = [
  {
    title: 'EMI Calculator – Complete Guide for Beginners',
    keyword: 'EMI Calculator',
    category: 'calculators',
  },
  {
    title: 'Personal Loan Interest Rates in India – 2025 Guide',
    keyword: 'Personal Loan Interest Rate',
    category: 'loans',
  },
  {
    title: 'SIP Investment – How to Start SIP for Monthly Income',
    keyword: 'SIP Investment',
    category: 'investing',
  },
];

/* ✅ MOCK AI CONTENT (FOR NOW — LATER WE AUTO-INJECT GPT) */
function generateMockContent(topic: string, keyword: string): string {
  return `
<h2>What is ${keyword}?</h2>
<p>${keyword} is one of the most important financial tools used by Indian borrowers to plan loans and manage repayments effectively.</p>

<h2>How ${keyword} Works</h2>
<p>The ${keyword} works using the standard financial formula that considers loan amount, interest rate and tenure.</p>

<h2>Benefits of Using ${keyword}</h2>
<ul>
  <li>Accurate calculations</li>
  <li>Better financial planning</li>
  <li>Saves time</li>
  <li>No manual errors</li>
</ul>

<h2>Real Life Example</h2>
<p>If you take a loan of ₹5,00,000 at 10% interest for 3 years, your monthly EMI will be approximately ₹16,134.</p>

<h2>Pros & Cons</h2>
<table class="rate-table">
  <tr><th>Pros</th><th>Cons</th></tr>
  <tr><td>Fast</td><td>Needs accurate inputs</td></tr>
  <tr><td>Free</td><td>Does not account for penalties</td></tr>
</table>

<h2>FAQs</h2>
<h3>Is ${keyword} accurate?</h3>
<p>Yes, it uses standard RBI-approved formulas.</p>

<h3>Is it free?</h3>
<p>Yes, 100% free on Fincado.</p>

<h3>Can I apply for a loan after using it?</h3>
<p>Yes, you can compare offers instantly.</p>

<h3>Does it affect credit score?</h3>
<p>No, using calculators never affects your CIBIL score.</p>

<h3>Is it safe?</h3>
<p>Yes, Fincado never stores personal data.</p>

<h2>Conclusion</h2>
<p>${keyword} is an essential financial tool that every borrower should use before making any loan decision.</p>
`;
}

/* ✅ MAIN GENERATOR */
function generateArticles() {
  let existing: Article[] = [];

  if (fs.existsSync(DATA_PATH)) {
    existing = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  }

  const newArticles: Article[] = topics.map((topic) => {
    const slug = topic.title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-');

    return {
      slug,
      title: topic.title,
      category: topic.category,
      seoTitle: `${topic.title} | Fincado`,
      metaDescription: `Learn everything about ${topic.keyword}. Updated 2025 guide with examples, benefits, FAQ and expert tips.`,
      content: generateMockContent(topic.title, topic.keyword),
    };
  });

  fs.writeFileSync(DATA_PATH, JSON.stringify(newArticles, null, 2));
  console.log('✅ SEO Articles Generated Successfully');
}

generateArticles();
