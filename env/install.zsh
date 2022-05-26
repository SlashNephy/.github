#!/usr/bin/env zsh
set -eu

printf "Install .zshrc? [y/N]: "
if read -r -q; then
  echo; ln -sf ~/.github/env/common/zsh/rc.zsh ~/.zshrc
fi

printf "Install .colorrc? [y/N]: "
if read -r -q; then
  echo; ln -sf ~/.github/env/common/.colorrc ~/.colorrc
fi

printf "Install .gitignore? [y/N]: "
if read -r -q; then
  echo; ln -sf ~/.github/env/common/.gitignore ~/.gitignore
fi

printf "Install .config/htop/htoprc? [y/N]: "
if read -r -q; then
  echo; mkdir -p ~/.config/htop; ln -sf ~/.github/env/common/htoprc ~/.config/htop/htoprc
fi

case "$OSTYPE" in
  darwin*) ~/.github/env/install-macos.zsh ;;
  linux*)    ~/.github/env/install-linux.zsh ;;
  *)           echo "Unsupported OSTYPE: $OSTYPE"
               exit 1 ;;
esac
