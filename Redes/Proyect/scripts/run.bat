write-host "Starting Docker for Windows..."
docker compose up -d --build --scale api=2
write-host "Done."