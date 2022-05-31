$env:ENV_DIR = "$($env:USERPROFILE)\.github\env"
$env:ENV_COMMON_DIR = Join-Path $env:ENV_DIR "common"
$env:ENV_WINDOWS_DIR = Join-Path $env:ENV_DIR "windows"

foreach ($item in Get-ChildItem ~\.github\scripts\install-windows\*.ps1)
{
    Invoke-Expression $item.FullName -ErrorAction Stop
}
