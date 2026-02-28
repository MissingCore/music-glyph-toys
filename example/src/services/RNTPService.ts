import { GlyphButton, Action } from '@missingcore/music-glyph-toys';
import TrackPlayer, { Event } from '@weights-ai/react-native-track-player';

import { dataStore } from './DataStore';
import { MusicControls } from './MusicControls';

/** How we handle the actions in the media control notification. */
export async function PlaybackService() {
  GlyphButton.onMount(({ tag }) => {
    console.log(`${GlyphButton.Event.MOUNT} event triggered by: ${tag}`);
  });

  GlyphButton.onTouchUp(async ({ tag, action }) => {
    console.log(
      `${GlyphButton.Event.TOUCH_UP} event triggered by: ${tag} for ${String(
        action
      )}`
    );

    if (action === Action.PLAY_PAUSE) await MusicControls.playToggle();
    if (action === Action.SKIP) await MusicControls.next();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, async () => {
    await MusicControls.play();
  });

  TrackPlayer.addEventListener(Event.RemotePause, async () => {
    await MusicControls.pause();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, async () => {
    await MusicControls.next();
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
    await MusicControls.prev();
  });

  TrackPlayer.addEventListener(Event.RemoteSeek, async ({ position }) => {
    await MusicControls.seekTo(position);
  });

  TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, async (e) => {
    dataStore.setState({ activeTrack: e.track ?? null });
    console.log('Playing:', e.track);

    GlyphButton.triggerEvent(GlyphButton.Event.TOUCH_UP);
  });

  TrackPlayer.addEventListener(Event.PlaybackError, async (e) => {
    // When this event is called, `TrackPlayer.getActiveTrack()` should
    // contain the track that caused the error.
    const erroredTrack = await TrackPlayer.getActiveTrack();
    console.log(`[${e.code}] ${e.message}`, erroredTrack);
  });
}
