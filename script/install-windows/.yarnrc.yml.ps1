$yarn_dir = Join-Path $env:ENV_DIR "yarn"
New-Item -ItemType SymbolicLink -Path (Join-Path $env:USERPROFILE ".yarnrc.yml") -Target (Join-Path $yarn_dir ".yarnrc.yml") -Force
