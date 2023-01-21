# OpenAPI - What Changed?

## The world's **_sexiest_** OpenAPI diff tool.

We will get to the sexy part in a moment, but in a nutshell `openapi-changes` allows you 
to see and explore what has changed with your OpenAPI Specification, between a single change, 
or for all time!

> This is an early tool.

## Install via homebrew tap

```bash
brew install pb33f/taps/openapi-changes
```
And you're ready to go!

---

However, if you want to check out the code yourself...

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

## How is it the 'sexiest'?

Have you ever seen an OpenAPI diff report look like this?

![](https://github.com/pb33f/openapi-changes/blob/main/.github/assets/ui.gif)

What about a terminal UI that does the same?

![](https://github.com/pb33f/openapi-changes/blob/main/.github/assets/console.gif)

---
## How to use `openapi-changes`

All the commands in `openapi-changes` perform the same job and do the same thing, the only
difference between them is how you consume the results.

### What kind of inputs does it use?

There are three exciting flavors of inputs available to all commands.

- View changes _over time_ from an OpenAPI spec in a **local git repository**
- View changes _over time_ from an OpenAPI spec hosted on **github**
- **Compare two specifications** against each other (original vs modified)

There are four rendering commands available:

- `summary`
- `report`
- `console`
- `html-report`

### Viewing results from a OpenAPI spec in a local git repository

This requires two arguments. The first argument would be the path to the **root** of the local git repo. The second argument
is the **path** to the OpenAPI spec from the root you want to check.

**_e.g._** to see the history of the included sample spec, after checking out the code run: 
```bash
openapi-changes html-report . sample-specs/petstorev3.json
```
> When this method is used the `-t` | `--top` flag that will return **JUST** the latest changes, instead of all of them.

### Viewing results from a OpenAPI spec hosted on Github

The command accepts only a single argument, which is the URL to the OpenAPI spec on Github that 
is to be checked. 

**_e.g._** to see the history of the official [Petstore](https://github.com/OAI/OpenAPI-Specification/blob/main/examples/v3.0/petstore.yaml)
OpenAPI spec hosted on github?

```bash
openapi-changes html-report https://github.com/OAI/OpenAPI-Specification/blob/main/examples/v3.0/petstore.yaml
```
> When this method is used the `-t` | `--top` flag that will return **JUST** the latest changes, instead of all of them.

### Viewing results from comparing two OpenAPI specifications

The commands accept two arguments, the first is the full path the **original** (left) OpenAPI spec, and the second
argument is the full path to the **modified** specification (right). 

**_e.g._** to see changes between two included example OpenAPI specifications (check out the code first)

```bash
openapi-changes html-report sample-specs/petstorev3-original.json sample-specs/petstorev3.json
```

---

## `openapi-changes` rendering commands

Each command renders the same report data (provided the arguments listed above) in a different way.

### `html-report` command

`html-report` will render the **_sexiest_** OpenAPI diff user interface you have ever seen. Explore changes 
in interactive style, see your changes rendered in a tree, or a beautiful graph!

_Example_:
```bash
openapi-changes html-report . sample-specs/petstorev3.json
```

### `summary` command

`summary` renders out a simple tree of changes and a simple summary of the changes found. It's designed for CI/CD use
or for quick checks in the terminal when looking at OpenAPI spec changes.

If there is a breaking change detected, the application returns an exit code of 1.

_Example_:
```bash
openapi-changes summary sample-specs/petstorev3-original.json sample-specs/petstorev3.json
```

### `console` command

`console` renders a full interactive terminal UI that allows the exploration of all changes found in a document. The
console supports selecting any individual commit made in the history of the OpenAPI document, and tell you what the
changes were when it was committed.

**Terminal UI Controls**

* `Up` / `Down` to select Revision
* `Enter` to select Revision
* `Up` / `Down` to select Change
* `Enter` to select Change
* `Esc` to focus back on revisions
* `Esc` or `Ctrl-C` to quit.

_Example_:
```bash
openapi-changes console . sample-specs/petstorev3.json
```

### `report` command

`report` will spit out a full JSON report of all the changes found. It's the exact same data that is used to
render all the commands. It's ready to import into your own applications.

_Example_:
```bash
openapi-changes report . sample-specs/petstorev3.json | jq
```