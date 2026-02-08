const fs = require('fs');
const path = require('path');

console.log('🔍 Finding LinkedIn URL...\n');

let found = false;

function searchLinkedIn(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.relative(process.cwd(), filePath);

  if (content.includes('linkedin.com/company/fincado')) {
    console.log(`📍 Found in: ${fileName}\n`);

    // Show context (3 lines before and after)
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      if (line.includes('linkedin.com/company/fincado')) {
        const start = Math.max(0, index - 2);
        const end = Math.min(lines.length, index + 3);

        console.log('Context:');
        console.log('─'.repeat(60));
        for (let i = start; i < end; i++) {
          const marker = i === index ? '→' : ' ';
          console.log(`${marker} ${i + 1}: ${lines[i]}`);
        }
        console.log('─'.repeat(60) + '\n');
        found = true;
      }
    });
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
      file.endsWith('.tsx') ||
      file.endsWith('.ts') ||
      file.endsWith('.jsx') ||
      file.endsWith('.js')
    ) {
      searchLinkedIn(fullPath);
    }
  });
}

// Scan src directory
const srcDir = path.join(process.cwd(), 'src');
scanDirectory(srcDir);

if (found) {
  console.log('\n💡 Options to fix:');
  console.log('1. Remove the LinkedIn link entirely');
  console.log('2. Update to your actual LinkedIn company page');
  console.log('3. Comment it out temporarily\n');
  console.log("Choose option and I'll provide the fix!\n");
} else {
  console.log('✅ LinkedIn URL not found in src/ directory.\n');
  console.log('It might be in:');
  console.log('- A different component');
  console.log('- Already removed');
  console.log('- In a data/config file\n');
}
