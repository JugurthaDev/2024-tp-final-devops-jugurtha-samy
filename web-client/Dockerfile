FROM node:latest AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx:latest
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build ./
EXPOSE 80
USER nginx
CMD ["nginx", "-g", "daemon off;"]