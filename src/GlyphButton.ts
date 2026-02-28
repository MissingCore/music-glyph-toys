import MusicGlyphToys from './MusicGlyphToys';
import type { Event } from './constants/Event';

//#region Events
const onMount = MusicGlyphToys.onMount;
const onShortPress = MusicGlyphToys.onShortPress;
const onLongPress = MusicGlyphToys.onLongPress;
const onTouchDown = MusicGlyphToys.onTouchDown;
const onTouchUp = MusicGlyphToys.onTouchUp;

export function triggerEvent<T extends Event>(event: T) {
  return MusicGlyphToys.testEvent(event);
}
//#endregion

const { isDeviceSupported } = MusicGlyphToys.getConstants();

export {
  isDeviceSupported,
  onMount,
  onShortPress,
  onLongPress,
  onTouchDown,
  onTouchUp,
};
