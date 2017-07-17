FROM node:7-alpine

WORKDIR /code/
ADD . /code

RUN npm install --silent
RUN npm install -g supervisor # useful for dev

CMD ["supervisor", "app.js"]
