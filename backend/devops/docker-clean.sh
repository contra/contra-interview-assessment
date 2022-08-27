#!/usr/bin/sh

# info
docker system df

docker ps -a -q | xargs -n 1 -P 8 -I {} docker stop {}                    

docker rm -f $(docker ps -a -q)
docker volume rm $(docker volume ls -q)
docker image rm $(docker image ls -q)
docker builder prune -a -f

docker system df

docker network prune
