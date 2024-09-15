# @kitschpatrol/tweakpane-plugin-thumbnail-list

[![NPM Package @kitschpatrol/tweakpane-plugin-thumbnail-list](https://img.shields.io/npm/v/@kitschpatrol/tweakpane-plugin-thumbnail-list.svg)](https://npmjs.com/package/@kitschpatrol/tweakpane-plugin-thumbnail-list)

## Overview

**This is a fork of [tweakpane-plugin-thumbnail-list](https://github.com/donmccurdy/tweakpane-plugin-thumbnail-list) with Tweakpane 4.0 compatibility and externalized dependencies.**

It's under consideration for inclusion in the [svelte-tweakpane-ui](https://kitschpatrol.com/svelte-tweakpane-ui) project, but may be useful to others who wish to use the plugin with Tweakpane 4.0.

Please refer to the [upstream project](https://github.com/donmccurdy/tweakpane-plugin-thumbnail-list) for documentation and other details.

## Background

The [Rollup](https://rollupjs.org) configuration provided in the [Tweakpane plugin template](https://github.com/tweakpane/plugin-template) does not externalize [`@tweakpane/core`](https://github.com/cocopon/tweakpane/tree/main/packages/core) as a production dependency.

Instead, it gets built into the single-file plugin artifact, which is what's published to NPM and imported by plugin consumers. This makes it easy to import as an ES module from a URL, but means that larger projects importing multiple Tweakpane plugins end up with duplicate copies of the `@tweakpane/core` code, adding about ~100 Kb to the final minified build for each plugin after the first.

Externalizing this dependency allows build tools like [vite](https://vitejs.dev) to share a single instance of the `@tweakpane/core` code across multiple plugins.

If you're not using a bundler, direct ESM imports from URLs can still work if needed by defining the `@tweakpane/core` dependency in an [importmap](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap).

## Implementation notes

A [PR on the upstream project](https://github.com/donmccurdy/tweakpane-plugin-thumbnail-list/pull/6) with Tweakpane 4.0 support is pending.

Note the package's name change from `tweakpane-plugin-thumbnail-list` to `@kitschpatrol/tweakpane-plugin-thumbnail-list`.

PNPM is used as the package manager.
