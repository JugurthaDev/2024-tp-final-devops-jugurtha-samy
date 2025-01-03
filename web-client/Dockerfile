FROM node:23 AS node

WORKDIR /usr/src/app
COPY ./web-client/package*.json ./
RUN yarn install
COPY ./web-client ./

FROM node AS builder
RUN yarn build

FROM node:23 AS prod
WORKDIR /usr/src/app
ENV NODE_ENV=production
ENV VOTE_API_BASE_URL=http://localhost:8080
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/yarn.lock ./
COPY --from=builder /usr/src/app/package*.json ./
RUN yarn install --production
USER node

EXPOSE 3000
CMD ["yarn", "start"]