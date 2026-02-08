import * as fs from 'fs';
import * as path from 'path';

interface Report {
  timestamp: string;
  summary: {
    totalLinks: number;
    passedLinks: number;
    brokenLinks: number;
    skippedLinks: number;
  };
  brokenLinks: Array<{
    url: string;
    status: number;
    parent: string;
  }>;
}

function generateDashboard() {
  const reportDir = path.join(process.cwd(), 'reports');

  if (!fs.existsSync(reportDir)) {
    console.log('No reports found.');
    return;
  }

  const files = fs
    .readdirSync(reportDir)
    .filter((f) => f.startsWith('link-check-'))
    .sort()
    .reverse()
    .slice(0, 10); // Last 10 reports

  console.log('═══════════════════════════════════════════════════════');
  console.log('             LINK HEALTH DASHBOARD                    ');
  console.log('═══════════════════════════════════════════════════════\n');

  files.forEach((file, index) => {
    const reportPath = path.join(reportDir, file);
    const report: Report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));

    const date = new Date(report.timestamp).toLocaleString('en-IN');
    const successRate = (
      (report.summary.passedLinks / report.summary.totalLinks) *
      100
    ).toFixed(1);

    const status = report.summary.brokenLinks === 0 ? '✅' : '❌';

    console.log(`${status} ${date}`);
    console.log(
      `   Total: ${report.summary.totalLinks} | Passed: ${report.summary.passedLinks} | Broken: ${report.summary.brokenLinks}`,
    );
    console.log(`   Success Rate: ${successRate}%\n`);
  });
}

generateDashboard();
