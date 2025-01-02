FROM node:23
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
ENV VOTE_API_BASE_URL=http://localhost:8080
RUN yarn build
EXPOSE 80
CMD ["yarn", "start"]