# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Maintenance

- Update the development package manager to pnpm 12.16.1.
- Update GitHub release actions and retrieve npm publishing one-time passwords through the 1Password CLI.

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

[Unreleased]: https://github.com/kitschpatrol/tweakpane-plugin-thumbnail-list/compare/1.0.5-fork.1...HEAD
[0.1.0]: https://github.com/kitschpatrol/tweakpane-plugin-thumbnail-list/releases/tag/v0.1.0
[0.1.1]: https://github.com/kitschpatrol/tweakpane-plugin-thumbnail-list/compare/v0.1.0...v0.1.1
[0.1.2]: https://github.com/kitschpatrol/tweakpane-plugin-thumbnail-list/compare/v0.1.1...v0.1.2
[0.2.0]: https://github.com/kitschpatrol/tweakpane-plugin-thumbnail-list/compare/v0.1.2...v0.2.0
[0.3.0]: https://github.com/kitschpatrol/tweakpane-plugin-thumbnail-list/compare/v0.2.0...v0.3.0
[1.0.2]: https://github.com/kitschpatrol/tweakpane-plugin-thumbnail-list/compare/v0.3.0...1.0.2
[1.0.3]: https://github.com/kitschpatrol/tweakpane-plugin-thumbnail-list/compare/1.0.2...1.0.3
[1.0.4]: https://github.com/kitschpatrol/tweakpane-plugin-thumbnail-list/compare/1.0.3...1.0.4
[1.0.5-fork.1]: https://github.com/kitschpatrol/tweakpane-plugin-thumbnail-list/compare/1.0.4...1.0.5-fork.1
