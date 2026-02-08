const fs = require('fs');
const path = require('path');

console.log('🔍 Finding absolute image URLs...\n');

const absoluteURLPatterns = [
  /https:\/\/fincado\.com\/og-.*?\.jpg/g,
  /https:\/\/fincado\.com\/images\/og\/.*?\.webp/g,
  /https:\/\/fincado\.com\/images\/guides\/.*?\.webp/g,
];

function searchInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.relative(process.cwd(), filePath);
  let found = false;

  absoluteURLPatterns.forEach((pattern) => {
    const matches = content.match(pattern);
    if (matches) {
      if (!found) {
        console.log(`\n📄 ${fileName}:`);
        found = true;
      }
      matches.forEach((match) => {
        console.log(`  ❌ ${match}`);
      });
    }
  });

  return found;
}

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);
  let foundCount = 0;

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (
      stat.isDirectory() &&
      !fullPath.includes('node_modules') &&
      !fullPath.includes('.next')
    ) {
      foundCount += scanDirectory(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      if (searchInFile(fullPath)) {
        foundCount++;
      }
    }
  });

  return foundCount;
}

const srcDir = path.join(process.cwd(), 'src');
const count = scanDirectory(srcDir);

console.log(`\n\n📊 Found absolute image URLs in ${count} file(s)`);
console.log(
  '\n💡 These need to be changed to relative URLs or use environment variable\n',
);
