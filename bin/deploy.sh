#!/usr/bin/env bash

SERVICE_NAME="k-means"

echo '------------------------'
echo 'start copy and restart'
echo '------------------------'

echo ------------------------
echo $WORKSPACE
echo 'pwd: '
pwd
echo ------------------------

# check environment
cd /var/www/html
if [ ! -d "websites" ]; then
	mkdir websites
	[ $? -gt 0 ] && echo "create folder website error" && exit 1
fi

cd websites
if [ ! -d "$SERVICE_NAME" ]; then
	mkdir $SERVICE_NAME
	[ $? -gt 0 ] && echo "create folder service error:" $SERVICE_NAME && exit 1
fi
exit 0
END
[ $? -gt 0 ] && exit 1

echo ------------------------
echo 'start copy from: ' ${WORKSPACE}
echo 'to ' /var/www/html/websites/$SERVICE_NAME
echo ------------------------

rsync -rlptz --delete-after ${WORKSPACE}/ /var/www/html/websites/$SERVICE_NAME
[ $? -gt 0 ] && echo "copy to remote server error" && exit 1
echo "end copy ================="

# try restart node
echo 'startup on remote server'

if [ -n "$PORT" ]; then
    echo 'use port' $PORT
    export PORT
fi
if [ -n "$APP_NAME" ]; then
    echo 'set app name' $APP_NAME
    export APP_NAME
fi

cd /var/www/html/websites/$SERVICE_NAME
[ $? -gt 0 ] && echo "folder not found /var/www/html/websites/"$SERVICE_NAME && exit 1

echo 'restart node'
bin/stop.sh "$APP_NAME"
echo 'restart node completed'

sleep 1s

echo 'try start node'
bin/start.sh "$PORT" "$APP_NAME" "$SERVICE_FARM"
[ $? -gt 0 ] && echo "copy to remote server error" && exit 1

pm2 save

exit 0
END
[ $? -gt 0 ] && exit 1

echo =======================end=================
