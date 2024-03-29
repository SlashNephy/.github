#!/usr/bin/env bash
set -eu
shopt -s nullglob dotglob

# shellcheck disable=SC1091
source "$HOME/.github/script/paths.sh"

SCRIPTS_DIR="$ROOT_DIR/script"
SCRIPTS_ARCH_DIR="$SCRIPTS_DIR/install-arch"
SCRIPTS_COMMON_DIR="$SCRIPTS_DIR/install-common"
SCRIPTS_MACOS_DIR="$SCRIPTS_DIR/install-macos"
SCRIPTS_UBUNTU_DIR="$SCRIPTS_DIR/install-ubuntu"

CI="${CI:-"false"}"

TARGET_NAME="common"
function prompt() {
  prompt_text="$TARGET_NAME: $1 [Y/n]:"

  if [ "$CI" = "true" ]; then
    echo "$prompt_text y"
    return 0
  fi

  while true
  do
    read -r -p "$prompt_text " result
    case $result in
      [Yy]*) return 0;;
          *) return 1;;
    esac
  done
}

for script in "$SCRIPTS_COMMON_DIR"/*.sh; do
  # shellcheck disable=SC1090
  source "$script"
done

case "$OSTYPE" in
  darwin*) TARGET_NAME="macos"
           for script in "$SCRIPTS_MACOS_DIR"/*.sh; do
             # shellcheck disable=SC1090
             source "$script"
           done ;;

  linux*)  if [ -f "/usr/bin/pacman" ]; then
             TARGET_NAME="arch"
             for script in "$SCRIPTS_ARCH_DIR"/*.sh; do
               # shellcheck disable=SC1090
               source "$script"
             done
           elif [ -f "/usr/bin/apt-get" ]; then
             TARGET_NAME="ubuntu"
             for script in "$SCRIPTS_UBUNTU_DIR"/*.sh; do
               # shellcheck disable=SC1090
               source "$script"
             done
           fi ;;

  *)       echo "Unsupported OSTYPE: $OSTYPE"
           exit 1 ;;
esac
