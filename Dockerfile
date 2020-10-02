FROM node:current-alpine AS Builder

RUN apk add curl

RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | sh -s -- -b /usr/local/bin

COPY . /app

WORKDIR /app

RUN npm install --only=production

RUN /usr/local/bin/node-prune

####################################

FROM node:current-alpine

COPY --from=Builder /app /app

WORKDIR /app

EXPOSE 3000

CMD [ "node", "server.js" ]