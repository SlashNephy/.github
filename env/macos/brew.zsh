/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
sudo softwareupdate --install-rosetta

brew bundle --file=~/.github/env/macos/homebrew/Brewfile
