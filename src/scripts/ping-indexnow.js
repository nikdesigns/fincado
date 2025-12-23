const https = require('https');
const fs = require('fs');
const path = require('path');

// ------------------------------------------
// 1. CONFIGURATION
// ------------------------------------------
const HOST = 'www.fincado.com';
const API_KEY = 'f79d7e3caed6497cafbcc9ee2cd99a55';
const KEY_LOCATION = `https://${HOST}/${API_KEY}.txt`;

// ------------------------------------------
// 2. LOAD DATA
// ------------------------------------------
const articlesPath = path.join(__dirname, '../data/articles.json');
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

// ------------------------------------------
// 3. GENERATE URL LIST
// ------------------------------------------
console.log(`🔍 Found ${articles.length} articles in database...`);

const urlList = articles.map((article) => {
  const isHindi = article.language === 'hi';
  // FIX: Add the slash at the end
  const slugPath = isHindi
    ? `/hi/guides/${article.slug}/`
    : `/guides/${article.slug}/`;

  return `https://${HOST}${slugPath}`;
});

// FIX: Add slashes to static pages too
const staticPages = [
  `https://${HOST}/`,
  `https://${HOST}/hi/`,
  `https://${HOST}/calculators/`,
  `https://${HOST}/hi/guides/`,
];

const allUrls = [...staticPages, ...urlList];

console.log(`🚀 Preparing to ping IndexNow with ${allUrls.length} URLs...`);

// ------------------------------------------
// 4. SEND REQUEST
// ------------------------------------------
const data = JSON.stringify({
  host: HOST,
  key: API_KEY,
  keyLocation: KEY_LOCATION,
  urlList: allUrls,
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
  },
};

const req = https.request(options, (res) => {
  console.log(`\n📡 Status Code: ${res.statusCode}`);

  res.on('data', (d) => {
    process.stdout.write(d);
  });

  if (res.statusCode === 200 || res.statusCode === 202) {
    console.log('\n✅ Success! Search engines have been notified.');
  } else {
    console.error('\n❌ Error: Something went wrong.');
  }
});

req.on('error', (error) => {
  console.error(error);
});

req.write(data);
req.end();
