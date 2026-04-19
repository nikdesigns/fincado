const https = require('https');
const fetch = require('node-fetch');
const { parseStringPromise } = require('xml2js');
const {
  INDEXNOW_HOST,
  INDEXNOW_KEY,
  SITE_ORIGIN,
  INDEXNOW_KEY_LOCATION,
} = require('./indexnow-config');

const SITEMAP_URL = `${SITE_ORIGIN}/sitemap.xml`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

const httpsAgent = new https.Agent({
  keepAlive: true,
  timeout: 15000,
});

async function getUrlsFromSitemap() {
  const res = await fetch(SITEMAP_URL, { agent: httpsAgent });
  if (!res.ok) throw new Error('Failed to fetch sitemap');

  const xml = await res.text();
  const parsed = await parseStringPromise(xml);

  const urls = parsed.urlset.url
    .map((u) => u.loc[0])
    .filter((url) => {
      return (
        url.startsWith(SITE_ORIGIN) &&
        !url.includes('?') &&
        !url.includes('#') &&
        !url.includes('/page/') &&
        !url.includes('/tag/') &&
        !url.includes('/author/') &&
        !url.endsWith('.xml')
      );
    });

  return urls;
}

async function submitToIndexNow(urls) {
  const payload = {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList: urls,
  };

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    agent: httpsAgent,
  });

  console.log('IndexNow Status:', res.status);
}

(async () => {
  try {
    const urls = await getUrlsFromSitemap();
    console.log(`🚀 Sending ${urls.length} URLs to IndexNow...`);
    await submitToIndexNow(urls);
    console.log('✅ IndexNow submission completed');
  } catch (err) {
    console.error('❌ IndexNow FAILED:', err.message);
  }
})();
