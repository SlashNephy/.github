#!/usr/bin/env zsh

function find_orphan_files() {
  sudo find /etc /usr /var | sort > /tmp/a.txt
  sudo pacman -Qlq | sed 's|/$||' | sort > /tmp/b.txt
  comm -23 /tmp/a.txt /tmp/b.txt | grep -v \
    -e "/etc/pacman.d/gnupg/" \
    -e "/etc/ca-certificates/extracted/" \
    -e "/etc/ssl/certs/" \
    -e "/var/lib/containerd" \
    -e "/var/lib/containers" \
    -e "/var/lib/kubelet" \
    -e "/var/lib/docker" \
    -e "/var/lib/pacman" \
    -e "/var/log" \
    -e "/var/tmp" \
    -e "/tmp"
  sudo rm -f /tmp/a.txt /tmp/b.txt
}
