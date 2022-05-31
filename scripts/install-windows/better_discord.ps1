$bd_dir = Join-Path $env:APPDATA "BetterDiscord"

New-Item -ItemType Directory -Path $bd_dir -ErrorAction SilentlyContinue
New-Item -ItemType SymbolicLink -Path (Join-Path $bd_dir "plugins") -Target (Join-Path $env:ENV_DIR "discord" | Join-Path -ChildPath "plugins") -Force
New-Item -ItemType SymbolicLink -Path (Join-Path $bd_dir "themes") -Target (Join-Path $env:ENV_DIR "discord" | Join-Path -ChildPath "themes") -Force
