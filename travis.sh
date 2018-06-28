#!/bin/sh -e
yarn lint
mkdir artifacts
for conf in $(ls config/); do
  if [ "$conf" = "utils.js" ]; then
    continue
  fi
  yarn dev $conf
  yarn build $conf
  mv dist artifacts/$conf
done
