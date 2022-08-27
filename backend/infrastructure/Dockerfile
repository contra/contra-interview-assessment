FROM node:16.11 as base
WORKDIR /usr/src/app

FROM base as builder

COPY package.json ./
RUN yarn install

COPY . .
FROM builder


CMD ["yarn", "dev"]
