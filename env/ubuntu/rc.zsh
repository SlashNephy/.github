source "$HOME/.github/env/common/rc.zsh"

for script in "$ENV_UBUNTU_DIR"/zsh/*.zsh; do
  # shellcheck disable=SC1090
  source "$script"
done

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
source "$HOME/.github/env/common/.p10k.zsh"
