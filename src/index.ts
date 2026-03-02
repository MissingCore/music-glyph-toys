import * as GlyphButton from './GlyphButton';
import * as GlyphToy from './GlyphToy';
import MusicGlyphToys from './MusicGlyphToys';
import type { EventPayload } from './NativeMusicGlyphToys';

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
export const DeviceInfo = MusicGlyphToys.getConstants().DeviceInfo;

/** Used to test the exported event listeners. */
export function triggerEvent<T extends GlyphButtonEvent>(
  event: T,
  tag?: string,
  action?: MatrixAction
) {
  return MusicGlyphToys.testEvent(event, tag, action);
}
//#endregion

export { GlyphButton, GlyphToy };
