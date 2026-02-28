import * as GlyphButton from './GlyphButton';
import MusicGlyphToys from './MusicGlyphToys';

/** Create a connection to the Glyph Matrix in order for `setMatrixArtwork` to work. */
export function setUpToy() {
  return MusicGlyphToys.setUpToy();
}

/**
 * Get the Glyph Matrix to display the artwork specified by the uri.
 * @deprecated Currently unimplemented.
 */
export async function setMatrixArtwork(uri: string) {
  return MusicGlyphToys.setMatrixArtwork(uri);
}

/** @deprecated Primarily for debugging. */
export function getDeviceInfo() {
  return MusicGlyphToys.getDeviceInfo();
}

export { GlyphButton };
