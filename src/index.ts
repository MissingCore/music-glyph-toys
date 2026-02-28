import * as GlyphButton from './GlyphButton';
import MusicGlyphToys from './MusicGlyphToys';
import type { EventPayload } from './NativeMusicGlyphToys';

//#region Glyph Toy
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
//#endregion

//#region Constants & Types
const { GlyphButtonEvent, MatrixAction } = MusicGlyphToys.getConstants();

type GlyphButtonEvent =
  (typeof GlyphButtonEvent)[keyof typeof GlyphButtonEvent];
type MatrixAction = (typeof MatrixAction)[keyof typeof MatrixAction];

export type { EventPayload };
export { GlyphButtonEvent, MatrixAction };
//#endregion

//#region Debugging
/** @deprecated Primarily for debugging. */
export function getDeviceInfo() {
  return MusicGlyphToys.getDeviceInfo();
}

/** Used to test the exported event listeners. */
export function triggerEvent<T extends GlyphButtonEvent>(
  event: T,
  tag?: string,
  action?: MatrixAction
) {
  return MusicGlyphToys.testEvent(event, tag, action);
}
//#endregion

export { GlyphButton };
