# OpenAPI - What Changed?

See what has changed with your OpenAPI Specification, between a single change, or for all time!

This is a prototype for now, please ignore me!

However, if you do want to try out this very early code?

### 1. Clone the repo

```bash
git clone https://github.com/pb33f/openapi-changes.git
```

Change into the `openapi-changes` directory

```bash
cd openapi-changes
```

### 2. Build the code

```bash
go build -o openapi-changes main.go
```

### 3. Run the code using example

```bash
./openapi-changes console -r . -f sample-specs/petstorev3.json
```

> `-r` is the path to the root of the git repo that holds the OpenAPI spec.

> `-f` is the path to the OpenAPI spec (from the root of the repo)

View the example changes made to the OpenAPI spec, over time.