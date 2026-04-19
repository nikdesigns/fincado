const fs = require('fs');
const path = require('path');

const reportsDir = path.join(process.cwd(), 'reports');
const outDir = path.join(process.cwd(), 'out');

function latestReport(prefix) {
  if (!fs.existsSync(reportsDir)) return null;
  const files = fs
    .readdirSync(reportsDir)
    .filter((file) => file.startsWith(prefix) && file.endsWith('.json'))
    .map((file) => ({
      file,
      ts: fs.statSync(path.join(reportsDir, file)).mtimeMs,
    }))
    .sort((a, b) => b.ts - a.ts);
  return files[0]?.file || null;
}

function readJsonSafe(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

function countSitemapUrls() {
  const sitemapPath = path.join(outDir, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) return null;
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const matches = xml.match(/<url>/g);
  return matches ? matches.length : 0;
}

const latestDeepScanFile = latestReport('deep-scan-');
const deepScanPath = latestDeepScanFile
  ? path.join(reportsDir, latestDeepScanFile)
  : null;
const deepScan = deepScanPath ? readJsonSafe(deepScanPath) : null;

const latestGscFile = latestReport('gsc-insights-');
const gscPath = latestGscFile ? path.join(reportsDir, latestGscFile) : null;
const gsc = gscPath ? readJsonSafe(gscPath) : null;

const snapshot = {
  generatedAt: new Date().toISOString(),
  latestDeepScan: latestDeepScanFile,
  latestGscInsights: latestGscFile,
  sitemapUrlCount: countSitemapUrls(),
  checks: {
    brokenLinks:
      deepScan?.summary?.broken ??
      deepScan?.broken?.length ??
      deepScan?.results?.broken?.length ??
      null,
    redirects:
      deepScan?.summary?.redirects ??
      deepScan?.redirects?.length ??
      deepScan?.results?.redirects?.length ??
      null,
    gscImpressions: gsc?.summary?.current?.impressions ?? null,
    gscClicks: gsc?.summary?.current?.clicks ?? null,
    gscCtr: gsc?.summary?.current?.ctr ?? null,
    gscPosition: gsc?.summary?.current?.avgPosition ?? null,
  },
};

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const outPath = path.join(reportsDir, `seo-health-snapshot-${timestamp}.json`);
fs.writeFileSync(outPath, `${JSON.stringify(snapshot, null, 2)}\n`);

console.log(`SEO health snapshot saved: ${outPath}`);
if (!latestDeepScanFile) {
  console.log('No deep-scan report found. Run: npm run -s scan:prod');
}
if (!latestGscFile) {
  console.log('No GSC insights report found. Run: npm run -s seo:gsc');
}
