#!/usr/bin/env bash
if prompt "Sync pacman packages?"; then
  yay -S "$(cat "$ENV_DIR/pacman/pacman.txt")"
fi
