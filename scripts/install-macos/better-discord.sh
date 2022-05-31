if prompt "Install BetterDiscord plugins & themes?"; then
  ln -sf "$ENV_DIR/discord/plugins" "$HOME/Library/Application Support/BetterDiscord/plugins"
  ln -sf "$ENV_DIR/discord/themes" "$HOME/Library/Application Support/BetterDiscord/themes"
fi
