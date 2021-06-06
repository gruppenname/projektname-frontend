# base image
FROM node:12.2.0-alpine

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "serve"]