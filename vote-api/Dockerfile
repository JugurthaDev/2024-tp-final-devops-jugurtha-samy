FROM golang:1.23 as builder

ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . ./

RUN go build -o vote-api .

FROM debian:buster-slim

RUN apt-get update && apt-get install -y ca-certificates
RUN update-ca-certificates

ENV PG_URL=postgres://vote_api:api123@localhost:5432/vote_api?sslmode=disable

WORKDIR /app

COPY --from=builder /app/vote-api ./

ENTRYPOINT ["./vote-api"]

EXPOSE 8080