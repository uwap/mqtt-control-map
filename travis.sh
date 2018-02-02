#!/bin/sh
yarn lint && for conf in $(ls config/); do
  if [ $conf == "utils.js" ]; then
    continue
  fi
  yarn build $conf && yarn production-build $conf
done || exit 1
