const fs = require('fs');
const path = require('path');

console.log('🖼️  Creating all missing images...\n');

// Check if template exists
const templateImage = path.join(process.cwd(), 'public/og-image.png');

if (!fs.existsSync(templateImage)) {
  console.error('❌ ERROR: Template image not found at public/og-image.png');
  console.log('\nPlease ensure you have public/og-image.png first!');
  process.exit(1);
}

console.log('✅ Found template: public/og-image.png\n');

// ============================================
// 1. Create Missing OG Calculator Images
// ============================================

console.log('📊 Creating OG Calculator Images (.jpg)...\n');

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

let created = 0;
let skipped = 0;

ogImages.forEach((imageName) => {
  const targetPath = path.join(process.cwd(), 'public', imageName);

  if (fs.existsSync(targetPath)) {
    console.log(`⏭️  Exists: ${imageName}`);
    skipped++;
  } else {
    fs.copyFileSync(templateImage, targetPath);
    console.log(`✅ Created: ${imageName}`);
    created++;
  }
});

console.log(`\n📊 OG Images: ${created} created, ${skipped} skipped\n`);

// ============================================
// 2. Create Missing Guide Images
// ============================================

console.log('📚 Creating Guide Images (.webp)...\n');

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

let createdGuides = 0;
let skippedGuides = 0;

guideImages.forEach((imagePath) => {
  const fullPath = path.join(process.cwd(), 'public', imagePath);
  const dir = path.dirname(fullPath);

  // Create directory if needed
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created directory: ${path.relative(process.cwd(), dir)}`);
  }

  if (fs.existsSync(fullPath)) {
    console.log(`⏭️  Exists: ${imagePath}`);
    skippedGuides++;
  } else {
    fs.copyFileSync(templateImage, fullPath);
    console.log(`✅ Created: ${imagePath}`);
    createdGuides++;
  }
});

console.log(
  `\n📊 Guide Images: ${createdGuides} created, ${skippedGuides} skipped\n`,
);

// ============================================
// 3. Summary
// ============================================

console.log('═'.repeat(60));
console.log('                    SUMMARY                    ');
console.log('═'.repeat(60));
console.log(`📊 OG Calculator Images: ${created} created, ${skipped} existed`);
console.log(
  `📚 Guide Images: ${createdGuides} created, ${skippedGuides} existed`,
);
console.log(`✅ Total Created: ${created + createdGuides}`);
console.log('═'.repeat(60) + '\n');

if (created + createdGuides > 0) {
  console.log('✅ SUCCESS! All missing images created as placeholders.\n');
  console.log('⚠️  IMPORTANT: These are placeholder images!');
  console.log('   Replace them with actual designed images later.\n');
  console.log('Next steps:');
  console.log('1. Check files with: ls -lh public/og-*.jpg');
  console.log('2. Run link checker: npm run check-links:local');
  console.log('3. Commit changes\n');
} else {
  console.log('ℹ️  All images already exist!\n');
}
