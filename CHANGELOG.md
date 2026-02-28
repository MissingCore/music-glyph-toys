# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project attempts to adhere to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- Rewrite app to use Turbo Native Modules.
- Upgrade example app to Expo SDK 54 & React Native 0.81.

## [0.1.1] - 2025-09-11

### 🛠️ Fixes

- Reference to Glyph Matrix service in `AndroidManifest.xml`.

## [0.1.0] - 2025-09-11

### 🎉 Added

- Initial API to interact with Glyph Toy.
  - `setUpToy()`: Create or get the current instance to the service associated with the Glyph Toy and ensure that events can be emitted.
  - `GlyphButton.addEventListener()`: Create an event listener which listens to events emitted by our Glyph Toy when we use the Glyph Button.
  - `GlyphButton.isSupported`: Boolean indicating whether the Glyph Matrix is supported on the current device.

## [0.0.0] - 2025-09-08

Add section to make `release-it` not complain that this is missing. 2025-09-08 is when we really started working on this repository.

[unreleased]: https://github.com/MissingCore/music-glyph-toys/compare/v0.1.1...HEAD
[0.1.1]: https://github.com/MissingCore/music-glyph-toys/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/MissingCore/music-glyph-toys/releases/tag/v0.1.0
