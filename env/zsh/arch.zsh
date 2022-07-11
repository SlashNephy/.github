source "$HOME/.github/env/zsh/common.zsh"

for script in "$ENV_DIR"/zsh/arch/**/*.zsh; do
  # shellcheck disable=SC1090
  source "$script"
done

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
source "$HOME/.github/env/zsh/.p10k.zsh"
