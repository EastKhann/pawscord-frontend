#!/usr/bin/env node
/**
 * 🔍 PAWSCORD BUILD VERIFICATION SCRIPT
 * 
 * Checks the production build for:
 * 1. Hardcoded local IPs (192.168.x.x, 127.0.0.1, localhost)
 * 2. Development API URLs
 * 3. Debug/test credentials
 * 
 * Run after: npm run build
 * Usage: node scripts/verify-build.js
 */

const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '..', 'build');
const ASSETS_DIR = path.join(BUILD_DIR, 'assets');

// Patterns to detect (problematic in production)
const DANGEROUS_PATTERNS = [
    { pattern: /192\.168\.\d+\.\d+/g, name: 'Local IP (192.168.x.x)', severity: 'HIGH' },
    { pattern: /10\.\d+\.\d+\.\d+/g, name: 'Private IP (10.x.x.x)', severity: 'HIGH' },
    { pattern: /172\.(1[6-9]|2[0-9]|3[01])\.\d+\.\d+/g, name: 'Private IP (172.16-31.x.x)', severity: 'HIGH' },
    { pattern: /127\.0\.0\.1/g, name: 'Localhost IP', severity: 'MEDIUM' },
    { pattern: /localhost:\d+/g, name: 'Localhost with port', severity: 'HIGH' },
    { pattern: /sk_test_[A-Za-z0-9]+/g, name: 'Stripe Test Secret Key', severity: 'CRITICAL' },
    { pattern: /sk_live_[A-Za-z0-9]+/g, name: 'Stripe Live Secret Key', severity: 'CRITICAL' },
    { pattern: /password\s*[:=]\s*["'][^"']+["']/gi, name: 'Hardcoded Password', severity: 'CRITICAL' },
    { pattern: /api[_-]?key\s*[:=]\s*["'][A-Za-z0-9]{20,}["']/gi, name: 'API Key', severity: 'HIGH' },
];

// Allowed patterns (false positive exclusions)
const ALLOWED_PATTERNS = [
    /pawscord\.com/g,          // Production domain
    /google\.com/g,            // Google services
    /googleapis\.com/g,        // Google APIs
    /stun:stun\.l\.google\.com/g,  // STUN servers
    /firebaseapp\.com/g,       // Firebase
    /sentry\.io/g,             // Sentry monitoring
    /cloudfront\.net/g,        // CDN
];

// Colors for terminal output
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
};

let totalIssues = 0;
let criticalIssues = 0;

function log(color, message) {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relativePath = path.relative(BUILD_DIR, filePath);
    const issues = [];

    for (const { pattern, name, severity } of DANGEROUS_PATTERNS) {
        const matches = content.match(pattern);
        if (matches) {
            // Filter out allowed patterns
            const actualIssues = matches.filter(match => {
                return !ALLOWED_PATTERNS.some(allowed => allowed.test(match));
            });

            if (actualIssues.length > 0) {
                issues.push({
                    name,
                    severity,
                    matches: [...new Set(actualIssues)], // Unique matches
                });
            }
        }
    }

    return { file: relativePath, issues };
}

function scanDirectory(dir) {
    const results = [];

    if (!fs.existsSync(dir)) {
        log('red', `❌ Build directory not found: ${dir}`);
        log('yellow', '   Run "npm run build" first!');
        process.exit(1);
    }

    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            results.push(...scanDirectory(fullPath));
        } else if (file.endsWith('.js') || file.endsWith('.html') || file.endsWith('.json')) {
            const result = checkFile(fullPath);
            if (result.issues.length > 0) {
                results.push(result);
            }
        }
    }

    return results;
}

function printReport(results) {
    console.log('\n');
    log('cyan', '═══════════════════════════════════════════════════════════');
    log('cyan', '  🔍 PAWSCORD BUILD VERIFICATION REPORT');
    log('cyan', '═══════════════════════════════════════════════════════════\n');

    if (results.length === 0) {
        log('green', '  ✅ BUILD IS CLEAN! No problematic patterns found.\n');
        log('green', '  Your production build is ready for deployment.\n');
        return 0;
    }

    for (const { file, issues } of results) {
        log('yellow', `\n📁 ${file}`);

        for (const { name, severity, matches } of issues) {
            totalIssues++;
            if (severity === 'CRITICAL') criticalIssues++;

            const severityColor = severity === 'CRITICAL' ? 'red' :
                severity === 'HIGH' ? 'yellow' : 'blue';

            log(severityColor, `   ⚠️  [${severity}] ${name}`);
            matches.slice(0, 3).forEach(match => {
                console.log(`       → ${match.substring(0, 60)}${match.length > 60 ? '...' : ''}`);
            });
            if (matches.length > 3) {
                console.log(`       ... and ${matches.length - 3} more occurrences`);
            }
        }
    }

    console.log('\n');
    log('cyan', '═══════════════════════════════════════════════════════════');
    log('yellow', `  📊 SUMMARY: ${totalIssues} issues found`);

    if (criticalIssues > 0) {
        log('red', `  🚨 CRITICAL: ${criticalIssues} critical security issues!`);
        log('red', '  ❌ DO NOT DEPLOY this build!');
    } else if (totalIssues > 0) {
        log('yellow', '  ⚠️  Review issues before deploying.');
    }

    log('cyan', '═══════════════════════════════════════════════════════════\n');

    // Return exit code
    return criticalIssues > 0 ? 2 : (totalIssues > 0 ? 1 : 0);
}

function checkEnvVariables() {
    log('blue', '\n📋 Checking environment variables...');

    const requiredVars = [
        'VITE_BACKEND_URL',
        'VITE_API_URL',
        'VITE_ENV',
    ];

    const missing = requiredVars.filter(v => !process.env[v]);

    if (missing.length > 0) {
        log('yellow', `   ⚠️  Missing env vars: ${missing.join(', ')}`);
        log('yellow', '   Make sure to set these before building for production!');
    } else {
        log('green', '   ✅ All required environment variables set');
    }

    // Check if production mode
    if (process.env.VITE_ENV === 'production') {
        log('green', '   ✅ Building in PRODUCTION mode');
    } else {
        log('yellow', `   ⚠️  VITE_ENV=${process.env.VITE_ENV || 'not set'} (expected: production)`);
    }
}

// Main execution
console.log('\n🔍 Scanning build directory for problematic patterns...\n');

checkEnvVariables();

const results = scanDirectory(BUILD_DIR);
const exitCode = printReport(results);

// ⚠️ PRODUCTION BUILD: Only fail on CRITICAL issues, allow warnings
// Exit code: 0 (success), 1 (warnings - continue), 2 (critical - fail)
if (exitCode === 2) {
    log('red', '\n❌ BUILD FAILED: Critical security issues detected!');
    process.exit(1);
} else if (exitCode === 1) {
    log('yellow', '\n⚠️  BUILD SUCCESSFUL with warnings. Review issues before deployment.');
    process.exit(0); // Continue build despite warnings
} else {
    log('green', '\n✅ BUILD SUCCESSFUL: No issues found.');
    process.exit(0);
}
