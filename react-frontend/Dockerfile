FROM node:10.14.1-alpine

WORKDIR /usr/local/

COPY package*.json /usr/local/

RUN npm install

COPY src /usr/local/src
COPY public /usr/local/public

EXPOSE 3000
ENV NODE_ENV development

CMD ["npm", "run", "start:dev"]