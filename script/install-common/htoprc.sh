#!/usr/bin/env bash
if prompt "Install htoprc?"; then
  mkdir -p ~/.config/htop
  ln -sf "$ENV_DIR/htop/htoprc" ~/.config/htop/htoprc
fi
