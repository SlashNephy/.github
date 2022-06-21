$ssh_dir = Join-Path $env:USERPROFILE ".ssh"

New-Item -ItemType Directory -Path $ssh_dir -ErrorAction SilentlyContinue
New-Item -ItemType SymbolicLink -Path (Join-Path $ssh_dir "config") -Target (Join-Path $env:ENV_DIR "ssh" | Join-Path -ChildPath "config") -Force
