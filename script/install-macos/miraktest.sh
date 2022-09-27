#!/usr/bin/env bash
if prompt "Install MirakTest plugins?"; then
  mkdir -p "$HOME/Library/Application Support/MirakTest"

  ln -sf "$ENV_DIR/miraktest" "$HOME/Library/Application Support/MirakTest/plugins"
fi
