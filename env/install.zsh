#!/usr/bin/env zsh
set -eu

cd "$(dirname "$0")"

printf "Install .zshrc? [y/N]: "
if read -r -q; then
  echo; ln -sf ./common/zsh/rc.zsh ~/.zshrc
fi

printf "Install .colorrc? [y/N]: "
if read -r -q; then
  echo; ln -sf ./common/.colorrc ~/.colorrc
fi

printf "Install .gitignore? [y/N]: "
if read -r -q; then
  echo; ln -sf ./common/.gitignore ~/.gitignore
fi

case "$OSTYPE" in
  darwin*) ./install-macos.zsh ;;
  linux*)  ./install-linux.zsh ;;
  *)       echo "Unsupported OSTYPE: $OSTYPE"
           exit 1 ;;
esac
