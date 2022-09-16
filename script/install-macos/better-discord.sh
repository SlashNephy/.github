#!/usr/bin/env bash
if prompt "Install BetterDiscord plugins & themes?"; then
  mkdir -p "$HOME/Library/Application Support/BetterDiscord"

  ln -sf "$ENV_DIR/discord/plugins" "$HOME/Library/Application Support/BetterDiscord/plugins"
  ln -sf "$ENV_DIR/discord/themes" "$HOME/Library/Application Support/BetterDiscord/themes"
fi
