FROM node:16-alpine3.11

WORKDIR /app

COPY package.json .

RUN npm install && npm install typescript -g

COPY . .

RUN tsc

ARG DOCKER_ENV
ENV NODE_ENV=${DOCKER_ENV}

EXPOSE 3000

CMD [ "npm", "start"]