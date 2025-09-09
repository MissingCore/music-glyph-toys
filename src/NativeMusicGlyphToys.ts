import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  readonly getConstants: () => {
    isDeviceSupported: boolean;
  };

  getDeviceInfo(): Promise<{ model: string; manufacturer: string }>;

  setMatrixArtwork(uri: String): Promise<boolean>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('MusicGlyphToys');
