#!/bin/sh
set -eu

mkdir -p /data/uploads

if [ ! -f /data/data.db ]; then
	cp /app/data.db /data/data.db
fi

cd /data
exec /app/top-api-linux-amd64
