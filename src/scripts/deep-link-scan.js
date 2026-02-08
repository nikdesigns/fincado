const http = require('http');
const https = require('https');
const { parse } = require('url');

class DeepLinkScanner {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.visited = new Set();
    this.queue = ['/'];
    this.results = {
      checked: 0,
      broken: [],
      working: 0,
      skipped: 0,
      redirects: [],
    };
    this.maxConcurrent = 5;
    this.timeout = 10000; // 10 seconds
  }

  async fetchPage(path) {
    return new Promise((resolve) => {
      const url = `${this.baseUrl}${path}`;
      const isHttps = this.baseUrl.startsWith('https');
      const client = isHttps ? https : http;

      const options = {
        method: 'GET',
        timeout: this.timeout,
      };

      const req = client.get(url, options, (res) => {
        let body = '';

        res.on('data', (chunk) => {
          body += chunk.toString();
        });

        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            body: body,
            headers: res.headers,
          });
        });
      });

      req.on('error', (err) => {
        resolve({
          statusCode: 0,
          error: err.message,
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({
          statusCode: 0,
          error: 'Timeout',
        });
      });
    });
  }

  extractLinks(html, currentPath) {
    const links = new Set();

    // Match href attributes in anchor tags
    const hrefRegex = /href=["']([^"']+)["']/gi;
    let match;

    while ((match = hrefRegex.exec(html)) !== null) {
      let link = match[1];

      // Skip external links, anchors, mailto, tel, etc.
      if (
        link.startsWith('http://') ||
        link.startsWith('https://') ||
        link.startsWith('mailto:') ||
        link.startsWith('tel:') ||
        link.startsWith('#') ||
        link.startsWith('javascript:')
      ) {
        continue;
      }

      // Handle relative links
      if (link.startsWith('/')) {
        links.add(link);
      } else if (link.startsWith('./')) {
        links.add(link.substring(1));
      } else if (!link.startsWith('../')) {
        // Simple relative path
        const base = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
        links.add(base + link);
      }
    }

    return Array.from(links);
  }

  normalizePath(path) {
    // Remove query strings and anchors
    path = path.split('?')[0].split('#')[0];

    // Ensure trailing slash for directories
    if (!path.endsWith('/') && !path.includes('.')) {
      path += '/';
    }

    return path;
  }

  async checkLink(path, source) {
    this.results.checked++;
    process.stdout.write(
      `\r📊 Checked: ${this.results.checked} | Queue: ${this.queue.length} | Broken: ${this.results.broken.length}`,
    );

    const response = await this.fetchPage(path);

    if (response.statusCode === 200) {
      this.results.working++;
      return {
        success: true,
        body: response.body,
        contentType: response.headers?.['content-type'],
      };
    } else if (response.statusCode >= 300 && response.statusCode < 400) {
      this.results.redirects.push({
        path,
        status: response.statusCode,
        location: response.headers?.location,
        source,
      });
      return { success: false };
    } else {
      this.results.broken.push({
        path,
        status: response.statusCode,
        error: response.error,
        source,
      });
      return { success: false };
    }
  }

  async crawlPage(path, source = 'root') {
    const normalizedPath = this.normalizePath(path);

    // Skip if already visited
    if (this.visited.has(normalizedPath)) {
      return;
    }

    this.visited.add(normalizedPath);

    const result = await this.checkLink(normalizedPath, source);

    // Only extract links from HTML pages
    if (
      result.success &&
      result.body &&
      result.contentType?.includes('text/html')
    ) {
      const links = this.extractLinks(result.body, normalizedPath);

      // Add new links to queue
      for (const link of links) {
        const normalized = this.normalizePath(link);
        if (!this.visited.has(normalized) && !this.queue.includes(normalized)) {
          this.queue.push(normalized);
        }
      }
    }
  }

  async scan() {
    console.log(`🔍 Deep Link Scanner\n`);
    console.log(`Base URL: ${this.baseUrl}`);
    console.log(`Starting crawl...\n`);

    const startTime = Date.now();

    while (this.queue.length > 0) {
      // Process pages in batches
      const batch = this.queue.splice(0, this.maxConcurrent);
      await Promise.all(batch.map((path) => this.crawlPage(path, 'crawled')));
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log('\n\n');
    console.log('═══════════════════════════════════════════════════════');
    console.log('                 DEEP SCAN REPORT                      ');
    console.log('═══════════════════════════════════════════════════════\n');

    console.log(`⏱️  Duration: ${duration}s`);
    console.log(`📊 Total Links Checked: ${this.results.checked}`);
    console.log(`✅ Working: ${this.results.working}`);
    console.log(`❌ Broken: ${this.results.broken.length}`);
    console.log(`🔀 Redirects: ${this.results.redirects.length}\n`);

    if (this.results.broken.length > 0) {
      console.log('═══════════════════════════════════════════════════════');
      console.log('                   BROKEN LINKS                        ');
      console.log('═══════════════════════════════════════════════════════\n');

      this.results.broken.forEach((link, index) => {
        console.log(`${index + 1}. ❌ ${link.path}`);
        console.log(`   Status: ${link.status || 'N/A'}`);
        if (link.error) console.log(`   Error: ${link.error}`);
        console.log(`   Found on: ${link.source}\n`);
      });
    }

    if (this.results.redirects.length > 0) {
      console.log('═══════════════════════════════════════════════════════');
      console.log('                     REDIRECTS                         ');
      console.log('═══════════════════════════════════════════════════════\n');

      this.results.redirects.slice(0, 20).forEach((redirect, index) => {
        console.log(`${index + 1}. 🔀 ${redirect.path}`);
        console.log(`   Status: ${redirect.status}`);
        console.log(`   Location: ${redirect.location || 'N/A'}\n`);
      });

      if (this.results.redirects.length > 20) {
        console.log(
          `... and ${this.results.redirects.length - 20} more redirects\n`,
        );
      }
    }

    console.log('═══════════════════════════════════════════════════════\n');

    // Save report
    this.saveReport();

    return this.results.broken.length === 0;
  }

  saveReport() {
    const fs = require('fs');
    const path = require('path');

    const reportDir = path.join(process.cwd(), 'reports');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportPath = path.join(reportDir, `deep-scan-${timestamp}.json`);

    const report = {
      timestamp: new Date().toISOString(),
      baseUrl: this.baseUrl,
      summary: {
        checked: this.results.checked,
        working: this.results.working,
        broken: this.results.broken.length,
        redirects: this.results.redirects.length,
      },
      brokenLinks: this.results.broken,
      redirects: this.results.redirects,
    };

    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`💾 Report saved to: ${reportPath}\n`);
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const baseUrl = args[0] || 'http://localhost:3000';

  const scanner = new DeepLinkScanner(baseUrl);
  const success = await scanner.scan();

  if (success) {
    console.log('✅ All links are working! 🎉\n');
    process.exit(0);
  } else {
    console.log(`⚠️  Found ${scanner.results.broken.length} broken link(s).\n`);
    process.exit(1);
  }
}

main();
