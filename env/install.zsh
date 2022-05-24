#!/usr/bin/env zsh
set -eu

cd "$(dirname "$0")"

printf "Install .zshrc? [y/N]: "
if read -r -q; then
  echo; ln -sf ./common/zsh/rc.zsh ~/.zshrc
fi

printf "Install .colorrc? [y/N]: "
if read -r -q; then
  echo; ln -sf ./common/.colorrc ~/.colorrc
fi

printf "Install .gitignore? [y/N]: "
if read -r -q; then
  echo; ln -sf ./common/.gitignore ~/.gitignore
fi

OS="$(uname)"
export OS

if [ "$OS" = "Linux" ]; then
  ./install-linux.zsh
elif [ "$OS" = "Darwin" ]; then
  ./install-macos.zsh
else
  echo "Unsupported OS: $OS"
  exit 1
fi
