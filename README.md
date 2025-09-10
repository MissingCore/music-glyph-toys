# @missingcore/music-glyph-toys

> [!CAUTION]
> This is currently experimental and probably doesn't work as we're trying to have the Glyph Toy communicate to our app, which uses React Native.
>
> - 50% chance of showing up in the "Manage Glyph Toys" screen.
> - <1% chance of working.

## Design Idea

If the toy shows up, you should see a music note being displayed. If this toy ends up working the way we want, we'll then add some logic to render the artwork of the playing track.

- `TOUCH_DOWN`: Play/Pause the playing track.
- `LONG_PRESS`: Skip the current track.

> [!NOTE]
> I think that the `TOUCH_DOWN` would trigger when we try to do `LONG_PRESS`. In that case, we might revise the design to use `TOUCH_DOWN` and change the displayed Glyph Matrix to show the different actions (Play/Pause & Skip) that can be done depending on how long we hold the Glyph Button down.

## Setup

The whole idea is to take advantage of the media service still existing even after dismissing the app from "Recent Tasks" (ie: 1Continue Playback on Dismiss` experiment feature enabled on MissingCore Music), and listen from events triggered by the toy to then tell the media service to do the actions.

1. Make this toy active.
2. Open the app.
3. Things should work?

## References

- https://github.com/Nothing-Developer-Programme/GlyphMatrix-Developer-Kit
- https://github.com/Nothing-Developer-Programme/GlyphMatrix-Example-Project
- https://www.callstack.com/blog/sending-events-to-javascript-from-your-native-module-in-react-native
- https://reactnative.dev/docs/legacy/native-modules-android#sending-events-to-javascript

## License

[AGPL-3.0](./LICENSE)
