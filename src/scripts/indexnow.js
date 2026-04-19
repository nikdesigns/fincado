const https = require('https');
const {
  INDEXNOW_HOST,
  INDEXNOW_KEY,
  SITE_ORIGIN,
  INDEXNOW_KEY_LOCATION,
} = require('./indexnow-config');

const URLS = [
  `${SITE_ORIGIN}/`,
  `${SITE_ORIGIN}/emi-calculator/`,
  `${SITE_ORIGIN}/sip-calculator/`,
  `${SITE_ORIGIN}/loans/home-loan/`,
  `${SITE_ORIGIN}/credit-score/`,
];

const payload = JSON.stringify({
  host: INDEXNOW_HOST,
  key: INDEXNOW_KEY,
  keyLocation: INDEXNOW_KEY_LOCATION,
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
