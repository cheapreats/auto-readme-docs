import { FileType, Icon } from '../tree/types';

/** 1-to-1 maps a given file type to an Icon type, returning an emoji that
 * corresponds to the specific file type
 * @param {FileType} fileType - a type a file such as FileType.FILE, FileType.FOLDER,
 * or FileType.CONFIG_FILE
 * @returns {Icon} - an emoji passed into a string depending on which file
 * type was found (FILE, CONFIG_FILE, or FOLDER)
 */

export const getFileIconFromFileType = (fileType: FileType): Icon => {
  if (fileType === FileType.CONFIG_FILE) {
    // returns '📜' if file type is a config file
    return Icon.CONFIG_FILE;
  }
  if (fileType === FileType.FILE) {
    // returns '📄' if file type is a file
    return Icon.FILE;
  }
  // return '📂' if file type is a folder
  return Icon.FOLDER;
};

export default getFileIconFromFileType;
