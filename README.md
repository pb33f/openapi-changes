
![logo](openapi-changes-logo.webp)

[![discord](https://img.shields.io/discord/923258363540815912)](https://discord.gg/x7VACVuEGP)
[![GitHub downloads](https://img.shields.io/github/downloads/pb33f/openapi-changes/total?label=github%20downloads&style=flat-square)](https://github.com/pb33f/wiretap/releases)
[![npm](https://img.shields.io/npm/dm/@pb33f/openapi-changes?style=flat-square&label=npm%20downloads)](https://www.npmjs.com/package/@pb33f/openapi-changes)
[![Docker Pulls](https://img.shields.io/docker/pulls/pb33f/openapi-changes?style=flat-square)](https://hub.docker.com/r/pb33f/openapi-changes)

# OpenAPI Changes

## The world's **_sexiest_** OpenAPI diff tool.

We will get to the sexy part in a moment, but in a nutshell `openapi-changes` allows you 
to see and explore what has changed with your OpenAPI Specification, between a single change, 
or for all time! 

Explore OpenAPI change history using a terminal or a browser, you decide which experience suits you. Perfect for
individual use, or in a CI/CD pipeline for automation.

> This is an early tool and is active, daily development

## How is it the 'sexiest'?

Have you ever seen an OpenAPI diff report look like this?

![](https://github.com/pb33f/openapi-changes/blob/main/.github/assets/ui.gif)

What about a terminal UI that does the same?

![](https://github.com/pb33f/openapi-changes/blob/main/.github/assets/console.gif)

---


## Documentation

### 👉 [⚡ Try the online Demo ⚡](https://pb33f.io/openapi-changes/demo/) 👈

### [Quick Start Guide 🚀](https://pb33f.io/openapi-changes/quickstart/)

See all the documentation at https://pb33f.io/openapi-changes/

- [Installing openapi-changes](https://pb33f.io/openapi-changes/installing/)
- [Configuring breaking changes](https://pb33f.io/openapi-changes/configuring/)
- [Command arguments](https://pb33f.io/openapi-changes/command-arguments/)
- CLI Commands
    - [`console` command](https://pb33f.io/openapi-changes/console/)
    - [`html-report` command](https://pb33f.io/openapi-changes/html-report/)
    - [`report` command](https://pb33f.io/openapi-changes/report/)
    - [`summary` command](https://pb33f.io/openapi-changes/summary/)
- [About openapi-changes](https://pb33f.io/openapi-changes/about/)

---
 
Are you ready to try it out?

## Install using homebrew tap

```bash
brew install pb33f/taps/openapi-changes
```

---

## Install using npm or yarn

```bash
npm i -g @pb33f/openapi-changes
```

If you prefer yarn _(recommended)_

```bash
yarn global add @pb33f/openapi-changes
```

---

## Install using cURL

```bash
curl -fsSL https://pb33f.io/openapi-changes/install.sh | sh 
```
---

## Install/run using Docker

```bash
docker pull pb33f/openapi-changes
```

Docker images are available for both `linux/amd64` and `linux/arm64` architectures.

To run, mount the current working dir to the container like so:

```
docker run --rm -v $PWD:/work:rw pb33f/openapi-changes summary . sample-specs/petstorev3.json
```
> The `console` cannot run via docker.

---

## Custom Breaking Rules Configuration

> Supported in `v0.91+`

openapi-changes uses [libopenapi](https://github.com/pb33f/libopenapi)'s configurable breaking change
detection system. You can customize which changes are considered "breaking" by providing a configuration file.

### Using a Config File

```bash
# Use explicit config file
openapi-changes summary -c my-rules.yaml old.yaml new.yaml

# Or place changes-rules.yaml in current directory (auto-detected)
openapi-changes summary old.yaml new.yaml
```

### Default Config Locations

openapi-changes searches for `changes-rules.yaml` in:
1. Current working directory (`./changes-rules.yaml`)
2. User config directory (`~/.config/changes-rules.yaml`)

### Example Configuration

Create a `changes-rules.yaml` file:

```yaml
# Custom breaking rules configuration
# Only specify overrides - unspecified rules use defaults

# Make operation removal non-breaking (for deprecation workflows)
pathItem:
  get:
    removed: false
  post:
    removed: false
  put:
    removed: false
  delete:
    removed: false

# Make enum value removal non-breaking
schema:
  enum:
    removed: false

# Make parameter changes non-breaking
parameter:
  required:
    modified: false
```

### Configuration Structure

Each rule has three options:
- `added`: Is adding this property a breaking change? (true/false)
- `modified`: Is modifying this property a breaking change? (true/false)
- `removed`: Is removing this property a breaking change? (true/false)

### Available Components

You can configure rules for these OpenAPI components:

| Component             | Description                                        |
|-----------------------|----------------------------------------------------|
| `paths`               | Path definitions                                   |
| `pathItem`            | Operations (get, post, put, delete, etc.)          |
| `operation`           | Operation details (operationId, requestBody, etc.) |
| `parameter`           | Parameter properties (name, required, schema)      |
| `schema`              | Schema properties (type, format, enum, properties) |
| `response`            | Response definitions                               |
| `securityScheme`      | Security scheme properties                         |
| `securityRequirement` | Security requirements                              |

For the complete list of configurable properties and more examples, see the
[full configuration documentation](https://pb33f.io/openapi-changes/configuring/).

---

Check out all the docs at https://pb33f.io/openapi-changes/
