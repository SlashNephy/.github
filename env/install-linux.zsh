#!/usr/bin/env zsh
set -eu

cd "$(dirname "$0")"

printf "Install .ssh/config? [y/N]: "
if read -r -q; then
  echo; ln -sf ./linux/.ssh/config ~/.ssh/config
fi

printf "Install .gitconfig? [y/N]: "
if read -r -q; then
  echo; ln -sf ./linux/.gitconfig ~/.gitconfig
fi

printf "Install .nanorc? [y/N]: "
if read -r -q; then
  echo; ln -sf ./linux/.nanorc ~/.nanorc
fi
