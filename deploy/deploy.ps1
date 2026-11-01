param(
    [string]$ServerIp = "84.201.154.71",
    [string]$SshUser = "ubuntu",
    [string]$SshKey = "C:\Prox\keys\yc-vm\ssh-key-1781809043313",
    [string]$RemoteDir = "/var/www/kanochkinmm-portfolio",
    [switch]$SetupOnly
)

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path $PSScriptRoot -Parent

function Assert-PublicHasNoSecrets {
    param([string]$PublicDir)

    if (-not (Test-Path $PublicDir)) { return }

    $blocked = @(
        "*.pem", "*.key", "*.p12", "*.pfx",
        ".env", ".env.*",
        "*secret*", "*credential*", "id_rsa*"
    )

    $hits = @()
    foreach ($pattern in $blocked) {
        $hits += Get-ChildItem -Path $PublicDir -Recurse -File -Force -Filter $pattern -ErrorAction SilentlyContinue
    }

    # Extra hard-fail names
    $hits += Get-ChildItem -Path $PublicDir -Recurse -File -Force -ErrorAction SilentlyContinue |
        Where-Object { $_.Name -match '^(id_rsa|id_ed25519|\.env)' }

    $hits = $hits | Sort-Object FullName -Unique
    if ($hits.Count -gt 0) {
        Write-Host "REFUSING DEPLOY: secret-like files found under public/:" -ForegroundColor Red
        $hits | ForEach-Object { Write-Host "  - $($_.FullName)" -ForegroundColor Red }
        throw "Remove secrets from public/ before deploying."
    }

    Write-Host "public/ secret scan: OK" -ForegroundColor Green
}

function Invoke-RemoteBash {
    param([string]$Script)

    # PowerShell pipes re-introduce CRLF to native ssh stdin on Windows.
    # Write a real LF-only temp script and feed it via cmd redirection instead.
    $normalized = (($Script -replace "`r`n", "`n" -replace "`r", "").TrimEnd() + "`n")
    $tmp = Join-Path $env:TEMP ("kanochkinmm-remote-" + [guid]::NewGuid().ToString("N") + ".sh")
    $utf8NoBom = New-Object System.Text.UTF8Encoding $false
    [System.IO.File]::WriteAllText($tmp, $normalized, $utf8NoBom)

    try {
        $sshTarget = "${SshUser}@${ServerIp}"
        cmd /c "ssh -i `"$SshKey`" -o StrictHostKeyChecking=no $sshTarget bash -s < `"$tmp`""
        if ($LASTEXITCODE -ne 0) {
            throw "Remote command failed with exit code $LASTEXITCODE"
        }
    }
    finally {
        Remove-Item $tmp -Force -ErrorAction SilentlyContinue
    }
}

if ($SetupOnly) {
    Write-Host "Uploading setup-site-only.sh..." -ForegroundColor Cyan
    scp -i $SshKey -o StrictHostKeyChecking=no (Join-Path $PSScriptRoot "setup-site-only.sh") "${SshUser}@${ServerIp}:/tmp/setup-site-only.sh"
    ssh -i $SshKey -o StrictHostKeyChecking=no "${SshUser}@${ServerIp}" "sudo bash /tmp/setup-site-only.sh kanochkinmm.ru"
    exit $LASTEXITCODE
}

Assert-PublicHasNoSecrets -PublicDir (Join-Path $ProjectRoot "public")

Write-Host "Building Next.js standalone..." -ForegroundColor Cyan
Push-Location $ProjectRoot
npm ci
npm run build
Pop-Location

$Standalone = Join-Path $ProjectRoot ".next\standalone"
$Static = Join-Path $ProjectRoot ".next\static"
$Public = Join-Path $ProjectRoot "public"
$Staging = Join-Path $env:TEMP "kanochkinmm-deploy"
if (Test-Path $Staging) { Remove-Item $Staging -Recurse -Force }
New-Item -ItemType Directory -Path $Staging | Out-Null

Copy-Item $Standalone (Join-Path $Staging "standalone") -Recurse
Copy-Item $Static (Join-Path $Staging "standalone\.next\static") -Recurse
Copy-Item $Public (Join-Path $Staging "standalone\public") -Recurse

$Archive = Join-Path $env:TEMP "kanochkinmm-deploy.tar.gz"
if (Test-Path $Archive) { Remove-Item $Archive -Force }

Write-Host "Creating archive..." -ForegroundColor Cyan
tar -czf $Archive -C $Staging standalone

$ScpTarget = "${SshUser}@${ServerIp}:${RemoteDir}/"

Write-Host "Uploading to $ScpTarget" -ForegroundColor Cyan
scp -i $SshKey -o StrictHostKeyChecking=no $Archive "${ScpTarget}deploy.tar.gz"

$headersLocal = Join-Path $PSScriptRoot "apply-security-headers.sh"
Write-Host "Uploading security headers script..." -ForegroundColor Cyan
scp -i $SshKey -o StrictHostKeyChecking=no $headersLocal "${SshUser}@${ServerIp}:/tmp/apply-security-headers.sh"

$RemoteScript = @"
set -e
cd $RemoteDir
rm -rf .next/standalone
mkdir -p .next
tar -xzf deploy.tar.gz -C .next
rm -f deploy.tar.gz
sudo systemctl restart kanochkinmm
# Normalize CRLF if uploaded from Windows, then apply nginx security headers
sed -i 's/\r$//' /tmp/apply-security-headers.sh
sudo bash /tmp/apply-security-headers.sh
systemctl is-active kanochkinmm
systemctl is-active nginx
"@

Write-Host "Applying on server..." -ForegroundColor Cyan
Invoke-RemoteBash -Script $RemoteScript

Write-Host "Deploy finished." -ForegroundColor Green
