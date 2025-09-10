import * as GlyphButton from './GlyphButton';
import MusicGlyphToys from './MusicGlyphToys';

export * from './constants';

export function setUpToy() {
  return MusicGlyphToys.setUpToy();
}

export function getDeviceInfo() {
  return MusicGlyphToys.getDeviceInfo();
}

export function setMatrixArtwork(uri: string) {
  return MusicGlyphToys.setMatrixArtwork(uri);
}

export { GlyphButton };
