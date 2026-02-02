// frontend/scripts/check-bundle-size.js

/**
 * 🔍 Bundle Size Checker
 * Build sonrası bundle size kontrolü
 */

const fs = require('fs');
const path = require('path');
const { gzipSync } = require('zlib');

const BUILD_DIR = path.join(__dirname, '..', 'build', 'static');
const MAX_BUNDLE_SIZE = 200 * 1024; // 200 KB
const MAX_CSS_SIZE = 50 * 1024; // 50 KB

const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m'
};

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function getFileSize(filePath) {
    const content = fs.readFileSync(filePath);
    const gzipped = gzipSync(content);

    return {
        raw: content.length,
        gzip: gzipped.length
    };
}

function getAllFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllFiles(filePath, fileList);
        } else {
            fileList.push(filePath);
        }
    });

    return fileList;
}

function analyzeBundle() {
    console.log(`\n${colors.blue}📊 Bundle Size Analysis${colors.reset}\n`);
    console.log('='.repeat(70));

    // JavaScript files
    const jsDir = path.join(BUILD_DIR, 'js');
    if (fs.existsSync(jsDir)) {
        const jsFiles = getAllFiles(jsDir).filter(f => f.endsWith('.js') && !f.endsWith('.map'));

        console.log(`\n${colors.magenta}JavaScript Files:${colors.reset}`);
        console.log('-'.repeat(70));

        let totalJsRaw = 0;
        let totalJsGzip = 0;

        jsFiles.forEach(file => {
            const sizes = getFileSize(file);
            totalJsRaw += sizes.raw;
            totalJsGzip += sizes.gzip;

            const filename = path.basename(file);
            const status = sizes.gzip > MAX_BUNDLE_SIZE ? colors.red : colors.green;

            console.log(
                `  ${filename.padEnd(40)} ` +
                `${status}${formatBytes(sizes.gzip).padStart(10)}${colors.reset} ` +
                `(${formatBytes(sizes.raw)} raw)`
            );
        });

        console.log('-'.repeat(70));
        console.log(
            `  ${'TOTAL JS'.padEnd(40)} ` +
            `${colors.blue}${formatBytes(totalJsGzip).padStart(10)}${colors.reset} ` +
            `(${formatBytes(totalJsRaw)} raw)`
        );
    }

    // CSS files
    const cssDir = path.join(BUILD_DIR, 'css');
    if (fs.existsSync(cssDir)) {
        const cssFiles = getAllFiles(cssDir).filter(f => f.endsWith('.css') && !f.endsWith('.map'));

        console.log(`\n${colors.magenta}CSS Files:${colors.reset}`);
        console.log('-'.repeat(70));

        let totalCssRaw = 0;
        let totalCssGzip = 0;

        cssFiles.forEach(file => {
            const sizes = getFileSize(file);
            totalCssRaw += sizes.raw;
            totalCssGzip += sizes.gzip;

            const filename = path.basename(file);
            const status = sizes.gzip > MAX_CSS_SIZE ? colors.red : colors.green;

            console.log(
                `  ${filename.padEnd(40)} ` +
                `${status}${formatBytes(sizes.gzip).padStart(10)}${colors.reset} ` +
                `(${formatBytes(sizes.raw)} raw)`
            );
        });

        console.log('-'.repeat(70));
        console.log(
            `  ${'TOTAL CSS'.padEnd(40)} ` +
            `${colors.blue}${formatBytes(totalCssGzip).padStart(10)}${colors.reset} ` +
            `(${formatBytes(totalCssRaw)} raw)`
        );
    }

    // Media files
    const mediaDir = path.join(BUILD_DIR, 'media');
    if (fs.existsSync(mediaDir)) {
        const mediaFiles = getAllFiles(mediaDir);

        if (mediaFiles.length > 0) {
            console.log(`\n${colors.magenta}Media Files:${colors.reset}`);
            console.log('-'.repeat(70));

            let totalMediaSize = 0;

            mediaFiles.forEach(file => {
                const size = fs.statSync(file).size;
                totalMediaSize += size;

                const filename = path.basename(file);
                console.log(`  ${filename.padEnd(40)} ${formatBytes(size).padStart(10)}`);
            });

            console.log('-'.repeat(70));
            console.log(
                `  ${'TOTAL MEDIA'.padEnd(40)} ` +
                `${colors.blue}${formatBytes(totalMediaSize).padStart(10)}${colors.reset}`
            );
        }
    }

    console.log('\n' + '='.repeat(70));

    // Recommendations
    console.log(`\n${colors.yellow}💡 Recommendations:${colors.reset}`);

    const jsFiles = getAllFiles(path.join(BUILD_DIR, 'js')).filter(f => f.endsWith('.js') && !f.endsWith('.map'));
    const hasLargeBundle = jsFiles.some(f => {
        const sizes = getFileSize(f);
        return sizes.gzip > MAX_BUNDLE_SIZE;
    });

    if (hasLargeBundle) {
        console.log(`  ${colors.red}⚠${colors.reset} Some bundles exceed the recommended size limit`);
        console.log(`  ${colors.blue}→${colors.reset} Consider code splitting or lazy loading`);
        console.log(`  ${colors.blue}→${colors.reset} Run 'npm run analyze' to see what's included`);
    } else {
        console.log(`  ${colors.green}✓${colors.reset} All bundles are within recommended size limits`);
    }

    console.log('');
}

// Run analysis
try {
    analyzeBundle();
} catch (error) {
    console.error(`${colors.red}❌ Error analyzing bundle:${colors.reset}`, error.message);
    process.exit(1);
}
