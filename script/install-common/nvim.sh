#!/usr/bin/env bash

mv ~/.config/nvim ~/.config/nvim.bak
rm -rf ~/.local/share/nvim ~/.local/state/nvim ~/.cache/nvim

git clone --depth 1 https://github.com/AstroNvim/AstroNvim ~/.config/nvim
rm -rf ~/.config/nvim/.git
