const https = require('https');
const fs = require('fs');
const path = require('path');
const {
  INDEXNOW_HOST,
  INDEXNOW_KEY,
  SITE_ORIGIN,
  INDEXNOW_KEY_LOCATION,
} = require('./indexnow-config');

// ----------------------------
// CONFIG
// ----------------------------
// ----------------------------
// LOAD ARTICLES
// ----------------------------
const articlesPath = path.join(process.cwd(), 'src/data/articles.json');

const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

console.log(`📚 Found ${articles.length} articles`);

// ----------------------------
// BUILD URL LIST
// ----------------------------
const articleUrls = articles.map((article) => {
  const isHindi = article.language === 'hi';

  return isHindi
    ? `${SITE_ORIGIN}/hi/guides/${article.slug}/`
    : `${SITE_ORIGIN}/guides/${article.slug}/`;
});

// ✅ CORE STATIC URLS (ONLY REAL ONES)
const staticUrls = [
  `${SITE_ORIGIN}/`,
  `${SITE_ORIGIN}/guides/`,
  `${SITE_ORIGIN}/hi/`,
  `${SITE_ORIGIN}/hi/guides/`,
  `${SITE_ORIGIN}/emi-calculator/`,
  `${SITE_ORIGIN}/sip-calculator/`,
  `${SITE_ORIGIN}/fd-calculator/`,
  `${SITE_ORIGIN}/credit-score/`,
];

const urlList = [...staticUrls, ...articleUrls];

console.log(`🚀 Sending ${urlList.length} URLs to IndexNow...`);

// ----------------------------
// INDEXNOW PAYLOAD
// ----------------------------
const payload = JSON.stringify({
  host: INDEXNOW_HOST,
  key: INDEXNOW_KEY,
  keyLocation: INDEXNOW_KEY_LOCATION,
  urlList,
});

// ----------------------------
// REQUEST
// ----------------------------
const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload),
  },
};

const req = https.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);

  let data = '';
  res.on('data', (chunk) => (data += chunk));

  res.on('end', () => {
    if (res.statusCode === 200 || res.statusCode === 202) {
      console.log('✅ IndexNow SUCCESS');
    } else {
      console.error('❌ IndexNow FAILED');
      console.error(data);
    }
  });
});

req.on('error', console.error);
req.write(payload);
req.end();
