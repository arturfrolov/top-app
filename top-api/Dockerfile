FROM debian:bookworm-slim

WORKDIR /app

RUN apt-get update \
	&& apt-get install -y --no-install-recommends curl ca-certificates \
	&& rm -rf /var/lib/apt/lists/*

COPY top-api-linux-amd64 /app/top-api-linux-amd64
COPY data.db /app/data.db
COPY entrypoint.sh /app/entrypoint.sh

RUN chmod +x /app/top-api-linux-amd64 /app/entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/app/entrypoint.sh"]
