FROM --platform=$BUILDPLATFORM golang:1.24-bookworm as builder

ARG TARGETPLATFORM
ARG BUILDPLATFORM
ARG TARGETOS
ARG TARGETARCH

RUN mkdir -p /opt/openapi-changes

WORKDIR /opt/openapi-changes

COPY . ./

RUN go mod download && go mod verify
RUN CGO_ENABLED=0 GOOS=$TARGETOS GOARCH=$TARGETARCH go build -ldflags="-w -s" -v -o /openapi-changes openapi-changes.go

FROM --platform=$TARGETPLATFORM debian:bookworm-slim
RUN apt-get update && apt-get --yes install git && rm -rf /var/lib/apt/lists/*
WORKDIR /work
COPY --from=builder /openapi-changes /

ENV PATH=$PATH:/

ENTRYPOINT ["openapi-changes"]
