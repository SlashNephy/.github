zplug "romkatv/powerlevel10k", as:theme, depth:1
zplug "zsh-users/zsh-history-substring-search"
zplug "chrissicool/zsh-256color"
zplug "mrowa44/emojify", as:command

if ! zplug check --verbose; then
  printf "Install zplug plugins? [y/N]: "
  if read -r -q; then
    echo; zplug install
  fi
fi

zplug load
