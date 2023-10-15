env=$1
if [ "$env" != "prod" ] && [ "$env" != "dev" ]; then
  echo "Please input parameter: prod or env";
  exit 1;
fi

log=$(docker compose -f docker/docker-compose.${env}.yml up -d)

echo "$log" > ./docker/docker-compose.txt