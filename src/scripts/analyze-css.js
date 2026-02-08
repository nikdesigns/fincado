const fs = require('fs');
const path = require('path');

console.log('📊 Analyzing globals.css...\n');

const cssPath = path.join(process.cwd(), 'src/app/globals.css');

if (!fs.existsSync(cssPath)) {
  console.error('❌ globals.css not found!');
  process.exit(1);
}

const content = fs.readFileSync(cssPath, 'utf-8');
const lines = content.split('\n');
const size = fs.statSync(cssPath).size;

console.log('═'.repeat(60));
console.log('FILE STATS');
console.log('═'.repeat(60));
console.log(`Size: ${(size / 1024).toFixed(2)} KB (${size} bytes)`);
console.log(`Lines: ${lines.length}`);
console.log('═'.repeat(60) + '\n');

// Analyze content
const stats = {
  tailwindDirectives: 0,
  customClasses: 0,
  mediaQueries: 0,
  keyframes: 0,
  comments: 0,
  emptyLines: 0,
};

const sections = {
  tailwind: [],
  custom: [],
  animations: [],
  utilities: [],
};

let inComment = false;

lines.forEach((line, index) => {
  const trimmed = line.trim();

  // Comments
  if (trimmed.startsWith('/*')) inComment = true;
  if (inComment) {
    stats.comments++;
    if (trimmed.endsWith('*/')) inComment = false;
    return;
  }

  // Empty lines
  if (trimmed === '') {
    stats.emptyLines++;
    return;
  }

  // Tailwind directives
  if (
    trimmed.startsWith('@tailwind') ||
    trimmed.startsWith('@apply') ||
    trimmed.startsWith('@layer')
  ) {
    stats.tailwindDirectives++;
    sections.tailwind.push({ line: index + 1, content: trimmed });
  }

  // Media queries
  if (trimmed.startsWith('@media')) {
    stats.mediaQueries++;
  }

  // Keyframes
  if (trimmed.startsWith('@keyframes')) {
    stats.keyframes++;
    sections.animations.push({ line: index + 1, content: trimmed });
  }

  // Custom classes
  if (trimmed.startsWith('.') && !trimmed.includes('@apply')) {
    stats.customClasses++;
    sections.custom.push({
      line: index + 1,
      content: trimmed.substring(0, 50),
    });
  }
});

console.log('CONTENT BREAKDOWN');
console.log('═'.repeat(60));
console.log(`Tailwind Directives: ${stats.tailwindDirectives}`);
console.log(`Custom Classes: ${stats.customClasses}`);
console.log(`Media Queries: ${stats.mediaQueries}`);
console.log(`Keyframes/Animations: ${stats.keyframes}`);
console.log(`Comments: ${stats.comments}`);
console.log(`Empty Lines: ${stats.emptyLines}`);
console.log('═'.repeat(60) + '\n');

// Show top custom classes
if (sections.custom.length > 0) {
  console.log('CUSTOM CLASSES (First 10):');
  console.log('─'.repeat(60));
  sections.custom.slice(0, 10).forEach(({ line, content }) => {
    console.log(`Line ${line}: ${content}...`);
  });
  console.log('─'.repeat(60) + '\n');
}

// Show animations
if (sections.animations.length > 0) {
  console.log('ANIMATIONS:');
  console.log('─'.repeat(60));
  sections.animations.forEach(({ line, content }) => {
    console.log(`Line ${line}: ${content}`);
  });
  console.log('─'.repeat(60) + '\n');
}

// Recommendations
console.log('💡 OPTIMIZATION RECOMMENDATIONS:');
console.log('═'.repeat(60));

if (size > 30000) {
  console.log('⚠️  File is large (>30KB)');
  console.log('   → Consider splitting into separate files');
}

if (stats.customClasses > 50) {
  console.log('⚠️  Many custom classes detected');
  console.log('   → Consider using Tailwind utilities instead');
}

if (stats.keyframes > 10) {
  console.log('⚠️  Many animations detected');
  console.log('   → Consider lazy-loading animation CSS');
}

if (stats.emptyLines > 100) {
  console.log('ℹ️  Many empty lines');
  console.log('   → Minification will handle this in production');
}

console.log('═'.repeat(60) + '\n');

console.log('Next steps:');
console.log('1. Review custom classes - can they use Tailwind?');
console.log('2. Extract animations to separate file');
console.log('3. Use CSS modules for component-specific styles');
console.log('4. Enable CSS minification in production\n');
