import {
  GlyphButton,
  Event as GlyphButtonEvent,
} from '@missingcore/music-glyph-toys';
import TrackPlayer, { Event } from '@weights-ai/react-native-track-player';

import { dataStore } from './DataStore';
import { MusicControls } from './MusicControls';

/** How we handle the actions in the media control notification. */
export async function PlaybackService() {
  GlyphButton.addEventListener(GlyphButtonEvent.LONG_PRESS, async ({ tag }) => {
    console.log(`${GlyphButtonEvent.LONG_PRESS} event triggered by: ${tag}`);
    if (tag !== 'test') await MusicControls.next();
  });

  GlyphButton.addEventListener(GlyphButtonEvent.TOUCH_DOWN, async ({ tag }) => {
    console.log(`${GlyphButtonEvent.TOUCH_DOWN} event triggered by: ${tag}`);
    if (tag !== 'test') await MusicControls.playToggle();
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

    GlyphButton.triggerEvent(GlyphButtonEvent.LONG_PRESS);
  });

  TrackPlayer.addEventListener(Event.PlaybackError, async (e) => {
    // When this event is called, `TrackPlayer.getActiveTrack()` should
    // contain the track that caused the error.
    const erroredTrack = await TrackPlayer.getActiveTrack();
    console.log(`[${e.code}] ${e.message}`, erroredTrack);
  });
}
