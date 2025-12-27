const https = require('https');

const KEY = 'dfd158e2da6b426c9eeabfc8dadd2611';

const URLS = [
  'https://fincado.com/',
  'https://fincado.com/emi-calculator/',
  'https://fincado.com/sip-calculator/',
  'https://fincado.com/loans/home-loan/',
  'https://fincado.com/credit-score/',
];

const payload = JSON.stringify({
  host: 'fincado.com',
  key: KEY,
  keyLocation: `https://fincado.com/${KEY}.txt`,
  urlList: URLS,
});

const options = {
  hostname: 'api.indexnow.org',
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload),
  },
};

const req = https.request(options, (res) => {
  console.log(`IndexNow Status: ${res.statusCode}`);
  res.on('data', (d) => process.stdout.write(d));
});

req.on('error', (err) => {
  console.error('IndexNow Error:', err);
});

req.write(payload);
req.end();
