#!/bin/bash

has_changed () {
  [[ $(git diff HEAD@{1}..HEAD@{0} -- ${1} | wc -l) -gt 0 ]]
}

check_yarn () {
  if ! has_changed 'package.json' 'yarn.lock'; then
    return
  fi

  yarn 2>&1 | sed 's/^/yarn: /'
}
