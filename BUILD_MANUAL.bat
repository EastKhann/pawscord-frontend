@echo off
chcp 65001 >nul
echo ═══════════════════════════════════════════════════════════════
echo    PAWSCORD MANUEL BUILD (Java 17 Gerekli)
echo ═══════════════════════════════════════════════════════════════
echo.

echo ⚠️  Bu script Java 17 gerektirir.
echo.
echo Eğer Java 17 yüklü değilse:
echo 1. https://adoptium.net/temurin/releases/ adresinden Java 17 indirin
echo 2. C:\Program Files\Java\jdk-17 klasörüne kurun
echo 3. Bu scripti tekrar çalıştırın
echo.

REM Java 17 kontrolü
if not exist "C:\Program Files\Java\jdk-17\bin\java.exe" (
    echo ❌ HATA: Java 17 bulunamadı!
    echo    Beklenen konum: C:\Program Files\Java\jdk-17
    echo.
    echo Alternatif: Android Studio'nun JDK'sını kullanabilirsiniz:
    echo    1. Android Studio'yu açın
    echo    2. File ^> Project Structure ^> SDK Location
    echo    3. JDK konumunu kopyalayın
    echo    4. Bu scripti düzenleyin ve JAVA_HOME yolunu güncelleyin
    echo.
    pause
    exit /b 1
)

echo ✅ Java 17 bulundu!
echo.

REM 1. React Build
echo [1/3] ⚛️  React Build...
call npm run build
if errorlevel 1 (
    echo ❌ React build başarısız!
    pause
    exit /b 1
)

REM 2. APK Build
echo.
echo [2/3] 🤖 APK Build...
echo.
echo NOT: APK build işlemi uzun sürebilir (5-10 dakika)
echo.

cd android

REM Java 17'yi zorla
set JAVA_HOME=C:\Program Files\Java\jdk-17
set PATH=%JAVA_HOME%\bin;%PATH%

echo Java versiyonu:
java -version

echo.
echo Gradle build başlıyor...
call gradlew clean assembleRelease --warning-mode all

if errorlevel 1 (
    echo.
    echo ❌ APK build başarısız!
    echo.
    echo Sorun giderme:
    echo 1. Android Studio'yu açın
    echo 2. "Open an Existing Project" ^> frontend/android klasörünü seçin
    echo 3. Gradle sync bekleyin
    echo 4. Build ^> Build Bundle(s) / APK(s) ^> Build APK
    echo.
    cd ..
    pause
    exit /b 1
)

cd ..

echo.
echo ✅ APK build tamamlandı!
echo.

REM 3. EXE Build
echo [3/3] 💻 EXE Build...
call npm run electron:build
if errorlevel 1 (
    echo ⚠️  EXE build başarısız (opsiyonel)
)

REM Dosyaları taşı
echo.
echo 📦 Build dosyaları taşınıyor...

if not exist "..\builds" mkdir "..\builds"

if exist "android\app\build\outputs\apk\release\app-release.apk" (
    copy /Y "android\app\build\outputs\apk\release\app-release.apk" "..\builds\Pawscord.apk"
    echo ✅ APK: builds\Pawscord.apk
)

if exist "dist\Pawscord Setup.exe" (
    copy /Y "dist\Pawscord Setup.exe" "..\builds\Pawscord-Setup.exe"
    echo ✅ EXE: builds\Pawscord-Setup.exe
)

if exist "build" (
    if not exist "..\staticfiles\react" mkdir "..\staticfiles\react"
    xcopy /E /I /Y "build\*" "..\staticfiles\react\" >nul
    echo ✅ WEB: staticfiles\react\
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo    ✅ BUILD TAMAMLANDI!
echo ═══════════════════════════════════════════════════════════════
echo.

if exist "..\builds\Pawscord.apk" (
    echo 📱 APK: builds\Pawscord.apk
    for %%A in ("..\builds\Pawscord.apk") do echo    Boyut: %%~zA bytes
)

if exist "..\builds\Pawscord-Setup.exe" (
    echo 💻 EXE: builds\Pawscord-Setup.exe
    for %%A in ("..\builds\Pawscord-Setup.exe") do echo    Boyut: %%~zA bytes
)

echo.
pause

