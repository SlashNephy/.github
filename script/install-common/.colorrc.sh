#!/usr/bin/env bash
if prompt "Install .colorrc?"; then
  ln -sf "$ENV_DIR/ls/.colorrc" ~/.colorrc
fi
