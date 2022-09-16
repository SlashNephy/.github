#!/usr/bin/env bash
if [ "$CI" = "true" ]; then
  echo "Skipping rosetta install on CI..."
  return
fi

if prompt "Install rosetta?"; then
  sudo softwareupdate --install-rosetta
fi
