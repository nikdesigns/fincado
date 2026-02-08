const { chromium } = require('playwright');

async function deepScan() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const visited = new Set();
  const broken = [];
  const queue = ['http://localhost:3000/'];

  while (queue.length > 0) {
    const url = queue.shift();

    if (visited.has(url)) continue;
    visited.add(url);

    try {
      const response = await page.goto(url, { waitUntil: 'networkidle' });

      console.log(`✅ ${url} - ${response.status()}`);

      // Extract links
      const links = await page.$$eval('a[href]', (anchors) =>
        anchors
          .map((a) => a.href)
          .filter((href) => href.startsWith('http://localhost:3000')),
      );

      queue.push(...links.filter((link) => !visited.has(link)));
    } catch (error) {
      console.log(`❌ ${url} - ${error.message}`);
      broken.push({ url, error: error.message });
    }
  }

  await browser.close();

  console.log(`\n📊 Total: ${visited.size}, Broken: ${broken.length}`);
  if (broken.length > 0) {
    console.log('\n❌ Broken Links:');
    broken.forEach((b) => console.log(`  ${b.url} - ${b.error}`));
  }
}

deepScan();
