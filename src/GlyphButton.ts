import MusicGlyphToys from './MusicGlyphToys';

//#region Events
export const onMount = MusicGlyphToys.onMount;
export const onShortPress = MusicGlyphToys.onShortPress;
export const onLongPress = MusicGlyphToys.onLongPress;
export const onTouchDown = MusicGlyphToys.onTouchDown;
export const onTouchUp = MusicGlyphToys.onTouchUp;
//#endregion

export const isSupported = MusicGlyphToys.getConstants().isDeviceSupported;
