# PowerShell Versiyon Arttırma Script'i
# Kullanım: powershell -ExecutionPolicy Bypass -File bump-version.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   PAWSCORD - VERSİYON ARTTIRMA" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. package.json oku
$packageJsonPath = Join-Path $PSScriptRoot "package.json"

if (-not (Test-Path $packageJsonPath)) {
    Write-Host "HATA: package.json bulunamadı!" -ForegroundColor Red
    exit 1
}

Write-Host "[1/4] package.json okunuyor..." -ForegroundColor Yellow
$packageJson = Get-Content $packageJsonPath -Raw | ConvertFrom-Json

# 2. Mevcut versiyonu al
$currentVersion = $packageJson.version
Write-Host "   Mevcut versiyon: $currentVersion" -ForegroundColor Gray

# 3. Versiyonu parse et ve patch'i arttır
if ($currentVersion -match '^(\d+)\.(\d+)\.(\d+)$') {
    $major = [int]$Matches[1]
    $minor = [int]$Matches[2]
    $patch = [int]$Matches[3]
    
    # Patch numarasını arttır
    $patch++
    
    $newVersion = "$major.$minor.$patch"
    Write-Host "   Yeni versiyon: $newVersion" -ForegroundColor Green
} else {
    Write-Host "HATA: Versiyon formatı geçersiz! (Beklenen: X.Y.Z)" -ForegroundColor Red
    exit 1
}

# 4. package.json güncelle
Write-Host "[2/4] package.json güncelleniyor..." -ForegroundColor Yellow
$packageJson.version = $newVersion

# 🔥 FIX: JSON'u UTF-8 WITHOUT BOM ile kaydet (BOM Node.js'i bozuyor!)
$jsonString = $packageJson | ConvertTo-Json -Depth 100
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($packageJsonPath, $jsonString, $utf8NoBom)
Write-Host "   package.json güncellendi!" -ForegroundColor Green

# 5. version.json oluştur
Write-Host "[3/4] version.json oluşturuluyor..." -ForegroundColor Yellow

$releaseDate = Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ"
$versionJson = @{
    latest_version = $newVersion
    release_date = $releaseDate
    download_url_windows = "https://pawscord.com/media/builds/Pawscord-Setup.exe"
    download_url_android = "https://pawscord.com/media/builds/pawscord.apk"
    mandatory = $false
    release_notes = "Otomatik build - versiyon $newVersion"
} | ConvertTo-Json -Depth 10

$versionJsonPath = Join-Path $PSScriptRoot "version.json"
# 🔥 FIX: version.json de UTF-8 WITHOUT BOM
[System.IO.File]::WriteAllText($versionJsonPath, $versionJson, $utf8NoBom)
Write-Host "   version.json oluşturuldu!" -ForegroundColor Green

# 6. Özet göster
Write-Host "[4/4] Tamamlandı!" -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   VERSİYON GÜNCELLEME BAŞARILI" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   $currentVersion → $newVersion" -ForegroundColor White
Write-Host ""
Write-Host "Dosyalar:" -ForegroundColor Gray
Write-Host "   ✓ package.json" -ForegroundColor Green
Write-Host "   ✓ version.json" -ForegroundColor Green
Write-Host ""

exit 0
