const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing absolute image URLs...\n');

function replaceAbsoluteURLs(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;

  // Fix OG calculator images
  content = content.replace(
    /https:\/\/fincado\.com\/(og-[a-z-]+\.jpg)/g,
    '/$1',
  );

  // Fix guide images
  content = content.replace(
    /https:\/\/fincado\.com\/(images\/(?:og|guides)\/[a-z-\/]+\.webp)/g,
    '/$1',
  );

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    const fileName = path.relative(process.cwd(), filePath);
    console.log(`✅ Fixed: ${fileName}`);
    return true;
  }

  return false;
}

function scanAndFix(dir) {
  const files = fs.readdirSync(dir);
  let fixedCount = 0;

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (
      stat.isDirectory() &&
      !fullPath.includes('node_modules') &&
      !fullPath.includes('.next')
    ) {
      fixedCount += scanAndFix(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      if (replaceAbsoluteURLs(fullPath)) {
        fixedCount++;
      }
    }
  });

  return fixedCount;
}

const srcDir = path.join(process.cwd(), 'src');
const count = scanAndFix(srcDir);

console.log(`\n✅ Fixed absolute URLs in ${count} file(s)!\n`);
