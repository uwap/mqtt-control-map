#!/bin/sh -e
yarn lint
mkdir artifacts
for conf in $(ls config/); do
  if [ "$conf" = "utils.js" ]; then
    continue
  fi
  yarn build $conf
  yarn production-build $conf
  mv dist artifacts/$conf
done
