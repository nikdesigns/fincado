const fs = require('fs');
const path = require('path');

// CONFIGURATION
const HOST = 'www.fincado.com';
const KEY = 'f79d7e3caed6497cafbcc9ee2cd99a55'; // Your key from indexnow.txt
const KEY_LOCATION = `https://${HOST}/indexnow.txt`;
const SITEMAP_PATH = path.join(process.cwd(), 'public', 'sitemap.xml');

async function pingIndexNow() {
  try {
    // 1. Read the Sitemap
    if (!fs.existsSync(SITEMAP_PATH)) {
      console.error('❌ Sitemap not found! Run npm run build first.');
      process.exit(1);
    }

    const sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf8');

    // 2. Extract URLs using Regex (Simple & Fast)
    const urls = [];
    const locRegex = /<loc>(.*?)<\/loc>/g;
    let match;
    while ((match = locRegex.exec(sitemapContent)) !== null) {
      urls.push(match[1]);
    }

    console.log(`🔍 Found ${urls.length} URLs in sitemap.`);

    if (urls.length === 0) {
      console.log('⚠️ No URLs to ping.');
      return;
    }

    // 3. Prepare the Payload
    const payload = {
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    };

    // 4. Send Request to Bing (IndexNow)
    console.log('🚀 Sending request to IndexNow...');
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 200 || response.status === 202) {
      console.log('✅ Success! Bing has been notified of your changes.');
    } else {
      console.error(`❌ Failed: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error('Response:', errorText);
    }
  } catch (error) {
    console.error('❌ Error pinging IndexNow:', error);
  }
}

pingIndexNow();
