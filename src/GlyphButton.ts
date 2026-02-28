import MusicGlyphToys from './MusicGlyphToys';

//#region Events
export const onMount = MusicGlyphToys.onMount;
/** @deprecated Currently unused. */
export const onShortPress = MusicGlyphToys.onShortPress;
/** @deprecated Currently unused. */
export const onLongPress = MusicGlyphToys.onLongPress;
/** @deprecated Currently unused. */
export const onTouchDown = MusicGlyphToys.onTouchDown;
export const onTouchUp = MusicGlyphToys.onTouchUp;
//#endregion

export const isSupported = MusicGlyphToys.getConstants().isDeviceSupported;
