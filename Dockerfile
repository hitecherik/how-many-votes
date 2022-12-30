FROM node:18

WORKDIR /var/how-many-votes
COPY . .
RUN npm i

CMD node index.js
