const fs = require('fs');
const path = require('path');

console.log('🔧 Removing LinkedIn URLs...\n');

let totalFixed = 0;

function removeLinkedIn(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;
  const fileName = path.relative(process.cwd(), filePath);

  // Pattern 1: Remove line with LinkedIn in sameAs array
  // Matches: 'https://www.linkedin.com/company/fincado',
  //      or: 'https://linkedin.com/company/fincado',
  content = content.replace(
    /\s*'https:\/\/(www\.)?linkedin\.com\/company\/fincado',?\n/g,
    '',
  );

  // Pattern 2: Remove line with www prefix
  content = content.replace(
    /\s*"https:\/\/(www\.)?linkedin\.com\/company\/fincado",?\n/g,
    '',
  );

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Fixed: ${fileName}`);
    totalFixed++;
  }
}

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (
      fullPath.includes('node_modules') ||
      fullPath.includes('.next') ||
      fullPath.includes('.git')
    ) {
      return;
    }

    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else if (
      (file.endsWith('.tsx') || file.endsWith('.ts')) &&
      !file.includes('fix-linkedin-url.js') &&
      !file.includes('fix-all-broken-links.js')
    ) {
      removeLinkedIn(fullPath);
    }
  });
}

// Scan src directory
const srcDir = path.join(process.cwd(), 'src');
scanDirectory(srcDir);

console.log('\n' + '═'.repeat(50));
console.log(`✅ Fixed ${totalFixed} files`);
console.log('═'.repeat(50) + '\n');

if (totalFixed > 0) {
  console.log('✅ SUCCESS! LinkedIn URLs removed.\n');
  console.log('Next steps:');
  console.log('1. Verify: git diff');
  console.log('2. Test: npm run check-links:local');
  console.log('3. When ready to add back, create LinkedIn page first\n');
} else {
  console.log('ℹ️  No LinkedIn URLs found to remove.\n');
}
