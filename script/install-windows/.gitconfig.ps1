$git_dir = Join-Path $env:ENV_DIR "git"
New-Item -ItemType SymbolicLink -Path (Join-Path $env:USERPROFILE ".gitconfig") -Target (Join-Path $git_dir "windows.gitconfig") -Force
