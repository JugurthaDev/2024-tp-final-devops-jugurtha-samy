FROM node:latest AS build
WORKDIR /usr/src/app
COPY ./package.json ./
RUN npm install
COPY . ./
RUN npm run build

# Deployment step

FROM busybox:latest as deploy

RUN adduser -D static
USER static
WORKDIR /home/static

COPY --from=build /usr/src/app/build/ ./

EXPOSE 2000

CMD ["busybox", "httpd", "-f", "-v", "-p", "2000"]