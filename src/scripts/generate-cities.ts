import * as fs from 'fs';
import * as path from 'path';

/* ✅ TYPE DEFINITION */
type CityPage = {
  slug: string;
  loanType: string;
  city: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  content: string;
};

const DATA_PATH = path.join(process.cwd(), 'src/data/cities.json');

/* ✅ LOAN TYPES */
const loanTypes = [
  {
    type: 'personal-loan',
    title: 'Personal Loan',
  },
  {
    type: 'home-loan',
    title: 'Home Loan',
  }
];

/* ✅ INDIAN CITIES */
const cities = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Chennai',
  'Hyderabad',
  'Pune',
  'Kolkata',
  'Ahmedabad'
];

function generateContent(loan: string, city: string) {
  return `
<h2>${loan} in ${city}</h2>
<p>If you are looking for the best ${loan.toLowerCase()} in ${city}, Fincado helps you compare offers from top banks with the lowest EMI and fastest approval.</p>

<h2>Eligibility for ${loan} in ${city}</h2>
<ul>
  <li>Age between 21–60 years</li>
  <li>Minimum monthly income ₹15,000</li>
  <li>Good credit score</li>
</ul>

<h2>Interest Rates in ${city}</h2>
<p>Interest rates for ${loan.toLowerCase()} in ${city} start from 10.25% per annum depending on your profile.</p>

<h2>Documents Required</h2>
<ul>
  <li>Aadhaar Card</li>
  <li>PAN Card</li>
  <li>Salary Slips / Bank Statement</li>
</ul>

<h2>Why Apply via Fincado?</h2>
<ul>
  <li>Compare multiple banks instantly</li>
  <li>No impact on credit score</li>
  <li>Fast digital approval</li>
</ul>

<h2>FAQs</h2>
<h3>Can I get a ${loan.toLowerCase()} in ${city} with low CIBIL?</h3>
<p>Yes, some NBFCs approve loans even with low credit scores.</p>

<h3>How fast is approval in ${city}?</h3>
<p>Most approvals are completed within 24 hours.</p>

<h2>Conclusion</h2>
<p>Applying for a ${loan.toLowerCase()} in ${city} is easy and fast with Fincado. Compare offers, calculate EMI and apply online.</p>
`;
}

/* ✅ ✅ ✅ FIXED: TYPED ARRAY */
const pages: CityPage[] = [];

loanTypes.forEach((loan) => {
  cities.forEach((city) => {
    const slug = `${loan.type}-${city.toLowerCase()}`;

    pages.push({
      slug,
      loanType: loan.type,
      city,
      title: `${loan.title} in ${city} – Apply Online`,
      seoTitle: `${loan.title} in ${city} | Interest Rates, EMI & Apply Online`,
      metaDescription: `Apply for best ${loan.title.toLowerCase()} in ${city} with lowest interest rate, fast approval & online EMI calculator.`,
      content: generateContent(loan.title, city),
    });
  });
});

/* ✅ WRITE FILE */
fs.writeFileSync(DATA_PATH, JSON.stringify(pages, null, 2));

console.log('✅ City SEO Pages Generated Successfully');
