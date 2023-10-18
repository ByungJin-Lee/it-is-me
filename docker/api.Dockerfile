FROM golang:alpine AS builder

ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

WORKDIR /app

COPY . .

RUN go mod download

RUN go build -o main ./main.go

FROM scratch

COPY --from=builder /app/main .

ENTRYPOINT ["/main"]
