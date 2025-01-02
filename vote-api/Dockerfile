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

WORKDIR /app

COPY --from=builder /app/vote-api ./

ENTRYPOINT ["./vote-api"]

EXPOSE 8080