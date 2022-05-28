if [ "$CI" = "true" ]; then
  echo "Skipping amplify-cli install on CI..."
  return
fi

if prompt "Install amplify-cli?"; then
  npm install -g @aws-amplify/cli
fi
