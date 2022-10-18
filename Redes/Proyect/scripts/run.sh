echo "Starting container..."
docker compose up -d --build --scale api=2
echo "Containers started successfully!"