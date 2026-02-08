const fs = require('fs');
const path = require('path');

const template = path.join(process.cwd(), 'public/og-image.png');
const missingImages = [
  'images/og/credit-score-guide.webp',
  'images/og/fd-truths.webp',
  'images/og/sip-vs-fd.webp',
  'images/og/elss-guide-hindi.webp',
  'images/og/personal-loan-guide.webp',
  'images/guides/mf/mutual-fund-guide-hero.webp',
  'images/guides/mf/direct-vs-regular-hero.webp',
  'images/guides/ssy/ssy-guide-hero.webp',
  'images/guides/home-loan/home-loan-guide-hero.webp',
  'images/guides/sgb/sgb-guide-hindi.webp',
  'images/guides/hi/ssy-hero-2025.webp',
  'images/guides/retirement/retirement-planning.webp',
  'images/guides/sip/sip-guide-hero.webp',
  'images/guides/health-insurance/health-insurance-guide-hindi.webp',
];

if (fs.existsSync(template)) {
  missingImages.forEach((imagePath) => {
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    const dir = path.dirname(fullPath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (!fs.existsSync(fullPath)) {
      fs.copyFileSync(template, fullPath);
      console.log(`✅ Created: ${imagePath}`);
    }
  });

  console.log('\n✅ All placeholder images created!');
} else {
  console.log('❌ Template image not found');
}
