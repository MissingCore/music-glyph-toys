# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project attempts to adhere to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2026-03-01

### ❗ Breaking Changes

- Events are now defined by `GlyphButton.onMount/onShortPress/onLongPress/onTouchDown/onTouchUp` instead of `GlyphButton.addEventListener()`.
  - Only `onMount` & `onTouchUp` events are used.
- Changed exports:
  - `GlyphButton.isDeviceSupported` -> `GlyphButton.isSupported`
  - `GlyphButton.triggerEvent()` -> `triggerEvent()`
  - `Action` -> `MatrixAction`
  - `Event` -> `GlyphButtonEvent`
  - `getDeviceInfo()` -> `DeviceInfo`

### ⚡ Changes

- Make `triggerEvent` more versatile (you can now mimic how the function gets called by the service).

### ⚙️ Internal Changes

- Rewrite app to use Turbo Native Modules.
- Upgrade example app to Expo SDK 54 & React Native 0.81.
- New toggle in example app to stop playback when you dismiss the app (preventing the need of manually force-stopping the app).

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

[Unreleased]: https://github.com/MissingCore/music-glyph-toys/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/MissingCore/music-glyph-toys/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/MissingCore/music-glyph-toys/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/MissingCore/music-glyph-toys/releases/tag/v0.1.0
