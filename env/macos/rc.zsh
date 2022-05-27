source "$HOME/.github/env/common/rc.zsh"

source "$HOME/.github/env/macos/homebrew.sh"

HOMEBREW_PREFIX=$(brew --prefix)
export HOMEBREW_PREFIX

for script in "$ENV_MACOS_DIR"/zsh/*.zsh; do
  # shellcheck disable=SC1090
  source "$script"
done

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
source "$HOME/.github/env/common/.p10k.zsh"
