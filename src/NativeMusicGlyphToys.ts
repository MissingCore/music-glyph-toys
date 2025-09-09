import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getDeviceInfo(): Promise<{ model: string; manufacturer: string }>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('MusicGlyphToys');
