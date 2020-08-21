import generateMarkDownTree from "../generateMarkDownTree/generateMarkDownTree";
import { Core, FilterType } from "../../tree/types";
import { deepCopyFunction } from "../deepCopyFunction";

const NOT_DELETED = -1;

/** Will generate a treeCore recursively excluding the deletedones
 * @param {Core[]} deepClonedTreeCore - Deep cloned tree Core including the deleted items
 * @returns {Core[]} - Returns the tree Core without the deleted items
 */
export const generateTreeCore = (deepClonedTreeCore: Core[]): Core[] => {
  const visibleCoresAsLines: Core[] = [];
  deepClonedTreeCore.forEach((core) => {
    if (core.deletedOrder === NOT_DELETED) {
      if (core.treeCore) {
        core.treeCore = generateTreeCore(core.treeCore);
      }
      visibleCoresAsLines.push(core);
    }
  });

  return visibleCoresAsLines;
};

/**  Will be the MarkDownTree without the deletedCore's (Any core with deletedOrder > -1)
 * @param {Core[]} treeCore - the whole MarkDownTree
 * @param {FilterType} filter - the type of the filter to generate the tree
 * @returns {string} - the MarkDownTree without the deletedCore's
 */
export const getCopyToClipboardContents = (
  treeCore: Core[],
  filter: FilterType = FilterType.NULL,
  isCollapsible: boolean = true
): string[] => {
  const deepClonedTreeCore = deepCopyFunction(treeCore);
  const visibleTreeCore: Core[] = generateTreeCore(deepClonedTreeCore);
  const copyToClipboardContents = generateMarkDownTree(
    visibleTreeCore,
    filter,
    false,
    treeCore,
    isCollapsible
  );
  return copyToClipboardContents;
};

export default getCopyToClipboardContents;
