#!/usr/bin/env zsh
set -eu

printf "Install yay? [y/N]: "
if read -r -q; then
  echo; zsh ./linux/yay.zsh
fi
