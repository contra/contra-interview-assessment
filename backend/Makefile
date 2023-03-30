ENVIRONMENT_FILE=.env
SERVICE_NAME=feature_flag
ENVIRONMENT_FILE=.env
DOCKER_COMPOSE=docker-compose -f ./docker/docker-compose.yml --project-name $(SERVICE_NAME) --env-file $(ENVIRONMENT_FILE)
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
	$(DOCKER_COMPOSE) up db


rebuild:
	$(DOCKER_COMPOSE) up -d --build

db-seed-undo:
	npx sequelize-cli db:seed:undo:all

db-seed:
	npx sequelize-cli db:seed:all

db-migrate:
	npx sequelize-cli db:migrate

db-migrate-undo:
	npx sequelize-cli db:migrate:undo