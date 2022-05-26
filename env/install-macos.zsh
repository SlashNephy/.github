#!/usr/bin/env zsh
set -eu

cd "$(dirname "$0")"

printf "Install .ssh/config? [y/N]: "
if read -r -q; then
  echo; ln -sf ./macos/.ssh/config ~/.ssh/config
fi

printf "Install .gitconfig? [y/N]: "
if read -r -q; then
  echo; ln -sf ./macos/.gitconfig ~/.gitconfig
fi

zsh ./macos/show-dotfiles.zsh
zsh ./macos/brew.zsh
