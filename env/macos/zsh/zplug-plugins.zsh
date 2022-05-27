zplug "zsh-users/zsh-history-substring-search"
zplug "zsh-users/zsh-completions"
zplug "chrissicool/zsh-256color"
zplug "mrowa44/emojify", as:command

if ! zplug check --verbose; then
  printf "Install zplug plugins? [y/N]: "
  if read -r -q; then
    zplug install
  fi
  echo
fi

zplug load
