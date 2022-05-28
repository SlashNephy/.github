New-Item -ItemType SymbolicLink -Path (Join-Path $env:USERPROFILE ".wslconfig") -Target (Join-Path $env:ENV_WINDOWS_DIR ".wslconfig") -Force
