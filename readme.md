<!-- title -->

# @kitschpatrol/tweakpane-plugin-thumbnail-list

<!-- /title -->

<!-- badges({ npmDownloads: true }) -->

[![NPM Package @kitschpatrol/tweakpane-plugin-thumbnail-list](https://img.shields.io/npm/v/@kitschpatrol/tweakpane-plugin-thumbnail-list.svg)](https://www.npmjs.com/package/@kitschpatrol/tweakpane-plugin-thumbnail-list)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/license/mit)
[![CI](https://github.com/kitschpatrol/tweakpane-plugin-thumbnail-list/actions/workflows/ci.yml/badge.svg)](https://github.com/kitschpatrol/tweakpane-plugin-thumbnail-list/actions/workflows/ci.yml)
[![NPM Downloads @kitschpatrol/tweakpane-plugin-thumbnail-list](https://img.shields.io/npm/dm/@kitschpatrol/tweakpane-plugin-thumbnail-list)](https://www.npmjs.com/package/@kitschpatrol/tweakpane-plugin-thumbnail-list)

<!-- /badges -->

<!-- description -->

**Fork of tweakpane-plugin-thumbnail-list with Tweakpane 4 compatibility and build optimizations.**

<!-- /description -->

## Overview

A thumbnail selector for Tweakpane 4, forked from [Don McCurdy's tweakpane-plugin-thumbnail-list](https://github.com/donmccurdy/tweakpane-plugin-thumbnail-list). The upstream repository is archived; this fork maintains its Tweakpane 4 support.

The [upstream README](https://github.com/donmccurdy/tweakpane-plugin-thumbnail-list#readme) describes the plugin's features and options. This fork may be useful to applications that need the plugin with Tweakpane 4, including [Svelte Tweakpane UI](https://kitschpatrol.com/svelte-tweakpane-ui).

## Fork changes

- Publishes as `@kitschpatrol/tweakpane-plugin-thumbnail-list` instead of `tweakpane-plugin-thumbnail-list`.
- Bundles `@tweakpane/core` at the package root like a standard Tweakpane plugin, and adds a `/lite` entry that imports core instead so bundlers can share one copy across plugins.
- Exports public parameter types from the package root and `/lite`.
- Builds TypeScript and inline SCSS with tsdown, with a Vite playground, Vitest tests, ksc linting, and chagent release notes.
- Ports the original Tweakpane 3 plugin to Tweakpane 4. The [upstream migration PR](https://github.com/donmccurdy/tweakpane-plugin-thumbnail-list/pull/6) was closed without merging.
- Uses the bundle ID `thumbnail-list` instead of `textarea`, so both plugins can register their styles in the same pane.

## Getting started

<!-- dependencies({ headingLevel: 3 }) -->

### Dependencies

- [Node.js](https://nodejs.org/) 18.0.0 or newer
- [tweakpane](https://www.npmjs.com/package/tweakpane) `^4.0.0` _(peer dependency)_

<!-- /dependencies -->

<!-- install({ headingLevel: 3 }) -->

### Installation

Add it to your project:

```sh
npm install @kitschpatrol/tweakpane-plugin-thumbnail-list
```

<!-- /install -->

## Usage

```ts
import * as ThumbnailListPlugin from '@kitschpatrol/tweakpane-plugin-thumbnail-list'
import { Pane } from 'tweakpane'

const pane = new Pane()
pane.registerPlugin(ThumbnailListPlugin)

const parameters = { choice: 'first' }
pane.addBinding(parameters, 'choice', {
  options: [
    { src: './first.png', text: 'First', value: 'first' },
    { src: './second.png', text: 'Second', value: 'second' },
  ],
  view: 'thumbnail-list',
})
```

Use `addBinding` with this fork; the upstream examples use the older `addInput` API. See the [upstream usage documentation](https://github.com/donmccurdy/tweakpane-plugin-thumbnail-list#usage) for the remaining options. To share core through your bundler, import `@kitschpatrol/tweakpane-plugin-thumbnail-list/lite` instead.

## Distribution

The build writes four ES module files directly under `dist/`:

| File                                          | Core     | Minified |
| --------------------------------------------- | -------- | -------- |
| `tweakpane-plugin-thumbnail-list.js`          | Bundled  | No       |
| `tweakpane-plugin-thumbnail-list.min.js`      | Bundled  | Yes      |
| `tweakpane-plugin-thumbnail-list.lite.js`     | External | No       |
| `tweakpane-plugin-thumbnail-list.lite.min.js` | External | Yes      |

The package root resolves to `.js` and bundles `@tweakpane/core`. The `/lite` entry resolves to `.lite.js` and imports core, so an application bundler can share one copy across plugins. Direct URL imports of a lite file need an import map for core. Tweakpane itself is a peer dependency and is never bundled. Use one entry consistently when relying on the identity of exported classes.

Both entries share the `dist/tweakpane-plugin-thumbnail-list.d.ts` declarations, so import public types from the package root or `/lite`. The export map contains only the package root, `/lite`, and `/package.json`. JavaScript targets ES2022, and no source maps are emitted.

<!-- size-table({ files: ["dist/tweakpane-plugin-thumbnail-list.js", "dist/tweakpane-plugin-thumbnail-list.min.js", "dist/tweakpane-plugin-thumbnail-list.lite.js", "dist/tweakpane-plugin-thumbnail-list.lite.min.js"], precision: 1 }) -->

| File                                        | Original | Gzip   | Brotli |
| ------------------------------------------- | -------- | ------ | ------ |
| tweakpane-plugin-thumbnail-list.js          | 14 kB    | 4.4 kB | 3.8 kB |
| tweakpane-plugin-thumbnail-list.min.js      | 7.9 kB   | 2.8 kB | 2.5 kB |
| tweakpane-plugin-thumbnail-list.lite.js     | 9.3 kB   | 3.1 kB | 2.7 kB |
| tweakpane-plugin-thumbnail-list.lite.min.js | 6.4 kB   | 2.3 kB | 2 kB   |

<!-- /size-table -->

## Development

<!-- development-dependencies({ headingLevel: 3 }) -->

### Development dependencies

- [Node.js](https://nodejs.org/) ^24.16.0 || >=26.3.0
- [pnpm](https://pnpm.io/) 12.16.1

<!-- /development-dependencies -->

| Command        | Purpose                                                                 |
| -------------- | ----------------------------------------------------------------------- |
| `pnpm install` | Install development dependencies.                                       |
| `pnpm build`   | Build the four distributions and the declaration bundle with tsdown.    |
| `pnpm dev`     | Open the Vite playground in `demo/index.html`.                          |
| `pnpm watch`   | Rebuild JavaScript, declarations, and imported Sass partials on change. |
| `pnpm test`    | Run the Vitest suite in `test/`.                                        |
| `pnpm fix`     | Apply ksc formatting and lint fixes.                                    |
| `pnpm lint`    | Check code, types, styles, dependencies, and generated documentation.   |

Styles live in `src/styles/` and compile to a CSS string through an `?inline` import, which Tweakpane installs when the plugin is registered. Build before running `pnpm fix` or `pnpm lint`, since mdat reads `dist/` for the size table.

The release script calls chagent to update the changelog while preparing the version bump, then builds and publishes the package.

## Versioning

The [upstream project](https://github.com/donmccurdy/tweakpane-plugin-thumbnail-list) was zero-versioned when it was archived. This fork started at 1.0.0 with Tweakpane 4.0 support, so its version numbers are ahead of upstream. Releases are tagged with a "fork" suffix and an incrementing number.

<!-- contributing -->

## Contributing

[Issues](https://github.com/kitschpatrol/tweakpane-plugin-thumbnail-list/issues) are welcome and appreciated.

Please open an issue to discuss changes before submitting a pull request. Unsolicited PRs (especially AI-generated ones) are unlikely to be merged.

This repository uses [@kitschpatrol/shared-config](https://github.com/kitschpatrol/shared-config) (via its `ksc` CLI) for linting and formatting, plus [MDAT](https://github.com/kitschpatrol/mdat) for readme placeholder expansion.

<!-- /contributing -->

<!-- license -->

## License

[MIT](license.txt) © Don McCurdy

<!-- /license -->

Fork modifications: [MIT](license.txt) © [Eric Mika](https://ericmika.com).
