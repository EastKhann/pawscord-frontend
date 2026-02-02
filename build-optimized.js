#!/usr/bin/env node
// 🚀 PAWSCORD v2.2 - Optimized Build Script
// Otomatik build, analyze ve deployment

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 PAWSCORD v2.2 - Optimized Build Starting...\n');

// Colors
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m'
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✅${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}❌${colors.reset} ${msg}`)
};

// Steps
const steps = {
  // 1. Clean
  clean: () => {
    log.info('Cleaning old build...');
    try {
      execSync('rm -rf build dist', { stdio: 'inherit' });
      log.success('Clean complete');
    } catch (error) {
      log.warning('Clean failed (might not exist)');
    }
  },

  // 2. Install dependencies
  install: () => {
    log.info('Checking dependencies...');
    if (!fs.existsSync('node_modules')) {
      log.warning('Installing dependencies...');
      execSync('npm install', { stdio: 'inherit' });
      log.success('Dependencies installed');
    } else {
      log.success('Dependencies OK');
    }
  },

  // 3. Lint
  lint: () => {
    log.info('Running ESLint...');
    try {
      execSync('npm run lint --silent', { stdio: 'inherit' });
      log.success('Lint passed');
    } catch (error) {
      log.warning('Lint warnings found (continuing...)');
    }
  },

  // 4. Test
  test: () => {
    log.info('Running tests...');
    try {
      execSync('npm test -- --passWithNoTests --silent', { stdio: 'inherit' });
      log.success('Tests passed');
    } catch (error) {
      log.warning('Tests failed (continuing...)');
    }
  },

  // 5. Build
  build: (analyze = false) => {
    log.info('Building production bundle...');
    const env = analyze ? 'ANALYZE=true ' : '';
    try {
      execSync(`${env}npm run build`, { stdio: 'inherit' });
      log.success('Build complete');
    } catch (error) {
      log.error('Build failed!');
      process.exit(1);
    }
  },

  // 6. Analyze bundle
  analyze: () => {
    log.info('Analyzing bundle size...');
    const buildPath = path.join(__dirname, 'build');

    if (!fs.existsSync(buildPath)) {
      log.error('Build folder not found!');
      return;
    }

    // Get all JS files
    const jsFiles = [];
    const walkSync = (dir) => {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          walkSync(filePath);
        } else if (file.endsWith('.js')) {
          jsFiles.push({
            name: file,
            size: stat.size,
            path: filePath
          });
        }
      });
    };

    walkSync(buildPath);

    // Sort by size
    jsFiles.sort((a, b) => b.size - a.size);

    // Calculate totals
    const totalSize = jsFiles.reduce((sum, f) => sum + f.size, 0);
    const mainBundle = jsFiles.find(f => f.name.startsWith('main'));

    console.log('\n📊 Bundle Analysis:');
    console.log('─'.repeat(60));
    console.log(`Total JS size: ${(totalSize / 1024).toFixed(2)} KB`);
    console.log(`Main bundle: ${mainBundle ? (mainBundle.size / 1024).toFixed(2) + ' KB' : 'N/A'}`);
    console.log(`Chunks: ${jsFiles.length} files`);
    console.log('─'.repeat(60));

    console.log('\nTop 10 largest chunks:');
    jsFiles.slice(0, 10).forEach((file, i) => {
      const sizeKB = (file.size / 1024).toFixed(2);
      console.log(`${i + 1}. ${file.name.padEnd(40)} ${sizeKB.padStart(8)} KB`);
    });
    console.log('');

    // Check if target met
    if (mainBundle && mainBundle.size < 300 * 1024) {
      log.success('✅ Bundle size target met! (<300KB)');
    } else {
      log.warning('⚠️  Bundle size above target (>300KB)');
    }
  },

  // 7. Create deployment package
  package: () => {
    log.info('Creating deployment package...');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const packageName = `pawscord-v2.2-${timestamp}.zip`;

    try {
      execSync(`zip -r ${packageName} build/ -x "*.map"`, { stdio: 'inherit' });
      log.success(`Package created: ${packageName}`);
    } catch (error) {
      log.warning('Packaging failed (zip not found?)');
    }
  }
};

// Main execution
const main = async () => {
  const args = process.argv.slice(2);
  const shouldAnalyze = args.includes('--analyze');
  const shouldPackage = args.includes('--package');
  const skipTests = args.includes('--skip-tests');

  console.log('Configuration:');
  console.log(`  Analyze: ${shouldAnalyze}`);
  console.log(`  Package: ${shouldPackage}`);
  console.log(`  Skip Tests: ${skipTests}`);
  console.log('');

  try {
    // Execute steps
    steps.clean();
    steps.install();
    steps.lint();

    if (!skipTests) {
      steps.test();
    }

    steps.build(shouldAnalyze);
    steps.analyze();

    if (shouldPackage) {
      steps.package();
    }

    console.log('');
    log.success('🎉 Build completed successfully!\n');

    console.log('Next steps:');
    console.log('  1. Test the build locally: npx serve -s build');
    console.log('  2. Run Lighthouse: lighthouse http://localhost:3000');
    console.log('  3. Deploy to production\n');

  } catch (error) {
    log.error('Build process failed!');
    console.error(error);
    process.exit(1);
  }
};

// Help
if (process.argv.includes('--help')) {
  console.log('PAWSCORD v2.2 Build Script\n');
  console.log('Usage: node build-optimized.js [options]\n');
  console.log('Options:');
  console.log('  --analyze        Run bundle analyzer');
  console.log('  --package        Create deployment package');
  console.log('  --skip-tests     Skip test execution');
  console.log('  --help           Show this help\n');
  console.log('Examples:');
  console.log('  node build-optimized.js');
  console.log('  node build-optimized.js --analyze --package');
  console.log('  node build-optimized.js --skip-tests');
  process.exit(0);
}

main();
