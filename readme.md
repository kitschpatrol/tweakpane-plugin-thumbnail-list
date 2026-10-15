<!-- title -->

# @kitschpatrol/tweakpane-plugin-thumbnail-list

<!-- /title -->

<!-- badges({ npmDownloads: true }) -->

[![NPM Package @kitschpatrol/tweakpane-plugin-thumbnail-list](https://img.shields.io/npm/v/@kitschpatrol/tweakpane-plugin-thumbnail-list.svg)](https://www.npmjs.com/package/@kitschpatrol/tweakpane-plugin-thumbnail-list)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/license/mit)
[![NPM Downloads @kitschpatrol/tweakpane-plugin-thumbnail-list](https://img.shields.io/npm/dm/@kitschpatrol/tweakpane-plugin-thumbnail-list)](https://www.npmjs.com/package/@kitschpatrol/tweakpane-plugin-thumbnail-list)

<!-- /badges -->

<!-- description -->

**Fork of tweakpane-plugin-thumbnail-list with Tweakpane 4 compatibility and externalized dependencies.**

<!-- /description -->

## Overview

This is a fork of [tweakpane-plugin-thumbnail-list](https://github.com/donmccurdy/tweakpane-plugin-thumbnail-list) with Tweakpane 4.0 compatibility and externalized dependencies.

It's under consideration for inclusion in the [svelte-tweakpane-ui](https://kitschpatrol.com/svelte-tweakpane-ui) project, but may be useful to others who wish to use the plugin with Tweakpane 4.0.

Please refer to the [upstream project](https://github.com/donmccurdy/tweakpane-plugin-thumbnail-list) for documentation and other details.

## Background

The [Rollup](https://rollupjs.org) configuration provided in the [Tweakpane plugin template](https://github.com/tweakpane/plugin-template) does not externalize [`@tweakpane/core`](https://github.com/cocopon/tweakpane/tree/main/packages/core) as a production dependency.

Instead, it gets built into the single-file plugin artifact, which is what's published to NPM and imported by plugin consumers. This makes it easy to import as an ES module from a URL, but means that larger projects importing multiple Tweakpane plugins end up with duplicate copies of the `@tweakpane/core` code, adding about \~100 Kb to the final minified build for each plugin after the first.

Externalizing this dependency allows build tools like [vite](https://vite.dev) to share a single instance of the `@tweakpane/core` code across multiple plugins.

If you're not using a bundler, direct ESM imports from URLs can still work by defining the `@tweakpane/core` dependency in an [importmap](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type/importmap).

## Implementation notes

A [PR on the upstream project](https://github.com/donmccurdy/tweakpane-plugin-thumbnail-list/pull/6) with Tweakpane 4.0 support was never merged. The upstream project is now archived.

Note the package's name change from `tweakpane-plugin-thumbnail-list` to `@kitschpatrol/tweakpane-plugin-thumbnail-list`.

PNPM is used as the package manager.

## Versioning

The [upstream project](https://github.com/donmccurdy/tweakpane-plugin-thumbnail-list) was zero-versioned when it was archived. This fork started at 1.0.0 with Tweakpane 4.0 support, so its version numbers are ahead of upstream. Releases are tagged with a "fork" suffix and an incrementing number.

## License

Original plugin: [MIT](license.txt) © Don McCurdy

Fork modifications: [MIT](license.txt) © [Eric Mika](https://ericmika.com)
