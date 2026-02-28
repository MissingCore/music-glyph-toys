import { Platform } from 'react-native';

import type { Spec } from './NativeMusicGlyphToys';

const LINKING_ERROR =
  `The package '@missingcore/music-glyph-toys' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({
    ios: '- This package does not support iOS.\n',
    default: '',
  }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const MusicGlyphToysModule = require('./NativeMusicGlyphToys').default;

const MusicGlyphToys = MusicGlyphToysModule
  ? MusicGlyphToysModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export default MusicGlyphToys as Spec;
