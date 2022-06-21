$env:ENV_DIR = "$($env:USERPROFILE)\.github\env"

foreach ($item in Get-ChildItem ~\.github\scripts\install-windows\*.ps1)
{
    Invoke-Expression $item.FullName -ErrorAction Stop
}
