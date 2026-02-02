const { app } = require('electron');
const fs = require('fs');
const path = require('path');

// Log dosyasını oku ve göster
const LOG_FILE = path.join(app.getPath('userData'), 'pawscord.log');

console.log('📁 Log dosyası konumu:', LOG_FILE);
console.log('═'.repeat(80));

if (fs.existsSync(LOG_FILE)) {
  const logs = fs.readFileSync(LOG_FILE, 'utf-8');
  console.log(logs);
  console.log('═'.repeat(80));
  console.log(`✅ Toplam ${logs.split('\n').length} satır log bulundu.`);
} else {
  console.log('❌ Log dosyası bulunamadı!');
}

console.log('\nLog dosyasını açmak için Enter\'a basın...');
process.stdin.once('data', () => {
  require('child_process').exec(`notepad "${LOG_FILE}"`);
  process.exit(0);
});

