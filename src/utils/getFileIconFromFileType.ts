import { FileType } from '../tree/types';

/** 1-to-1 maps a given file type to an Icon type, returning an emoji that
 * corresponds to the specific file type
 * @param {FileType} fileType - a type a file such as FileType.FILE, FileType.FOLDER,
 * or FileType.CONFIG_FILE
 * @returns {Icon} - an emoji passed into a string depending on which file
 * type was found (FILE, CONFIG_FILE, or FOLDER)
 */

export enum Icon {
  FOLDER = '📂',
  FILE = '📄',
  CONFIG_FILE = '📜',
}

const formatEmojiString = (icon: Icon): Icon => {
  /* Adds one space after emoji so that it doesn't stick together
  with the next phrase or delete a character */
  const formattedEmojiString = `${icon} `;
  const formatEmojiToIcon: Icon = formattedEmojiString as Icon;
  return formatEmojiToIcon;
};

export const getFileIconFromFileType = (fileType: FileType):
Icon => formatEmojiString(Icon[fileType]);

export default getFileIconFromFileType;
