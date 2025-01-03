FROM golang:1.23.4-alpine AS base
WORKDIR /usr/src/app
COPY ./vote-api/go.mod ./vote-api/go.sum ./
RUN go mod download
COPY ./vote-api ./

FROM golang:1.23.4-alpine AS builder
WORKDIR /usr/src/app
COPY ./vote-api/go.mod ./vote-api/go.sum ./
RUN go mod download
COPY ./vote-api ./
RUN CGO_ENABLED=0 GOOS=linux go build -o vote-api .

FROM base AS development
RUN go install github.com/githubnemo/CompileDaemon@latest
EXPOSE 8080
CMD ["CompileDaemon", "--build=go build -o main .", "--command=./main"]

FROM alpine:latest AS production
WORKDIR /usr/src/app
COPY --chown=nobody:nobody --from=builder /usr/src/app/vote-api ./
RUN chown -R nobody:nobody /usr/src/app
USER nobody
EXPOSE 8080
CMD ["./vote-api"]