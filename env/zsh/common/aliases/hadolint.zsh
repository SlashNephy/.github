if ! type "hadolint" > /dev/null; then
  alias hadolint="docker run --rm -i ghcr.io/hadolint/hadolint"
fi
