#!/usr/bin/env bash
if prompt "Install .nanorc?"; then
  ln -sf "$ENV_DIR/nano/macos.nanorc" ~/.nanorc
fi
