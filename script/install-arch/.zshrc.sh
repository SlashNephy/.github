#!/usr/bin/env bash
if prompt "Install .zshrc?"; then
  ln -sf "$ENV_DIR/zsh/arch.zsh" ~/.zshrc
fi
