#!/usr/bin/env bash
if prompt "Install .ssh/config?"; then
  mkdir -p ~/.ssh
  chmod 700 ~/.ssh
  ln -sf "$ENV_DIR/ssh/macos.config" ~/.ssh/config
fi
