@echo off
chcp 65001 >nul
echo ════════════════════════════════════════════════════════════════
echo    ANDROID STUDIO - PAWSCORD PROJE ACIŞ
echo ════════════════════════════════════════════════════════════════
echo.

set PROJECT_PATH=%~dp0android
echo Android Proje Yolu:
echo %PROJECT_PATH%
echo.

REM Android Studio yollarını kontrol et
set STUDIO_PATH=

if exist "C:\Program Files\Android\Android Studio\bin\studio64.exe" (
    set STUDIO_PATH=C:\Program Files\Android\Android Studio\bin\studio64.exe
)

if exist "%LOCALAPPDATA%\Programs\Android Studio\bin\studio64.exe" (
    set STUDIO_PATH=%LOCALAPPDATA%\Programs\Android Studio\bin\studio64.exe
)

if exist "C:\Program Files\Android Studio\bin\studio64.exe" (
    set STUDIO_PATH=C:\Program Files\Android Studio\bin\studio64.exe
)

if "%STUDIO_PATH%"=="" (
    echo ❌ Android Studio bulunamadı!
    echo.
    echo Manuel olarak açın:
    echo 1. Android Studio'yu açın
    echo 2. "Open" tıklayın
    echo 3. Şu klasörü seçin:
    echo    %PROJECT_PATH%
    echo.
    echo VEYA Android Studio'yu şuradan kurun:
    echo https://developer.android.com/studio
    echo.
    pause
    exit /b 1
)

echo ✅ Android Studio bulundu!
echo %STUDIO_PATH%
echo.

echo 🚀 Android Studio açılıyor...
echo.
echo ADIMLAR:
echo 1. Gradle sync bekleyin (5-10 dakika, ilk sefer)
echo 2. Build ^> Build APK
echo 3. APK: android\app\build\outputs\apk\debug\app-debug.apk
echo.
echo Detaylı rehber: ANDROID_STUDIO_GUIDE.md
echo.

start "" "%STUDIO_PATH%" "%PROJECT_PATH%"

echo.
echo ✅ Android Studio açıldı!
echo.
echo Not: İlk build 10-15 dakika sürebilir (normal)
echo.

timeout /t 3

exit

