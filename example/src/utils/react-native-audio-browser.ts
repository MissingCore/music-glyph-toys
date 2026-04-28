export function setPlayerOptions(continuePlaybackOnDismiss = true) {
  return {
    android: {
      appKilledPlaybackBehavior: continuePlaybackOnDismiss
        ? 'continue-playback'
        : 'stop-playback-and-remove-notification',
    },
    capabilities: {
      stop: false,
      jumpForward: false,
      jumpBackward: false,
      favorite: false,
      shuffleMode: false,
      repeatMode: false,
      playbackRate: false,
    },
  } as const;
}
