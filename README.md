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

First argument is a path to the git repo (use the local repo via `.`)

Second argument is a path to the OpenAPI Spec from the repo root (`sample-specs/petstorev3.json`)


```bash
./openapi-changes console . sample-specs/petstorev3.json
```
View the example changes made to the OpenAPI spec, over time.

> To see just the latest changes (since last revision) use the `-t` flag (top)
> `./openapi-changes -t console . sample-specs/petstorev3.json`

### 3. Run the code using original and changes files (left/right)

First argument is the original OpenAPI spec file

First argument is the new / updated OpenAPI spec file

```bash
./openapi-changes console sample-specs/petstorev3-original.json sample-specs/petstorev3.json
```
See a left / right comparison between two specifications.

## See a summary of changes

Looking to use this tool as part of a CI/CD pipeline? Use the `summary` command instead of the 
console to print out a summary of changes, including breaking changes.

If any breaking changes are found, then an exit code of 1 is returned that should fail any CI/CD
pipeline job.

The command functions the same as `console` except results are printed out to the console, it's not
interactive, not as detailed and will return an exit code of 1 with any breaking changes.

Left / right file comparison:

```bash
./openapi-changes summary sample-specs/petstorev3-original.json sample-specs/petstorev3.json
```

or git history for all time:

```bash
./openapi-changes summary ./ sample-specs/petstorev3.json
```

or just the latest revision:

```bash
./openapi-changes -t summary sample-specs/petstorev3-original.json sample-specs/petstorev3.json
```

## Generate a machine-readable report

Want to build an app that can use the change report? Then use the `report` command to generate a JSON
report that is ready for importing into any other app for use. 

All the same options as the other commands above.

Left / right file comparison:

> These examples use `jq` to make the output easier to read on a screen.

```bash
./openapi-changes report sample-specs/petstorev3-original.json sample-specs/petstorev3.json | jq
```

or git history for all time:

```bash
./openapi-changes report ./ sample-specs/petstorev3.json | jq
```

or just the latest revision:

```bash
./openapi-changes -t report sample-specs/petstorev3-original.json sample-specs/petstorev3.json | jq
```

## Terminal UI Controls

* `Up` / `Down` to select Revision
* `Enter` to select Revision
* `Up` / `Down` to select Change
* `Enter` to select Change
* `Esc` to focus back on revisions
* `Esc` or `Ctrl-C` to quit.