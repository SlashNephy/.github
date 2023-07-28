$nvim_dir = Join-Path $env:LOCALAPPDATA "nvim"

If (-not (Test-Path $nvim_dir)) {
    git clone --depth 1 https://github.com/AstroNvim/AstroNvim $nvim_dir
}
