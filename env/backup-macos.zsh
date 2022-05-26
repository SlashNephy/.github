#!/usr/bin/env zsh
set -eu

brew bundle dump --file=- > ~/.github/env/macos/homebrew/Brewfile
