import { getPlayingState, usePlayingState } from 'react-native-audio-browser';
import { useMemo } from 'react';

export function useIsPlaying() {
  const { playing } = usePlayingState();
  return useMemo(() => playing ?? false, [playing]);
}

export async function getIsPlaying() {
  return getPlayingState().playing ?? false;
}
