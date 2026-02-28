import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
} from '@weights-ai/react-native-track-player';

import { wait } from './promise';

/**
 * Ensure we setup `react-native-track-player` in the foreground in addition
 * to its configurations.
 */
export async function setupPlayer() {
  const setup = async () => {
    try {
      await TrackPlayer.setupPlayer();
      return undefined;
    } catch (_err) {
      const err = _err as Error & { code?: string };
      console.log(`[RNTP Error] ${err.code}`);
      return err.code;
    }
  };

  // `setupPlayer` must be called when app is in the foreground, otherwise,
  // an `'android_cannot_setup_player_in_background'` error will be thrown.
  while ((await setup()) === 'android_cannot_setup_player_in_background') {
    // Timeouts will only execute when the app is in the foreground. If
    // it somehow executes in the background, the promise will be rejected
    // and we'll try this again.
    await wait(1);
  }

  // Repeat mode is needed for the "next" button to show up in the widget
  // if we're on the last track.
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);

  await setPlayerOptions();
}

export async function setPlayerOptions(continuePlaybackOnDismiss = true) {
  await TrackPlayer.updateOptions({
    android: {
      appKilledPlaybackBehavior: continuePlaybackOnDismiss
        ? AppKilledPlaybackBehavior.ContinuePlayback
        : AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
    },
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.SeekTo,
    ],
    compactCapabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
    ],
  });
}
