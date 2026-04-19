/**
 * 🚀 R2 Static Files Upload Script
 * Build klasöründeki tüm static dosyaları Cloudflare R2'ye yükler
 * Dosyalar builds/v{version}/ klasörüne organize edilir
 */

const { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectsCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

// Version bilgisini package.json'dan al
const packageJsonPath = path.resolve(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const VERSION = packageJson.version || '1.0.0';
const BUILD_PREFIX = `builds/v${VERSION}`; // örn: builds/v2.0.0

// R2 Credentials (env vars ZORUNLU - hardcoded secret YASAK)
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.AWS_STORAGE_BUCKET_NAME || 'pawscord-media';

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
    console.error('❌ R2 credentials missing! Set R2_ACCOUNT_ID, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY env vars.');
    process.exit(1);
}

// S3 Client (R2 compatible)
const s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
});

// Dosya MIME type'ları
const MIME_TYPES = {
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.html': 'text/html',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.webmanifest': 'application/manifest+json',
    '.map': 'application/json',
};

// Cache süreleri
const CACHE_CONTROL = {
    // Hash'li dosyalar uzun süre cache'lenebilir
    hashed: 'public, max-age=31536000, immutable', // 1 yıl
    // index.html ve manifest gibi dosyalar kısa süre
    noCache: 'public, max-age=0, must-revalidate',
    // Service worker
    sw: 'public, max-age=0, must-revalidate',
};

function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return MIME_TYPES[ext] || 'application/octet-stream';
}

function getCacheControl(filePath) {
    const fileName = path.basename(filePath);

    // Service worker - asla cache'leme
    if (fileName === 'sw.js' || fileName === 'service-worker.js') {
        return CACHE_CONTROL.sw;
    }

    // index.html ve manifest - kısa cache
    if (fileName === 'index.html' || fileName.endsWith('.webmanifest')) {
        return CACHE_CONTROL.noCache;
    }

    // Hash içeren dosyalar (örn: index-B9ygI19o.js) - uzun cache
    if (/[-\.][a-zA-Z0-9]{8,}\.(js|css)$/.test(fileName)) {
        return CACHE_CONTROL.hashed;
    }

    return CACHE_CONTROL.hashed;
}

async function uploadFile(localPath, r2Key) {
    const contentType = getMimeType(localPath);
    const cacheControl = getCacheControl(localPath);

    const fileBuffer = fs.readFileSync(localPath);
    const fileSizeKB = (fileBuffer.length / 1024).toFixed(1);

    const command = new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: r2Key,
        Body: fileBuffer,
        ContentType: contentType,
        CacheControl: cacheControl,
    });

    try {
        await s3Client.send(command);
        return { success: true, size: fileSizeKB };
    } catch (error) {
        console.error(`   ❌ ${r2Key}: ${error.message}`);
        return { success: false, error: error.message };
    }
}

function getAllFiles(dirPath, baseDir = dirPath) {
    const files = [];

    if (!fs.existsSync(dirPath)) {
        return files;
    }

    const items = fs.readdirSync(dirPath);

    for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            files.push(...getAllFiles(fullPath, baseDir));
        } else {
            const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
            files.push({ fullPath, relativePath });
        }
    }

    return files;
}

async function clearOldVersionFiles() {
    console.log(`🗑️  Aynı versiyon klasörü temizleniyor: ${BUILD_PREFIX}`);

    try {
        const listCommand = new ListObjectsV2Command({
            Bucket: R2_BUCKET_NAME,
            Prefix: BUILD_PREFIX + '/',
        });

        const response = await s3Client.send(listCommand);

        if (response.Contents && response.Contents.length > 0) {
            const deleteCommand = new DeleteObjectsCommand({
                Bucket: R2_BUCKET_NAME,
                Delete: {
                    Objects: response.Contents.map(obj => ({ Key: obj.Key })),
                },
            });

            await s3Client.send(deleteCommand);
            console.log(`   ✅ ${response.Contents.length} eski dosya silindi (v${VERSION})`);
        } else {
            console.log(`   ℹ️  v${VERSION} için eski dosya yok`);
        }
    } catch (error) {
        console.error(`   ⚠️  Temizleme hatası: ${error.message}`);
    }
}

async function main() {
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('  🚀 PAWSCORD R2 STATIC FILES UPLOADER');
    console.log(`  📦 Version: ${VERSION}`);
    console.log(`  📁 Hedef Klasör: ${BUILD_PREFIX}/`);
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');

    const buildDir = path.resolve(__dirname, '..', 'build');

    if (!fs.existsSync(buildDir)) {
        console.error('❌ Build klasörü bulunamadı:', buildDir);
        console.log('   Önce "npm run build" çalıştırın');
        process.exit(1);
    }

    // Aynı versiyon klasörünü temizle
    await clearOldVersionFiles();

    // Tüm dosyaları listele
    const files = getAllFiles(buildDir);
    console.log(`\n📦 ${files.length} dosya yüklenecek...\n`);

    let uploaded = 0;
    let failed = 0;
    let totalSize = 0;

    // Paralel upload (10 dosya aynı anda)
    const BATCH_SIZE = 10;

    for (let i = 0; i < files.length; i += BATCH_SIZE) {
        const batch = files.slice(i, i + BATCH_SIZE);

        const results = await Promise.all(
            batch.map(async ({ fullPath, relativePath }) => {
                const r2Key = `${BUILD_PREFIX}/${relativePath}`; // builds/v2.0.0/static/js/xxx.js
                const result = await uploadFile(fullPath, r2Key);
                return { relativePath, ...result };
            })
        );

        for (const result of results) {
            if (result.success) {
                uploaded++;
                totalSize += parseFloat(result.size);
            } else {
                failed++;
            }
        }

        // Progress
        const progress = Math.round(((i + batch.length) / files.length) * 100);
        process.stdout.write(`\r   Progress: ${progress}% (${uploaded}/${files.length})`);
    }

    console.log('\n');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('  📊 UPLOAD RAPORU');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`  ✅ Başarılı: ${uploaded} dosya`);
    console.log(`  ❌ Başarısız: ${failed} dosya`);
    console.log(`  📦 Toplam boyut: ${(totalSize / 1024).toFixed(2)} MB`);
    console.log('');
    console.log(`  🌐 CDN URL: https://media.pawscord.com/${BUILD_PREFIX}/`);
    console.log('═══════════════════════════════════════════════════════════');

    // Cloudflare Worker'ı güncelle
    await updateWorkerVersion();

    console.log('');

    if (failed > 0) {
        process.exit(1);
    }
}

// Worker.js'deki version'ı güncelle
async function updateWorkerVersion() {
    const workerPath = path.resolve(__dirname, '..', '..', 'cloudflare-worker', 'worker.js');

    if (!fs.existsSync(workerPath)) {
        console.log('  ⚠️  Worker dosyası bulunamadı, version güncellenemedi');
        return;
    }

    let workerContent = fs.readFileSync(workerPath, 'utf-8');

    // BUILD_VERSION satırını güncelle
    const versionRegex = /const BUILD_VERSION = 'v[\d.]+';/;
    const newVersionLine = `const BUILD_VERSION = 'v${VERSION}';`;

    if (versionRegex.test(workerContent)) {
        workerContent = workerContent.replace(versionRegex, newVersionLine);
        fs.writeFileSync(workerPath, workerContent, 'utf-8');
        console.log(`  ✅ Worker version güncellendi: v${VERSION}`);
    } else {
        console.log('  ⚠️  Worker version satırı bulunamadı');
    }
}

main().catch(console.error);
