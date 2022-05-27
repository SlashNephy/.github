export ZPLUG_HOME="$HOMEBREW_PREFIX/opt/zplug"
source "$ZPLUG_HOME/init.zsh"

zplug "zsh-users/zsh-history-substring-search"
zplug "zsh-users/zsh-completions"
zplug "chrissicool/zsh-256color"
zplug "mrowa44/emojify", as:command

if ! zplug check --verbose; then
  printf "Install? [y/N]: "
  if read -r -q; then
    echo; zplug install
  fi
fi
