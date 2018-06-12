#!/bin/bash
DEFAULT_SCOPE=.
DEFAULT_CONCURRENCY=1
SCOPE=${1:-$DEFAULT_SCOPE}
CONCURRENCY=${2:-$DEFAULT_CONCURRENCY}

echo "$SCOPE"
if [ "$SCOPE" != "." ]
then
  echo "lerna exec --scope $SCOPE --concurrency $CONCURRENCY -- npm run units" 
  lerna exec --scope $SCOPE --concurrency $CONCURRENCY -- npm run units 
else
  echo "lerna exec --concurrency $CONCURRENCY -- npm run units" 
  lerna exec --concurrency $CONCURRENCY -- npm run units
fi
