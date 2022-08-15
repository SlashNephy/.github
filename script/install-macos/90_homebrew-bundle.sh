if [ "$CI" = "true" ]; then
  echo "Skipping Homebrew bundle on CI..."
  return
fi

if prompt "Install Homebrew dependencies?"; then
  brew bundle --global
fi
