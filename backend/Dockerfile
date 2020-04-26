FROM node:10.14.1-alpine

WORKDIR /usr/local/
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.2/wait /wait

COPY package*.json /usr/local/

RUN npm install --production

COPY src /usr/local/src

RUN chmod +x /wait

EXPOSE 80
ENV NODE_ENV production

CMD  /wait && npm run start:prod