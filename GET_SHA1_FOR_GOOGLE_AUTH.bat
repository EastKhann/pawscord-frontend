@echo off
chcp 65001 >nul
echo ════════════════════════════════════════════════════════════════
echo    APK GOOGLE AUTH - SHA-1 AL VE KURULUM
echo ════════════════════════════════════════════════════════════════
echo.

cd android

REM SHA-1 al
echo 📋 SHA-1 Fingerprint alınıyor...
echo.

echo --- DEBUG SHA-1 (Test APK için) ---
call gradlew signingReport | findstr "SHA1"

echo.
echo.
echo ════════════════════════════════════════════════════════════════
echo    GOOGLE CLOUD CONSOLE KURULUM ADIMLARI
echo ════════════════════════════════════════════════════════════════
echo.
echo 1. Google Cloud Console'a git:
echo    https://console.cloud.google.com/
echo.
echo 2. APIs ^& Services ^> Credentials
echo.
echo 3. CREATE CREDENTIALS ^> OAuth client ID
echo.
echo 4. Application type: Android
echo.
echo 5. Package name: com.pawscord.app
echo.
echo 6. SHA-1 certificate fingerprint:
echo    Yukarıdaki "SHA1:" değerini kopyala yapıştır
echo.
echo 7. CREATE tıkla
echo.
echo 8. Firebase Console'a git:
echo    https://console.firebase.google.com/
echo.
echo 9. Projeyi seç: pawscord-app
echo.
echo 10. Project Settings ^> General
echo.
echo 11. Scroll down ^> Your apps ^> Android app
echo.
echo 12. google-services.json dosyasını indir
echo.
echo 13. Dosyayı şuraya kopyala:
echo     frontend\android\app\google-services.json
echo.
echo 14. Capacitor sync yap:
echo     cd frontend
echo     npx cap sync
echo.
echo 15. Android Studio'da yeniden build et:
echo     Build ^> Build APK
echo.
echo.
echo ⚠️  NOT: SHA-1'i Google Cloud Console'a eklemeden
echo     Google Auth çalışmaz!
echo.

cd ..

pause

