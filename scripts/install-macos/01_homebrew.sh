if [ "$CI" = "true" ]; then
  echo "Skipping Homebrew install on CI..."
  exit 0
fi

if prompt "Install Homebrew?"; then
  bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi
