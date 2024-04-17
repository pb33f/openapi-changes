
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

To run, mount the current working dir to the container like so:

```
docker run --rm -v $PWD:/work:rw pb33f/openapi-changes summary . sample-specs/petstorev3.json
```
> The `console` cannot run via docker.

---

Check out all the docs at https://pb33f.io/openapi-changes/
