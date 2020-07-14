import generateMarkDownTree from "./generateMarkDownTree";
import { Core } from "../tree/types";

/**  Will be the MarkDownTree without the deletedCore's (Any core with deletedOrder > -1)
 * @param {Core[]} treeCore  The whole MarkDownTree
 * @returns {string} the MarkDownTree without the deletedCore's
 */

const NOT_DELETED = -1;

export const generateTreeCore = (treeCore: Core[]): Core[] => {
  const visibleCoresAsLines: Core[] = [];

  treeCore.forEach((core) => {
    if (core.deletedOrder === NOT_DELETED) {
      if (core.treeCore) {
        core.treeCore = generateTreeCore(core.treeCore);
      }
      visibleCoresAsLines.push(core);
    }
  });
  return visibleCoresAsLines;
};

export const getCopyToClipboardContents = (treeCore: Core[]): string[] => {
  const visibleTreeCore: Core[] = generateTreeCore(treeCore);
  const copyToClipboardContents = generateMarkDownTree(visibleTreeCore);
  return copyToClipboardContents;
};
export default getCopyToClipboardContents;
