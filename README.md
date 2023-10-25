# Pera

[![CI](https://github.com/daido1976/pera/actions/workflows/ci.yml/badge.svg)](https://github.com/daido1976/pera/actions/workflows/ci.yml)

Pera is a minimal web framework for Deno.

**This project is still experimental.**

## Features

- Simple method-based HTTP router like express
- Easy-to-use Request/Response interface inspired by the Next.js API
- Named parameters
- Regexp route patterns
- Static file server
- Zero external dependencies

## Usage

```ts
import { Pera } from "https://deno.land/x/pera/mod.ts";

const app = new Pera();

app.get("/", (_req, res) => res.text("Hi!"));

await app.run();
```

See more [examples](examples).

## Development

```sh
$ deno task dev
```

## Deployment

```sh
$ ./scripts/semver-tag-updater.sh
```

## License

MIT
