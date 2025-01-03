FROM node:23-alpine AS base

WORKDIR /usr/src/app
COPY ./package.json ./
RUN yarn install
COPY . ./

FROM base AS development
EXPOSE 3000
CMD ["yarn", "dev"]

FROM base AS builder
RUN yarn build

FROM node:23-alpine AS production
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/yarn.lock ./
COPY --from=builder /usr/src/app/package*.json ./
RUN yarn install --production
USER node

EXPOSE 3000
CMD ["yarn", "dev"]