import type { AddTrack } from '@weights-ai/react-native-track-player';
import TrackPlayer, { State } from '@weights-ai/react-native-track-player';

import { dataStore } from './DataStore';
import { getIsPlaying } from '../hooks/useIsPlaying';

export class MusicControls {
  /** Play the current track. */
  static async play() {
    await loadRNTPQueue();
    await TrackPlayer.play();
  }

  /** Pause the current playing track. */
  static async pause() {
    await TrackPlayer.pause();
  }

  /** Stop & unload the current playing track (stops loading/buffering). */
  static async stop() {
    await TrackPlayer.stop();
  }

  /** Toggle `isPlaying`, playing or pausing the current track. */
  static async playToggle() {
    if (await getIsPlaying()) await MusicControls.pause();
    else await MusicControls.play();
  }

  /** Play the previous track. */
  static async prev() {
    await loadRNTPQueue();
    await TrackPlayer.skipToPrevious();
  }

  /** Play the next track. */
  static async next() {
    await loadRNTPQueue();
    await TrackPlayer.skipToNext();
  }

  /** Skip to specific track. */
  static async skipTo(track: AddTrack) {
    await loadRNTPQueue();
    const { tracks, activeTrack } = dataStore.getState();
    dataStore.setState({ activeTrack: track });
    if (activeTrack?.id !== track.id) {
      const newIndex = tracks.findIndex(({ id }) => track.id === id);
      if (newIndex !== -1) await TrackPlayer.skip(newIndex, 0);
    }
    await TrackPlayer.play();
  }

  /** Seek to a certain position in the current playing track. */
  static async seekTo(position: number) {
    await loadRNTPQueue();
    await TrackPlayer.seekTo(position);
  }
}

//#region Internal Helpers
async function isLoaded() {
  try {
    return (await TrackPlayer.getPlaybackState()).state !== State.None;
  } catch {
    return false;
  }
}

async function loadRNTPQueue() {
  if (await isLoaded()) return;
  const { tracks, activeTrack } = dataStore.getState();
  await TrackPlayer.add(tracks);
  if (activeTrack) {
    const trackIndex = tracks.findIndex(({ id }) => activeTrack.id === id);
    if (trackIndex !== -1) await TrackPlayer.skip(trackIndex);
  }
}
//#endregion
