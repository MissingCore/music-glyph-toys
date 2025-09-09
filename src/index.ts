import MusicGlyphToys from './MusicGlyphToys';

export function getDeviceInfo() {
  return MusicGlyphToys.getDeviceInfo();
}

export function setMatrixArtwork(uri: string) {
  return MusicGlyphToys.setMatrixArtwork(uri);
}

export function setPlaybackHandlers(callbacks: {
  onPlayPause: () => void;
  onSkip: () => void;
}) {
  return MusicGlyphToys.setPlaybackHandlers(
    callbacks.onPlayPause,
    callbacks.onSkip
  );
}

const { isDeviceSupported } = MusicGlyphToys.getConstants();

export { isDeviceSupported };
