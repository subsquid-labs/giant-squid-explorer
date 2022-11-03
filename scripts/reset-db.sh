export $(grep -v '^#' .env | xargs)
squid-typeorm-codegen
npm run build
rm -rf db/migrations/*.js
docker-compose down
sleep 3
docker-compose up -d
sleep 5
squid-typeorm-migration generate
squid-typeorm-migration apply