if prompt "Install .ssh/config?"; then
  mkdir -p ~/.ssh
  chmod 700 ~/.ssh
  ln -sf "$ENV_LINUX_DIR/.ssh/config" ~/.ssh/config
fi
