@echo off
chcp 65001 >nul
echo ════════════════════════════════════════════════════════════════
echo    PAWSCORD APK SIGNING SETUP
echo ════════════════════════════════════════════════════════════════
echo.

cd android\app

REM Keystore var mı kontrol et
if exist "pawscord-release.keystore" (
    echo ✅ Keystore zaten mevcut: pawscord-release.keystore
    echo.
    goto GET_SHA1
)

echo 📝 Yeni keystore oluşturulacak...
echo.
echo Lütfen aşağıdaki bilgileri girin:
echo (Şifreleri unutmayın! APK güncellemelerinde gerekli)
echo.

REM Java 17 bul
set KEYTOOL=keytool
if exist "C:\Program Files\Java\jdk-17\bin\keytool.exe" (
    set KEYTOOL=C:\Program Files\Java\jdk-17\bin\keytool.exe
)
if exist "%LOCALAPPDATA%\Android\Sdk\jdk\17\bin\keytool.exe" (
    set KEYTOOL=%LOCALAPPDATA%\Android\Sdk\jdk\17\bin\keytool.exe
)

@REM Read keystore password from env (set KEYSTORE_PASSWORD and KEY_PASSWORD in .env)
if not defined KEYSTORE_PASSWORD (
    echo ⚠️  KEYSTORE_PASSWORD ortam değişkeni tanımlı değil!
    echo    Önce: set KEYSTORE_PASSWORD=your_password
    echo    Ve:   set KEY_PASSWORD=your_password
    pause
    exit /b 1
)
if not defined KEY_PASSWORD set KEY_PASSWORD=%KEYSTORE_PASSWORD%

"%KEYTOOL%" -genkeypair ^
    -v ^
    -keystore pawscord-release.keystore ^
    -alias pawscord ^
    -keyalg RSA ^
    -keysize 2048 ^
    -validity 10000 ^
    -storepass %KEYSTORE_PASSWORD% ^
    -keypass %KEY_PASSWORD% ^
    -dname "CN=Pawscord, OU=Dev, O=Pawscord, L=Istanbul, ST=Istanbul, C=TR"

if errorlevel 1 (
    echo ❌ Keystore oluşturulamadı!
    pause
    exit /b 1
)

echo.
echo ✅ Keystore oluşturuldu!
echo.

:GET_SHA1

echo 📋 SHA-1 Fingerprint alınıyor...
echo.

"%KEYTOOL%" -list -v -keystore pawscord-release.keystore -alias pawscord -storepass %KEYSTORE_PASSWORD% | findstr "SHA1"

echo.
echo ════════════════════════════════════════════════════════════════
echo    GOOGLE AUTH KURULUMU
echo ════════════════════════════════════════════════════════════════
echo.
echo 1. Google Cloud Console'a gidin:
echo    https://console.cloud.google.com/
echo.
echo 2. Credentials sekmesine gidin
echo.
echo 3. OAuth 2.0 Client IDs bölümünde Android uygulaması ekleyin:
echo    • Package name: com.pawscord.app
echo    • SHA-1: Yukarıdaki SHA-1 değerini kopyalayın
echo.
echo 4. google-services.json'ı indirin ve şuraya koyun:
echo    frontend\android\app\google-services.json
echo.
echo 5. APK'yı yeniden build edin:
echo    cd frontend\android
echo    gradlew assembleRelease
echo.

cd ..\..

echo.
echo 💾 Keystore Bilgileri:
echo    Dosya: frontend\android\app\pawscord-release.keystore
echo    Alias: pawscord
echo    Store Password: %%KEYSTORE_PASSWORD%%
echo    Key Password: %%KEY_PASSWORD%%
echo.
echo ⚠️  BU BİLGİLERİ GÜVENLİ BİR YERDE SAKLAYIN!
echo    Kaybederseniz uygulama güncellemesi yapamazsınız!
echo.

pause

