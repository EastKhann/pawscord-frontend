# run_full_ui_test.ps1
# PowerShell script to run frontend dev server, ensure Puppeteer is installed, run UI test, collect results.

$frontendDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Write-Host "Working dir: $frontendDir"

# 1) Install puppeteer if needed
Write-Host "Installing puppeteer (legacy-peer-deps)..."
npm i puppeteer --no-audit --no-fund --legacy-peer-deps | Out-Host

# 2) Start dev server in background
Write-Host "Starting dev server (npm start) in background..."
$startInfo = New-Object System.Diagnostics.ProcessStartInfo
$startInfo.FileName = "npm"
$startInfo.Arguments = "start"
$startInfo.WorkingDirectory = $frontendDir
$startInfo.RedirectStandardOutput = $true
$startInfo.RedirectStandardError = $true
$startInfo.UseShellExecute = $false
$startInfo.CreateNoWindow = $true
$process = [System.Diagnostics.Process]::Start($startInfo)
Write-Host "Dev server PID: $($process.Id)"

# 3) Wait for localhost:3000 to be available (max 60s)
$maxWait = 60
$waited = 0
$up = $false
while ($waited -lt $maxWait) {
    try {
        $resp = Invoke-WebRequest -Uri http://localhost:3000/ -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop
        if ($resp.StatusCode -eq 200 -or $resp.StatusCode -eq 302) { $up = $true; break }
    } catch {
        Start-Sleep -Seconds 1
        $waited += 1
    }
}
if (-not $up) { Write-Host "Warning: frontend dev server did not respond in $maxWait seconds. Continuing anyway..." }
else { Write-Host "Frontend responded after $waited seconds." }

# 4) Run UI test
Write-Host "Running UI test (node ui_test.js)..."
$nodeCmd = "node ui_test.js"
$psi = New-Object System.Diagnostics.ProcessStartInfo
$psi.FileName = "node"
$psi.Arguments = "ui_test.js"
$psi.WorkingDirectory = $frontendDir
$psi.RedirectStandardOutput = $true
$psi.RedirectStandardError = $true
$psi.UseShellExecute = $false
$psi.CreateNoWindow = $true
$proc = [System.Diagnostics.Process]::Start($psi)
$stdout = $proc.StandardOutput.ReadToEnd()
$stderr = $proc.StandardError.ReadToEnd()
$proc.WaitForExit()

$logDir = Join-Path $frontendDir 'ui_test_run_logs'
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir | Out-Null }
$stdout | Out-File -FilePath (Join-Path $logDir 'ui_test_stdout.txt') -Encoding UTF8
$stderr | Out-File -FilePath (Join-Path $logDir 'ui_test_stderr.txt') -Encoding UTF8
Write-Host "UI test finished. Logs in $logDir"

# 5) Kill dev server process
try {
    if (-not $process.HasExited) { Write-Host "Stopping dev server (PID $($process.Id))..."; $process.Kill(); Start-Sleep -Seconds 1 }
} catch { Write-Host "Could not stop dev server: $_" }

Write-Host "Collecting results files (ui_test_results)..."
$resultsDir = Join-Path $frontendDir 'ui_test_results'
if (Test-Path $resultsDir) {
    Get-ChildItem $resultsDir -Recurse | Select-Object FullName, Length | Out-File (Join-Path $logDir 'results_file_list.txt')
    Write-Host "Results saved under $resultsDir"
} else {
    Write-Host "No ui_test_results found."
}

Write-Host "Done."

