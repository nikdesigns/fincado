const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing absolute image URLs in metadata...\n');

let totalFiles = 0;
let fixedFiles = 0;

function replaceAbsoluteURLs(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;

  // Fix all absolute fincado.com URLs to relative paths
  const replacements = [
    // OG calculator images
    {
      pattern: /https:\/\/fincado\.com\/(og-[a-z0-9-]+\.jpg)/g,
      replace: '/$1',
    },
    // Guide images in /images/og/
    {
      pattern: /https:\/\/fincado\.com\/(images\/og\/[a-z0-9-]+\.webp)/g,
      replace: '/$1',
    },
    // Guide images in /images/guides/
    {
      pattern: /https:\/\/fincado\.com\/(images\/guides\/[a-z0-9\/\-]+\.webp)/g,
      replace: '/$1',
    },
  ];

  replacements.forEach(({ pattern, replace }) => {
    content = content.replace(pattern, replace);
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    const fileName = path.relative(process.cwd(), filePath);
    console.log(`✅ Fixed: ${fileName}`);
    fixedFiles++;
    return true;
  }

  return false;
}

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`⚠️  Directory not found: ${dir}`);
    return;
  }

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    // Skip node_modules, .next, .git
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
      file.endsWith('.tsx') ||
      file.endsWith('.ts') ||
      file.endsWith('.jsx') ||
      file.endsWith('.js')
    ) {
      totalFiles++;
      replaceAbsoluteURLs(fullPath);
    }
  });
}

// Scan src directory
const srcDir = path.join(process.cwd(), 'src');
console.log('📁 Scanning src/ directory...\n');
scanDirectory(srcDir);

console.log('\n' + '═'.repeat(50));
console.log(`📊 Scanned: ${totalFiles} files`);
console.log(`✅ Fixed: ${fixedFiles} files`);
console.log('═'.repeat(50) + '\n');

if (fixedFiles > 0) {
  console.log(
    '✅ SUCCESS! All absolute image URLs converted to relative paths.\n',
  );
  console.log('Next steps:');
  console.log('1. Review changes with: git diff');
  console.log('2. Create missing images');
  console.log('3. Commit changes\n');
} else {
  console.log(
    'ℹ️  No absolute image URLs found. Already using relative paths!\n',
  );
}
