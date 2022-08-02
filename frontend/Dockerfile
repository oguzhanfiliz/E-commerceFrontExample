FROM node:lts-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./


RUN npm install -g npm@8.15.1
RUN npm install
RUN npm install -g serve


COPY . ./

RUN chown -R node:node /app/node_modules

EXPOSE 8080
# start app
CMD ["npm", "run", "dev"]