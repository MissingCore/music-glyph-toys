import {
  MetadataPresets,
  SaveFormat,
  getMetadata,
  saveArtwork,
} from '@missingcore/react-native-metadata-retriever';
import { Directory, File } from 'expo-file-system';
import { getAssetsAsync } from 'expo-media-library';

import { ImageDirectory } from '../utils/file-system';
import { isFulfilled } from '../utils/promise';
import { removeFileExtension } from '../utils/string';

/** Save a small fraction of the user's library. */
export async function getSampleData() {
  const { assets } = await getAssetsAsync({ first: 20, mediaType: 'audio' });

  const metadataInfo = await Promise.allSettled(
    assets.map(async ({ id, uri, duration, filename }) => {
      const t = await getMetadata(uri, MetadataPresets.minimum);
      const title = t.title?.trim() || removeFileExtension(filename);
      const artist = t.artist?.trim() || 'No Artist';

      const artworkUri = await saveArtwork(uri, {
        compress: 0.85,
        format: SaveFormat.WEBP,
      });
      let artwork: string | undefined;
      // Move file to more permanent location.
      if (artworkUri) {
        const finalLocation = new File(artworkUri);
        finalLocation.move(new Directory(ImageDirectory));
        artwork = finalLocation.uri;
      }

      return { id, title, artist, duration, url: uri, artwork };
    })
  );

  return metadataInfo.filter(isFulfilled).map(({ value }) => value);
}
