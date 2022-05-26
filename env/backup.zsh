#!/usr/bin/env zsh
set -eu

case "$OSTYPE" in
  darwin*) ~/.github/env/backup-macos.zsh ;;
  linux*)  ~/.github/env/backup-linux.zsh ;;
  *)       echo "Unsupported OSTYPE: $OSTYPE"
           exit 1 ;;
esac
