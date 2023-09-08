source "$HOME/.github/env/zsh/common.zsh"

# Homebrew を読み込んでおく
if [ -f "/opt/homebrew/bin/brew" ]; then
  eval "$(/opt/homebrew/bin/brew shellenv)"
fi

HOMEBREW_PREFIX=$(brew --prefix)
export HOMEBREW_PREFIX

for script in "$ENV_DIR"/zsh/macos/**/*.zsh; do
  # shellcheck disable=SC1090
  source "$script"
done

# To customize prompt, run `p10k configure` or edit ~/.github/env/zsh/.p10k.zsh.
source "$HOME/.github/env/zsh/.p10k.zsh"
