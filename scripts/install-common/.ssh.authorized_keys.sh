if prompt "Install .ssh/authorized_keys?"; then
  mkdir -p ~/.ssh
  chmod 700 ~/.ssh
  ln -sf "$ENV_COMMON_DIR/.ssh/authorized_keys" ~/.ssh/authorized_keys
  chmod 600 ~/.ssh/authorized_keys
fi
