import generateMarkDownTree from '../generateMarkDownTree/generateMarkDownTree';
import { Core } from '../../tree/types';
import { deepCopyFunction } from '../deepCopyFunction';

/**  Will be the MarkDownTree without the deletedCore's (Any core with deletedOrder > -1)
 * @param {Core[]} treeCore  The whole MarkDownTree
 * @returns {string} the MarkDownTree without the deletedCore's
 */

const NOT_DELETED = -1;

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

export const getCopyToClipboardContents = (
  treeCore: Core[],
  filter: Function | null = null,
): string[] => {
  const deepClonedTreeCore = deepCopyFunction(treeCore);
  const visibleTreeCore: Core[] = generateTreeCore(deepClonedTreeCore);
  const copyToClipboardContents = generateMarkDownTree(visibleTreeCore, filter);
  return copyToClipboardContents;
};
export default getCopyToClipboardContents;
