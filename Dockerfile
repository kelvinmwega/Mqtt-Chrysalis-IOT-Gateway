FROM node:10

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY . .

EXPOSE 4000
EXPOSE 8888

RUN npm run build