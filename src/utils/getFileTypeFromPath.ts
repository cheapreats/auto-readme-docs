import { FileType } from '../tree/types';

/** Outputs the file type of a certain path
 * @param {string} path the path of a specific file or folder
 * @returns {FileType} file type such as .FILE, .CONFIG_FILE, or .FOLDER
 * @description using inputted relative GitHub path, get file type of path
 */

export const getFileTypeFromPath = (path: string): FileType => {
  // Count amount of periods assuming the path is relative and starts with "./"
  const numberOfDotsInPath = (path.match(/\./g) || []).length;

  const configNumberOfDots = 3; // number of dots in a config file path
  const fileNumberOfDots = 2; // number of dots in a regular file path
  const folderNumberOfDots = 1; // number of dots in a folder path

  if (numberOfDotsInPath === configNumberOfDots) {
    // Length of 3 means 2 dots in the file name -- config file
    return FileType.CONFIG_FILE;
  } if (numberOfDotsInPath === fileNumberOfDots) {
    // Length of 2 means 1 dot in the file name -- regular file
    return FileType.FILE;
  } if (numberOfDotsInPath === folderNumberOfDots) {
    // Length of 1 means there are no file names in path -- folder
    return FileType.FOLDER;
  }

  throw new Error('Path/file is invalid!');
};

export default getFileTypeFromPath;
