FROM node:23
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
ENV VOTE_API_BASE_URL=http://localhost:8080
ENV PORT=3000
ENV NODE_ENV=production
RUN yarn build
EXPOSE 3000
CMD ["yarn", "dev"]