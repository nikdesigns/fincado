// src/scripts/create-emi-redirects.js

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
  const expectedContent = redirectTemplate(to);

  // 1. Ensure the directory exists
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // 2. Check if the file already exists and has the correct content
  if (fs.existsSync(pagePath)) {
    const currentContent = fs.readFileSync(pagePath, 'utf8');
    if (currentContent === expectedContent) {
      console.log(`⏭️  Skipped (already exists): /${from}/ → ${to}`);
      return; // Exit early to avoid unnecessary disk writes
    }
  }

  // 3. Write the file if it's missing or outdated
  fs.writeFileSync(pagePath, expectedContent);
  console.log(`✅ Created/Updated: /${from}/ → ${to}`);
});

console.log('\n✅ EMI redirects checked and created!\n');
