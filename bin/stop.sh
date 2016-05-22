#!/bin/sh

APP_NAME="k-means"


################################
#      STOP PM2 INSTANCE	   #
################################
pm2 stop "$APP_NAME"
