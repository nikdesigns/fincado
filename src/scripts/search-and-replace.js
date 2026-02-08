const fs = require('fs');
const path = require('path');

console.log('🔍 Searching and replacing broken links...\n');

const replacements = [
  {
    search: 'https://incado.com/logo.png',
    replace: '/logo.png',
    description: 'Fix domain typo',
  },
  {
    search: '/guides/sip-investing-guide/',
    replace: '/guides/sip-investment-guide/',
    description: 'Fix guide URL',
  },
  {
    search: 'https://fincado.com/logo.png',
    replace: '/logo.png',
    description: 'Use relative path for logo',
  },
  {
    search: /\/images\/guides\/mf\/mutual-fund-guide-hero\.webp\//g,
    replace: '/images/guides/mf/mutual-fund-guide-hero.webp',
    description: 'Fix trailing slash in image URL',
  },
  {
    search: /\/images\/og\/personal-loan-guide\.webp\//g,
    replace: '/images/og/personal-loan-guide.webp',
    description: 'Fix trailing slash in image URL',
  },
];

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  replacements.forEach(({ search, replace, description }) => {
    const before = content;
    content = content.replace(search, replace);

    if (content !== before) {
      changed = true;
      console.log(
        `  ✅ ${description} in ${path.relative(process.cwd(), filePath)}`,
      );
    }
  });

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
  }

  return changed;
}

function scanDirectory(dir, replacements) {
  const files = fs.readdirSync(dir);
  let totalChanges = 0;

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (
      stat.isDirectory() &&
      !fullPath.includes('node_modules') &&
      !fullPath.includes('.next')
    ) {
      totalChanges += scanDirectory(fullPath, replacements);
    } else if (
      file.endsWith('.tsx') ||
      file.endsWith('.ts') ||
      file.endsWith('.md') ||
      file.endsWith('.json')
    ) {
      if (replaceInFile(fullPath, replacements)) {
        totalChanges++;
      }
    }
  });

  return totalChanges;
}

const srcDir = path.join(process.cwd(), 'src');
const changes = scanDirectory(srcDir, replacements);

console.log(`\n✅ Search and replace complete!`);
console.log(`📝 Modified ${changes} file(s)\n`);
