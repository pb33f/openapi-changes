FROM golang:1.21-bookworm as builder

RUN mkdir -p /opt/openapi-changes

WORKDIR /opt/openapi-changes

COPY . ./

RUN go mod download && go mod verify
RUN go build -ldflags="-w -s" -v -o /openapi-changes openapi-changes.go

FROM debian:bookworm-slim
RUN apt-get update
RUN apt-get --yes install git
WORKDIR /work
COPY --from=0 /openapi-changes /

ENV PATH=$PATH:/

ENTRYPOINT ["openapi-changes"]
