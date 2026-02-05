!macro customInit
  ; ========================================
  ; PAWSCORD INSTALLER - ROBUST CLEANUP
  ; ========================================
  
  ; 1. Tüm Pawscord process'lerini zorla kapat (sessiz mod)
  nsExec::ExecToStack 'taskkill /F /IM "Pawscord.exe" /T'
  Pop $0  ; Çıkış kodunu al ve görmezden gel
  nsExec::ExecToStack 'taskkill /F /IM "pawscord.exe" /T'
  Pop $0
  
  ; 2. Electron alt process'lerini de kapat
  nsExec::ExecToStack 'taskkill /F /IM "electron.exe" /T'
  Pop $0
  
  ; 3. Dosya kilitlerinin açılması için bekle
  Sleep 2000
  
  ; 4. Eski kurulum dizinlerini kontrol et ve temizle
  ; LocalAppData yolu
  StrCpy $0 "$LocalAppData\Programs\pawscord\Uninstall Pawscord.exe"
  IfFileExists $0 0 CheckProgramFiles
    DetailPrint "Eski kurulum bulundu: $LocalAppData\Programs\pawscord"
    ExecWait '"$0" /S _?=$LocalAppData\Programs\pawscord'
    Sleep 2000
    ; Kalan dosyaları temizle
    RMDir /r "$LocalAppData\Programs\pawscord"
  
  CheckProgramFiles:
  ; Program Files yolu
  StrCpy $1 "$PROGRAMFILES\Pawscord\Uninstall Pawscord.exe"
  IfFileExists $1 0 CheckProgramFilesX86
    DetailPrint "Eski kurulum bulundu: $PROGRAMFILES\Pawscord"
    ExecWait '"$1" /S _?=$PROGRAMFILES\Pawscord'
    Sleep 2000
    RMDir /r "$PROGRAMFILES\Pawscord"
  
  CheckProgramFilesX86:
  ; Program Files (x86) yolu
  StrCpy $2 "$PROGRAMFILES32\Pawscord\Uninstall Pawscord.exe"
  IfFileExists $2 0 CleanupDone
    DetailPrint "Eski kurulum bulundu: $PROGRAMFILES32\Pawscord"
    ExecWait '"$2" /S _?=$PROGRAMFILES32\Pawscord'
    Sleep 2000
    RMDir /r "$PROGRAMFILES32\Pawscord"
  
  CleanupDone:
  ; Son bekleme
  Sleep 1000
!macroend

!macro customInstall
  ; Kurulum tamamlandı, registry kayıtlarını düzenle
  WriteRegStr SHCTX "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APP_ID}" "DisplayIcon" "$INSTDIR\Pawscord.exe"
  WriteRegStr SHCTX "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APP_ID}" "Publisher" "Eastkhan"
  WriteRegStr SHCTX "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APP_ID}" "URLInfoAbout" "https://pawscord.app"
!macroend

!macro customUnInit
  ; Kaldırma öncesi uygulamayı kapat
  nsExec::ExecToLog 'taskkill /F /IM "Pawscord.exe" /T'
  Sleep 2000
!macroend