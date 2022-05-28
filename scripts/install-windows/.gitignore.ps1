New-Item -ItemType SymbolicLink -Path (Join-Path $env:USERPROFILE ".gitignore") -Target (Join-Path $env:ENV_COMMON_DIR ".gitignore") -Force
