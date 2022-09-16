#!/usr/bin/env bash
if prompt "Install .Brewfile?"; then
  ln -sf "$ENV_DIR/homebrew/.Brewfile" ~/.Brewfile
fi
