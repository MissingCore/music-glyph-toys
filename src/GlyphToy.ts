import MusicGlyphToys from './MusicGlyphToys';

/** Create/reuse a connection to the Glyph Toy. */
export const connect = MusicGlyphToys.setUpToy;

/** Disconnect from the Glyph Toy. Should be called before the app is killed. */
export const disconnect = MusicGlyphToys.onCleanUp;

/**
 * Get the Glyph Matrix to display the artwork specified by the uri.
 * @deprecated Currently unimplemented.
 */
export const setMatrixArtwork = MusicGlyphToys.setMatrixArtwork;
