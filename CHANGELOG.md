# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
## Added
- Added ember-cli-yuidoc, yuidoc-ember-theme, yuidoc documentation.

## [0.2.0]
### Added
- Added `jsconfig.json`.
- Added `.prettierrc`
- Added page not found (WIP).
- Added OAuth with Google.
- Added ember-file-upload, ember-simple-auth, ember-auto-import and torii addons.
- Added service GoogleVision with methods `analyzeAttachFile` and `analyzeFileFromCloudStorage`.
- Added @ember/edition-utils@^1.1.1 package.
- Added @glimmer/component@^1.0.0-beta.1 package.
- Added `setEdition("octane");` in `.ember-cli.js`.
- Added this CHANGELOG.
- Added favicon.

### Changed
- Enabled template-only-glimmer-components feature.
- Disabled application-template-wrapper feature.
- Replace ember-qunit and qunit-dom for ember-mocha, ember-cli-chai and chai-dom.

### Removed
- Removed ember-data package.
- Removed ember-welcome-page package.
