import * as fs from 'fs';
import * as path from 'path';

/**
 * Quick internal link checker for markdown files
 */
function checkInternalLinks() {
  console.log('🔍 Checking internal links in markdown files...\n');

  const contentDir = path.join(process.cwd(), 'src/data');
  const brokenLinks: Array<{ file: string; link: string }> = [];

  function checkFile(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const links = content.match(/\[([^\]]+)\]\(([^)]+)\)/g) || [];

    links.forEach((linkMatch) => {
      const urlMatch = linkMatch.match(/\(([^)]+)\)/);
      if (!urlMatch) return;

      const url = urlMatch[1];

      // Check internal links only
      if (url.startsWith('/')) {
        // Remove hash and query params
        const cleanPath = url.split('#')[0].split('?')[0];

        // Check if file exists
        const targetPath = path.join(
          process.cwd(),
          'src/app',
          cleanPath,
          'page.tsx',
        );

        if (!fs.existsSync(targetPath)) {
          brokenLinks.push({
            file: filePath.replace(process.cwd(), ''),
            link: url,
          });
        }
      }
    });
  }

  function scanDirectory(dir: string) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (file.endsWith('.md') || file.endsWith('.json')) {
        checkFile(fullPath);
      }
    });
  }

  if (fs.existsSync(contentDir)) {
    scanDirectory(contentDir);
  }

  // Report results
  if (brokenLinks.length > 0) {
    console.error(`❌ Found ${brokenLinks.length} broken internal link(s):\n`);
    brokenLinks.forEach(({ file, link }) => {
      console.error(`  ${file}: ${link}`);
    });
    process.exit(1);
  } else {
    console.log('✅ All internal links are valid!\n');
  }
}

checkInternalLinks();
