if prompt "Install stubby.yml?"; then
  ln -sf ~/.github/env/macos/stubby.yml "$(brew --prefix)/etc/stubby/stubby.yml"
fi

if prompt "Start stubby now?"; then
  sudo brew services restart stubby
  sudo "$(brew --prefix)/opt/stubby/sbin/stubby-setdns-macos.sh"
fi
