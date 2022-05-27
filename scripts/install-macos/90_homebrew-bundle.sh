if [ "$CI" = "true" ]; then
  echo "Skipping Homebrew bundle on CI..."
  exit 0
fi

if prompt "Install Homebrew dependencies?"; then
  brew bundle --global
fi
