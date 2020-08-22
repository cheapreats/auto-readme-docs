import getFileTypeFromPath from "../getFileTypeFromPath/getFileTypeFromPath";
import { Core, FileType } from "../../tree/types";

const typeToShow = FileType.FOLDER;

/**  Given the treeCore, filters the files out
 * @param {Core[]} treeCore  The treeCore including files
 * @returns {Core[]} the treeCore with only Folders
 */
const generateTreeCore = (treeCore: Core[]): Core[] => {
  const foldersOnlyAsLines: Core[] = [];
  treeCore.forEach((core) => {
    const isFile = core.treeCore.length ? false : true;
    const coreType = getFileTypeFromPath(core.path, isFile);
    if (coreType === typeToShow) {
      if (core.treeCore) {
        core.treeCore = generateTreeCore(core.treeCore);
      }
      foldersOnlyAsLines.push(core);
    }
  });
  return foldersOnlyAsLines;
};

/**  Filters a TreeCore with only folders
 * @param {Core[]} treeCore  The whole MarkDownTree
 * @returns {Core[] | null} the TreeCore with only Folders
 */
export const selectFoldersOnly = (treeCore: Core[] | null): Core[] | null => {
  if (treeCore) {
    const foldersOnly: Core[] = generateTreeCore(treeCore);
    return foldersOnly;
  }
  return null;
};

export default selectFoldersOnly;
