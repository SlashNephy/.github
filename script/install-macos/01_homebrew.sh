#!/usr/bin/env bash
if [ "$CI" = "true" ]; then
  echo "Skipping Homebrew install on CI..."
  return
fi

if prompt "Install Homebrew?"; then
  bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi
