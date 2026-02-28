# @missingcore/music-glyph-toys

> [!CAUTION]
> This is currently experimental and probably doesn't work as we're trying to have the Glyph Toy communicate with our app, which uses React Native.
>
> - 80% chance of showing up in the "Manage Glyph Toys" screen & displaying a music note when selected.
> - <1% chance of working.

## Toy Design & Usage

Given that the toy shows up on the Glyph Matrix screen, you should see a music note in the default state.

Actions that can be done by this toy are handled by holding down the Glyph Button for a certain period of time and then releasing. The Glyph Matrix will change to display an icon representing the actions below:

- **Release in first `500ms`:** Does Nothing
- **Release after `500ms`:** Play/Pause
- **Release after `3.5s`:** Skip

> **Note:** If this toy ends up working, then we'll later add some logic to display the artwork of the playing track.

### Testing With Demo App

The implementation to allow interaction with the React Native app with this toy relies on the app working "headlessly" while still listening to events emitted by the toy. Meaning this will only work when the media service still exists even after dismissing the app from "Recent Tasks" (ie: `Continue Playback on Dismiss` experimental feature enabled in MissingCore Music).

The demo app can be found in this repository's [`Releases`](https://github.com/MissingCore/music-glyph-toys/releases). The app will find & save the minimum amount of metadata for the first 20 tracks found. It'll have a simple UI to select the track to be played along with play/pause/skip/prev functionalities.

Getting the toy to work should be as follows:

1. Add the toy via the Glyph Toys Manager.
2. Set this toy as active.
3. Open the demo app (this should set up the media notification and create a link with the Glyph Toy).
4. The actions mentioned above should work?

> [!IMPORTANT]
> Since playback will continue when you dismiss the app from "Recent Tasks", you'll need to force-stop the app (or pause the media via the notification) to stop music playback.
>
> If you force-stop the app, then you'll need to redo the steps above to get things working again?

## References

- https://github.com/Nothing-Developer-Programme/GlyphMatrix-Developer-Kit
- https://github.com/Nothing-Developer-Programme/GlyphMatrix-Example-Project
- https://www.callstack.com/blog/sending-events-to-javascript-from-your-native-module-in-react-native
- https://reactnative.dev/docs/legacy/native-modules-android#sending-events-to-javascript

## License

[AGPL-3.0](./LICENSE)
