const fs = require('fs');
const path = require('path');

console.log('🔀 Creating redirects for removed duplicate pages...\n');

const redirects = [
  {
    from: 'src/app/faqs',
    to: '/faq/',
    name: 'FAQs redirect',
  },
  {
    from: 'src/app/privacy',
    to: '/privacy-policy/',
    name: 'Privacy redirect',
  },
];

let created = 0;

redirects.forEach(({ from, to, name }) => {
  const redirectDir = path.join(process.cwd(), from);
  const pageFile = path.join(redirectDir, 'page.tsx');

  console.log(`📄 Creating: ${name}`);
  console.log(`   From: ${from}`);
  console.log(`   To: ${to}`);

  // Create directory if needed
  if (!fs.existsSync(redirectDir)) {
    fs.mkdirSync(redirectDir, { recursive: true });
  }

  // Create redirect page
  const redirectContent = `import { redirect } from 'next/navigation';

export default function RedirectPage() {
  redirect('${to}');
}
`;

  fs.writeFileSync(pageFile, redirectContent, 'utf-8');
  console.log(`   ✅ Created: ${from}/page.tsx\n`);
  created++;
});

console.log('═'.repeat(60));
console.log(`✅ Created: ${created} redirect(s)`);
console.log('═'.repeat(60) + '\n');

console.log('✅ SUCCESS! Redirects created.\n');
console.log('These will now properly redirect:');
console.log('  /faqs/ → /faq/');
console.log('  /privacy/ → /privacy-policy/\n');
console.log('Next steps:');
console.log('1. Test: npm run dev');
console.log('2. Visit: http://localhost:3000/faqs/');
console.log('3. Visit: http://localhost:3000/privacy/\n');
