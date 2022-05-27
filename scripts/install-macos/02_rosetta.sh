if [ "$CI" = "true" ]; then
  echo "Skipping rosetta install on CI..."
  exit 0
fi

if prompt "Install rosetta?"; then
  sudo softwareupdate --install-rosetta
fi
