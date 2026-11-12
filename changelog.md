# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.5-fork.2] - 2026-11-11

### Added

- Add a `/lite` entry and minified lite distribution that import `@tweakpane/core` so applications can share it across plugins.
- Export the `Thumbnail` and `PluginInputParams` types from the package root and `/lite`.

### Changed

- Bundle `@tweakpane/core` into the default and minified ES modules instead of importing it externally.
- **Breaking:** Restrict package imports to the root, `/lite`, and `/package.json` through an export map; consolidate declarations into `dist/tweakpane-plugin-thumbnail-list.d.ts`.
- **Breaking:** Raise the shipped JavaScript target from ES6 to ES2022.
- **Breaking:** Restrict the declared Node.js requirement to versions 18, 20, 22, 24, and 26 or newer, dropping odd-numbered versions below 26.

### Fixed

- Use the bundle ID `thumbnail-list` so thumbnail-list and textarea plugin styles can coexist in the same pane.
- Compile the thumbnail-size fallback correctly so thumbnails use Tweakpane's container unit size when no custom size is provided.
- Apply thumbnail option hover effects only on devices that support hovering.
- Preserve bound values that match no thumbnail option when refreshing instead of replacing them with `undefined`.

### Documentation

- Add installation instructions and Tweakpane 4 `addBinding` examples; explain `/lite` imports and when core must be provided directly.
- Document the template-based development tooling and contribution guidelines.

### Maintenance

- Update the development package manager to pnpm 12.16.1.
- Update GitHub release actions and retrieve npm publishing one-time passwords through the 1Password CLI.
- Replace Rollup and separate declaration compilation with tsdown builds for JavaScript, bundled declarations, and inline Sass; add publint and Are the Types Wrong validation.
- Replace the static browser test server with a Vite demo playground that reloads source changes.
- Adopt `@kitschpatrol/shared-config` and `ksc` for linting and formatting, with shared workspace settings and VS Code integration.
- Add Vitest tests using happy-dom for registration, compiled styles, selection, bound-value refreshes, disabled state, and disposal.
- Add build, lint, and test CI on Linux, macOS, and Windows.
- Add a monthly dependency-update workflow using `ksc-update` to prepare pull requests.
- Integrate chagent into release preparation and build the package after the version bump.
- Refresh development dependencies and pnpm to 12.18.0; update CI, metadata synchronization, and fork maintenance actions.

## [1.0.5-fork.1] - 2026-10-15

### Changed

- Limit the published package to built distribution files, omitting the TypeScript and Sass source tree.

### Documentation

- Document upstream archival, the fork-suffixed release scheme, and MIT attribution; refresh README links and badges.

### Maintenance

- Modernize contributor tooling with pnpm 12, ESLint 10 flat configuration, TypeScript 6, updated Node.js development requirements, and standardized scripts and workspace settings.
- Modernize Sass compilation and Rollup watch mode so stylesheet edits rebuild embedded CSS.
- Automate README metadata with mdat and include freshness checks in the test command.
- Add automated link checking for repository Markdown and the project homepage.
- Add a scheduled workflow for upstream fork maintenance.
- Update release tooling for fork-suffixed versions, token-authenticated npm publishing, optional `v` tag prefixes, and default-branch validation; refresh metadata synchronization.

## [1.0.4] - 2025-03-04

### Documentation

- Correct the repository link in npm package metadata.

### Maintenance

- Update the declared `@tweakpane/core` dependency to `^2.0.5`.
- Refresh development dependencies, adopt pnpm 10.5.2, remove the pnpm engine restriction, and allow the native watcher build.
- Normalize release and metadata workflows and explicitly publish npm releases with the `latest` tag.

## [1.0.3] - 2024-09-15

### Documentation

- Document that the fork follows semantic versioning independently of upstream releases.

## [1.0.2] - 2024-09-15

### Added

- Publish generated TypeScript declarations through the package's `types` entry.

### Changed

- **Breaking:** Migrate bindings and theme integration to Tweakpane 4 and declare a `tweakpane: ^4.0.0` peer requirement.
- **Breaking:** Replace UMD builds and the `plugin` export with ES modules exporting `id`, `css`, and `plugins`.
- **Breaking:** Rename the published package to `@kitschpatrol/tweakpane-plugin-thumbnail-list`.
- **Breaking:** Externalize `@tweakpane/core` as a declared runtime dependency; direct browser imports now require an import map to resolve it.
- **Breaking:** Declare a Node.js 18+ package engine requirement.

### Fixed

- Correct package entry-point resolution and artifact naming for the scoped package.
- Write the selected identifier to the bound property instead of its thumbnail object, and safely write `undefined` for an empty selection.

### Documentation

- Explain the fork, scoped package name, externalized dependencies, and browser import-map setup, with links to npm and upstream documentation.

### Maintenance

- Modernize build and lint tooling with Rollup 4, TypeScript 5.6, Prettier 3, and Dart Sass, and adopt pnpm for development.
- Add scripted versioning/npm publication and GitHub workflows for releases and repository metadata synchronization.

## [0.3.0] - 2021-07-19

### Changed

- **Breaking:** Require a separate `text` label on every option, keeping `value` as its unique identifier.
- Show an empty inline label when no thumbnail is selected.

### Documentation

- Document option properties, demonstrate separate labels and identifiers, and clarify the API's experimental status.

## [0.2.0] - 2021-07-18

### Added

- Add a selectable `None` option with a checkerboard thumbnail so selections can be cleared.
- Preserve application-specific option metadata through an optional `data` property.

### Changed

- **Breaking:** Resolve unmatched identifiers to no selection (`null`) instead of falling back to the first option.

### Documentation

- Update usage examples for option metadata and demonstrate handling cleared selections.
- Use an absolute preview image URL so the screenshot renders in the npm README.

## [0.1.2] - 2021-07-18

### Changed

- Give the dropdown a higher stacking order and a themed shadow.

### Documentation

- Add a README preview screenshot and refine the browser demonstration with larger images and full-page background previews.

### Maintenance

- Remove the `start` script in favor of the existing `watch` development command.

## [0.1.1] - 2021-07-18

### Maintenance

- Automate production builds, Git pushes, and npm publishing through version lifecycle scripts.

## [0.1.0] - 2021-07-18

### Added

- Add a Tweakpane 3 `thumbnail-list` input that maps string identifiers to image options and exposes selected thumbnail objects through change events.
- Show the current thumbnail inline and provide a scrollable dropdown with selection highlighting and click-outside dismissal.
- Inherit Tweakpane themes and support CSS variables for dropdown width, maximum height, and thumbnail size.
- Provide the `plugin` export and regular/minified UMD builds for package imports and browser registration as `TweakpaneThumbnailListPlugin`.

### Documentation

- Document browser/package installation, option configuration, change events, CSS theming, and contributor setup with a runnable browser example.

### Maintenance

- Set up TypeScript/Sass builds, linting and formatting, watch mode, and versioned release archives.

[0.1.0]: https://github.com/kitschpatrol/tweakpane-plugin-thumbnail-list/releases/tag/v0.1.0
[0.1.1]: https://github.com/kitschpatrol/tweakpane-plugin-thumbnail-list/compare/v0.1.0...v0.1.1
[0.1.2]: https://github.com/kitschpatrol/tweakpane-plugin-thumbnail-list/compare/v0.1.1...v0.1.2
[0.2.0]: https://github.com/kitschpatrol/tweakpane-plugin-thumbnail-list/compare/v0.1.2...v0.2.0
[0.3.0]: https://github.com/kitschpatrol/tweakpane-plugin-thumbnail-list/compare/v0.2.0...v0.3.0
[1.0.2]: https://github.com/kitschpatrol/tweakpane-plugin-thumbnail-list/compare/v0.3.0...1.0.2
[1.0.3]: https://github.com/kitschpatrol/tweakpane-plugin-thumbnail-list/compare/1.0.2...1.0.3
[1.0.4]: https://github.com/kitschpatrol/tweakpane-plugin-thumbnail-list/compare/1.0.3...1.0.4
[1.0.5-fork.1]: https://github.com/kitschpatrol/tweakpane-plugin-thumbnail-list/compare/1.0.4...1.0.5-fork.1
[1.0.5-fork.2]: https://github.com/kitschpatrol/tweakpane-plugin-thumbnail-list/compare/1.0.5-fork.1...1.0.5-fork.2
