SERVICE_NAME=feature_flag
ENVIRONMENT_FILE=.env
DOCKER_COMPOSE=docker-compose -f ./docker/docker-compose.yml --project-name $(SERVICE_NAME) --env-file $(ENVIRONMENT_FILE)
DOCKER_SHELL=sh

ifneq ("$(wildcard ${ENVIRONMENT_FILE})","")
   -include ${ENVIRONMENT_FILE}
endif

copy-env-file:
	@test -e .env || cp .env.example .env

docker-start:
	$(DOCKER_COMPOSE) up db

rebuild:
	$(DOCKER_COMPOSE) up -d --build
