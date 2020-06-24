import generateMarkDownTree from "./generateMarkDownTree";
import { Core } from "../tree/types";

/**  Will be the MarkDownTree without the deletedCore's (Any core with deletedOrder > -1)
 * @param {Core[]} treeCore  The whole MarkDownTree
 * @returns {string} the MarkDownTree without the deletedCore's
 */

const generateTreeCore = (treeCore: Core[]): Core[] => {
  const visibleCoresAsLines: Core[] = [];

  treeCore.forEach((core) => {
    if (core.deletedOrder === -1) {
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
