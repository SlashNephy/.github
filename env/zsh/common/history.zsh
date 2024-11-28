# history file
export HISTFILE=${HOME}/.zsh_history
export HISTSIZE=10000 # on-memory
export SAVEHIST=100000 # file
setopt append_history # append instead create new history
setopt inc_append_history
setopt share_history
setopt extended_history # keep timestamp
setopt hist_reduce_blanks # trim spaces
setopt hist_save_no_dups # delete same command

setopt hist_verify # editable
setopt hist_expand

setopt hist_ignore_dups # ignore same command
setopt hist_ignore_all_dups # ignore duplicated command
setopt hist_no_store # ignore history command
setopt hist_ignore_space # ignore empty command
