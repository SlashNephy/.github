# brew install zsh-completions
if type brew &>/dev/null; then
  FPATH="$HOMEBREW_PREFIX/share/zsh-completions:$FPATH"

  # compaudit
  # chmod -R go-w '$HOMEBREW_PREFIX/share' '$HOMEBREW_PREFIX/share/zsh'
  autoload -Uz compinit
  compinit
fi
