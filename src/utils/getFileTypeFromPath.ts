import { FileType } from "../tree/types";

export const getFileTypeFromPath = (path: string): FileType => {
  const count = (path.match(/\./g) || [])
    .length; /* find the amount of periods assuming the path is relative and starts with "./" */

  if (count == 3) {
    /* Length of 3 means 2 dots in the file name -- config file */
    return FileType.CONFIG_FILE;
  } else if (count == 2) {
    /* Length of 2 means 1 dot in the file name -- regular file */
    return FileType.FILE;
  } else if (count == 1) {
    /* Length of 1 means there are no file names in path -- folder */
    return FileType.FOLDER;
  } else {
    /* 0 dots or more than 3 dots means either the path is incorrect or there's an invalid file inputted */
    throw "Path/file not supported!";
  }
};
