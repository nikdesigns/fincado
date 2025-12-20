const fs = require('fs');
const path = require('path');

/* ===== CONFIG ===== */
const DATA_PATH = path.join(process.cwd(), 'src/data/articles.json');
const TODAY = new Date().toISOString().split('T')[0];

/* ===== MASTER TOPICS ===== */
const topics = [
  {
    slug: 'emi-calculator-guide-2025',
    title: 'EMI Calculator Guide 2025: Formulas, Examples & Smart Planning',
    keyword: 'EMI Calculator',
    category: 'Loans & Mortgages',
    metaDescription:
      'Learn how EMI is calculated, how tenure and interest affect cost, prepayment strategies, and RBI-linked loan behaviour.',
  },
  {
    slug: 'sip-investment-strategies',
    title: 'SIP Investment Guide 2025: Strategy, Returns & Tax Rules',
    keyword: 'SIP Investment',
    category: 'Mutual Funds & SIP',
    metaDescription:
      'Understand SIP compounding, SIP vs lump sum, market cycles, tax rules, and long-term wealth strategies.',
  },
  {
    slug: 'credit-score-guide-india',
    title: 'Credit Score Guide 2025: How CIBIL Works in India',
    keyword: 'Credit Score',
    category: 'Credit Score',
    metaDescription:
      'Learn how credit scores are calculated, why 750+ matters, and a practical plan to fix low scores.',
  },
];

/* ===== RICH CONTENT ENGINE ===== */
function generateRichContent(keyword) {
  return `
<section>
  <p>
    <strong>${keyword}</strong> is not just a financial term — it directly affects
    how much you pay, how quickly you build wealth, and how lenders judge your
    financial discipline in India.
  </p>
</section>

<h2>Why ${keyword} Matters in Real Life</h2>
<p>
  Most financial mistakes don’t happen due to lack of income, but due to
  <em>misunderstanding how money behaves over time</em>.
  ${keyword} plays a central role in this.
</p>

<ul>
  <li>It determines long-term cost, not just monthly affordability</li>
  <li>Small changes compound into large financial outcomes</li>
  <li>Banks price risk based on behaviour, not intentions</li>
</ul>

<h2>How It Works (Explained Simply)</h2>
<p>
  In India, most banks follow RBI-linked benchmarks and standardized formulas.
  However, outcomes vary dramatically based on tenure, timing, and discipline.
</p>

<div class="callout-box">
  <strong>Reality Check:</strong> Two people with the same income can pay vastly
  different interest amounts for the same loan or investment.
</div>

<h3>Illustrative Example</h3>
<table class="data-table">
  <thead>
    <tr>
      <th>Scenario</th>
      <th>Decision</th>
      <th>Long-Term Impact</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Conservative approach</td>
      <td>Long tenure, no prepayment</td>
      <td>Lower EMI, higher total interest</td>
    </tr>
    <tr>
      <td>Optimized approach</td>
      <td>Prepayment + tenure control</td>
      <td>Saves years of interest</td>
    </tr>
  </tbody>
</table>

<h2>Common Myths Indians Believe</h2>
<ul>
  <li><strong>“Lower EMI means cheaper loan”</strong> — Not true</li>
  <li><strong>“Good salary guarantees best rates”</strong> — Credit history matters more</li>
  <li><strong>“Banks automatically optimize loans”</strong> — They don’t</li>
</ul>

<h2>Expert Observations (What Most People Miss)</h2>
<p>
  Financial planning is less about chasing returns and more about
  <strong>controlling leakage</strong> — unnecessary interest, taxes, penalties,
  and inflation drag.
</p>

<div class="callout-box warning-box">
  <strong>⚠️ Caution:</strong> Small delays, poor structuring, or emotional decisions
  can silently cost lakhs over time.
</div>

<h2>Actionable Planning Checklist</h2>
<ul>
  <li>Use calculators before committing</li>
  <li>Stress-test EMI or SIP for rate changes</li>
  <li>Track credit behaviour quarterly</li>
  <li>Revisit decisions annually</li>
</ul>

<h2>Final Thoughts</h2>
<p>
  Mastery of ${keyword} is not about complexity — it’s about
  <strong>clarity and consistency</strong>.
  The best financial outcomes usually come from boring, disciplined decisions
  repeated over time.
</p>
`;
}

/* ===== GENERATOR ===== */
function generateArticles() {
  const articles = topics.map((topic) => ({
    slug: topic.slug,
    title: topic.title,
    category: topic.category,
    seoTitle: `${topic.title} | Fincado`,
    metaDescription: topic.metaDescription,
    content: generateRichContent(topic.keyword),
    published: TODAY,
    reviewed: false,
    editorialNote:
      'This is a draft article generated for editorial review. Verify facts, update data points, and personalize examples before publishing.',
  }));

  fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
  fs.writeFileSync(DATA_PATH, JSON.stringify(articles, null, 2));

  console.log(`✅ Generated ${articles.length} long-form editorial drafts.`);
}

generateArticles();
