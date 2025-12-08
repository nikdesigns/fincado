const fs = require('fs');
const path = require('path');

/* ✅ TYPE DEFINITIONS */
type Article = {
  slug: string;
  title: string;
  category: string;
  seoTitle: string;
  metaDescription: string;
  content: string;
};

type InternalLink = {
  keyword: string;
  url: string;
};

const ARTICLES_PATH = path.join(process.cwd(), 'src/data/articles.json');

const LINKS_PATH = path.join(process.cwd(), 'src/data/internalLinks.json');

/* ✅ LOAD FILES */
const articles: Article[] = JSON.parse(fs.readFileSync(ARTICLES_PATH, 'utf8'));

const links: InternalLink[] = JSON.parse(fs.readFileSync(LINKS_PATH, 'utf8'));

/* ✅ LINK INJECTOR */
function injectLinks(html: string): string {
  let modified = html;

  links.forEach((link: InternalLink) => {
    const regex = new RegExp(`\\b${link.keyword}\\b`, 'g');

    modified = modified.replace(
      regex,
      `<a href="${link.url}">${link.keyword}</a>`
    );
  });

  return modified;
}

/* ✅ ✅ ✅ AD AUTO INJECTOR (NEW) */
function injectAds(html: string): string {
  const sections = html.split('</h2>');

  if (sections.length < 3) return html;

  let output = '';
  sections.forEach((block: string, index: number) => {
    output += block + '</h2>';

    // ✅ Insert ad after every 2 sections
    if (index > 0 && index % 2 === 0) {
      output += `
        <div class="ad-box">Auto Ad Placement</div>
      `;
    }
  });

  return output;
}

/* ✅ APPLY TO ALL ARTICLES */
const updated: Article[] = articles.map((article) => {
  const withLinks = injectLinks(article.content);
  const withAds = injectAds(withLinks);

  return {
    ...article,
    content: withAds,
  };
});

/* ✅ SAVE BACK */
fs.writeFileSync(ARTICLES_PATH, JSON.stringify(updated, null, 2));

console.log('✅ Internal Links + Auto Ads Injected Successfully');
