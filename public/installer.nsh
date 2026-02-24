!macro customInit
  ; ========================================
  ; PAWSCORD INSTALLER - FAST & RELIABLE
  ; ========================================
  
  ; 1. Tüm Pawscord process'lerini zorla kapat (sessiz mod)
  nsExec::ExecToStack 'taskkill /F /IM "Pawscord.exe" /T'
  Pop $0
  nsExec::ExecToStack 'taskkill /F /IM "pawscord.exe" /T'
  Pop $0
  nsExec::ExecToStack 'taskkill /F /IM "electron.exe" /T'
  Pop $0
  
  ; 2. Dosya kilitlerinin açılması için kısa bekleme
  Sleep 1500
  
  ; 3. Eski kurulum — sadece sessiz uninstall dene, takılırsa atla
  ;    Timeout ile çalıştır (ExecWait yerine nsExec — hang olmaz)
  StrCpy $0 "$LocalAppData\Programs\pawscord\Uninstall Pawscord.exe"
  IfFileExists $0 0 +3
    nsExec::ExecToStack '"$0" /S'
    Pop $0
  
  ; Kalan dosyaları temizle (uninstaller çalışmadıysa bile)
  RMDir /r "$LocalAppData\Programs\pawscord\resources"
  
  Sleep 500
!macroend

!macro customInstall
  ; Registry
  WriteRegStr SHCTX "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APP_ID}" "DisplayIcon" "$INSTDIR\Pawscord.exe"
  WriteRegStr SHCTX "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APP_ID}" "Publisher" "Eastkhan"
  WriteRegStr SHCTX "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APP_ID}" "URLInfoAbout" "https://pawscord.app"
!macroend

!macro customUnInit
  ; Kaldırma öncesi uygulamayı kapat
  nsExec::ExecToStack 'taskkill /F /IM "Pawscord.exe" /T'
  Pop $0
  Sleep 1000
!macroend