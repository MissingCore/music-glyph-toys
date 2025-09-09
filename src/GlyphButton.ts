import { DeviceEventEmitter } from 'react-native';

import MusicGlyphToys from './MusicGlyphToys';
import type { Event, EventPayloadByEvent } from './constants/Event';

//#region Events
const emitter = DeviceEventEmitter;

export function addEventListener<T extends Event>(
  event: T,
  listener: EventPayloadByEvent[T] extends never
    ? () => void
    : (event: EventPayloadByEvent[T]) => void
) {
  return emitter.addListener(event, listener);
}

export function triggerEvent<T extends Event>(event: T) {
  return MusicGlyphToys.testEvent(event);
}
//#endregion

const { isDeviceSupported } = MusicGlyphToys.getConstants();

export { isDeviceSupported };
