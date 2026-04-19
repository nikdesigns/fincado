const fs = require('fs');
const path = require('path');
const http = require('http');

const PORT = Number.parseInt(process.env.COOKILESS_ANALYTICS_PORT || '8787', 10);
const ALLOWED_ORIGIN = process.env.COOKILESS_ALLOWED_ORIGIN || '*';
const MAX_BODY_BYTES = 32 * 1024;
const outputPath = path.join(process.cwd(), 'reports', 'cookieless-events.ndjson');

fs.mkdirSync(path.dirname(outputPath), { recursive: true });

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function appendEvent(payload) {
  const line = JSON.stringify({
    ...payload,
    received_at: new Date().toISOString(),
  });
  fs.appendFileSync(outputPath, `${line}\n`);
}

const server = http.createServer((req, res) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST' || req.url !== '/collect') {
    res.statusCode = 404;
    res.end('Not found');
    return;
  }

  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
    if (body.length > MAX_BODY_BYTES) {
      req.destroy();
    }
  });

  req.on('end', () => {
    try {
      const parsed = JSON.parse(body);
      if (!parsed || typeof parsed !== 'object') {
        throw new Error('Invalid payload');
      }

      appendEvent(parsed);
      res.statusCode = 202;
      res.end('accepted');
    } catch (error) {
      res.statusCode = 400;
      res.end('bad_request');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Cookieless collector listening on http://localhost:${PORT}/collect`);
  console.log(`Writing events to ${outputPath}`);
});
