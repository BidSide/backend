FROM node:latest

WORKDIR /app

RUN npm install -g pm2

COPY . .

RUN npm install

RUN npm run build
