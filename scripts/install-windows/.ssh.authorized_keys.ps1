$ssh_dir = Join-Path $env:USERPROFILE ".ssh"

New-Item -ItemType Directory -Path $ssh_dir -ErrorAction SilentlyContinue
New-Item -ItemType SymbolicLink -Path (Join-Path $ssh_dir "authorized_keys") -Target (Join-Path $env:ENV_COMMON_DIR ".ssh" | Join-Path -ChildPath "authorized_keys") -Force
