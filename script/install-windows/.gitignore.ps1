$git_dir = Join-Path $env:ENV_DIR "git"
New-Item -ItemType SymbolicLink -Path (Join-Path $env:USERPROFILE ".gitignore") -Target (Join-Path $git_dir ".gitignore") -Force
