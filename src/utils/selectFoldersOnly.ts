import generateMarkDownTree from "./generateMarkDownTree";
import getFileTypeFromPath from "./getFileTypeFromPath";
import { Core } from "../tree/types";

/**  Will be the MarkDownTree with only Folders
 * @param {Core[]} treeCore  The whole MarkDownTree
 * @returns {string} the MarkDownTree with only Folders
 */

const generateTreeCore = (treeCore: Core[]): Core[] => {
  const foldersOnlyAsLines: Core[] = [];

  treeCore.forEach((core) => {
    const coreType = getFileTypeFromPath(core.path);
    if (coreType === "FOLDER") {
      if (core.treeCore) {
        core.treeCore = generateTreeCore(core.treeCore);
      }
      foldersOnlyAsLines.push(core);
    }
  });
  return foldersOnlyAsLines;
};

export const selectFoldersOnly = (treeCore: Core[]): string[] => {
  const foldersOnly: Core[] = generateTreeCore(treeCore);

  const selectFoldersOnly = generateMarkDownTree(foldersOnly);
  return selectFoldersOnly;
};
export default selectFoldersOnly;
