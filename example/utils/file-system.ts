import { Directory, Paths } from 'expo-file-system/next';

/** Internal app directory where we store images. */
export const ImageDirectory = Paths.join(Paths.document, 'images');

/** Creates "image" directory if it doesn't already exist. */
export function createImageDirectory() {
  const imgDir = new Directory(ImageDirectory);
  if (!imgDir.exists) imgDir.create();
}
