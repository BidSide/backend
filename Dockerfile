FROM node:13.14.0

WORKDIR /app

RUN npm install -g pm2

COPY . .

RUN npm install

RUN npm run build
