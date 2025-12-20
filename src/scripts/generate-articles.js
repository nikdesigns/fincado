const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(process.cwd(), 'src/data/articles.json');

/* ✅ SAME TOPICS YOU ALREADY PUBLISHED */
const topics = [
  {
    slug: 'emi-calculator-guide',
    title: 'EMI Calculator – Complete Guide',
    keyword: 'EMI Calculator',
    category: 'Loans & Mortgages',
    metaDescription:
      'Understand EMI calculation, formula, tax benefits, prepayment strategies and credit score impact.',
  },
  {
    slug: 'fd-truths',
    title: 'Fixed Deposit Guide: Interest, Tax & Inflation',
    keyword: 'Fixed Deposit',
    category: 'Savings & FD',
    metaDescription:
      'Learn how FD interest works, taxation rules, and why inflation reduces real returns.',
  },
  {
    slug: 'gst-explained',
    title: 'GST Explained for Individuals & Small Businesses',
    keyword: 'GST',
    category: 'Taxation',
    metaDescription:
      'GST simplified: slabs, reverse charge, ITC and common mistakes.',
  },
  {
    slug: 'home-loan-first-time-buyers',
    title: 'Home Loan for First-Time Buyers (India)',
    keyword: 'Home Loan',
    category: 'Loans & Mortgages',
    metaDescription:
      'Eligibility, FOIR, down payment rules, tax benefits and mistakes to avoid.',
  },
  {
    slug: 'how-credit-score-works-india',
    title: 'Credit Score Guide (CIBIL Focus)',
    keyword: 'Credit Score',
    category: 'Credit Score',
    metaDescription:
      'CIBIL score range, factors, EMI impact and step-by-step improvement plan.',
  },
  {
    slug: 'sip-investment-guide',
    title: 'SIP Investment Guide (Beginner to Advanced)',
    keyword: 'SIP Investment',
    category: 'Mutual Funds & SIP',
    metaDescription:
      'How SIP works, compounding, tax rules, returns and common mistakes.',
  },
  {
    slug: 'sip-vs-fd',
    title: 'SIP vs FD – Which Is Better?',
    keyword: 'SIP vs FD',
    category: 'Investments',
    metaDescription:
      'Compare SIP vs FD returns, taxation and inflation-adjusted performance.',
  },
  {
    slug: 'retirement-planning-india',
    title: 'Retirement Planning Guide (India)',
    keyword: 'Retirement Planning',
    category: 'Retirement',
    metaDescription:
      'Inflation-adjusted retirement planning using EPF, PPF and NPS.',
  },
];

/* ✅ HUMAN-LIKE CONTENT ENGINE */
function generateRichContent(title, keyword) {
  return `
<section>
  <p>
    ${keyword} is one of the most important financial concepts for Indian households.
    However, most people use it without fully understanding the long-term impact
    on their money, credit score, and financial stability.
  </p>
</section>

<h2>Why ${keyword} Matters in Real Life</h2>
<p>
  Decisions related to ${keyword} directly affect your monthly cash flow,
  long-term wealth creation, and even your eligibility for future loans.
</p>

<h2>Common Mistakes People Make</h2>
<ul>
  <li>Relying only on headline numbers without understanding hidden costs</li>
  <li>Ignoring inflation while planning long-term commitments</li>
  <li>Making emotional decisions instead of data-driven ones</li>
</ul>

<h2>Expert Insight</h2>
<p>
  Financial planners recommend revisiting ${keyword}-related decisions
  at least once every year. Even small optimisations can save or earn
  lakhs of rupees over time.
</p>

<h2>Final Thoughts</h2>
<p>
  ${keyword} is not just a calculation or product — it is a strategy.
  Use the right tools, understand the risks, and plan with a long-term mindset.
</p>
`;
}

/* ✅ SAFE UPGRADE RUNNER */
function run() {
  let existing = [];

  if (fs.existsSync(DATA_PATH)) {
    existing = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  }

  const bySlug = new Map(existing.map((a) => [a.slug, a]));

  topics.forEach((topic) => {
    if (bySlug.has(topic.slug)) {
      // 🔁 Upgrade existing article content only
      const article = bySlug.get(topic.slug);
      article.content = generateRichContent(topic.title, topic.keyword);
      article.updated = new Date().toISOString().split('T')[0];
    } else {
      // ➕ Add missing article safely
      bySlug.set(topic.slug, {
        slug: topic.slug,
        title: topic.title,
        category: topic.category,
        seoTitle: `${topic.title} | Fincado`,
        metaDescription: topic.metaDescription,
        content: generateRichContent(topic.title, topic.keyword),
        published: new Date().toISOString().split('T')[0],
      });
    }
  });

  const finalArticles = Array.from(bySlug.values());

  fs.writeFileSync(DATA_PATH, JSON.stringify(finalArticles, null, 2));
  console.log(`✅ Safely upgraded ${topics.length} published articles`);
}

run();
