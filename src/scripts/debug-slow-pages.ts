import fetch from 'node-fetch';

const pagesToTest = [
  'http://localhost:3000/',
  'http://localhost:3000/emi-calculator/',
  'http://localhost:3000/sip-calculator/',
  'http://localhost:3000/income-tax-calculator/',
  'http://localhost:3000/contact/',
  'http://localhost:3000/about/',
  'http://localhost:3000/guides/'
];

async function testPageSpeed() {
  console.log('🔍 Testing page speeds...\n');

  for (const url of pagesToTest) {
    const start = Date.now();

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const response = await fetch(url, {
        signal: controller.signal,
      });

      clearTimeout(timeout);
      const duration = Date.now() - start;

      if (response.ok) {
        console.log(`✅ ${url} - ${duration}ms`);
      } else {
        console.log(`❌ ${url} - Status ${response.status} - ${duration}ms`);
      }
    } catch (error: unknown) {
      const duration = Date.now() - start;

      if (error.name === 'AbortError') {
        console.log(`⏱️  ${url} - TIMEOUT (>10s)`);
      } else {
        console.log(`❌ ${url} - Error: ${error.message} - ${duration}ms`);
      }
    }
  }

  console.log('\n✅ Page speed test complete!\n');
}

testPageSpeed();
