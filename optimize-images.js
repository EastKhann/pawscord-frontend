// PNG Optimization Script
// Bu script bot PNG dosyalarını optimize eder (5.8MB → ~500KB)

import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PUBLIC_DIR = join(__dirname, 'public', 'bot');
const files = ['ai.png', 'signal.png'];

async function optimizePNG(filename) {
    const inputPath = join(PUBLIC_DIR, filename);
    const outputPath = join(PUBLIC_DIR, `${filename.replace('.png', '')}_optimized.png`);

    try {
        const stats = fs.statSync(inputPath);
        const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);

        console.log(`\n📦 Optimizing ${filename} (${sizeMB} MB)...`);

        await sharp(inputPath)
            .resize(512, 512, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .png({
                quality: 85,
                compressionLevel: 9,
                adaptiveFiltering: true,
                force: true
            })
            .toFile(outputPath);

        const newStats = fs.statSync(outputPath);
        const newSizeMB = (newStats.size / (1024 * 1024)).toFixed(2);
        const reduction = ((1 - newStats.size / stats.size) * 100).toFixed(1);

        console.log(`✅ Optimized: ${newSizeMB} MB (${reduction}% reduction)`);

        // Backup original
        const backupPath = join(PUBLIC_DIR, `${filename}.backup`);
        fs.renameSync(inputPath, backupPath);

        // Replace with optimized
        fs.renameSync(outputPath, inputPath);

        console.log(`💾 Backup saved as: ${filename}.backup`);

    } catch (error) {
        console.error(`❌ Error optimizing ${filename}:`, error.message);
    }
}

async function main() {
    console.log('🚀 Starting PNG optimization...\n');

    for (const file of files) {
        await optimizePNG(file);
    }

    console.log('\n✨ Optimization complete!\n');
}

main();
