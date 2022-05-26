#!/usr/bin/env zsh
set -eu

printf "Install .ssh/config? [y/N]: "
if read -r -q; then
  echo; ln -sf ~/.github/env/linux/.ssh/config ~/.ssh/config
fi

printf "Install .gitconfig? [y/N]: "
if read -r -q; then
  echo; ln -sf ~/.github/env/linux/.gitconfig ~/.gitconfig
fi

printf "Install .nanorc? [y/N]: "
if read -r -q; then
  echo; ln -sf ~/.github/env/linux/.nanorc ~/.nanorc
fi

# check distribution
DISTRIBUTION=$( (lsb_release -ds || cat /etc/*release || uname -om) 2>/dev/null | head -n1)
case "$DISTRIBUTION" in
  "*Arch Linux*") ~/.github/env/install-arch.zsh ;;
  "Ubuntu*")       ~/.github/env/install-ubuntu.zsh ;;
  *)                    echo "Unsupported DISTRIBUTION: $DISTRIBUTION"
                        exit 1 ;;
esac
