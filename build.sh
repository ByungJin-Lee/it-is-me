type=$1
version=$2

if [ "$type" != "client" ] && [ "$type" != "api" ]; then
  echo "Please input parameter: api or client";
  exit 1;
fi

if [ -z "$version" ]; then
  version="latest"
fi

docker build -f docker/${type}.Dockerfile ./${type} -t byungjinlee/it-is-me-${type}:${version}
