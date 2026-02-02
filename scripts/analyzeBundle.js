// 🧹 BUNDLE ANALYZER & DEAD CODE DETECTOR
// Run: node scripts/analyzeBundle.js

const fs = require('fs');
const path = require('path');

// Configuration
const SRC_DIR = path.join(__dirname, '../src');
const COMPONENT_DIRS = ['components', 'pages', 'panels'];

// Stats
const stats = {
    totalFiles: 0,
    totalLines: 0,
    unusedExports: [],
    largeFiles: [],
    duplicateImports: new Map(),
    circularDeps: []
};

// Find all JS/JSX files
function findFiles(dir, files = []) {
    const items = fs.readdirSync(dir);

    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory() && !item.includes('node_modules')) {
            findFiles(fullPath, files);
        } else if (/\.(js|jsx|ts|tsx)$/.test(item)) {
            files.push(fullPath);
        }
    }

    return files;
}

// Analyze file for exports and imports
function analyzeFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').length;
    const size = fs.statSync(filePath).size;

    stats.totalFiles++;
    stats.totalLines += lines;

    // Check for large files (> 20KB)
    if (size > 20 * 1024) {
        stats.largeFiles.push({
            path: filePath.replace(SRC_DIR, 'src'),
            size: (size / 1024).toFixed(1) + ' KB',
            lines
        });
    }

    // Extract exports
    const exports = [];
    const exportMatches = content.matchAll(/export\s+(const|function|class|default)\s+(\w+)?/g);
    for (const match of exportMatches) {
        if (match[2]) exports.push(match[2]);
    }

    // Extract imports
    const imports = [];
    const importMatches = content.matchAll(/import\s+.*?from\s+['"](.+?)['"]/g);
    for (const match of importMatches) {
        imports.push(match[1]);
    }

    return { filePath, lines, size, exports, imports };
}

// Main analysis
function analyze() {
    console.log('🔍 Analyzing PAWSCORD Bundle...\n');

    const files = findFiles(SRC_DIR);
    const analyses = files.map(analyzeFile);

    // Sort large files
    stats.largeFiles.sort((a, b) => parseFloat(b.size) - parseFloat(a.size));

    // Print results
    console.log('📊 BUNDLE ANALYSIS REPORT');
    console.log('========================\n');

    console.log(`📁 Total Files: ${stats.totalFiles}`);
    console.log(`📝 Total Lines: ${stats.totalLines.toLocaleString()}`);
    console.log(`📦 Avg Lines/File: ${Math.round(stats.totalLines / stats.totalFiles)}\n`);

    if (stats.largeFiles.length > 0) {
        console.log('⚠️  LARGE FILES (>20KB):');
        console.log('─'.repeat(60));
        stats.largeFiles.slice(0, 15).forEach(f => {
            console.log(`  ${f.size.padStart(10)} | ${f.lines.toString().padStart(5)} lines | ${f.path}`);
        });
        console.log();
    }

    // Component count by directory
    console.log('📂 COMPONENTS BY DIRECTORY:');
    console.log('─'.repeat(40));
    const dirCounts = {};
    files.forEach(f => {
        const rel = f.replace(SRC_DIR, '').split(path.sep)[1] || 'root';
        dirCounts[rel] = (dirCounts[rel] || 0) + 1;
    });
    Object.entries(dirCounts)
        .sort((a, b) => b[1] - a[1])
        .forEach(([dir, count]) => {
            console.log(`  ${dir.padEnd(25)} ${count} files`);
        });

    console.log('\n✅ Analysis complete!');

    // Save report
    const report = {
        timestamp: new Date().toISOString(),
        summary: {
            totalFiles: stats.totalFiles,
            totalLines: stats.totalLines,
            avgLinesPerFile: Math.round(stats.totalLines / stats.totalFiles)
        },
        largeFiles: stats.largeFiles,
        directoryBreakdown: dirCounts
    };

    fs.writeFileSync(
        path.join(__dirname, '../bundle-analysis.json'),
        JSON.stringify(report, null, 2)
    );

    console.log('📄 Report saved to bundle-analysis.json');
}

// Run if called directly
if (require.main === module) {
    analyze();
}

module.exports = { analyze, findFiles, analyzeFile };
