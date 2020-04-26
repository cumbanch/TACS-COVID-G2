FROM node:10.14.1-alpine

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
RUN echo $NODE_ENV

WORKDIR /usr/local/

COPY package*.json /usr/local/

RUN if [ "$NODE_ENV" = "production" ]; then npm install --production; else npm install; fi

COPY src /usr/local/src

EXPOSE 8080
USER node

CMD ["npm", "run", "start:prod"]
