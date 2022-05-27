if prompt "Install .zshrc & .p10k.zsh?"; then
  ln -sf "$ENV_COMMON_DIR/rc.zsh" ~/.zshrc
  ln -sf "$ENV_COMMON_DIR/.p10k.zsh" ~/.p10k.zsh
fi
