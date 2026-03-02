import MusicGlyphToys from './MusicGlyphToys';
import type { EventPayload } from './NativeMusicGlyphToys';

type EventEmitter = (
  handler: (params: EventPayload) => void | Promise<void>
) => { remove(): void };

//#region Events
export const onMount: EventEmitter = MusicGlyphToys.onMount;
/** @deprecated Currently unused. */
export const onShortPress: EventEmitter = MusicGlyphToys.onShortPress;
/** @deprecated Currently unused. */
export const onLongPress: EventEmitter = MusicGlyphToys.onLongPress;
/** @deprecated Currently unused. */
export const onTouchDown: EventEmitter = MusicGlyphToys.onTouchDown;
export const onTouchUp: EventEmitter = MusicGlyphToys.onTouchUp;
//#endregion

export const isSupported = MusicGlyphToys.getConstants().isDeviceSupported;
