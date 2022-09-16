#!/usr/bin/env bash
if prompt "Install .gitconfig?"; then
  ln -sf "$ENV_DIR/git/arch.gitconfig" ~/.gitconfig
fi
