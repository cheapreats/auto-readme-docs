import { Core } from '../tree/types';

/**
 * @param {Core[]} treeCore - entire tree that is input for analysis
 * @param {number} depthLevel - level of nesting in the treeCore
 * @param {number} depthLevelCounter - set to 0 by default meaning root
 * treeCore
 * @returns {number} - the largest path length in the level such that
 * comments can be aligned accordingly
 */

export const getLargestPathLengthInLevel = (
  treeCore: Core[],
  depthLevel: number,
  depthLevelCounter: number = 0,
): number => {
  /* Default largestPathLengthInLevel is set to 0 indicating no such
  depth level exists in the treeCore -- meaning no such path was the
  largest */
  let largestPathLengthInLevel = 0;

  for (let index = 0; index < treeCore.length; index++) {
    if (depthLevel === depthLevelCounter) {
      if (treeCore[index].path.length > largestPathLengthInLevel) {
        largestPathLengthInLevel = treeCore[index].path.length;
      }
    }
    getLargestPathLengthInLevel(
      treeCore[index].treeCore,
      depthLevel,
      depthLevelCounter + 1,
    );
  }

  return largestPathLengthInLevel;
};

export default getLargestPathLengthInLevel;
