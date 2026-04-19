const fs = require('fs');
const path = require('path');

const defaultCurrentPath = path.join(process.cwd(), 'reports', 'gsc', 'current.csv');
const defaultPreviousPath = path.join(process.cwd(), 'reports', 'gsc', 'previous.csv');

const currentPath = process.argv[2] ? path.resolve(process.argv[2]) : defaultCurrentPath;
const previousPath = process.argv[3] ? path.resolve(process.argv[3]) : defaultPreviousPath;

function parseCsv(content) {
  const rows = [];
  let row = [];
  let value = '';
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const next = content[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      value += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === ',' && !inQuotes) {
      row.push(value);
      value = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') i += 1;
      row.push(value);
      if (row.some((cell) => cell.trim().length > 0)) rows.push(row);
      row = [];
      value = '';
      continue;
    }

    value += char;
  }

  row.push(value);
  if (row.some((cell) => cell.trim().length > 0)) rows.push(row);
  return rows;
}

function normalizeHeader(header) {
  return header.trim().toLowerCase().replace(/\s+/g, '_');
}

function parseNumber(raw) {
  if (!raw) return 0;
  const cleaned = String(raw).replace(/[%,$\s,]/g, '');
  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

function readGscCsv(filePath) {
  if (!fs.existsSync(filePath)) return null;

  const content = fs.readFileSync(filePath, 'utf8');
  const rows = parseCsv(content);
  if (rows.length < 2) return [];

  const headers = rows[0].map(normalizeHeader);

  return rows.slice(1).map((rawRow, index) => {
    const row = {};
    headers.forEach((header, i) => {
      row[header] = (rawRow[i] || '').trim();
    });

    const key =
      row.query ||
      row.page ||
      row.url ||
      row.keyword ||
      row.landing_page ||
      `row_${index + 1}`;

    const dimension = row.query
      ? 'query'
      : row.page || row.url || row.landing_page
        ? 'page'
        : 'row';

    return {
      key,
      dimension,
      clicks: parseNumber(row.clicks),
      impressions: parseNumber(row.impressions),
      ctr: parseNumber(row.ctr),
      position: parseNumber(row.position),
    };
  });
}

function summarize(rows) {
  const totals = rows.reduce(
    (acc, row) => {
      acc.clicks += row.clicks;
      acc.impressions += row.impressions;
      acc.weightedPosition += row.position * row.impressions;
      return acc;
    },
    { clicks: 0, impressions: 0, weightedPosition: 0 },
  );

  return {
    clicks: totals.clicks,
    impressions: totals.impressions,
    ctr: totals.impressions > 0 ? (totals.clicks / totals.impressions) * 100 : 0,
    avgPosition:
      totals.impressions > 0 ? totals.weightedPosition / totals.impressions : 0,
  };
}

function buildDelta(currentRows, previousRows) {
  const previousByKey = new Map(previousRows.map((row) => [row.key, row]));
  const currentByKey = new Map(currentRows.map((row) => [row.key, row]));
  const allKeys = new Set([...previousByKey.keys(), ...currentByKey.keys()]);

  const rows = [];
  allKeys.forEach((key) => {
    const current = currentByKey.get(key) || {
      key,
      dimension: 'row',
      clicks: 0,
      impressions: 0,
      ctr: 0,
      position: 0,
    };
    const previous = previousByKey.get(key) || {
      key,
      dimension: current.dimension,
      clicks: 0,
      impressions: 0,
      ctr: 0,
      position: 0,
    };

    rows.push({
      key,
      dimension: current.dimension || previous.dimension,
      current,
      previous,
      clicksDelta: current.clicks - previous.clicks,
      impressionsDelta: current.impressions - previous.impressions,
      ctrDelta: current.ctr - previous.ctr,
      positionDelta: current.position - previous.position,
    });
  });

  return rows;
}

function pickTop(rows, selector, count) {
  return [...rows]
    .sort((a, b) => selector(b) - selector(a))
    .slice(0, count);
}

function pickBottom(rows, selector, count) {
  return [...rows]
    .sort((a, b) => selector(a) - selector(b))
    .slice(0, count);
}

const currentRows = readGscCsv(currentPath);
if (!currentRows) {
  console.error(`Current GSC CSV not found: ${currentPath}`);
  console.error('Place exports in reports/gsc/current.csv and optionally previous.csv');
  process.exit(1);
}

const previousRows = readGscCsv(previousPath) || [];
const currentSummary = summarize(currentRows);
const previousSummary = summarize(previousRows);
const deltas = buildDelta(currentRows, previousRows);

const report = {
  generatedAt: new Date().toISOString(),
  input: {
    currentPath,
    previousPath: previousRows.length > 0 ? previousPath : null,
  },
  summary: {
    current: currentSummary,
    previous: previousSummary,
    delta: {
      clicks: currentSummary.clicks - previousSummary.clicks,
      impressions: currentSummary.impressions - previousSummary.impressions,
      ctr: currentSummary.ctr - previousSummary.ctr,
      avgPosition: currentSummary.avgPosition - previousSummary.avgPosition,
    },
  },
  movers: {
    biggestImpressionDrops: pickBottom(deltas, (row) => row.impressionsDelta, 15),
    biggestClickDrops: pickBottom(deltas, (row) => row.clicksDelta, 15),
    biggestImpressionGains: pickTop(deltas, (row) => row.impressionsDelta, 15),
    biggestClickGains: pickTop(deltas, (row) => row.clicksDelta, 15),
  },
  opportunities: pickTop(
    currentRows.filter((row) => row.impressions >= 100 && row.ctr <= 2),
    (row) => row.impressions,
    20,
  ),
};

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const outPath = path.join(process.cwd(), 'reports', `gsc-insights-${timestamp}.json`);
fs.writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`);

console.log('GSC insights summary');
console.log(`Current clicks: ${currentSummary.clicks.toFixed(0)}`);
console.log(`Current impressions: ${currentSummary.impressions.toFixed(0)}`);
console.log(`Current CTR: ${currentSummary.ctr.toFixed(2)}%`);
console.log(`Current avg position: ${currentSummary.avgPosition.toFixed(2)}`);
if (previousRows.length > 0) {
  console.log(`Δ clicks vs previous: ${report.summary.delta.clicks.toFixed(0)}`);
  console.log(
    `Δ impressions vs previous: ${report.summary.delta.impressions.toFixed(0)}`,
  );
  console.log(`Δ CTR vs previous: ${report.summary.delta.ctr.toFixed(2)} pp`);
  console.log(
    `Δ avg position vs previous: ${report.summary.delta.avgPosition.toFixed(2)}`,
  );
} else {
  console.log('No previous.csv found. Generated a single-period baseline report.');
}
console.log(`Report saved: ${outPath}`);
