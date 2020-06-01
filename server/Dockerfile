FROM node:12-alpine

EXPOSE 8080

RUN apk add --update tini

WORKDIR /usr/src/app

COPY package.json package.json
RUN apk add --no-cache make gcc g++ python && \
    npm install && \
    npm rebuild bcrypt --build-from-source && \
    apk del make gcc g++ python

COPY . .

CMD [ "/sbin/tini", "--", "node", "app.js" ]
