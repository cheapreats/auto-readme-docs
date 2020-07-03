import getFileTypeFromPath from "./getFileTypeFromPath";
import { Core, FileType } from "../tree/types";

/**  Will be the MarkDownTree with only Folders
 * @param {Core[]} treeCore  The whole MarkDownTree
 * @returns {Core[]} the MarkDownTree with only Folders
 */
const typeToShow=FileType.FOLDER;

const generateTreeCore = (treeCore: Core[]): Core[] => {
  const foldersOnlyAsLines: Core[] = [];

  treeCore.forEach((core) => {
    const coreType = getFileTypeFromPath(core.path);
    if (coreType === typeToShow) {
      if (core.treeCore) {
        core.treeCore = generateTreeCore(core.treeCore);
      }
      foldersOnlyAsLines.push(core);
    }
  });
  return foldersOnlyAsLines;
};

export const selectFoldersOnly = (treeCore: Core[]): Core[] => {
  const foldersOnly: Core[] = generateTreeCore(treeCore);
  return foldersOnly;
};
export default selectFoldersOnly;
