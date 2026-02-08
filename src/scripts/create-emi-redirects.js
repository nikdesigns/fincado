const fs = require('fs');
const path = require('path');

console.log('🔧 Creating EMI calculator redirects...\n');

const emiRedirects = [
  { from: 'emi-calculator/car-loan', to: '/loans/car-loan/' },
  { from: 'emi-calculator/home-loan', to: '/loans/home-loan/' },
  { from: 'emi-calculator/personal-loan', to: '/loans/personal-loan/' },
  { from: 'emi-calculator/education-loan', to: '/loans/education-loan/' },
];

const redirectTemplate = (
  destination,
) => `import { redirect } from 'next/navigation';

export default function EMIRedirectPage() {
  redirect('${destination}');
}
`;

emiRedirects.forEach(({ from, to }) => {
  const pagePath = path.join(process.cwd(), 'src/app', from, 'page.tsx');
  const dirPath = path.dirname(pagePath);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(pagePath, redirectTemplate(to));
  console.log(`✅ Created: /${from}/ → ${to}`);
});

console.log('\n✅ EMI redirects created!\n');
