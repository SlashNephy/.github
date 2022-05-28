if prompt "Install stubby.yml?"; then
  mkdir -p "$(brew --prefix)/etc/stubby"
  ln -sf ~/.github/env/macos/stubby.yml "$(brew --prefix)/etc/stubby/stubby.yml"
fi

if [ "$CI" = "true" ]; then
  echo "Skipping start stubby on CI..."
  return
fi

if prompt "Start stubby now?"; then
  sudo brew services restart stubby
  sudo "$(brew --prefix)/opt/stubby/sbin/stubby-setdns-macos.sh"
fi
