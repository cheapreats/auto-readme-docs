import { FileType } from "../../tree/types";

/** Given an inputted path: analyzes the file type of the path
 * @param {string} path the path of a specific file or folder
 * @param {boolean} isFile boolean to determine if target is folder or a file
 * @returns {FileType} file type such as .FILE, .CONFIG_FILE, or .FOLDER
 */

export const getFileTypeFromPath = (
  path: string,
  isFile: boolean
): FileType => {
  const PATTERN = /^((?![<>:"/\\|?* ])(([a-z0-9\s_@\-^!#$%&+={}\\[\].]*)([/]?)))+[^/.]$/i;
  if (PATTERN.test(path)) {
    if (!isFile) {
      return FileType.FOLDER;
    } else {
      const curDepth = path.match(/\//g)?.length ?? 0;
      const deepestDirName = curDepth
        ? path.substring(path.lastIndexOf("/") + 1)
        : path;

      if (deepestDirName.startsWith(".")) {
        return FileType.CONFIG_FILE;
      } else {
        if (deepestDirName.endsWith(".md")) {
          return FileType.MD_FILE;
        } else {
          return FileType.FILE;
        }
      }
    }
  } else {
    throw new Error("Path is Invalid!");
  }
};

export default getFileTypeFromPath;
