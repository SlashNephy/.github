if prompt "Install htoprc?"; then
  mkdir -p ~/.config/htop
  ln -sf "$ENV_COMMON_DIR/htoprc" ~/.config/htop/htoprc
fi
