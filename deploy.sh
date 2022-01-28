#!/bin/bash
set -xe

server=157.245.101.118

if [ $TRAVIS_BRANCH == 'main' ] ; then
  eval "$(ssh-agent -s)"
  ssh-add ~/.ssh/id_rsa

  cd client
  rsync -a .next package.json package-lock.json public travis@$server:/home/listings/site
  echo "Deployed successfully!"
else
  echo "Not deploying, since the branch isn't main."
fi

ssh travis@$server 'pm2 restart all' --update-env
