!macro customInit
  ; Çalışan Pawscord varsa zorla kapat
  nsExec::Exec 'taskkill /F /IM "Pawscord.exe" /T'
  Sleep 1000

  ; Eski sürümün uninstaller'ı varsa sessizce çalıştır ve sil
  IfFileExists "$LOCALAPPDATA\Programs\pawscord\Uninstall.exe" 0 +2
    ExecWait '"$LOCALAPPDATA\Programs\pawscord\Uninstall.exe" /S _?=$LOCALAPPDATA\Programs\pawscord'
!macroend