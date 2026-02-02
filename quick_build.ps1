# PAWSCORD BUILD SCRIPT

Write-Host "==========BUILD BASLADI==========" -ForegroundColor Cyan

# Klasor olustur
$buildsDir = "..\builds"
if (-not (Test-Path $buildsDir)) {
    New-Item -ItemType Directory -Path $buildsDir | Out-Null
}

# React Build
Write-Host "[1/4] React Build..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) { exit 1 }

# Capacitor Sync
Write-Host "[2/4] Capacitor Sync..." -ForegroundColor Yellow
npx cap sync
if ($LASTEXITCODE -ne 0) { exit 1 }

# Electron Build
Write-Host "[3/4] Electron Build..." -ForegroundColor Yellow
npm run electron:build

# Dosya tasima
Write-Host "[4/4] Tasiniyor..." -ForegroundColor Yellow

if (Test-Path "build") {
    $staticDir = "..\staticfiles\react"
    if (-not (Test-Path $staticDir)) {
        New-Item -ItemType Directory -Path $staticDir -Force | Out-Null
    }
    Copy-Item -Path "build\*" -Destination $staticDir -Recurse -Force
    Write-Host "WEB OK: $staticDir" -ForegroundColor Green
}

if (Test-Path "dist\Pawscord Setup.exe") {
    Copy-Item -Path "dist\Pawscord Setup.exe" -Destination "$buildsDir\Pawscord-Setup.exe" -Force
    Write-Host "EXE OK: $buildsDir\Pawscord-Setup.exe" -ForegroundColor Green
}

Write-Host ""
Write-Host "==========TAMAMLANDI==========" -ForegroundColor Green
Write-Host ""
Write-Host "APK icin Android Studio kullanin veya:" -ForegroundColor Yellow
Write-Host "  cd android" -ForegroundColor Gray
Write-Host "  gradlew assembleRelease" -ForegroundColor Gray
Write-Host ""

