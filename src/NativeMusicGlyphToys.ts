import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getDeviceInfo(): Promise<{ model: string; manufacturer: string }>;

  setMatrixArtwork(uri: String): Promise<boolean>;

  setPlaybackHandlers(playPauseCB: () => void, skipCB: () => void): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('MusicGlyphToys');
