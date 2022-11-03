export $(grep -v '^#' .env | xargs)
npm run build
docker-compose down
sleep 3
docker-compose up -d
sleep 5
squid-typeorm-migration apply