#!/bin/bash
DEFAULT_FAILFAST_FLAG=false
DEFAULT_CONCURRENCY=4

SCOPE=$1
CONCURRENCY=${2:-$DEFAULT_CONCURRENCY}
FAILFAST_FLAG=${3:-$DEFAULT_FAILFAST_FLAG}
FAILFAST="{ echo ''; }"

if [ "$FAILFAST_FLAG" != false ]
then
  FAILFAST="{ echo 'FAILED!' ; exit 1; }"
fi

if [ "$SCOPE" != "." ]
then
  npm run eslint -- ./packages/$SCOPE/**/*.js || eval $FAILFAST
  npm run units scope=$SCOPE concurrency=$CONCURRENCY || eval $FAILFAST
else
  npm run eslint -- . || eval $FAILFAST
  npm run units scope=. concurrency=$CONCURRENCY || eval $FAILFAST
fi
