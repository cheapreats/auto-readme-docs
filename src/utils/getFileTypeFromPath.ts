import { FileType } from '../tree/types';

/** Outputs the file type of a certain path
 * @param {string} path the path of a specific file or folder
 * @returns {FileType} file type such as .FILE, .CONFIG_FILE, or .FOLDER
 */

export const getFileTypeFromPath = (path: string): FileType => {
  // Count amount of periods in the path
  const numberOfDotsInPath = (path.match(/\./g) || []).length;
  const forwardSlashPathFilter = path.split('/');

  const configNumberOfDots = 2; // number of dots in a config file path
  const fileNumberOfDots = 1; // number of dots in a regular file path
  const folderNumberOfDots = 0; // number of dots in a folder path

  if (
    numberOfDotsInPath >= folderNumberOfDots
    && numberOfDotsInPath <= configNumberOfDots
  ) {
    for ( // Traverse through the forwardSlashPathFilter array to look for invalid path
      let filteredPathIndex = 0;
      filteredPathIndex < forwardSlashPathFilter.length;
      filteredPathIndex++
    ) {
      if (
        forwardSlashPathFilter[filteredPathIndex] === '.'
        || (forwardSlashPathFilter[filteredPathIndex] === ''
        && filteredPathIndex < forwardSlashPathFilter.length - 1)
        || forwardSlashPathFilter[filteredPathIndex].charAt(
          forwardSlashPathFilter[filteredPathIndex].length - 1,
        ) === '.'
      ) {
        throw new Error('Path/file is invalid!');
      }
    }

    if (numberOfDotsInPath === configNumberOfDots) {
      // Length of 2 means 2 dots in the file name -- config file
      return FileType.CONFIG_FILE;
    }
    if (numberOfDotsInPath === fileNumberOfDots) {
      // Length of 1 means 1 dot in the file name -- regular file
      return FileType.FILE;
    }
    if (numberOfDotsInPath === folderNumberOfDots) {
      // Length of 0 means there are no file names in path -- folder
      return FileType.FOLDER;
    }
  }

  throw new Error('Path/file is invalid!');
};

export default getFileTypeFromPath;
