import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://fincado.com';
const outDir = path.join(__dirname, '../out');

function getAllHtmlFiles(dir, files = []) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      getAllHtmlFiles(fullPath, files);
    } else if (file.endsWith('.html')) {
      files.push(fullPath);
    }
  });

  return files;
}

const pages = getAllHtmlFiles(outDir);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((page) => {
    const url = page
      .replace(outDir, '')
      .replace(/\\/g, '/')
      .replace('index.html', '');
    return `<url><loc>${baseUrl}${url}</loc></url>`;
  })
  .join('\n')}
</urlset>`;

fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap);

console.log('✅ Sitemap generated successfully!');
