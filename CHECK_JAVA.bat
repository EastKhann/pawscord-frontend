@echo off
echo ========================================
echo   JAVA 17 KURULUM KONTROL
echo ========================================
echo.

REM Mevcut Java versiyonunu goster
echo Mevcut Java:
java -version 2>&1 | findstr "version"
echo.

REM Java 17 konumlari kontrol et
echo Java 17 aranıyor...
echo.

set FOUND=0

if exist "C:\Program Files\Java\jdk-17\bin\java.exe" (
    echo [BULUNDU] C:\Program Files\Java\jdk-17
    set FOUND=1
)

if exist "C:\Program Files\Eclipse Adoptium\jdk-17\bin\java.exe" (
    echo [BULUNDU] C:\Program Files\Eclipse Adoptium\jdk-17
    set FOUND=1
)

if exist "C:\Program Files\Temurin\jdk-17\bin\java.exe" (
    echo [BULUNDU] C:\Program Files\Temurin\jdk-17
    set FOUND=1
)

if exist "%LOCALAPPDATA%\Android\Sdk\jbr\bin\java.exe" (
    echo [BULUNDU] Android Studio JBR: %LOCALAPPDATA%\Android\Sdk\jbr
    set FOUND=1
)

echo.

if %FOUND%==0 (
    echo ========================================
    echo   JAVA 17 BULUNAMADI!
    echo ========================================
    echo.
    echo APK build icin Java 17 gereklidir.
    echo.
    echo INDIRIN:
    echo https://adoptium.net/temurin/releases/
    echo.
    echo 1. "JDK 17 (LTS)" secin
    echo 2. Windows x64 MSI indirin
    echo 3. Kurarken "Add to PATH" isaretleyin
    echo 4. Bu scripti tekrar calistirin
    echo.
    echo VEYA Android Studio kullanin:
    echo 1. Android Studio akin
    echo 2. Open Project - frontend\android
    echo 3. Build - Build APK
    echo.
) else (
    echo ========================================
    echo   JAVA 17 BULUNDU!
    echo ========================================
    echo.
    echo Simdi BUILD_ALL.bat calistirabilirsiniz.
    echo.
)

pause

