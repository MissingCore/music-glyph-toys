import MusicGlyphToys from './MusicGlyphToys';

//#region Events
export const Event = MusicGlyphToys.getConstants().GlyphButtonEvent;
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

export const isDeviceSupported =
  MusicGlyphToys.getConstants().isDeviceSupported;
