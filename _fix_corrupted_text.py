import re, glob, os

# Map of corrupted text → correct text
REPLACEMENTS = {
    # English + Turkish suffix corruptions
    'Createan:': 'Oluşturan:',
    'Createan ': 'Oluşturan ',
    'Selectwithn ': 'Seçilen ',
    'Blocknme:': 'Engellenme:',
    'Blocknme ': 'Engellenme ',
    'Blocknen': 'Engellenen',
    'Continuemek for': 'Devam etmek için',
    'Continuemek': 'Devam etmek',
    'addmek for': 'eklemek için',
    'addmek istediğin': 'eklemek istediğin',
    'addmek istiyorsunuz': 'eklemek istiyorsunuz',
    'addmek': 'eklemek',
    'addnebilmesi': 'eklenebilmesi',
    'addnme:': 'Eklenme:',
    'Sendilecek': 'Gönderilecek',
    'uploadrken': 'yüklerken',
    'filesını': 'dosyalarını',
    'filesı': 'dosyası',
    'settingsi': 'ayarları',
    'settingsdan': 'ayarlardan',
    'Savemek for': 'Kaydetmek için',
    'Savemek': 'Kaydetmek',
    'Aropenlar': 'Araçlar',
    'Aropenları': 'Araçları',
    'aropenlar': 'araçlar',
    'aropenları': 'araçları',
    'gthreelendir': 'güçlendir',
    'kthreeük': 'küçük',
    'daycelleme': 'güncelleme',
    'daycellemek': 'güncellemek',
    'daycelleme': 'güncelleme',
    'daycellemesi': 'güncellemesi',
    'privatelikler': 'özellikler',
    'mesajı': 'mesajı',
    'mesajları': 'mesajları',
    'undoınamaz': 'geri alınamaz',
    'Levelsi': 'Seviyesi',
    'mevcut': 'ayını',
    'searchyın': 'arayın',
    'deleteer': 'siler',
    'deleteinir': 'silinir',
    'ildız': 'yıldız',
    'listyi': 'listeyi',
    'listnizden': 'listenizden',
    'varsailana': 'varsayılana',
    'karlaştırın': 'karşılaştırın',
    'shareılıyor': 'paylaşılıyor',
    'Shareılıyor': 'Paylaşılıyor',
    'shareı ': 'paylaşımı ',
    'shareılan': 'paylaşılan',
    'Closemek': 'Kapatmak',
    'Cancelmek': 'İptal etmek',
    'Encryptmeyi': 'Şifrelemeyi',
    'Not yet kayıtlı': 'Henüz kayıtlı',
    'Not yet kaydedilmiş': 'Henüz kaydedilmiş',
    'kaydedilmiş message': 'kaydedilmiş mesaj',
}

fixed_count = 0
files_fixed = set()

for f in glob.glob('src/**/*.js', recursive=True):
    try:
        with open(f, 'r', encoding='utf-8') as fh:
            content = fh.read()
    except:
        continue
    
    original = content
    for corrupted, correct in REPLACEMENTS.items():
        if corrupted in content:
            content = content.replace(corrupted, correct)
    
    if content != original:
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(content)
        # Count how many replacements
        import difflib
        old_lines = original.splitlines()
        new_lines = content.splitlines()
        changes = sum(1 for a, b in zip(old_lines, new_lines) if a != b)
        fixed_count += changes
        files_fixed.add(f)
        print(f'  {f} ({changes} replacements)')

print(f'\nTotal: {fixed_count} replacements in {len(files_fixed)} files')
