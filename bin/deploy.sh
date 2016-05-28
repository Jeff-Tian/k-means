#!/usr/bin/env bash

SERVICE_NAME="k-means"

echo '------------------------'
echo 'start copy and restart'
echo '------------------------'

echo ------------------------
echo $WORKSPACE
echo ------------------------

# check environment
if [ ! -d "website" ]; then
	mkdir website
	[ \$? -gt 0 ] && echo "create folder website error" && exit 1
fi

cd website
if [ ! -d "$SERVICE_NAME" ]; then
	mkdir $SERVICE_NAME
	[ \$? -gt 0 ] && echo "create folder service error:" $SERVICE_NAME && exit 1
fi
exit 0
END
[ $? -gt 0 ] && exit 1

echo ------------------------
echo 'start copy from: ' ${WORKSPACE}
echo 'to ' ~/website/$SERVICE_NAME
echo ------------------------

rsync -rlptz --delete-after ${WORKSPACE}/ ~/website/$SERVICE_NAME
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

cd ~/website/$SERVICE_NAME
[ \$? -gt 0 ] && echo "folder not found ~/website/"$SERVICE_NAME && exit 1

echo 'restart node'
bin/stop.sh "$APP_NAME"
echo 'restart node completed'

sleep 1s

echo 'try start node'
bin/start.sh "$PORT" "$APP_NAME" "$SERVICE_FARM"
[ \$? -gt 0 ] && echo "copy to remote server error" && exit 1

pm2 save

exit 0
END
[ $? -gt 0 ] && exit 1

echo =======================end=================
