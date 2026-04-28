import {
  GlyphButton,
  GlyphButtonEvent,
  GlyphToy,
  MatrixAction,
  triggerEvent,
} from '@missingcore/music-glyph-toys';
import AudioBrowser from 'react-native-audio-browser';

import { dataStore } from './services/DataStore';
import { MusicControls } from './services/MusicControls';
import { setPlayerOptions } from './utils/react-native-audio-browser';

async function initServices() {
  console.warn('[InitServices] Initializing services...');
  GlyphToy.connect();

  //? Seems like we can setup the playback service in the background/headlessly.
  await AudioBrowser.setupPlayer();
  AudioBrowser.updateOptions(setPlayerOptions());
  AudioBrowser.setRepeatMode('queue');

  //#region Glyph Toy Events
  GlyphButton.onMount(({ tag }) => {
    console.log(`[MOUNT Event] Triggered by: "${tag}"`);
    // When this gets fired by the Glyph Matrix service, ensure that we have
    // a valid connection in the Turbo Module.
    GlyphToy.connect();
  });

  GlyphButton.onTouchUp(async ({ tag, action }) => {
    console.log(
      `[TOUCH_UP Event] Triggered by: "${tag}" with action "${String(action)}"`
    );

    if (action === MatrixAction.PLAY_PAUSE) await MusicControls.playToggle();
    if (action === MatrixAction.SKIP) await MusicControls.next();
  });
  //#endregion

  //#region Media Events
  AudioBrowser.handleRemotePlay(MusicControls.play);
  AudioBrowser.handleRemotePause(MusicControls.pause);
  AudioBrowser.handleRemoteNext(() => {
    triggerEvent(GlyphButtonEvent.TOUCH_UP, 'notification', MatrixAction.SKIP);
  });
  AudioBrowser.handleRemotePrevious(MusicControls.prev);
  AudioBrowser.handleRemoteSeek(async ({ position }) => {
    await MusicControls.seekTo(position);
  });

  AudioBrowser.onActiveTrackChanged.addListener(async (e) => {
    dataStore.setState({ activeTrack: e.track ?? null });
    if (e.track?.artwork) GlyphToy.setMatrixArtwork(e.track.artwork);
    console.log('[Now Playing]', e.track?.title);
  });

  AudioBrowser.onPlaybackError.addListener(async ({ error: e }) => {
    // When this event is called, `AudioBrowser.getActiveTrack()` should
    // contain the track that caused the error.
    const erroredTrack = AudioBrowser.getActiveTrack();
    console.log(`[${e?.code}] ${e?.message}`, erroredTrack);
  });
  //#endregion
}

export const onAppStartUpInit = initServices();
