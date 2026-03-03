# @missingcore/music-glyph-toys

> [!CAUTION]
> This is currently experimental, untested (as I don't own a Nothing Phone 3), and probably doesn't work as we're trying to have the Glyph Toy communicate with the MissingCore Music app, which uses React Native.

## Toy Design & Usage

Given that the toy shows up on the Glyph Matrix screen, you should see a music note in the default state.

This toy supports interactions to mimic media controls (play/pause/skip) for the MissingCore Music app. This is done by holding down the Glyph Button for a certain period of time and then releasing. The Glyph Matrix will change to display an icon representing the actions below:

- **Release during first `500ms`:** Does Nothing
- **Release after `500ms`:** Play/Pause Toggle
- **Release after `3.5s`:** Skip To Next

> [!IMPORTANT]
> This toy requires the MissingCore Music app to be open in the foreground (or running in the background with the `Continue Playback on Dismiss` setting enabled) in order for the interactions to work.
>
> Do note that the `Continue Playback on Dismiss` will cause the following behaviors:
>
> - When **enabled**, stopping media playback will requiring pausing via the media notification or force-stopping the app.
> - When **disabled**, removing the app from "Recent Tasks" will turn off the toy.

### Testing With Demo App

The demo app can be found in this repository's [`Releases`](https://github.com/MissingCore/music-glyph-toys/releases). The app will find & save the minimum amount of metadata for the first 20 tracks found. It'll have a simple UI to select the track to be played along with play/pause/skip/prev functionalities.

Getting the toy to work should be as follows:

1. Add the toy via the Glyph Toys Manager.
2. Set this toy as active.
3. Open the demo app (this should set up the media notification and create a link with the Glyph Toy).
4. The interactions mentioned above should work?

## API

<table>
  <tbody>
    <tr>
      <th colspan="2">GlyphToy Module</th>
    </tr>
    <tr>
      <td><code>GlyphToy.connect()</code></td>
      <td>Create/reuse a connection to the Glyph Toy.</td>
    </tr>
    <tr>
      <td><code>GlyphToy.disconnect()</code></td>
      <td>Disconnect from the Glyph Toy. Should be called before the app is killed.</td>
    </tr>
    <tr>
      <th colspan="2">GlyphButton Module</th>
    </tr>
    <tr>
      <td><code>GlyphButton.onMount()</code></td>
      <td>Called when the service is connected.</td>
    </tr>
    </tr>
    <tr>
      <td><code>GlyphButton.onTouchUp()</code></td>
      <td>Called when a touch event on the Glyph Button is completed.</td>
    </tr>
    <tr>
      <td><code>GlyphButton.isSupported</code></td>
      <td>Indicates if the Glyph Matrix is supported on the current device.</td>
    </tr>
  </tbody>
</table>

## Technical Documentation

We were required to use a [local maven repository](https://github.com/react-native-community/cli/issues/1759#issuecomment-1328260060) to build the app with this library as `Direct local .aar file dependencies are not supported`. This means that we need to add the following to the `build.gradle` file to the React Native apps that use this library:

```groovy
allprojects {
  repositories {
    maven {
      url "$rootDir/../node_modules/@missingcore/music-glyph-toys/android/glyph-matrix-sdk"
    }
  }
}
```

## References

- https://github.com/Nothing-Developer-Programme/GlyphMatrix-Developer-Kit
- https://github.com/Nothing-Developer-Programme/GlyphMatrix-Example-Project
- https://reactnative.dev/docs/the-new-architecture/native-modules-custom-events
- https://developer.android.com/develop/background-work/services/bound-services#Messenger

## License

[AGPL-3.0](./LICENSE)
