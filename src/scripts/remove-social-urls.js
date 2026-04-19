const fs = require('fs');
const path = require('path');

console.log('🔧 Removing non-existent social media URLs...\n');

let totalFixed = 0;

function removeSocialLinks(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;
  const fileName = path.relative(process.cwd(), filePath);

  // Remove LinkedIn company pages.
  content = content.replace(
    /\s*'https:\/\/(www\.)?linkedin\.com\/company\/[A-Za-z0-9._-]+',?\n/g,
    '',
  );

  // Remove Twitter/X handles.
  content = content.replace(
    /\s*'https:\/\/(www\.)?(twitter\.com|x\.com)\/[A-Za-z0-9._-]+',?\n/g,
    '',
  );

  // Remove Facebook handles.
  content = content.replace(
    /\s*'https:\/\/(www\.)?facebook\.com\/[A-Za-z0-9._-]+',?\n/g,
    '',
  );

  // Clean up empty sameAs arrays or arrays with only one trailing comma
  content = content.replace(/sameAs:\s*\[\s*,?\s*\]/g, 'sameAs: []');

  // Remove trailing commas in arrays
  content = content.replace(/,(\s*)\]/g, '$1]');

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
      !file.includes('remove-social-urls.js') &&
      !file.includes('fix-all-broken-links.js') &&
      !file.includes('fix-linkedin-url.js')
    ) {
      removeSocialLinks(fullPath);
    }
  });
}

// Scan src directory
const srcDir = path.join(process.cwd(), 'src');
scanDirectory(srcDir);

console.log('\n' + '═'.repeat(60));
console.log(`✅ Removed social links from ${totalFixed} files`);
console.log('═'.repeat(60) + '\n');

if (totalFixed > 0) {
  console.log('✅ SUCCESS! All non-existent social media URLs removed.\n');
  console.log('Removed:');
  console.log('  - LinkedIn URLs');
  console.log('  - Twitter/X URLs');
  console.log('  - Facebook URLs\n');
  console.log('Next steps:');
  console.log('1. Review changes: git diff');
  console.log('2. Test locally: npm run dev');
  console.log('3. Check links: npm run check-links:local\n');
  console.log('💡 When you create social pages, add them back to schemas!\n');
} else {
  console.log('ℹ️  No social media URLs found to remove.\n');
}
