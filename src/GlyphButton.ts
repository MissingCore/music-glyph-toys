import MusicGlyphToys from './MusicGlyphToys';

export type { EventPayload } from './NativeMusicGlyphToys';

const { GlyphButtonEvent, MatrixAction, isDeviceSupported } =
  MusicGlyphToys.getConstants();

//#region Events
export const Action = MatrixAction;

export const Event = GlyphButtonEvent;
type GlyphButtonEvent = (typeof Event)[keyof typeof Event];

export const onMount = MusicGlyphToys.onMount;
export const onShortPress = MusicGlyphToys.onShortPress;
export const onLongPress = MusicGlyphToys.onLongPress;
export const onTouchDown = MusicGlyphToys.onTouchDown;
export const onTouchUp = MusicGlyphToys.onTouchUp;

export function triggerEvent<T extends GlyphButtonEvent>(event: T) {
  return MusicGlyphToys.testEvent(event);
}
//#endregion

export const isSupported = isDeviceSupported;
