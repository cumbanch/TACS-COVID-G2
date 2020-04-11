FROM node:10.14.1-alpine

WORKDIR /usr/src

COPY package*.json .

RUN npm install --production

COPY . .

EXPOSE 80
ENV NODE_ENV production

CMD ["npm", "run", "start:prod"]