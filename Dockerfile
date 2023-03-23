FROM node

WORKDIR /usr/src

COPY . .

RUN npm i

CMD ["node", "server.js"]