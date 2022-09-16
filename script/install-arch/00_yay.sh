#!/usr/bin/env bash
if prompt "Install yay?"; then
  pacman -S --needed --noconfirm git base-devel
  git clone https://aur.archlinux.org/yay.git /tmp/yay
  makepkg -si
  rm -rf /tmp/yay
fi
