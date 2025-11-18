# ========================================
# Banco Vectra - Script de Inicializacao
# ========================================
# Este script inicia o backend (FastAPI) e o frontend (Vite+React) simultaneamente
# Pressione Ctrl+C para parar todos os processos

Write-Host "Banco Vectra - Iniciando aplicacao..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "" -ForegroundColor Cyan

# Verifica se está no diretório correto
$rootDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $rootDir

# ========================================
# Verificacoes Iniciais
# ========================================

# Verifica se a pasta Backend existe
if (-not (Test-Path ".\Backend")) {
    Write-Host "ERRO: Pasta Backend nao encontrada!" -ForegroundColor Red
    Write-Host "Certifique-se de estar no diretorio raiz do projeto." -ForegroundColor Yellow
    exit 1
}

# Verifica se a pasta Frontend existe
if (-not (Test-Path ".\Frontend")) {
    Write-Host "ERRO: Pasta Frontend nao encontrada!" -ForegroundColor Red
    Write-Host "Certifique-se de estar no diretorio raiz do projeto." -ForegroundColor Yellow
    exit 1
}

# ========================================
# Verificar Python
# ========================================
Write-Host "Verificando Python..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "OK - $pythonVersion encontrado" -ForegroundColor Green
} catch {
    Write-Host "ERRO: Python nao encontrado! Instale o Python 3.8+ primeiro." -ForegroundColor Red
    exit 1
}

# ========================================
# Verificar Node.js
# ========================================
Write-Host "Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>&1
    Write-Host "OK - Node.js $nodeVersion encontrado" -ForegroundColor Green
} catch {
    Write-Host "ERRO: Node.js nao encontrado! Instale o Node.js 18+ primeiro." -ForegroundColor Red
    exit 1
}

# ========================================
# Instalar Dependencias (se necessario)
# ========================================

# Verificar dependencias do Backend
if (-not (Test-Path ".\Backend\bank_api\app\main.py")) {
    Write-Host "ERRO: Estrutura do backend invalida!" -ForegroundColor Red
    exit 1
}

# Verificar se requirements.txt existe
if (Test-Path ".\Backend\requirements.txt") {
    Write-Host "" -ForegroundColor Yellow
    Write-Host "Verificando dependencias do Python..." -ForegroundColor Yellow
    Write-Host "Caso necessario, execute: pip install -r Backend\requirements.txt" -ForegroundColor Gray
}

# Verificar dependencias do Frontend
if (-not (Test-Path ".\Frontend\node_modules")) {
    Write-Host "" -ForegroundColor Yellow
    Write-Host "Instalando dependencias do Frontend..." -ForegroundColor Yellow
    Set-Location ".\Frontend"
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERRO: ao instalar dependencias do frontend!" -ForegroundColor Red
        Set-Location $rootDir
        exit 1
    }
    Set-Location $rootDir
    Write-Host "OK - Dependencias do frontend instaladas com sucesso!" -ForegroundColor Green
}

Write-Host "" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Iniciando servidores..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "" -ForegroundColor Cyan

# ========================================
# Iniciar Backend (FastAPI)
# ========================================
Write-Host "Iniciando Backend (FastAPI) na porta 8000..." -ForegroundColor Yellow

$backendJob = Start-Job -ScriptBlock {
    param($backendPath)
    Set-Location $backendPath
    uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
} -ArgumentList (Join-Path $rootDir "Backend\bank_api")

Start-Sleep -Seconds 2

# Verificar se o backend iniciou
if ($backendJob.State -eq "Running") {
    Write-Host "OK - Backend iniciado com sucesso!" -ForegroundColor Green
    Write-Host "  URL: http://127.0.0.1:8000" -ForegroundColor Gray
    Write-Host "  Docs: http://127.0.0.1:8000/docs" -ForegroundColor Gray
} else {
    Write-Host "ERRO ao iniciar o backend!" -ForegroundColor Red
    Receive-Job $backendJob
    Remove-Job $backendJob -Force
    exit 1
}

# ========================================
# Iniciar Frontend (Vite)
# ========================================
Write-Host "" -ForegroundColor Yellow
Write-Host "Iniciando Frontend (Vite+React) na porta 5173..." -ForegroundColor Yellow

$frontendJob = Start-Job -ScriptBlock {
    param($frontendPath)
    Set-Location $frontendPath
    npm run dev
} -ArgumentList (Join-Path $rootDir "Frontend")

Start-Sleep -Seconds 3

# Verificar se o frontend iniciou
if ($frontendJob.State -eq "Running") {
    Write-Host "OK - Frontend iniciado com sucesso!" -ForegroundColor Green
    Write-Host "  URL: http://localhost:5173" -ForegroundColor Gray
} else {
    Write-Host "ERRO ao iniciar o frontend!" -ForegroundColor Red
    Receive-Job $frontendJob
    Remove-Job $frontendJob -Force
    Stop-Job $backendJob
    Remove-Job $backendJob -Force
    exit 1
}

# ========================================
# Aplicacao Rodando
# ========================================
Write-Host "" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "SUCESSO - Aplicacao rodando!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

Write-Host "" -ForegroundColor Cyan
Write-Host "URLs disponiveis:" -ForegroundColor Cyan
Write-Host "  Frontend:     http://localhost:5173" -ForegroundColor White
Write-Host "  Backend API:  http://127.0.0.1:8000" -ForegroundColor White
Write-Host "  API Docs:     http://127.0.0.1:8000/docs" -ForegroundColor White
Write-Host "  ReDoc:        http://127.0.0.1:8000/redoc" -ForegroundColor White

Write-Host "" -ForegroundColor Yellow
Write-Host "Para parar os servidores, pressione Ctrl+C" -ForegroundColor Yellow
Write-Host "" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "" -ForegroundColor Cyan

# ========================================
# Monitorar Jobs
# ========================================
try {
    while ($true) {
        Start-Sleep -Seconds 5
        
        # Verificar se os jobs ainda estao rodando
        if ($backendJob.State -ne "Running") {
            Write-Host "" -ForegroundColor Red
            Write-Host "ERRO: Backend parou de funcionar!" -ForegroundColor Red
            Receive-Job $backendJob
            break
        }
        
        if ($frontendJob.State -ne "Running") {
            Write-Host "" -ForegroundColor Red
            Write-Host "ERRO: Frontend parou de funcionar!" -ForegroundColor Red
            Receive-Job $frontendJob
            break
        }
    }
} finally {
    # ========================================
    # Cleanup ao sair
    # ========================================
    Write-Host "" -ForegroundColor Yellow
    Write-Host "" -ForegroundColor Yellow
    Write-Host "Parando servidores..." -ForegroundColor Yellow
    
    Stop-Job $backendJob -ErrorAction SilentlyContinue
    Stop-Job $frontendJob -ErrorAction SilentlyContinue
    
    Remove-Job $backendJob -Force -ErrorAction SilentlyContinue
    Remove-Job $frontendJob -Force -ErrorAction SilentlyContinue
    
    Write-Host "OK - Servidores parados com sucesso!" -ForegroundColor Green
    Write-Host "Ate logo!" -ForegroundColor Cyan
}
