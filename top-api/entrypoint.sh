#!/bin/sh
set -eu

mkdir -p /data/uploads

if [ ! -f /data/data.db ]; then
	cp /app/data.db /data/data.db
fi

if [ -d /app/uploads ] && [ -z "$(find /data/uploads -mindepth 1 -maxdepth 1 2>/dev/null)" ]; then
	cp -R /app/uploads/. /data/uploads/
fi

cd /data
exec /app/top-api-linux-amd64
