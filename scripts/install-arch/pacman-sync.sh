if prompt "Sync pacman packages?"; then
  yay -S "$(cat "$ENV_ARCH_DIR/pacman.txt")"
fi
