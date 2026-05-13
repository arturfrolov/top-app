FROM debian:bookworm-slim

WORKDIR /app

COPY top-api-linux-amd64 /app/top-api-linux-amd64
COPY data.db /app/data.db
COPY uploads /app/uploads
COPY entrypoint.sh /app/entrypoint.sh

RUN chmod +x /app/top-api-linux-amd64 /app/entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/app/entrypoint.sh"]
