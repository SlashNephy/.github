#!/usr/bin/env bash
if prompt "Install .zshrc & .p10k.zsh?"; then
  ln -sf "$ENV_DIR/zsh/common.zsh" ~/.zshrc
  ln -sf "$ENV_DIR/zsh/.p10k.zsh" ~/.p10k.zsh
fi
