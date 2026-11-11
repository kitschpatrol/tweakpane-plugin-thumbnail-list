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

This is a fork of [Don McCurdy's](https://github.com/donmccurdy) [tweakpane-plugin-thumbnail-list](https://github.com/donmccurdy/tweakpane-plugin-thumbnail-list) with Tweakpane 4 support and externalized dependencies.

This allows for smaller bundled file sizes in projects using multiple Tweakpane plugins.

The upstream repository is archived; this fork will maintain a version with Tweakpane 4 support.

See the [upstream readme](https://github.com/donmccurdy/tweakpane-plugin-thumbnail-list#readme) for details on the original plugin and its usage.

## Fork changes

- Publishes as `@kitschpatrol/tweakpane-plugin-thumbnail-list` instead of `tweakpane-plugin-thumbnail-list`.
- Adds a `/lite` export that imports `@tweakpane/core` instead of bundling it so projects can share one copy of `core` across multiple plugins.
- Exports public parameter types.
- Migrates the repository structure to align with the Tweakpane plugin template provided by [@kitschpatrol/create-project](https://github.com/kitschpatrol/create-project), which includes:
  - [pnpm](https://pnpm.io/) instead of npm for local development
  - [tsdown](https://tsdown.dev/) for bundling, type generation, and SCSS processing
  - [vite](https://vite.dev/) for live-reloading the demo project
  - [vitest](https://vitest.dev/) for automated tests
  - [ksc](https://github.com/kitschpatrol/shared-config) for linting and shared configuration
  - [chagent](https://github.com/kitschpatrol/chagent) for release notes
- Ports the original Tweakpane 3 plugin to Tweakpane 4. The [upstream migration PR](https://github.com/donmccurdy/tweakpane-plugin-thumbnail-list/pull/6) was closed without merging.
- Uses the bundle ID `thumbnail-list` instead of `textarea`, so both plugins can register their styles in the same pane.

## Getting started

### Dependencies

The plugin requires [Tweakpane 4](https://www.npmjs.com/package/tweakpane).

If you're using the `/lite` export path of the plugin without a bundler, you'll need to provide the [@tweakpane/core](https://www.npmjs.com/package/@tweakpane/core) library as well.

<!-- installation -->

### Installation

Add it to your project:

```sh
npm install @kitschpatrol/tweakpane-plugin-thumbnail-list
```

<!-- /installation -->

## Usage

```ts
import * as TweakpanePluginThumbnailList from '@kitschpatrol/tweakpane-plugin-thumbnail-list'
import { Pane } from 'tweakpane'

const pane = new Pane()
pane.registerPlugin(TweakpanePluginThumbnailList)

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

## Implementation notes

The [Rollup](https://rollupjs.org) configuration provided in the [Tweakpane plugin template](https://github.com/tweakpane/plugin-template) does not externalize [`@tweakpane/core`](https://github.com/cocopon/tweakpane/tree/main/packages/core) as a production dependency.

Instead, it gets built into the single-file plugin artifact, which is what's published to NPM and imported by plugin consumers. This makes it easy to import as an ES module from a URL, but means that larger projects importing multiple Tweakpane plugins end up with duplicate copies of the `@tweakpane/core` code, adding about \~100 Kb to the final minified build for each plugin after the first.

Externalizing this dependency allows build tools like [vite](https://vite.dev) to share a single instance of the `@tweakpane/core` code across multiple plugins.

If you're not using a bundler, direct ESM imports from URLs can still work by defining the `@tweakpane/core` dependency in an [importmap](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type/importmap).

## Versioning

The [upstream project](https://github.com/donmccurdy/tweakpane-plugin-thumbnail-list) was zero-versioned when it was archived. This fork started at 1.0.0 with Tweakpane 4.0 support, so its version numbers are ahead of upstream. Releases are tagged with a "fork" suffix and an incrementing number.

<!-- contributing -->

## Contributing

[Issues](https://github.com/kitschpatrol/tweakpane-plugin-thumbnail-list/issues) are welcome and appreciated.

Please open an issue to discuss changes before submitting a pull request. Unsolicited PRs (especially AI-generated ones) are unlikely to be merged.

This repository uses [@kitschpatrol/shared-config](https://github.com/kitschpatrol/shared-config) (via its `ksc` CLI) for linting and formatting, plus [MDAT](https://github.com/kitschpatrol/mdat) for readme placeholder expansion.

<!-- /contributing -->

## License

Original plugin: [MIT](license.txt) © Don McCurdy

Fork modifications: [MIT](license.txt) © [Eric Mika](https://ericmika.com)
