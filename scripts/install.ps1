$env:ENV_COMMON_DIR = "$($env:USERPROFILE)\.github\env\common"
$env:ENV_WINDOWS_DIR = "$($env:USERPROFILE)\.github\env\windows"

foreach ($item in Get-ChildItem ~\.github\scripts\install-windows\*.ps1)
{
    Invoke-Expression $item.FullName -ErrorAction Stop
}
