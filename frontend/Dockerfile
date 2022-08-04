FROM node:lts-alpine

WORKDIR /app


COPY . ./


RUN npm install -g npm@8.15.1
RUN npm install
RUN npm install -g serve


RUN chown -R node:node /app/node_modules

EXPOSE 8080
CMD ["npm", "run", "dev"]