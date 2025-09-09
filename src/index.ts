import MusicGlyphToys from './MusicGlyphToys';

export function getDeviceInfo() {
  return MusicGlyphToys.getDeviceInfo();
}

export function setMatrixArtwork(uri: string) {
  return MusicGlyphToys.setMatrixArtwork(uri);
}

const { isDeviceSupported } = MusicGlyphToys.getConstants();

export { isDeviceSupported };
