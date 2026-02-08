const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing all broken links...\n');

// ============================================
// 1. CREATE MISSING REDIRECT PAGES
// ============================================

const redirectPages = [
  { from: 'faq', to: '/contact/' },
  { from: 'privacy', to: '/privacy-policy/' },
  { from: 'home-loan-calculator', to: '/loans/home-loan/' },
  { from: 'hi/home-loan-calculator', to: '/hi/loans/home-loan/' },
];

const redirectTemplate = (
  destination,
) => `import { redirect } from 'next/navigation';

export default function RedirectPage() {
  redirect('${destination}');
}
`;

console.log('📄 Creating missing redirect pages...\n');

redirectPages.forEach(({ from, to }) => {
  const pagePath = path.join(process.cwd(), 'src/app', from, 'page.tsx');
  const dirPath = path.dirname(pagePath);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(pagePath, redirectTemplate(to));
  console.log(`✅ Created redirect: /${from}/ → ${to}`);
});

// ============================================
// 2. CREATE MISSING IMAGE DIRECTORIES
// ============================================

console.log('\n📁 Creating missing image directories...\n');

const imageDirs = [
  'public/images/og',
  'public/images/guides/sip',
  'public/images/guides/ssy',
  'public/images/guides/sgb',
  'public/images/guides/hi',
  'public/images/guides/mf',
  'public/images/guides/home-loan',
  'public/images/guides/retirement',
  'public/images/guides/health-insurance',
];

imageDirs.forEach((dir) => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✅ Created: ${dir}`);
  } else {
    console.log(`⏭️  Exists: ${dir}`);
  }
});

// ============================================
// 3. CREATE MISSING OG IMAGES (Placeholders)
// ============================================

console.log('\n🖼️  Creating placeholder OG images...\n');

const missingOGImages = [
  'og-sip-calculator.jpg',
  'og-rd-calculator.jpg',
  'og-car-loan-calculator.jpg',
  'og-home-loan-calculator.jpg',
  'og-fd-calculator.jpg',
  'og-personal-loan-calculator.jpg',
  'og-education-loan-calculator.jpg',
  'og-elss-calculator.jpg',
  'og-ppf-calculator.jpg',
  'og-swp-calculator.jpg',
  'og-lumpsum-calculator.jpg',
  'og-credit-score.jpg',
  'og-gst-calculator.jpg',
  'og-nps-calculator.jpg',
  'og-ssy-calculator.jpg',
  'og-hra-calculator.jpg',
  'og-epf-calculator.jpg',
  'og-income-tax-calculator.jpg',
  'og-gratuity-calculator.jpg',
  'og-inflation-calculator.jpg',
  'og-retirement-calculator.jpg',
  'og-apy-calculator.jpg',
  'og-simple-interest-calculator.jpg',
  'og-compound-interest-calculator.jpg',
  'og-fire-calculator.jpg',
];

// Check if og-image.png exists to use as template
const templateImage = path.join(process.cwd(), 'public/og-image.png');

if (fs.existsSync(templateImage)) {
  missingOGImages.forEach((imageName) => {
    const targetPath = path.join(process.cwd(), 'public', imageName);

    if (!fs.existsSync(targetPath)) {
      // Copy og-image.png as placeholder
      fs.copyFileSync(templateImage, targetPath);
      console.log(`✅ Created placeholder: ${imageName}`);
    }
  });
} else {
  console.log('⚠️  Template image not found. Create OG images manually.');
}

// ============================================
// 4. LIST FILES TO SEARCH AND REPLACE
// ============================================

console.log('\n🔍 Issues requiring manual fixes:\n');

const manualFixes = [
  {
    issue: 'Typo in domain',
    search: 'https://incado.com/logo.png',
    replace: 'https://fincado.com/logo.png',
    files: ['guides/sip-for-1-crore-in-10-years'],
  },
  {
    issue: 'Wrong URL format',
    search: '/guides/sip-investing-guide/',
    replace: '/guides/sip-investment-guide/',
    files: ['Multiple calculator pages'],
  },
  {
    issue: 'Broken redirects',
    search: '/guides/home-loan-for-first-time-buyers/',
    replace: '/guides/home-loan-first-time-buyers/',
    files: ['guides/home-loan-first-time-buyers'],
  },
  {
    issue: 'Missing EMI calculator redirects',
    urls: [
      '/emi-calculator/car-loan/',
      '/emi-calculator/home-loan/',
      '/emi-calculator/personal-loan/',
      '/emi-calculator/education-loan/',
    ],
    note: 'Create these as redirect pages or fix links to point to /loans/*',
  },
  {
    issue: 'Missing guide images',
    files: [
      '/images/og/credit-score-guide.webp',
      '/images/guides/mf/mutual-fund-guide-hero.webp/',
      '/images/guides/mf/direct-vs-regular-hero.webp',
      '/images/og/fd-truths.webp',
      '/images/og/sip-vs-fd.webp',
      '/images/guides/ssy/ssy-guide-hero.webp',
      // ... and more
    ],
    note: 'Add these images to public/images/',
  },
  {
    issue: 'LinkedIn URL',
    search: 'https://www.linkedin.com/company/fincado',
    replace: 'YOUR_ACTUAL_LINKEDIN_URL or remove link',
    files: ['Footer.tsx or Header.tsx'],
  },
];

manualFixes.forEach((fix, index) => {
  console.log(`${index + 1}. ${fix.issue}`);
  if (fix.search) {
    console.log(`   Find: "${fix.search}"`);
    console.log(`   Replace: "${fix.replace}"`);
  }
  if (fix.urls) {
    console.log(`   URLs: ${fix.urls.join(', ')}`);
  }
  if (fix.note) {
    console.log(`   Note: ${fix.note}`);
  }
  console.log('');
});

console.log('\n✅ Automated fixes complete!');
console.log('\n📋 Next steps:');
console.log('1. Run the search-and-replace script (below)');
console.log('2. Fix the remaining manual issues listed above');
console.log('3. Add actual OG images (replace placeholders)');
console.log('4. Run link checker again\n');
