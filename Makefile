build:
	@go build -o bin/openapi-changes

run:
	@go run openapi-changes.go

demos:
	@./scripts/render-demos.sh
