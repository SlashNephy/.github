#!/usr/bin/env zsh
set -eu

if [ -f "/usr/bin/pacman" ]; then
  pacman -Qqe > ~/.github/env/linux/pacman-packages.txt
fi
