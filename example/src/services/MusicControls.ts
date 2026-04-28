import type { Track } from 'react-native-audio-browser';
import AudioBrowser from 'react-native-audio-browser';

import { dataStore } from './DataStore';
import { getIsPlaying } from '../hooks/useIsPlaying';

export class MusicControls {
  /** Play the current track. */
  static async play() {
    await loadRNTPQueue();
    AudioBrowser.play();
  }

  /** Pause the current playing track. */
  static async pause() {
    AudioBrowser.pause();
  }

  /** Stop & unload the current playing track (stops loading/buffering). */
  static async stop() {
    AudioBrowser.stop();
  }

  /** Toggle `isPlaying`, playing or pausing the current track. */
  static async playToggle() {
    if (await getIsPlaying()) await MusicControls.pause();
    else await MusicControls.play();
  }

  /** Play the previous track. */
  static async prev() {
    await loadRNTPQueue();
    AudioBrowser.skipToPrevious();
  }

  /** Play the next track. */
  static async next() {
    await loadRNTPQueue();
    AudioBrowser.skipToNext();
  }

  /** Skip to specific track. */
  static async skipTo(track: Track) {
    await loadRNTPQueue();
    const { tracks, activeTrack } = dataStore.getState();
    dataStore.setState({ activeTrack: track });
    if (activeTrack?.src !== track.src) {
      const newIndex = tracks.findIndex(({ src }) => track.src === src);
      if (newIndex !== -1) AudioBrowser.skip(newIndex, 0);
    }
    AudioBrowser.play();
  }

  /** Seek to a certain position in the current playing track. */
  static async seekTo(position: number) {
    await loadRNTPQueue();
    AudioBrowser.seekTo(position);
  }
}

//#region Internal Helpers
async function isLoaded() {
  try {
    return AudioBrowser.getPlayback().state !== 'none';
  } catch {
    return false;
  }
}

async function loadRNTPQueue() {
  if (await isLoaded()) return;
  const { tracks, activeTrack } = dataStore.getState();
  AudioBrowser.add(tracks);
  if (activeTrack) {
    const trackIndex = tracks.findIndex(({ src }) => activeTrack.src === src);
    if (trackIndex !== -1) AudioBrowser.skip(trackIndex);
  }
}
//#endregion
