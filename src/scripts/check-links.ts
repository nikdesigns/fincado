import { LinkChecker, LinkState, CheckOptions } from 'linkinator';
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

  const options: Partial<CheckOptions> = {
    recurse: true,
    timeout: 10000, // 10 seconds per link
    concurrency: 10, // Check 10 links at a time
    retry: true,
    retryErrors: true,
    retryErrorsCount: 2,

    // Skip certain URLs
    linksToSkip: [
      // Skip external social media links (can be rate-limited)
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

      // Skip other external APIs that might be flaky
      'https://www.clarity.ms',

      // Skip mailto and tel links
      'mailto:',
      'tel:',

      // Skip hash links (same-page anchors)
      '#',
    ],
  };

  const checker = new LinkChecker();

  checker.on('link', (result) => {
    totalLinks++;

    // Progress indicator
    if (totalLinks % 50 === 0) {
      process.stdout.write(`\r📊 Checked ${totalLinks} links...`);
    }

    if (result.state === LinkState.BROKEN) {
      brokenLinks.push({
        url: result.url || '',
        status: result.status || 0,
        parent: result.parent || 'unknown',
        state: result.state,
      });
    } else if (result.state === LinkState.OK) {
      passedLinks++;
    } else if (result.state === LinkState.SKIPPED) {
      skippedLinks++;
    }

    // Collect warnings for slow or redirected links
    if (result.status === 301 || result.status === 302) {
      warnings.push(
        `⚠️  Redirect (${result.status}): ${result.url} → ${result.parent}`,
      );
    }
  });

  try {
    console.log(`🌐 Target URL: ${targetUrl}\n`);
    await checker.check({
      path: targetUrl,
      ...options,
    });

    console.log('\n\n✅ Link checking complete!\n');

    return {
      totalLinks,
      passedLinks,
      brokenLinks,
      skippedLinks,
      warnings,
    };
  } catch (error) {
    console.error('❌ Error during link checking:', error);
    throw error;
  }
}

/**
 * Generate a detailed report
 */
function generateReport(result: CheckResult): void {
  console.log('═══════════════════════════════════════════════════════');
  console.log('                   LINK CHECK REPORT                   ');
  console.log('═══════════════════════════════════════════════════════\n');

  console.log(`📊 Total Links Checked: ${result.totalLinks}`);
  console.log(`✅ Passed: ${result.passedLinks}`);
  console.log(`❌ Broken: ${result.brokenLinks.length}`);
  console.log(`⏭️  Skipped: ${result.skippedLinks}\n`);

  // Show broken links
  if (result.brokenLinks.length > 0) {
    console.log('═══════════════════════════════════════════════════════');
    console.log('                     BROKEN LINKS                      ');
    console.log('═══════════════════════════════════════════════════════\n');

    result.brokenLinks.forEach((link, index) => {
      console.log(`${index + 1}. ❌ ${link.url}`);
      console.log(`   Status: ${link.status}`);
      console.log(`   Found on: ${link.parent}\n`);
    });
  }

  // Show warnings (redirects)
  if (result.warnings.length > 0 && result.warnings.length <= 10) {
    console.log('═══════════════════════════════════════════════════════');
    console.log('                       WARNINGS                        ');
    console.log('═══════════════════════════════════════════════════════\n');

    result.warnings.slice(0, 10).forEach((warning) => {
      console.log(warning);
    });

    if (result.warnings.length > 10) {
      console.log(`\n... and ${result.warnings.length - 10} more warnings`);
    }
  }

  console.log('\n═══════════════════════════════════════════════════════\n');
}

/**
 * Save report to file
 */
function saveReport(result: CheckResult): void {
  const reportDir = path.join(process.cwd(), 'reports');

  // Create reports directory if it doesn't exist
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
      skippedLinks: result.skippedLinks,
    },
    brokenLinks: result.brokenLinks,
    warnings: result.warnings,
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

    // Exit with error code if broken links found
    if (result.brokenLinks.length > 0) {
      console.error(
        `\n❌ Found ${result.brokenLinks.length} broken link(s). Fix them before deploying!\n`,
      );
      process.exit(1);
    } else {
      console.log('✅ All links are working! 🎉\n');
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
