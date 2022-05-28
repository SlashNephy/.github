if prompt "Install .ssh/config?"; then
  mkdir -p ~/.ssh
  chmod 700 ~/.ssh
  ln -sf "$ENV_COMMON_DIR/.ssh/config" ~/.ssh/config
fi
