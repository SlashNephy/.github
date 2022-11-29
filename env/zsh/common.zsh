# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  # shellcheck disable=SC1090
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

source "$HOME/.github/script/paths.sh"

if [ -f "$ENV_DIR/zsh/private.zsh" ]; then
  source "$ENV_DIR/zsh/private.zsh"
fi

for script in "$ENV_DIR"/zsh/common/**/*.zsh; do
  # shellcheck disable=SC1090
  source "$script"
done
