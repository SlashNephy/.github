#!/usr/bin/env zsh
set -eu

cd "$(dirname "$0")"

printf "Install .ssh/config? [y/N]: "
if read -r -q; then
  echo; mkdir -p ~/.ssh; ln -sf ~/.github/env/macos/.ssh/config ~/.ssh/config
fi

printf "Install .gitconfig? [y/N]: "
if read -r -q; then
  echo; ln -sf ~/.github/env/macos/.gitconfig ~/.gitconfig
fi

zsh ./macos/show-dotfiles.zsh

printf "Install Homebrew? [y/N]: "
if read -r -q; then
  echo; zsh ./macos/brew.zsh
fi

printf "Install stubby.yml? [y/N]: "
if read -r -q; then
  echo; ln -sf ~/.github/env/macos/stubby.yml $(brew --prefix)/etc/stubby/stubby.yml
fi
