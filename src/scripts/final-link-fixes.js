const fs = require('fs');
const path = require('path');

console.log('🔧 Final link fixes...\n');

// ============================================
// 1. Fix EMI Calculator Absolute URLs
// ============================================

console.log('📝 Fixing EMI calculator absolute URLs...\n');

function replaceInFile(filePath, search, replace, description) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const before = content;

  if (typeof search === 'string') {
    content = content.replaceAll(search, replace);
  } else {
    content = content.replace(search, replace);
  }

  if (content !== before) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`  ✅ ${description}`);
    return true;
  }
  return false;
}

function scanAndReplace(dir, replacements) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (
      stat.isDirectory() &&
      !fullPath.includes('node_modules') &&
      !fullPath.includes('.next')
    ) {
      scanAndReplace(fullPath, replacements);
    } else if (
      file.endsWith('.tsx') ||
      file.endsWith('.ts') ||
      file.endsWith('.md')
    ) {
      replacements.forEach(({ search, replace, description }) => {
        replaceInFile(fullPath, search, replace, `${description} in ${file}`);
      });
    }
  });
}

const replacements = [
  {
    search: 'https://fincado.com/emi-calculator/car-loan/',
    replace: '/loans/car-loan/',
    description: 'Fix car loan EMI URL',
  },
  {
    search: 'https://fincado.com/emi-calculator/home-loan/',
    replace: '/loans/home-loan/',
    description: 'Fix home loan EMI URL',
  },
  {
    search: 'https://fincado.com/emi-calculator/personal-loan/',
    replace: '/loans/personal-loan/',
    description: 'Fix personal loan EMI URL',
  },
  {
    search: 'https://fincado.com/emi-calculator/education-loan/',
    replace: '/loans/education-loan/',
    description: 'Fix education loan EMI URL',
  },
  {
    search: 'https://fincado.com/guides/home-loan-for-first-time-buyers/',
    replace: '/guides/home-loan-first-time-buyers/',
    description: 'Fix home loan guide URL',
  },
];

const srcDir = path.join(process.cwd(), 'src');
scanAndReplace(srcDir, replacements);

// ============================================
// 2. Create Missing OG Images with Correct Extensions
// ============================================

console.log('\n🖼️  Creating missing OG images...\n');

// Check if we have og-image.png to use as template
const templateImage = path.join(process.cwd(), 'public/og-image.png');

if (fs.existsSync(templateImage)) {
  const ogImages = [
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

  ogImages.forEach((imageName) => {
    const targetPath = path.join(process.cwd(), 'public', imageName);

    if (!fs.existsSync(targetPath)) {
      fs.copyFileSync(templateImage, targetPath);
      console.log(`✅ Created: ${imageName}`);
    }
  });
} else {
  console.log('⚠️  Template og-image.png not found');
}

// ============================================
// 3. Create Missing Guide Images
// ============================================

console.log('\n🖼️  Creating missing guide images...\n');

const guideImages = [
  'images/og/credit-score-guide.webp',
  'images/og/fd-truths.webp',
  'images/og/sip-vs-fd.webp',
  'images/og/elss-guide-hindi.webp',
  'images/og/personal-loan-guide.webp',
  'images/guides/mf/direct-vs-regular-hero.webp',
  'images/guides/home-loan/home-loan-guide-hero.webp',
  'images/guides/ssy/ssy-guide-hero.webp',
  'images/guides/sgb/sgb-guide-hindi.webp',
  'images/guides/hi/ssy-hero-2025.webp',
  'images/guides/retirement/retirement-planning.webp',
  'images/guides/sip/sip-guide-hero.webp',
  'images/guides/health-insurance/health-insurance-guide-hindi.webp',
];

if (fs.existsSync(templateImage)) {
  guideImages.forEach((imagePath) => {
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    const dir = path.dirname(fullPath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (!fs.existsSync(fullPath)) {
      fs.copyFileSync(templateImage, fullPath);
      console.log(`✅ Created: ${imagePath}`);
    }
  });
}

// ============================================
// 4. Create Final Redirect
// ============================================

console.log('\n📄 Creating final redirect...\n');

const redirectPage = path.join(
  process.cwd(),
  'src/app/guides/home-loan-for-first-time-buyers/page.tsx',
);

const redirectContent = `import { redirect } from 'next/navigation';

export default function HomeLoanRedirectPage() {
  redirect('/guides/home-loan-first-time-buyers/');
}
`;

const redirectDir = path.dirname(redirectPage);
if (!fs.existsSync(redirectDir)) {
  fs.mkdirSync(redirectDir, { recursive: true });
}

fs.writeFileSync(redirectPage, redirectContent);
console.log('✅ Created: /guides/home-loan-for-first-time-buyers/');

console.log('\n✅ All automated fixes complete!\n');
console.log('📋 Remaining manual tasks:');
console.log('1. Fix or remove LinkedIn URL (if 404)');
console.log('2. Replace placeholder images with actual designs');
console.log('3. Deploy to production');
console.log('4. Run link checker again\n');
