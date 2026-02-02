const fs = require('fs');
const path = require('path');

// 1. Kaynak ve Hedef Klasörleri Tanımla
const sourceDir = path.join(__dirname, 'dist'); // Electron çıktısı burada olur
// frontend klasöründen bir geri çık (..) -> Ana Proje -> media -> build
const destDir = path.join(__dirname, '..', 'media', 'build');
const destFile = 'Pawscord-Setup.exe';

// 2. Hedef Klasör Yoksa Oluştur
if (!fs.existsSync(destDir)) {
    console.log(`📂 Hedef klasör oluşturuluyor: ${destDir}`);
    fs.mkdirSync(destDir, { recursive: true });
}

// 3. dist Klasöründeki .exe Dosyasını Bul
// (Versiyon numarası değişse bile en son .exe'yi bulur)
try {
    const files = fs.readdirSync(sourceDir);
    const exeFile = files.find(file => file.endsWith('.exe') && !file.includes('blockmap'));

    if (!exeFile) {
        console.error("❌ HATA: 'dist' klasöründe .exe dosyası bulunamadı! Önce build almalısın.");
        process.exit(1);
    }

    const sourcePath = path.join(sourceDir, exeFile);
    const destPath = path.join(destDir, destFile);

    console.log(`🚀 Bulunan dosya: ${exeFile}`);

    // 4. Dosyayı Kopyala
    fs.copyFileSync(sourcePath, destPath);

    console.log(`✅ BAŞARILI!`);
    console.log(`📂 Dosya şuraya kopyalandı ve ismi güncellendi:`);
    console.log(`   -> ${destPath}`);
    console.log(`🌐 Artık siteden indirilebilir.`);

} catch (err) {
    console.error("❌ Bir hata oluştu:", err);
}