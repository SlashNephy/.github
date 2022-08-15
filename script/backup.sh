#!/usr/bin/env bash
set -eu
shopt -s nullglob dotglob

source "$HOME/.github/script/paths.sh"

SCRIPTS_DIR="$ROOT_DIR/script"
SCRIPTS_ARCH_DIR="$SCRIPTS_DIR/backup-arch"
SCRIPTS_COMMON_DIR="$SCRIPTS_DIR/backup-common"
SCRIPTS_MACOS_DIR="$SCRIPTS_DIR/backup-macos"
SCRIPTS_UBUNTU_DIR="$SCRIPTS_DIR/backup-ubuntu"

for script in "$SCRIPTS_COMMON_DIR"/*.sh; do
  # shellcheck disable=SC1090
  source "$script"
done

case "$OSTYPE" in
  darwin*) for script in "$SCRIPTS_MACOS_DIR"/*.sh; do
             # shellcheck disable=SC1090
             source "$script"
           done ;;

  linux*)  if [ -f "/usr/bin/pacman" ]; then
             for script in "$SCRIPTS_ARCH_DIR"/*.sh; do
               # shellcheck disable=SC1090
               source "$script"
             done
           elif [ -f "/usr/bin/apt-get" ]; then
             for script in "$SCRIPTS_UBUNTU_DIR"/*.sh; do
               # shellcheck disable=SC1090
               source "$script"
             done
           fi ;;

  *)       echo "Unsupported OSTYPE: $OSTYPE"
           exit 1 ;;
esac
