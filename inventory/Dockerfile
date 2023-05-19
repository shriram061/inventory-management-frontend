FROM node:12.4.0-alpine as build  

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

