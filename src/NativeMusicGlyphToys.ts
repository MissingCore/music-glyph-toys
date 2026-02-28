import type { CodegenTypes, TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

type Action = 'play-pause' | 'skip';

export type EventPayload = { tag: string; action: Action | null };

type GlyphButtonEventObject = {
  /** Lifecycle Events */
  MOUNT: 'mount';

  /** Glyph Button Events */
  SHORT_PRESS: 'short-press';
  LONG_PRESS: 'long-press';
  TOUCH_DOWN: 'touch-down';
  TOUCH_UP: 'touch-up';
};

export interface Spec extends TurboModule {
  readonly getConstants: () => {
    GlyphButtonEvent: GlyphButtonEventObject;
    isDeviceSupported: boolean;
  };

  setUpToy(): void;

  getDeviceInfo(): Promise<{ model: string; manufacturer: string }>;

  setMatrixArtwork(uri: string): Promise<boolean>;

  //#region Events
  testEvent(event: string): void;

  readonly onMount: CodegenTypes.EventEmitter<EventPayload>;
  readonly onShortPress: CodegenTypes.EventEmitter<EventPayload>;
  readonly onLongPress: CodegenTypes.EventEmitter<EventPayload>;
  readonly onTouchDown: CodegenTypes.EventEmitter<EventPayload>;
  readonly onTouchUp: CodegenTypes.EventEmitter<EventPayload>;
  //#endregion
}

export default TurboModuleRegistry.getEnforcing<Spec>('MusicGlyphToys');
