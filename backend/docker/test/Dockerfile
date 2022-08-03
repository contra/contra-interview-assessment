FROM node:16.14.2

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 8080

CMD ["yarn", "test:ci"]