New-Item -ItemType SymbolicLink -Path (Join-Path $env:USERPROFILE ".gitconfig") -Target (Join-Path $env:ENV_WINDOWS_DIR ".gitconfig") -Force
