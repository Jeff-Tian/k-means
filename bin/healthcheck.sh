#!/usr/bin/env bash
sleeptime=$1

if [ "x$sleeptime" = "x" ]; then
	sleeptime=2
fi

echo 'sleep time ' $sleeptime
sleep $sleeptime
wget -S --spider http://localhost:60004/ping > /dev/null
exit $?