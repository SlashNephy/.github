#!/usr/bin/env bash
if prompt "Install .gitignore?"; then
  ln -sf "$ENV_DIR/git/.gitignore" ~/.gitignore
fi
