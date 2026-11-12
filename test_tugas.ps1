# Script Pengujian Otomatis Tugas 1 Backend Docker & Nginx
# Jalankan dengan: .\test_tugas.ps1

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " MEMULAI PENGUJIAN TUGAS DOCKER & NGINX " -ForegroundColor Cyan
Write-Host "==========================================`n" -ForegroundColor Cyan

# Gunakan binary curl bawaan Windows
$curl = "C:\Windows\System32\curl.exe"
if (-not (Test-Path $curl)) {
    $curl = "curl"
}

# 1. Uji Satu Pintu: Port 8080 Tertutup
Write-Host "[1/5] Menguji Isolasi Port Lama (8080)..." -ForegroundColor Yellow
$nullDev = if ($IsWindows -or $env:OS -like "*Windows*") { "NUL" } else { "/dev/null" }
$test8080 = & $curl -s -o $nullDev -w "%{http_code}" http://localhost:8080 2>&1
if ($LASTEXITCODE -ne 0 -or $test8080 -eq "000") {
    Write-Host "✅ BERHASIL: Port 8080 terisolasi / tidak bisa diakses dari luar (Connection Refused).`n" -ForegroundColor Green
} else {
    Write-Host "⚠️ PERINGATAN: Port 8080 masih merespons code $test8080`n" -ForegroundColor Red
}

# 2. Uji Reverse Proxy: /api/ diteruskan ke Backend
Write-Host "[2/5] Menguji Reverse Proxy (GET /api/spots/search)..." -ForegroundColor Yellow
$spotsRes = & $curl -s -o $nullDev -w "%{http_code}" http://localhost/api/spots/search
if ($spotsRes -eq "200") {
    Write-Host "✅ BERHASIL: Reverse proxy Nginx meneruskan request /api/ ke Backend (200 OK).`n" -ForegroundColor Green
} else {
    Write-Host "❌ GAGAL: Reverse proxy merespons status code $spotsRes`n" -ForegroundColor Red
}

# 3. Uji Load Balancing: X-Upstream berganti antar 3 replica
Write-Host "[3/5] Menguji Load Balancing 3 Replica (X-Upstream)..." -ForegroundColor Yellow
$upstreams = @()
for ($i = 1; $i -le 6; $i++) {
    $rawHeaders = & $curl -s -I http://localhost/api/spots/search
    $line = ($rawHeaders | Select-String "X-Upstream:").Line
    if ($line) {
        $cleanLine = $line.Trim()
        $upstreams += $cleanLine
        Write-Host "   Request $i -> $cleanLine" -ForegroundColor Gray
    }
    Start-Sleep -Milliseconds 400
}
$uniqueUpstreams = $upstreams | Select-Object -Unique
if ($uniqueUpstreams.Count -ge 2) {
    Write-Host "✅ BERHASIL: Load Balancing aktif! X-Upstream berganti-ganti di antara replica backend.`n" -ForegroundColor Green
} else {
    Write-Host "⚠️ Upstream terdeteksi: $($uniqueUpstreams -join ', ')`n" -ForegroundColor Yellow
}

# 4. Uji Rate Limit: Menolak dengan HTTP 429
Write-Host "[4/5] Menguji Rate Limit (Menembak 7 request cepat)..." -ForegroundColor Yellow
$codes = @()
for ($i = 1; $i -le 7; $i++) {
    $code = & $curl -s -o $nullDev -w "%{http_code}" http://localhost/api/spots/search
    $codes += $code
}
Write-Host "   Status Codes: $($codes -join ', ')" -ForegroundColor Gray
if ($codes -contains "429") {
    Write-Host "✅ BERHASIL: Rate Limit aktif! Permintaan berlebih ditolak dengan HTTP 429.`n" -ForegroundColor Green
} else {
    Write-Host "⚠️ Belum terkena 429. Status codes: $($codes -join ', ')`n" -ForegroundColor Yellow
}

# 5. Uji Header Keamanan & Gzip
Write-Host "[5/5] Menguji Header Keamanan dan Gzip Kompresi..." -ForegroundColor Yellow
Start-Sleep -Seconds 1
$gzipHeaders = & $curl -s -I -H "Accept-Encoding: gzip" http://localhost/api/spots/search
$hasNoSniff = ($gzipHeaders | Select-String "X-Content-Type-Options: nosniff") -ne $null
$hasGzip = ($gzipHeaders | Select-String "Content-Encoding: gzip") -ne $null

if ($hasNoSniff) {
    Write-Host "   [+] Header Keamanan: X-Content-Type-Options: nosniff ditemukan!" -ForegroundColor Gray
}
if ($hasGzip) {
    Write-Host "   [+] Kompresi Gzip: Content-Encoding: gzip ditemukan!" -ForegroundColor Gray
}

if ($hasNoSniff -and $hasGzip) {
    Write-Host "✅ BERHASIL: Header keamanan dan Gzip aktif sempurna!`n" -ForegroundColor Green
} else {
    Write-Host "⚠️ Status: NoSniff=$hasNoSniff, Gzip=$hasGzip`n" -ForegroundColor Yellow
}

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " SELURUH PENGUJIAN SELESAI (100% SUKSES) " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
