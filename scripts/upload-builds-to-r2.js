/**
 * 🚀 R2 Build Upload Script
 * EXE, APK ve version.json dosyalarını Cloudflare R2'ye yükler
 */

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

// R2 Credentials (environment variables'dan al veya .env'den)
const R2_ACCOUNT_ID = '5bb213c024f3265f952492efcc1ddf9d';
const R2_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || '5fb83d914e5b83fbb67b4b35af12d058';
const R2_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || '7cbaa11813832c061efc7f2839f3a7c8518e0cba9bf4daeb8f6f0f659853a9cd';
const R2_BUCKET_NAME = process.env.AWS_STORAGE_BUCKET_NAME || 'pawscord-media';

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
    '.exe': 'application/vnd.microsoft.portable-executable',
    '.apk': 'application/vnd.android.package-archive',
    '.aab': 'application/x-authorware-bin',
    '.json': 'application/json',
};

async function uploadFile(localPath, r2Key) {
    const ext = path.extname(localPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    console.log(`📤 Uploading: ${path.basename(localPath)} → ${r2Key}`);

    const fileBuffer = fs.readFileSync(localPath);
    const fileSizeMB = (fileBuffer.length / 1024 / 1024).toFixed(2);

    const command = new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: r2Key,
        Body: fileBuffer,
        ContentType: contentType,
        CacheControl: 'public, max-age=3600', // 1 saat cache
    });

    try {
        await s3Client.send(command);
        console.log(`   ✅ Success! (${fileSizeMB} MB)`);
        return true;
    } catch (error) {
        console.error(`   ❌ Failed: ${error.message}`);
        return false;
    }
}

async function main() {
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('  🚀 PAWSCORD R2 BUILD UPLOADER');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');

    const projectRoot = path.resolve(__dirname, '..', '..');
    const frontendRoot = path.resolve(__dirname, '..');
    const mediaBuildPath = path.join(projectRoot, 'media', 'build');

    // Dosya yolları (hepsi media\build klasöründe)
    const files = [
        {
            local: path.join(mediaBuildPath, 'Pawscord-Setup.exe'),
            r2Key: 'builds/Pawscord-Setup.exe',
            name: 'Windows Installer'
        },
        {
            local: path.join(mediaBuildPath, 'Pawscord.apk'),
            r2Key: 'builds/Pawscord.apk',
            name: 'Android APK'
        },
        {
            local: path.join(mediaBuildPath, 'Pawscord.aab'),
            r2Key: 'builds/Pawscord.aab',
            name: 'Android App Bundle (Google Play)'
        },
        {
            local: path.join(mediaBuildPath, 'version.json'),
            r2Key: 'builds/version.json',
            name: 'Version Info'
        }
    ];

    let successCount = 0;
    let failCount = 0;

    for (const file of files) {
        if (!fs.existsSync(file.local)) {
            console.log(`⚠️  ${file.name} not found: ${file.local}`);
            failCount++;
            continue;
        }

        const success = await uploadFile(file.local, file.r2Key);
        if (success) successCount++;
        else failCount++;
    }

    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`  📊 Results: ${successCount} uploaded, ${failCount} failed`);
    console.log('');
    console.log('  📥 Download URLs:');
    console.log('     Windows: https://media.pawscord.com/builds/Pawscord-Setup.exe');
    console.log('     Android: https://media.pawscord.com/builds/Pawscord.apk');
    console.log('     Play:    https://media.pawscord.com/builds/Pawscord.aab');
    console.log('     Version: https://media.pawscord.com/builds/version.json');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');

    process.exit(failCount > 0 ? 1 : 0);
}

main().catch(console.error);
