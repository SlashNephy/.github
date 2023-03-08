export HISTFILE=${HOME}/.zsh_history
export HISTSIZE=1000
export SAVEHIST=100000
setopt hist_ignore_dups
setopt EXTENDED_HISTORY
setopt hist_expand
setopt inc_append_history
setopt hist_ignore_all_dups

function history-all {
  history -E 1
}
