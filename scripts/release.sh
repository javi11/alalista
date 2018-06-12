#!/bin/bash
BUMP_TYPE=$1

npm install || { echo 'Npm installation failed' ; exit 1; }
npm run test-ff || { echo 'Tests failed' ; exit 1; }
git add --force

npm run lerna publish -- --cd-version=$BUMP_TYPE --exact --conventional-commits --yes --skip-npm || { echo 'Can not release' ; exit 1; }

git push origin master
