$wsl_dir = Join-Path $env:ENV_DIR "wsl"
New-Item -ItemType SymbolicLink -Path (Join-Path $env:USERPROFILE ".wslconfig") -Target (Join-Path $wsl_dir ".wslconfig") -Force
