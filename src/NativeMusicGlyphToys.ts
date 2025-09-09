import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  readonly getConstants: () => {
    isDeviceSupported: boolean;
  };

  getDeviceInfo(): Promise<{ model: string; manufacturer: string }>;

  setMatrixArtwork(uri: String): Promise<boolean>;

  //#region Events
  testEvent(event: String): void;

  // Below functions are required for RN built-in NativeEventEmitter calls.
  addListener(event: string): void;
  removeListeners(count: number): void;
  //#endregion
}

export default TurboModuleRegistry.getEnforcing<Spec>('MusicGlyphToys');
