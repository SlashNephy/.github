if prompt "Install yamlfmt?"; then
  go install github.com/google/yamlfmt/cmd/yamlfmt@latest
fi

if prompt "Install addlicense?"; then
  go install github.com/google/addlicense@latest
fi
