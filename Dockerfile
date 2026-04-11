FROM --platform=$BUILDPLATFORM node:22-bookworm-slim AS ui-builder

WORKDIR /opt/openapi-changes/html-report/ui
COPY html-report/ui/package.json html-report/ui/package-lock.json ./
RUN npm ci
COPY html-report/ui/ ./
RUN npm run build

FROM --platform=$BUILDPLATFORM golang:1.25-bookworm AS builder

ARG TARGETPLATFORM
ARG BUILDPLATFORM
ARG TARGETOS
ARG TARGETARCH

RUN mkdir -p /opt/openapi-changes

WORKDIR /opt/openapi-changes

COPY . ./
COPY --from=ui-builder /opt/openapi-changes/html-report/ui/build/ html-report/ui/build/

RUN go mod download && go mod verify
RUN CGO_ENABLED=0 GOOS=$TARGETOS GOARCH=$TARGETARCH go build -ldflags="-w -s" -v -o /openapi-changes openapi-changes.go

FROM --platform=$TARGETPLATFORM debian:bookworm-slim
RUN apt-get update && apt-get --yes install git && rm -rf /var/lib/apt/lists/*
WORKDIR /work
COPY --from=builder /openapi-changes /

ENV PATH=$PATH:/

ENTRYPOINT ["openapi-changes"]
