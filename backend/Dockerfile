FROM node:10.14.1-alpine

WORKDIR /usr/local/

COPY package*.json /usr/local/

RUN npm install --production

COPY src /usr/local/src

EXPOSE 80
ENV NODE_ENV production

CMD ["npm", "run", "start:prod"]