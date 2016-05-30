#!/bin/sh

PORT="60004"
APP_NAME="k-means"
#NODE_ENV="prd"

################################
#     START PM2 INSTANCE	   #
################################
if [ -n "$PORT" ]; then
	echo "Listening on port: $PORT"
	export PORT
	#export NODE_ENV
fi

#export NODE_ENV

CURRENT_PATH=`dirname $0`
pm2 start "$CURRENT_PATH/../app.js" --name "$APP_NAME"
exit $?
