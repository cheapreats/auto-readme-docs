import { FileType } from '../tree/types';

/** 1-to-1 maps a given file type to an Icon type, returning an emoji that
 * corresponds to the specific file type
 * @param {FileType} fileType - a type a file such as FileType.FILE, FileType.FOLDER,
 * or FileType.CONFIG_FILE
 * @returns {Icon} - an emoji passed into a string depending on which file
 * type was found (FILE, CONFIG_FILE, or FOLDER)
*/

export enum Icon {
  /* Added one space after emoji so that it doesn't stick together
  with the next phrase or delete a character */
  FOLDER = '📂 ',
  FILE = '📄 ',
  CONFIG_FILE = '📜 ',
}

export const getFileIconFromFileType = (fileType: FileType): Icon => Icon[fileType];

export default getFileIconFromFileType;
