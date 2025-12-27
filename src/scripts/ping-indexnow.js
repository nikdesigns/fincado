const https = require('https');
const fs = require('fs');
const path = require('path');

// ----------------------------
// CONFIG
// ----------------------------
const HOST = 'fincado.com';
const API_KEY = 'f79d7e3caed6497cafbcc9ee2cd99a55';

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
    ? `https://${HOST}/hi/guides/${article.slug}/`
    : `https://${HOST}/guides/${article.slug}/`;
});

// ✅ CORE STATIC URLS (ONLY REAL ONES)
const staticUrls = [
  `https://${HOST}/`,
  `https://${HOST}/guides/`,
  `https://${HOST}/hi/`,
  `https://${HOST}/hi/guides/`,
  `https://${HOST}/emi-calculator/`,
  `https://${HOST}/sip-calculator/`,
  `https://${HOST}/fd-calculator/`,
  `https://${HOST}/credit-score/`,
];

const urlList = [...staticUrls, ...articleUrls];

console.log(`🚀 Sending ${urlList.length} URLs to IndexNow...`);

// ----------------------------
// INDEXNOW PAYLOAD
// ----------------------------
const payload = JSON.stringify({
  host: HOST,
  key: API_KEY,
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
