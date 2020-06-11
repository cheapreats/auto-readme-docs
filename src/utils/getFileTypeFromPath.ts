import { FileType } from "../tree/types";

/**
 * @function
 * @param {string} path
 * @returns FileType
 * @description using inputted relative GitHub path, get the FileType of the path depending on how many dots are found in the string
 */

export const getFileTypeFromPath = (path: string): FileType => {
  // Count amount of periods assuming the path is relative and starts with "./"
  const numberOfDots = (path.match(/\./g) || []).length;

  const configNumberOfDots = 3;
  const fileNumberOfDots = 2;
  const folderNumberOfDots = 1;

  if (numberOfDots == configNumberOfDots) {
    // Length of 3 means 2 dots in the file name -- config file
    return FileType.CONFIG_FILE;
  } else if (numberOfDots == fileNumberOfDots) {
    // Length of 2 means 1 dot in the file name -- regular file
    return FileType.FILE;
  } else if (numberOfDots == folderNumberOfDots) {
    // Length of 1 means there are no file names in path -- folder */
    return FileType.FOLDER;
  } else {
    // 0 dots or more than 3 dots means either the path or file invalid
    throw "Path/file not supported!";
  }
};
