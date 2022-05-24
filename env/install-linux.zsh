#!/usr/bin/env zsh
set -eu

cd "$(dirname "$0")"

printf "Install .ssh/config? [y/N]: "
if read -r -q; then
  echo; ln -sf ./linux/.ssh/config ~/.ssh/config
fi

printf "Install .gitconfig? [y/N]: "
if read -r -q; then
  echo; ln -sf ./linux/.gitconfig ~/.gitconfig
fi

printf "Install .nanorc? [y/N]: "
if read -r -q; then
  echo; ln -sf ./linux/.nanorc ~/.nanorc
fi

# check distribution
DISTRIBUTION=$( (lsb_release -ds || cat /etc/*release || uname -om) 2>/dev/null | head -n1)
case "$DISTRIBUTION" in
  "*Arch Linux*") ./install-macos.zsh ;;
  *)              echo "Unsupported DISTRIBUTION: $DISTRIBUTION"
                  exit 1 ;;
esac
