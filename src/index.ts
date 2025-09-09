import * as GlyphButton from './GlyphButton';
import MusicGlyphToys from './MusicGlyphToys';

import { Event } from './constants/Event';

export function getDeviceInfo() {
  return MusicGlyphToys.getDeviceInfo();
}

export function setMatrixArtwork(uri: string) {
  return MusicGlyphToys.setMatrixArtwork(uri);
}

export { GlyphButton, Event };
