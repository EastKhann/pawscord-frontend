const fs = require('fs');
const path = require('path');

// 1. Kaynak ve Hedef Klasörleri Tanımla
const sourceDir = path.join(__dirname, 'android', 'app', 'build', 'outputs', 'apk', 'debug');
const destDir = path.join(__dirname, '..', 'media', 'build');
const sourceFile = 'app-debug.apk';
const destFile = 'Pawscord.apk';

// 2. Hedef Klasör Yoksa Oluştur
if (!fs.existsSync(destDir)) {
    console.log(`📂 Hedef klasör oluşturuluyor: ${destDir}`);
    fs.mkdirSync(destDir, { recursive: true });
}

// 3. APK Dosyasını Kopyala
try {
    const sourcePath = path.join(sourceDir, sourceFile);
    const destPath = path.join(destDir, destFile);

    if (!fs.existsSync(sourcePath)) {
        console.error(`❌ HATA: APK dosyası bulunamadı: ${sourcePath}`);
        console.error('   Önce "gradlew assembleDebug" komutunu çalıştırmalısın.');
        process.exit(1);
    }

    console.log(`🚀 APK dosyası bulundu: ${sourceFile}`);

    // 4. Dosyayı Kopyala
    fs.copyFileSync(sourcePath, destPath);

    console.log(`✅ BAŞARILI!`);
    console.log(`📂 APK dosyası şuraya kopyalandı:`);
    console.log(`   -> ${destPath}`);
    console.log(`🌐 Artık siteden indirilebilir.`);
    console.log(`📱 APK boyutu: ${(fs.statSync(destPath).size / 1024 / 1024).toFixed(2)} MB`);

} catch (err) {
    console.error("❌ Bir hata oluştu:", err);
    process.exit(1);
}

