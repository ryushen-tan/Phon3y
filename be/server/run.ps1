# Phon3y server backend – run script (Windows PowerShell)
# Requires: Python 3.9, 3.10, or 3.11 (3.10 recommended for deps: allosaurus, mediapipe, opencv)

$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$VenvDir = Join-Path $ScriptDir ".venv"
$Requirements = Join-Path $ScriptDir "requirements.txt"

function Test-PythonVersion {
    param([string]$PyCmd)
    try {
        $result = & $PyCmd -c "import sys; exit(0 if (3, 9) <= sys.version_info[:2] <= (3, 11) else 1)" 2>$null
        return $LASTEXITCODE -eq 0
    } catch {
        return $false
    }
}

$PythonCmd = $null
foreach ($candidate in @("py", "python3.10", "python3.11", "python3.9", "python")) {
    $exe = Get-Command $candidate -ErrorAction SilentlyContinue
    if ($exe -and (Test-PythonVersion $candidate)) {
        $PythonCmd = $candidate
        break
    }
}

if (-not $PythonCmd) {
    Write-Host "Error: Python 3.9–3.11 is required for this project." -ForegroundColor Red
    Write-Host "Install from https://www.python.org/downloads/ or run: winget install Python.Python.3.10"
    exit 1
}

Write-Host "Using: $(& $PythonCmd --version)"

if (-not (Test-Path $VenvDir)) {
    Write-Host "Creating virtual environment..."
    & $PythonCmd -m venv $VenvDir
}

$ActivateScript = Join-Path $VenvDir "Scripts\Activate.ps1"
if (-not (Test-Path $ActivateScript)) {
    Write-Host "Error: venv activation script not found at $ActivateScript" -ForegroundColor Red
    exit 1
}
. $ActivateScript

python -m pip install --upgrade pip -q
pip install -r $Requirements -q

Write-Host "Starting Flask server..."
Set-Location $ScriptDir
python api.py
