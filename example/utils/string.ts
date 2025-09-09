/** Removes the file extension from a filename. */
export function removeFileExtension(filename: string) {
  return filename.split('.').slice(0, -1).join('.').trim();
}
