#!/usr/bin/env pwsh
# PowerShell Build Script for PAWSCORD

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "   PAWSCORD BUILD SCRIPT" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

# Builds klasorunu olustur
$buildsDir = "..\builds"
if (-not (Test-Path $buildsDir)) {
    New-Item -ItemType Directory -Path $buildsDir | Out-Null
}

# 1. React Build
Write-Host "[1/4] React Build..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "React build basarisiz!" -ForegroundColor Red
    exit 1
}

# 2. Capacitor Sync
Write-Host ""
Write-Host "[2/4] Capacitor Sync..." -ForegroundColor Yellow
npx cap sync
if ($LASTEXITCODE -ne 0) {
    Write-Host "Capacitor sync basarisiz!" -ForegroundColor Red
    exit 1
}

# 3. Electron Build
Write-Host ""
Write-Host "[3/4] Electron EXE Build..." -ForegroundColor Yellow
npm run electron:build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Electron build basarisiz (devam ediliyor)" -ForegroundColor Yellow
}

# 4. Web dosyalarini staticfiles'a kopyala
Write-Host ""
Write-Host "[4/4] Dosyalar tasiniyor..." -ForegroundColor Yellow

# Web build
if (Test-Path "build") {
    $staticDir = "..\staticfiles\react"
    if (-not (Test-Path $staticDir)) {
        New-Item -ItemType Directory -Path $staticDir -Force | Out-Null
    }
    Copy-Item -Path "build\*" -Destination $staticDir -Recurse -Force
    Write-Host "WEB: $staticDir" -ForegroundColor Green
}

# EXE
if (Test-Path "dist\Pawscord Setup.exe") {
    Copy-Item -Path "dist\Pawscord Setup.exe" -Destination "$buildsDir\Pawscord-Setup.exe" -Force
    $exeSize = (Get-Item "$buildsDir\Pawscord-Setup.exe").Length / 1MB
    $exeSizeStr = [math]::Round($exeSize, 2)
    Write-Host "EXE: $buildsDir\Pawscord-Setup.exe - $exeSizeStr MB" -ForegroundColor Green
}

Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "   APK BUILD ICIN:" -ForegroundColor Yellow
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Android Studio ile build yapin:" -ForegroundColor White
Write-Host "1. Android Studio acin" -ForegroundColor Gray
Write-Host "2. Open an Existing Project secin" -ForegroundColor Gray
Write-Host "3. frontend/android klasorunu acin" -ForegroundColor Gray
Write-Host "4. Build menusu, Build APK secin" -ForegroundColor Gray
Write-Host "5. APK: android/app/build/outputs/apk/release/app-release.apk" -ForegroundColor Gray
Write-Host ""
Write-Host "VEYA gradlew ile:" -ForegroundColor White
Write-Host "   cd android" -ForegroundColor Gray
Write-Host "   gradlew assembleRelease" -ForegroundColor Gray
Write-Host ""



