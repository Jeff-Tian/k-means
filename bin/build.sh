#!/usr/bin/env bash

# npm install
cd $WORKSPACE

# rm -rf node_modules
#[ $? -gt 0 ] && exit 1

echo '---------------------------'
echo 'npm install'
echo '---------------------------'

npm install
[ $? -gt 0 ] && echo "npm install error" && exit 1

if [ -e bower.json ]; then
echo '---------------------------'
echo 'bower install'
echo '---------------------------'

bower install
[ $? -gt 0 ] && echo "bower install error" && exit 1

fi

if [ -e gulpfile.js ]; then
echo '----------------------------'
echo 'gulp release'
echo '----------------------------'

gulp release
[ $? -gt 0 ] && echo "gulp release error" && exit 1

fi

echo '---------------------------'
echo 'npm prune --production'
echo '---------------------------'

cnpm prune --production


echo '---------------------------'
echo 'npm install --production'
echo '---------------------------'

#cnpm install --production


echo '---------------------------'
echo 'build done'
echo '---------------------------'
exit 0
