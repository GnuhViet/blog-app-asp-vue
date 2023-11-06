FROM node:latest as build
WORKDIR /app

COPY ./blog-app-vuejs/package*.json ./
RUN npm install

COPY ./blog-app-vuejs/ ./
RUN npm run build

FROM nginx:stable-alpine as final
RUN mkdir /app
COPY --from=build /app/dist /app
COPY ./blog-app-vuejs/nginx.conf /etc/nginx/nginx.conf
