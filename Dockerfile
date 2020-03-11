FROM node:latest

WORKDIR /app

COPY package.json /app

RUN npm install -g pm2
RUN npm install

COPY dist /app/dist
COPY ecosystem.config.js /app
COPY www /app/www

EXPOSE 3000
CMD ["pm2-runtime", "ecosystem.config.js"]
