const fs = require('fs');
const path = require('path');

console.log('🗑️  Removing duplicate pages...\n');

const duplicates = [
  {
    keep: 'src/app/faq',
    remove: 'src/app/faqs',
    reason: 'Duplicate FAQ pages',
  },
  {
    keep: 'src/app/privacy-policy',
    remove: 'src/app/privacy',
    reason: 'Duplicate privacy pages',
  },
];

let removed = 0;
let errors = 0;

duplicates.forEach(({ keep, remove, reason }) => {
  const keepPath = path.join(process.cwd(), keep);
  const removePath = path.join(process.cwd(), remove);

  console.log(`\n📁 Checking: ${reason}`);
  console.log(`   Keep: ${keep}`);
  console.log(`   Remove: ${remove}`);

  // Check if keep path exists
  if (!fs.existsSync(keepPath)) {
    console.log(`   ⚠️  Warning: Keep path doesn't exist!`);
    console.log(`   ℹ️  Skipping removal for safety.\n`);
    errors++;
    return;
  }

  // Check if remove path exists
  if (!fs.existsSync(removePath)) {
    console.log(`   ℹ️  Already removed or doesn't exist.\n`);
    return;
  }

  // Remove the duplicate
  try {
    removeDirectory(removePath);
    console.log(`   ✅ Removed: ${remove}\n`);
    removed++;
  } catch (error) {
    console.log(`   ❌ Error removing: ${error.message}\n`);
    errors++;
  }
});

function removeDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file) => {
      const fullPath = path.join(dirPath, file);
      if (fs.lstatSync(fullPath).isDirectory()) {
        removeDirectory(fullPath);
      } else {
        fs.unlinkSync(fullPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
}

console.log('═'.repeat(60));
console.log(`✅ Removed: ${removed} duplicate page(s)`);
if (errors > 0) {
  console.log(`⚠️  Errors: ${errors}`);
}
console.log('═'.repeat(60) + '\n');

if (removed > 0) {
  console.log('✅ SUCCESS! Duplicate pages removed.\n');
  console.log('⚠️  IMPORTANT: Create redirects for SEO!\n');
  console.log('Next steps:');
  console.log('1. Verify: git status');
  console.log('2. Create redirects (next step)');
  console.log('3. Update internal links\n');
} else if (errors === 0) {
  console.log('ℹ️  No duplicate pages found to remove.\n');
}
