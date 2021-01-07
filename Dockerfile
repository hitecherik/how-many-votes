FROM node:10.23-alpine3.11

RUN apk add python3 make g++

WORKDIR /var/how-many-votes
COPY . .
RUN npm i

CMD node index.js
