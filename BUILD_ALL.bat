@echo off
chcp 65001 >nul
echo ════════════════════════════════════════════════════════════════
echo    PAWSCORD FULL BUILD - WEB + EXE + APK
echo ════════════════════════════════════════════════════════════════
echo.

REM Temizlik
echo [1/7] 🧹 Temizlik...
if exist build rmdir /s /q build
if exist dist rmdir /s /q dist
if exist android\app\build rmdir /s /q android\app\build

REM React Build
echo.
echo [2/7] ⚛️  React Build...
call npm run build
if errorlevel 1 (
    echo ❌ React build başarısız!
    pause
    exit /b 1
)

REM Capacitor Sync
echo.
echo [3/7] 📱 Capacitor Sync...
call npx cap sync
if errorlevel 1 (
    echo ❌ Capacitor sync başarısız!
    pause
    exit /b 1
)

REM Android Build (Java 17 zorunlu)
echo.
echo [4/7] 🤖 Android APK Build...
echo.
echo ⚠️  Java 17 aranıyor...

REM Java 17 yollarını kontrol et
set JAVA17_PATH=
if exist "C:\Program Files\Java\jdk-17\bin\java.exe" (
    set JAVA17_PATH=C:\Program Files\Java\jdk-17
)
if exist "C:\Program Files\Eclipse Adoptium\jdk-17\bin\java.exe" (
    set JAVA17_PATH=C:\Program Files\Eclipse Adoptium\jdk-17
)
if exist "C:\Program Files\Temurin\jdk-17\bin\java.exe" (
    set JAVA17_PATH=C:\Program Files\Temurin\jdk-17
)
if exist "%LOCALAPPDATA%\Android\Sdk\jdk\17\bin\java.exe" (
    set JAVA17_PATH=%LOCALAPPDATA%\Android\Sdk\jdk\17
)

if "%JAVA17_PATH%"=="" (
    echo.
    echo ❌ HATA: Java 17 bulunamadı!
    echo.
    echo Lütfen Java 17 kurun:
    echo 1. https://adoptium.net/temurin/releases/
    echo 2. JDK 17 (LTS) seçin
    echo 3. Windows x64 MSI indirin
    echo 4. Kurulum sırasında "Add to PATH" seçeneğini işaretleyin
    echo.
    echo VEYA Android Studio'nun JDK'sını kullanın:
    echo - Android Studio ^> File ^> Settings ^> Build ^> Build Tools ^> Gradle
    echo - Gradle JDK: "Embedded JDK" seçin
    echo - APK'yı Android Studio'dan build edin
    echo.
    goto SKIP_APK
)

echo ✅ Java 17 bulundu: %JAVA17_PATH%
echo.

cd android
set JAVA_HOME=%JAVA17_PATH%
set PATH=%JAVA17_PATH%\bin;%PATH%

echo Java versiyonu:
java -version

echo.
echo Gradle build başlıyor (bu 5-10 dakika sürebilir)...
call gradlew clean assembleRelease

if errorlevel 1 (
    echo.
    echo ❌ APK build başarısız!
    echo.
    echo Alternatif yöntem:
    echo 1. Android Studio'yu açın
    echo 2. Open Project ^> frontend\android klasörünü seçin
    echo 3. Build ^> Build Bundle(s) / APK(s) ^> Build APK
    echo.
    cd ..
    goto SKIP_APK
)

cd ..
echo ✅ APK build başarılı!
goto APK_SUCCESS

:SKIP_APK
echo.
echo ⏩ APK build atlandı
echo.

:APK_SUCCESS

REM Electron Build
echo.
echo [5/7] 💻 Electron EXE Build...
call npm run electron:build
if errorlevel 1 (
    echo ⚠️  EXE build başarısız (opsiyonel)
)

REM Dosyaları taşı
echo.
echo [6/7] 📦 Dosyalar taşınıyor...

if not exist "..\builds" mkdir "..\builds"

REM APK
if exist "android\app\build\outputs\apk\release\app-release.apk" (
    copy /Y "android\app\build\outputs\apk\release\app-release.apk" "..\builds\Pawscord.apk"
    echo ✅ APK: ..\builds\Pawscord.apk
    for %%A in ("..\builds\Pawscord.apk") do echo    Boyut: %%~zA bytes
)

REM EXE
for %%F in ("dist\Pawscord Setup*.exe") do (
    if exist "%%F" (
        copy /Y "%%F" "..\builds\Pawscord-Setup.exe"
        echo ✅ EXE: ..\builds\Pawscord-Setup.exe
        for %%A in ("..\builds\Pawscord-Setup.exe") do echo    Boyut: %%~zA bytes
    )
)

REM Web
if exist "build" (
    if not exist "..\staticfiles\react" mkdir "..\staticfiles\react"
    xcopy /E /I /Y "build\*" "..\staticfiles\react\" >nul
    echo ✅ WEB: ..\staticfiles\react\
)

REM Django Static
echo.
echo [7/7] 🌐 Django Static Files...
cd ..
call python manage.py collectstatic --noinput
cd frontend

echo.
echo ════════════════════════════════════════════════════════════════
echo    ✅ BUILD TAMAMLANDI!
echo ════════════════════════════════════════════════════════════════
echo.
echo 📁 Build Dosyaları:
echo.

if exist "..\builds\Pawscord.apk" (
    echo    📱 APK: builds\Pawscord.apk
)
if exist "..\builds\Pawscord-Setup.exe" (
    echo    💻 EXE: builds\Pawscord-Setup.exe
)
echo    🌐 WEB: staticfiles\react\

echo.
echo 🚀 Kullanım:
echo    • APK: Android cihaza transfer edip kurun
echo    • EXE: Çift tıklayıp Windows'a kurun
echo    • WEB: Django sunucusu otomatik kullanacak
echo.

if not exist "..\builds\Pawscord.apk" (
    echo ⚠️  APK build edilemedi. Manuel build için:
    echo    1. Android Studio'yu açın
    echo    2. frontend\android klasörünü açın
    echo    3. Build ^> Build APK
    echo.
)

pause

