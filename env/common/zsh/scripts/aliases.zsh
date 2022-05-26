# color
alias ls="ls --color=auto"
alias diff="diff --color=auto"
alias grep="grep --color=auto"
alias ip="ip --color=auto"
alias dmesg="dmesg --color=always"

# override
alias cp="cp -iv"
alias mv="mv -iv"
alias rm="rm -v"
alias chmod="chmod --preserve-root"
alias chown="chown --preserve-root"

# shorthands
alias ll="ls -alhN --group-directories-first --tabsize=4 --time-style '+%Y-%m-%d %H:%M:%S' --hyperlink=auto"
alias dc="docker compose"
alias compress="tar acvf"
alias extract="tar xvf"
alias src="source ~/.zshrc"
alias reload="clear; src"

# sudo
alias systemctl="sudo systemctl"
alias journalctl="sudo journalctl"
alias ufw="sudo ufw"
alias sano="sudo nano --rcfile=~/.nanorc"

# macOS
alias kill-mdns="sudo killall -HUP mDNSResponder"
alias restart-stubby="sudo brew services restart stubby"
alias refresh-dns="kill-mdns && restart-stubby"

# funny
alias erutaso="docker run --rm -it slashnephy/erutaso"
alias cowsay="docker run --rm docker/whalesay cowsay"
alias ojichat="docker run --rm -i greymd/ojichat"
