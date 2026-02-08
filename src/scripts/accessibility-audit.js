const fs = require('fs');
const path = require('path');

console.log('♿ Accessibility Audit...\n');

let totalIssues = 0;
let a11yIssues = {};

function auditFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.relative(process.cwd(), filePath);
  let issues = [];

  // 1. Check for missing alt attributes on images
  const missingAlt = content.match(/<img[^>]*>/g);
  if (missingAlt) {
    const noAlt = missingAlt.filter((img) => !img.includes('alt='));
    if (noAlt.length > 0) {
      issues.push(`❌ ${noAlt.length} images missing alt=""`);
    }
  }

  // 2. Check for missing lang attribute on <html>
  if (!content.includes('<html lang=') && !content.includes('lang="en"')) {
    issues.push('❌ <html> missing lang="en-IN"');
  }

  // 3. Check for missing role="main"
  if (!content.includes('<main role="main"') && content.includes('<main>')) {
    issues.push('⚠️  <main> missing role="main"');
  }

  // 4. Check for skip links
  if (!content.includes('skip') && !content.includes('Skip to')) {
    issues.push('⚠️  Missing skip navigation link');
  }

  // 5. Check for color contrast (basic)
  if (content.includes('text-white') && content.includes('bg-green-500')) {
    console.log(`ℹ️  ${fileName}: Check green/white contrast`);
  }

  if (issues.length > 0) {
    a11yIssues[fileName] = issues;
    totalIssues += issues.length;
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
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      auditFile(fullPath);
    }
  });
}

// Scan src/app directory
const appDir = path.join(process.cwd(), 'src/app');
scanDirectory(appDir);

console.log('═'.repeat(60));
console.log(`📊 Found ${totalIssues} accessibility issues`);
console.log('═'.repeat(60) + '\n');

Object.entries(a11yIssues).forEach(([file, issues]) => {
  console.log(`📄 ${file}:`);
  issues.forEach((issue) => console.log(`   ${issue}`));
  console.log('');
});

console.log('🔧 QUICK FIXES:\n');

console.log('1. Add lang to layout.tsx:');
console.log('   <html lang="en-IN" className={rubik.className}>');

console.log('\n2. Add role="main" to main tags:');
console.log('   <main role="main" style={{ minHeight: "80vh" }}>\n');

console.log('3. Add skip link to layout.tsx (after Header):');
console.log(`   <a href="#main-content" className="sr-only focus:not-sr-only">
     Skip to main content
   </a>`);

console.log('\n4. Fix images - search/replace:');
console.log('   grep -r "<img " src/app/ | grep -v "alt="');
