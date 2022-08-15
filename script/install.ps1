$env:ENV_DIR = "$($env:USERPROFILE)\.github\env"

foreach ($item in Get-ChildItem ~\.github\script\install-windows\*.ps1)
{
    Invoke-Expression $item.FullName -ErrorAction Stop
}
