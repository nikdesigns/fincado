// src/scripts/calculator-checker.js
const fs = require('fs');
const path = require('path');

const CALCULATORS = [
  'loans/home-loan',
  'loans/personal-loan',
  'loans/car-loan',
  'loans/education-loan',
  'emi-calculator',
  'emi-prepayment-calculator',
  'sip-calculator',
  'elss-calculator',
  'lumpsum-calculator',
  'mutual-funds',
  'ppf-calculator',
  'sukanya-samriddhi',
  'fd-calculator',
  'rd-calculator',
  'swp-calculator',
  'pomis-calculator',
  'nsc-calculator',
  'kvp-calculator',
  'cagr-calculator',
  'nps-calculator',
  'epf-calculator',
  'gratuity-calculator',
  'retirement-calculator',
  'apy-calculator',
  'scss-calculator',
  'fire-calculator',
  'goal-planning-calculator',
  'income-tax-calculator',
  'salary-calculator',
  'capital-gains-calculator',
  'brokerage-calculator',
  'hra-calculator',
  'rent-receipt-generator',
  'gst-calculator',
  'inflation-calculator',
  'credit-score',
  'simple-interest-calculator',
  'compound-interest-calculator',
];

// Required components for each calculator
const REQUIRED_COMPONENTS = {
  metadata: [
    'title',
    'description',
    'keywords',
    'alternates',
    'openGraph',
    'robots',
  ],
  structure: [
    'BreadcrumbJsonLd',
    'CalculatorSchema',
    'FAQSchema',
    'ShareTools',
    'LanguageToggle',
    'AdSlot',
    'AuthorBio',
    'WikiText',
  ],
  content: [
    'h1', // Main heading
    'Calculator component', // The actual calculator (Client component)
    'Formula section',
    'Example calculation',
    'FAQ section',
    'Related calculators',
  ],
  seo: [
    'Structured data (JSON-LD)',
    'Meta tags',
    'Semantic HTML',
    'Internal links',
  ],
};

class CalculatorChecker {
  constructor() {
    this.results = {};
    this.appDir = path.join(process.cwd(), 'src/app');
  }

  async checkCalculator(calculator) {
    console.log(`\n🔍 Checking: ${calculator}`);

    const calcPath = path.join(this.appDir, calculator);
    const pagePath = path.join(calcPath, 'page.tsx');
    const clientPath = this.findClientComponent(calcPath);

    const result = {
      name: calculator,
      exists: false,
      hasPage: false,
      hasClient: false,
      metadata: {},
      components: {},
      content: {},
      issues: [],
      score: 0,
    };

    // Check if directory exists
    if (!fs.existsSync(calcPath)) {
      result.issues.push('❌ Calculator directory not found');
      return result;
    }
    result.exists = true;

    // Check page.tsx
    if (!fs.existsSync(pagePath)) {
      result.issues.push('❌ page.tsx not found');
      return result;
    }
    result.hasPage = true;

    // Check client component
    if (!clientPath) {
      result.issues.push('⚠️  Client component not found');
    } else {
      result.hasClient = true;
    }

    // Read and analyze page.tsx
    const pageContent = fs.readFileSync(pagePath, 'utf-8');

    // Check metadata
    this.checkMetadata(pageContent, result);

    // Check components
    this.checkComponents(pageContent, result);

    // Check content structure
    this.checkContent(pageContent, result);

    // Check client component
    if (clientPath) {
      const clientContent = fs.readFileSync(clientPath, 'utf-8');
      this.checkClientComponent(clientContent, result);
    }

    // Calculate score
    result.score = this.calculateScore(result);

    return result;
  }

  findClientComponent(calcPath) {
    const possibleNames = [
      'EMIClient.tsx',
      'SIPClient.tsx',
      'IncomeTaxClient.tsx',
      'PPFClient.tsx',
      'FDClient.tsx',
      'ELSSClient.tsx',
      'EPFClient.tsx',
      'GSTClient.tsx',
      'HRAClient.tsx',
      'NPSClient.tsx',
      'GratuityClient.tsx',
      'RDClient.tsx',
      'SukanyaClient.tsx',
      'SWPClient.tsx',
      'InflationClient.tsx',
      'RetirementClient.tsx',
      'LumpsumClient.tsx',
      'CompoundInterestClient.tsx',
      'SimpleInterestClient.tsx',
      'APYClient.tsx',
      'FIREClient.tsx',
      'FIRECalculatorClient.tsx',
      'HomeLoanClient.tsx',
    ];

    for (const name of possibleNames) {
      const clientPath = path.join(calcPath, name);
      if (fs.existsSync(clientPath)) {
        return clientPath;
      }
    }

    // Try to find any file ending with Client.tsx
    const files = fs.readdirSync(calcPath);
    const clientFile = files.find((f) => f.endsWith('Client.tsx'));
    if (clientFile) {
      return path.join(calcPath, clientFile);
    }

    return null;
  }

  checkMetadata(content, result) {
    // Check for export const metadata
    if (content.includes('export const metadata')) {
      result.metadata.hasMetadata = true;
    } else {
      result.issues.push('❌ Missing metadata export');
      return;
    }

    // Check individual metadata fields
    const metadataChecks = {
      title: /title:\s*['"`]/,
      description: /description:\s*['"`]/,
      keywords: /keywords:\s*\[/,
      canonical: /canonical:\s*['"`]/,
      openGraph: /openGraph:\s*{/,
      robots: /robots:\s*{/,
    };

    for (const [field, regex] of Object.entries(metadataChecks)) {
      result.metadata[field] = regex.test(content);
      if (!result.metadata[field]) {
        result.issues.push(`⚠️  Missing metadata.${field}`);
      }
    }
  }

  checkComponents(content, result) {
    const components = {
      BreadcrumbJsonLd: /<BreadcrumbJsonLd/,
      CalculatorSchema: /<CalculatorSchema/,
      FAQSchema: /<FAQSchema/,
      ShareTools: /<ShareTools/,
      LanguageToggle: /<LanguageToggle/,
      AdSlot: /<AdSlot/,
      AuthorBio: /<AuthorBio/,
      WikiText: /<WikiText/,
      Card: /<Card/,
      Accordion: /<Accordion/,
    };

    for (const [component, regex] of Object.entries(components)) {
      result.components[component] = regex.test(content);
      if (!result.components[component] && component !== 'Accordion') {
        result.issues.push(`⚠️  Missing component: ${component}`);
      }
    }
  }

  checkContent(content, result) {
    const contentChecks = {
      hasH1: /<h1[^>]*>/i,
      hasFormula:
        /formula|calculation|how.*calculate|computation|methodology|projection/i,
      hasExample: /example|sample|illustration|for example/i,
      hasFAQ: /faq|frequently asked|questions|<FAQSchema/i,
      hasRelatedCalcs:
        /related.*calculator|more calculator|<RelatedCalculators|<RelatedCalculatorsSidebar/i,
      hasInternalLinks: /<Link[\s\S]{0,120}?href=|href=['"`]\/(?!\/)/i,
    };

    for (const [check, regex] of Object.entries(contentChecks)) {
      result.content[check] = regex.test(content);
      if (!result.content[check]) {
        result.issues.push(`⚠️  Missing: ${check}`);
      }
    }
  }

  checkClientComponent(content, result) {
    // Check for state management
    const hasState = /\buseState\b/.test(content);

    // Check for input fields
    const hasInputs =
      /<input\b|<Input\b|<Slider\b|<CalculatorField\b|<Select\b|<RadioGroup\b|<Switch\b/i.test(
        content,
      );

    // Check for calculation logic
    const hasCalculation =
      /calculat|compute|formula|project|estimate|return\s*\{|tax|interest|maturity|corpus|emi|sip/i.test(
        content,
      );

    // Check for results display
    const hasResults =
      /result|output|total|amount|maturity|corpus|interest|emi|pension|withdrawn|returns?/i.test(
        content,
      );

    if (!hasState) {
      result.issues.push('⚠️  Client: Missing useState');
    }

    if (!hasInputs) {
      result.issues.push('❌ Client: Missing input fields');
    }

    if (!hasCalculation) {
      result.issues.push('❌ Client: Missing calculation logic');
    }

    if (!hasResults) {
      result.issues.push('❌ Client: Missing results display');
    }

    result.components.clientState = hasState;
    result.components.clientInputs = hasInputs;
    result.components.clientCalculation = hasCalculation;
    result.components.clientResults = hasResults;
  }

  calculateScore(result) {
    let score = 0;
    let maxScore = 0;

    // Metadata (30 points)
    maxScore += 30;
    const metadataCount = Object.values(result.metadata).filter(Boolean).length;
    score += (metadataCount / 7) * 30;

    // Components (30 points)
    maxScore += 30;
    const componentCount = Object.values(result.components).filter(
      Boolean,
    ).length;
    score += (componentCount / 14) * 30;

    // Content (20 points)
    maxScore += 20;
    const contentCount = Object.values(result.content).filter(Boolean).length;
    score += (contentCount / 6) * 20;

    // Client component (20 points)
    maxScore += 20;
    if (result.hasClient) {
      score += 20;
    }

    return Math.round((score / maxScore) * 100);
  }

  printReport(result) {
    const scoreColor =
      result.score >= 80 ? '🟢' : result.score >= 60 ? '🟡' : '🔴';

    console.log(`\n${scoreColor} ${result.name}: ${result.score}%`);

    if (result.score === 100) {
      console.log('   ✅ Perfect! All checks passed');
      return;
    }

    if (result.issues.length > 0) {
      console.log('   Issues:');
      result.issues.slice(0, 5).forEach((issue) => {
        console.log(`      ${issue}`);
      });

      if (result.issues.length > 5) {
        console.log(`      ... and ${result.issues.length - 5} more issues`);
      }
    }
  }

  generateSummaryReport(results) {
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('           CALCULATOR AUDIT SUMMARY                    ');
    console.log('═══════════════════════════════════════════════════════\n');

    const scores = Object.values(results).map((r) => r.score);
    const avgScore = Math.round(
      scores.reduce((a, b) => a + b, 0) / scores.length,
    );

    const perfect = scores.filter((s) => s === 100).length;
    const good = scores.filter((s) => s >= 80 && s < 100).length;
    const needsWork = scores.filter((s) => s >= 60 && s < 80).length;
    const critical = scores.filter((s) => s < 60).length;

    console.log(`📊 Overall Average: ${avgScore}%\n`);

    console.log(`🟢 Perfect (100%): ${perfect}`);
    console.log(`🟢 Good (80-99%): ${good}`);
    console.log(`🟡 Needs Work (60-79%): ${needsWork}`);
    console.log(`🔴 Critical (<60%): ${critical}\n`);

    // List critical issues
    if (critical > 0) {
      console.log('═══════════════════════════════════════════════════════');
      console.log('              CALCULATORS NEEDING ATTENTION             ');
      console.log('═══════════════════════════════════════════════════════\n');

      Object.values(results)
        .filter((r) => r.score < 60)
        .forEach((r) => {
          console.log(`🔴 ${r.name} (${r.score}%)`);
          r.issues.slice(0, 3).forEach((issue) => {
            console.log(`   ${issue}`);
          });
          console.log('');
        });
    }

    // Common issues
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('                 COMMON ISSUES                         ');
    console.log('═══════════════════════════════════════════════════════\n');

    const allIssues = Object.values(results).flatMap((r) => r.issues);
    const issueCount = {};

    allIssues.forEach((issue) => {
      issueCount[issue] = (issueCount[issue] || 0) + 1;
    });

    Object.entries(issueCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .forEach(([issue, count]) => {
        console.log(`${count}x - ${issue}`);
      });

    console.log('\n═══════════════════════════════════════════════════════\n');
  }

  async run() {
    console.log('🚀 Starting Calculator Audit...\n');
    console.log(`Checking ${CALCULATORS.length} calculators...\n`);

    for (const calculator of CALCULATORS) {
      const result = await this.checkCalculator(calculator);
      this.results[calculator] = result;
      this.printReport(result);
    }

    this.generateSummaryReport(this.results);

    // Save detailed report
    const reportPath = path.join(
      process.cwd(),
      'reports',
      'calculator-audit.json',
    );

    if (!fs.existsSync(path.join(process.cwd(), 'reports'))) {
      fs.mkdirSync(path.join(process.cwd(), 'reports'), { recursive: true });
    }

    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`📄 Detailed report saved to: ${reportPath}\n`);

    // Exit with error if critical issues found
    const hasCritical = Object.values(this.results).some((r) => r.score < 60);
    process.exit(hasCritical ? 1 : 0);
  }
}

// Run
const checker = new CalculatorChecker();
checker.run();
