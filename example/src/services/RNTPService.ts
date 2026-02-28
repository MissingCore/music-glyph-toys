import {
  GlyphButton,
  GlyphButtonEvent,
  MatrixAction,
  triggerEvent,
} from '@missingcore/music-glyph-toys';
import TrackPlayer, { Event } from '@weights-ai/react-native-track-player';

import { dataStore } from './DataStore';
import { MusicControls } from './MusicControls';

/** How we handle the actions in the media control notification. */
export async function PlaybackService() {
  GlyphButton.onMount(({ tag }) => {
    console.log(`[MOUNT Event] Triggered by: "${tag}"`);
  });

  GlyphButton.onTouchUp(async ({ tag, action }) => {
    console.log(
      `[TOUCH_UP Event] Triggered by: "${tag}" with action "${String(action)}"`
    );

    if (action === MatrixAction.PLAY_PAUSE) await MusicControls.playToggle();
    if (action === MatrixAction.SKIP) await MusicControls.next();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, async () => {
    await MusicControls.play();
  });

  TrackPlayer.addEventListener(Event.RemotePause, async () => {
    await MusicControls.pause();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, async () => {
    triggerEvent(GlyphButtonEvent.TOUCH_UP, 'notification', MatrixAction.SKIP);
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
    await MusicControls.prev();
  });

  TrackPlayer.addEventListener(Event.RemoteSeek, async ({ position }) => {
    await MusicControls.seekTo(position);
  });

  TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, async (e) => {
    dataStore.setState({ activeTrack: e.track ?? null });
    console.log('[Now Playing]', e.track?.title);
  });

  TrackPlayer.addEventListener(Event.PlaybackError, async (e) => {
    // When this event is called, `TrackPlayer.getActiveTrack()` should
    // contain the track that caused the error.
    const erroredTrack = await TrackPlayer.getActiveTrack();
    console.log(`[${e.code}] ${e.message}`, erroredTrack);
  });
}
