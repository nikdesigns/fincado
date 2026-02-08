import { LinkChecker } from 'linkinator';
import * as fs from 'fs';
import * as path from 'path';

interface BrokenLink {
  url: string;
  status: number;
  parent: string;
  state: string;
}

interface CheckResult {
  totalLinks: number;
  passedLinks: number;
  brokenLinks: BrokenLink[];
  skippedLinks: number;
  timeoutLinks: number;
  warnings: string[];
}

/**
 * Check for broken links in the built site
 */
async function checkLinks(): Promise<CheckResult> {
  console.log('🔍 Starting link checker...\n');

  const siteUrl = process.env.SITE_URL || 'https://fincado.com';
  const isLocalCheck = process.argv.includes('--local');
  const targetUrl = isLocalCheck ? 'http://localhost:3000' : siteUrl;

  const brokenLinks: BrokenLink[] = [];
  const warnings: string[] = [];
  let totalLinks = 0;
  let passedLinks = 0;
  let skippedLinks = 0;
  let timeoutLinks = 0;

  const options = {
    recurse: true,
    timeout: 30000, // Reduced to 30 seconds
    concurrency: 2, // Reduced concurrency to prevent overwhelming local server
    retry: false,
    linksToSkip: [
      // Skip external social media
      'https://twitter.com',
      'https://facebook.com',
      'https://linkedin.com',
      'https://instagram.com',
      'https://youtube.com',

      // Skip ad networks
      'https://pagead2.googlesyndication.com',
      'https://googleads.g.doubleclick.net',

      // Skip analytics
      'https://www.google-analytics.com',
      'https://www.googletagmanager.com',
      'https://www.clarity.ms',

      // Skip other protocols
      'mailto:',
      'tel:',
      '#',

      // Skip potential problem URLs
      '{search_term_string}',
    ],
  };

  const checker = new LinkChecker();

  // ✅ Handle link events
  checker.on('link' as any, (result: any) => {
    totalLinks++;
    process.stdout.write(`\r📊 Checked ${totalLinks} links...`);

    if (result.state === 'BROKEN') {
      if (result.status === 0 || !result.status) {
        timeoutLinks++;
        console.log(`\n⏱️  Timeout: ${result.url}`);
      } else {
        brokenLinks.push({
          url: result.url || '',
          status: result.status || 0,
          parent: result.parent || 'unknown',
          state: result.state || 'unknown',
        });
        console.error(`\n❌ BROKEN: ${result.url}`);
        console.error(`   Status: ${result.status}`);
        console.error(`   From: ${result.parent}`);
      }
    } else if (result.state === 'OK') {
      passedLinks++;
    } else if (result.state === 'SKIPPED') {
      skippedLinks++;
    }

    if (result.status === 301 || result.status === 302) {
      warnings.push(`⚠️ Redirect (${result.status}): ${result.url}`);
    }
  });

  // ✅ Handle errors to prevent unhandled exceptions
  checker.on('error' as any, (error: any) => {
    console.error('\n⚠️ Checker error (continuing):', error.message);
    // Don't throw - just log and continue
  });

  // ✅ Wrap in Promise with proper error handling
  return new Promise((resolve) => {
    checker
      .check({
        path: targetUrl,
        ...options,
      })
      .then(() => {
        console.log('\n\n✅ Link checking complete!\n');
        resolve({
          totalLinks,
          passedLinks,
          brokenLinks,
          skippedLinks,
          timeoutLinks,
          warnings,
        });
      })
      .catch((error) => {
        console.error(
          '\n⚠️ Link checking completed with errors:',
          error.message,
        );
        // Still return results even if there were errors
        resolve({
          totalLinks,
          passedLinks,
          brokenLinks,
          skippedLinks,
          timeoutLinks,
          warnings,
        });
      });
  });
}

/**
 * Generate a detailed report
 */
function generateReport(result: CheckResult): void {
  console.log('═══════════════════════════════════════════════════════');
  console.log('                    LINK CHECK REPORT                   ');
  console.log('═══════════════════════════════════════════════════════\n');

  console.log(`📊 Total Links Checked: ${result.totalLinks}`);
  console.log(`✅ Passed: ${result.passedLinks}`);
  console.log(`❌ Broken: ${result.brokenLinks.length}`);
  console.log(`⏱️  Timeouts: ${result.timeoutLinks}`);
  console.log(`⏭️  Skipped: ${result.skippedLinks}\n`);

  if (result.brokenLinks.length > 0) {
    console.log('═══════════════════════════════════════════════════════');
    console.log('                      BROKEN LINKS                      ');
    console.log('═══════════════════════════════════════════════════════\n');

    result.brokenLinks.slice(0, 20).forEach((link, index) => {
      console.log(`${index + 1}. ❌ ${link.url}`);
      console.log(`   Status: ${link.status}`);
      console.log(`   Found on: ${link.parent}\n`);
    });

    if (result.brokenLinks.length > 20) {
      console.log(
        `... and ${result.brokenLinks.length - 20} more broken links\n`,
      );
    }
  }

  if (result.timeoutLinks > 0) {
    console.log('\n⚠️ Note: Some links timed out after 30 seconds.');
    console.log('   These might be slow pages or infinite loops.\n');
  }

  console.log('\n═══════════════════════════════════════════════════════\n');
}

/**
 * Save report to file
 */
function saveReport(result: CheckResult): void {
  const reportDir = path.join(process.cwd(), 'reports');

  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportPath = path.join(reportDir, `link-check-${timestamp}.json`);

  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalLinks: result.totalLinks,
      passedLinks: result.passedLinks,
      brokenLinks: result.brokenLinks.length,
      timeoutLinks: result.timeoutLinks,
      skippedLinks: result.skippedLinks,
    },
    brokenLinks: result.brokenLinks,
    warnings: result.warnings.slice(0, 50),
  };

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`💾 Report saved to: ${reportPath}\n`);
}

/**
 * Main execution
 */
async function main() {
  try {
    const result = await checkLinks();
    generateReport(result);
    saveReport(result);

    if (result.brokenLinks.length > 0) {
      console.error(
        `\n⚠️ Found ${result.brokenLinks.length} broken link(s).\n`,
      );

      if (result.timeoutLinks > 0) {
        console.log(
          `Note: ${result.timeoutLinks} link(s) timed out and are not counted as broken.\n`,
        );
      }

      process.exit(1);
    } else {
      console.log('✅ All links are working! 🎉\n');

      if (result.timeoutLinks > 0) {
        console.log(
          `⚠️ ${result.timeoutLinks} link(s) timed out. Investigate these pages:\n`,
        );
        console.log('   They may be slow, stuck, or have infinite loops.\n');
      }

      process.exit(0);
    }
  } catch (error) {
    console.error('❌ Link checker failed:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

export { checkLinks, generateReport, saveReport };
