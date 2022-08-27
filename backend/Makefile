ENVIRONMENT_FILE=.env
SERVICE_NAME=feature_flag
ENVIRONMENT_FILE=.env
DOCKER_COMPOSE=docker-compose -f ./infrastructure/docker-compose.yml --project-name $(SERVICE_NAME) --env-file $(ENVIRONMENT_FILE)
DOCKER_COMPOSE_DB=docker-compose -f ./infrastructure/docker-compose-postgresql.yml --project-name $(SERVICE_NAME)-DB --env-file $(ENVIRONMENT_FILE)
DOCKER_SHELL=sh

ifneq ("$(wildcard ${ENVIRONMENT_FILE})","")
	-include ${ENVIRONMENT_FILE}
endif

copy-env-file:
	@test -e .env || cp .env.example .env

clean-all-docker:
	cd devops; \
	sh docker-clean.sh;

docker-start: copy-env-file
	$(DOCKER_COMPOSE) up -d && docker ps -a && echo "Yoy should be able to use http://0.0.0.0:$(PORT)"


docker-inspect:
	@docker inspect $(SERVICE_NAME)

docker-logs:
	$(DOCKER_COMPOSE) logs -t -f

docker-sh:
	docker exec -it $(SERVICE_NAME) /bin/bash

clean-f:
	$(DOCKER_COMPOSE) down -v --rmi all
	@rm -fr node_modules/

docker-clean:
	$(DOCKER_COMPOSE) down
	@rm -fr node_modules

docker-build:
	$(DOCKER_COMPOSE) build --build-arg --no-cache

docker-restart: clean-f docker-build docker-start

connect:
	@docker network connect bridge $(SERVICE_NAME)

connect-db:
	@docker network connect bridge postgres:14.5