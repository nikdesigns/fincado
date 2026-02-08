// src/scripts/fix-accessibility.js
const fs = require('fs');
const path = require('path');

// Fix main layout
const layoutPath = 'src/app/layout.tsx';
let layoutContent = fs.readFileSync(layoutPath, 'utf8');

// Add lang attribute
layoutContent = layoutContent.replace(/<html([^>]*)>/, '<html$1 lang="en-IN">');

fs.writeFileSync(layoutPath, layoutContent);

// Fix Hindi layout
const hiLayoutPath = 'src/app/hi/layout.tsx';
let hiLayoutContent = fs.readFileSync(hiLayoutPath, 'utf8');

hiLayoutContent = hiLayoutContent.replace(
  /<html([^>]*)>/,
  '<html$1 lang="hi-IN">',
);

fs.writeFileSync(hiLayoutPath, hiLayoutContent);

console.log('✅ Added lang attributes to layouts');
