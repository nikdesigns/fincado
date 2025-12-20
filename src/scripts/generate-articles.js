const fs = require('fs');
const path = require('path');

/* ✅ WHERE DATA IS STORED */
const DATA_PATH = path.join(process.cwd(), 'src/data/articles.json');

/* ✅ THE MASTER LIST (Optimized Slugs & Titles) */
const topics = [
  {
    slug: 'emi-calculator-guide-2025',
    title: 'EMI Calculator Guide 2025: Formulas & Tax Benefits',
    keyword: 'EMI Calculator',
    category: 'Loans & Mortgages',
    metaDescription:
      'Master your loan EMI calculation. Learn the formula, tax benefits, prepayment strategies, and new RBI guidelines.',
  },
  {
    slug: 'fd-interest-rates-guide',
    title: 'FD Guide 2025: Interest, Tax, and Inflation Risks',
    keyword: 'Fixed Deposit',
    category: 'Savings & FD',
    metaDescription:
      'FDs are safe but losing value to inflation? Learn about FD interest calculation, taxation rules, and real vs nominal returns.',
  },
  {
    slug: 'gst-explained-guide',
    title: 'GST Guide 2025: For Individuals & Small Businesses',
    keyword: 'GST',
    category: 'Taxation',
    metaDescription:
      'Goods and Services Tax (GST) simplified. Understand slabs, Reverse Charge Mechanism (RCM), and Input Tax Credit (ITC).',
  },
  {
    slug: 'home-loan-eligibility-guide',
    title: 'Home Loan Guide 2025: Eligibility & Tax Benefits',
    keyword: 'Home Loan',
    category: 'Loans & Mortgages',
    metaDescription:
      'A complete handbook for first-time home buyers. Covers eligibility, FOIR calculation, tax benefits (80C/24B), and checklists.',
  },
  {
    slug: 'cibil-score-guide-india',
    title: 'Credit Score Guide 2025: How CIBIL Works in India',
    keyword: 'Credit Score',
    category: 'Credit Score',
    metaDescription:
      'Understand your CIBIL score range, factors affecting it, the 30% utilization rule, and a step-by-step plan to improve your score.',
  },
  {
    slug: 'inflation-impact-guide',
    title: 'Inflation Guide: Impact & Wealth Protection Strategies',
    keyword: 'Inflation',
    category: 'Financial Literacy',
    metaDescription:
      "Don't let inflation erode your savings. Learn the difference between Real vs Nominal returns and which assets truly beat inflation.",
  },
  {
    slug: 'personal-loan-rates-guide',
    title: 'Personal Loan Rates India 2025: Comparison Guide',
    keyword: 'Personal Loan',
    category: 'Loans & Mortgages',
    metaDescription:
      'Compare personal loan interest rates (10.5%-24%) across banks. Understand flat vs reducing balance rates and how to negotiate.',
  },
  {
    slug: 'retirement-corpus-guide',
    title: 'Retirement Planning: Strategy & Corpus Calculation',
    keyword: 'Retirement Planning',
    category: 'Retirement',
    metaDescription:
      "Don't guess your retirement number. Use our scientific approach to calculate corpus, understand inflation, and master the EPF+PPF+NPS mix.",
  },
  {
    slug: 'sip-investment-strategies',
    title: 'SIP Investment Guide 2025: Strategy & Tax Rules',
    keyword: 'SIP Investment',
    category: 'Mutual Funds & SIP',
    metaDescription:
      'Complete SIP guide covering compounding magic, SIP vs Lump Sum analysis, age-wise investment strategies, and tax rules.',
  },
  {
    slug: 'sip-vs-fd-comparison',
    title: 'SIP vs FD: Better Option in 2025? (Returns Analysis)',
    keyword: 'SIP vs FD',
    category: 'Investments',
    metaDescription:
      'The ultimate battle: SIP vs FD. We compare 10 & 20-year returns, taxation, and inflation impact.',
  },
];

/* ✅ MOCK CONTENT GENERATOR */
function generateMockContent(topicTitle, keyword) {
  return `
<h2>What is ${keyword}?</h2>
<p>${keyword} is an essential financial concept for Indian investors and borrowers.</p>
<h2>Key Benefits</h2>
<ul>
  <li>Better financial planning</li>
  <li>Long-term wealth creation</li>
  <li>Risk management</li>
</ul>
<h2>Conclusion</h2>
<p>Understanding ${keyword} is the first step towards financial freedom.</p>
`;
}

/* ✅ MAIN GENERATOR */
function generateArticles() {
  const newArticles = topics.map((topic) => {
    return {
      slug: topic.slug,
      title: topic.title,
      category: topic.category,
      seoTitle: `${topic.title} | Fincado`,
      metaDescription: topic.metaDescription,
      content: generateMockContent(topic.title, topic.keyword),
      published: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    };
  });

  // Ensure directory exists
  const dir = path.dirname(DATA_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(DATA_PATH, JSON.stringify(newArticles, null, 2));
  console.log(`✅ Successfully generated ${newArticles.length} SEO articles.`);
}

// Run immediately
generateArticles();
