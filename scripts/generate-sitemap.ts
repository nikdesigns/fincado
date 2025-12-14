import fs from 'fs';
import path from 'path';
import articles from '../src/data/articles.json';

const SITE = 'https://www.fincado.com';
const OUT = path.join(process.cwd(), 'public', 'sitemap-guides.xml');

type Article = {
  slug: string;
  published: string;
};

function run() {
  const urls = (articles as Article[])
    .map(
      (a) => `
  <url>
    <loc>${SITE}/guides/${a.slug}</loc>
    <lastmod>${a.published?.split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE}/guides</loc>
    <priority>0.9</priority>
  </url>
  ${urls}
</urlset>`;

  fs.writeFileSync(OUT, xml, 'utf8');
  console.log('✅ sitemap-guides.xml generated');
}

run();
