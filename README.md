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
go build openapi-changes.go
```

### 3. Run the code using example git history

First argument is a path to the git repo (use the local repo via './')

Second argument is a path to the OpenAPI Spec from the repo root (sample-specs/petstorev3.json)


```bash
./openapi-changes console . sample-specs/petstorev3.json
```
View the example changes made to the OpenAPI spec, over time.

### 3. Run the code using original and changes files (left/right)

First argument is the original OpenAPI spec file

First argument is the new / updated OpenAPI spec file

```bash
./openapi-changes console sample-specs/petstorev3-original.json sample-specs/petstorev3.json
```
See a left / right comparison between two specifications.

## Terminal UI Controls

* Up / Down to select Revision
* Enter to select Revision
* Up / Down to select Change
* Enter to select Change
* Esc to focus back on revisions
* Esc or Ctrl-C to quit.