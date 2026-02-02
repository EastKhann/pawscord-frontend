@echo off
chcp 65001 >nul
echo ════════════════════════════════════════════════════════════════
echo    EXE BUILD - EKRAN SORUNU DÜZELTILDI
echo ════════════════════════════════════════════════════════════════
echo.

echo [1/3] 🧹 Eski build'leri temizle...
if exist build rmdir /s /q build
if exist dist rmdir /s /q dist

echo.
echo [2/3] ⚛️  React production build...
call npm run build

if errorlevel 1 (
    echo ❌ React build başarısız!
    pause
    exit /b 1
)

echo.
echo [3/3] 💻 Electron EXE build...
call npm run electron:build

if errorlevel 1 (
    echo ❌ Electron build başarısız!
    pause
    exit /b 1
)

echo.
echo ════════════════════════════════════════════════════════════════
echo    ✅ BUILD TAMAMLANDI!
echo ════════════════════════════════════════════════════════════════
echo.

REM EXE dosyasını bul ve bilgi göster
for /r "dist" %%F in (*.exe) do (
    echo 📦 EXE: %%F
    echo.
    echo Dosya boyutu:
    dir "%%F" | findstr ".exe"
    echo.

    REM builds klasörüne kopyala
    if not exist "..\builds" mkdir "..\builds"
    copy /Y "%%F" "..\builds\Pawscord-Setup.exe"
    echo.
    echo ✅ Kopyalandı: ..\builds\Pawscord-Setup.exe
)

echo.
echo 🚀 TEST ET:
echo    builds\Pawscord-Setup.exe
echo.

pause

