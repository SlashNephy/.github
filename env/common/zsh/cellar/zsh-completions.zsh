# brew install zsh-completions
if type brew &>/dev/null; then
  FPATH=$(brew --prefix)/share/zsh-completions:$FPATH

  # chmod -R go-w '$(brew --prefix)/share/zsh'
  autoload -Uz compinit
  compinit
fi
