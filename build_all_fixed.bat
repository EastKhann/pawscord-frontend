@echo off
chcp 65001 >nul
echo ═══════════════════════════════════════════════════════════════
echo    PAWSCORD FULL BUILD - APK + EXE + WEB
echo ═══════════════════════════════════════════════════════════════
echo.

REM 1. TEMİZLİK
echo [1/6] 🧹 Temizlik yapılıyor...
if exist build rmdir /s /q build
if exist dist rmdir /s /q dist
if exist android\app\build rmdir /s /q android\app\build

REM 2. REACT BUILD
echo.
echo [2/6] ⚛️  React build başlıyor...
call npm run build
if errorlevel 1 (
    echo ❌ React build başarısız!
    pause
    exit /b 1
)

REM 3. CAPACITOR SYNC
echo.
echo [3/6] 📱 Capacitor sync...
call npx cap sync
if errorlevel 1 (
    echo ❌ Capacitor sync başarısız!
    pause
    exit /b 1
)

REM 4. ANDROID BUILD (Java 17 zorla)
echo.
echo [4/6] 🤖 Android APK build başlıyor...
cd android
set JAVA_HOME=C:\Program Files\Java\jdk-17
set PATH=%JAVA_HOME%\bin;%PATH%
call gradlew clean
call gradlew assembleRelease
if errorlevel 1 (
    echo ❌ Android build başarısız!
    cd ..
    pause
    exit /b 1
)
cd ..

REM 5. ELECTRON BUILD
echo.
echo [5/6] 💻 Electron EXE build başlıyor...
call npm run electron:build
if errorlevel 1 (
    echo ❌ Electron build başarısız!
    pause
    exit /b 1
)

REM 6. DOSYA TAŞIMA
echo.
echo [6/6] 📦 Build dosyaları taşınıyor...

REM APK'yı taşı
if exist "android\app\build\outputs\apk\release\app-release.apk" (
    if not exist "..\builds" mkdir "..\builds"
    copy /Y "android\app\build\outputs\apk\release\app-release.apk" "..\builds\Pawscord.apk"
    echo ✅ APK: ..\builds\Pawscord.apk
) else (
    echo ⚠️  APK bulunamadı!
)

REM EXE'yi taşı
if exist "dist\Pawscord Setup.exe" (
    if not exist "..\builds" mkdir "..\builds"
    copy /Y "dist\Pawscord Setup.exe" "..\builds\Pawscord-Setup.exe"
    echo ✅ EXE: ..\builds\Pawscord-Setup.exe
) else (
    echo ⚠️  EXE bulunamadı!
)

REM Web build'i taşı
if exist "build" (
    if not exist "..\staticfiles\react" mkdir "..\staticfiles\react"
    xcopy /E /I /Y "build\*" "..\staticfiles\react\"
    echo ✅ WEB: ..\staticfiles\react\
) else (
    echo ⚠️  Web build bulunamadı!
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo    ✅ TÜM BUILD İŞLEMLERİ TAMAMLANDI!
echo ═══════════════════════════════════════════════════════════════
echo.
echo 📁 Build dosyaları: ..\builds\
echo    • Pawscord.apk
echo    • Pawscord-Setup.exe
echo.
echo 🌐 Web dosyaları: ..\staticfiles\react\
echo.
pause

