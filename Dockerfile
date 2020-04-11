
RUN mkdir -p /usr/src

COPY package.json package-lock.json .nvmrc /usr/src/
FROM node:10.14.1-alpine

WORKDIR /usr/src

RUN npm install
RUN npm install -g nodemon

COPY server.js app.js /usr/src/
COPY app /usr/src/app

EXPOSE 8080
ENV NODE_ENV production

CMD ["npm", "start"]
