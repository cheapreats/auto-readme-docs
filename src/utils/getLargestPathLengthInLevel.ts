import { Core } from '../tree/types';

/** Recursively traverses through a treeCore to find the largest path length
 * for an inputted depthLevel so that comments can be aligned accordingly
 * @param {Core[]} treeCore - entire tree that is input for analysis
 * @param {number} depthLevel - level of nesting in the treeCore
 * @param {number} depthLevelCounter - set to 0 by default meaning root
 * treeCore
 * @returns {number} - the largest path length in the level or -1 if the depth
 * level inputted was greater than the max depth level of the treeCore
 */

/* Default largestPathLengthInLevel is set to 0 indicating no such
  depth level exists in the treeCore -- meaning no such path was the
  largest */
let largestPathLengthInLevel = 0;
let maxDepthLevel = 0; // Deepness of entire treeCore

export const getLargestPathLengthInLevel = (
  treeCore: Core[],
  depthLevel: number,
  depthLevelCounter = 0,
): number => {
  // depthLevel is greater than maxDepthLevel of treeCore
  const outOfBounds = -1;

  for (let index = 0; index < treeCore.length; index += 1) {
    if (depthLevel === depthLevelCounter) {
      // If the correct depthLevel is reached
      if (treeCore[index].path.length > largestPathLengthInLevel) {
        /* If the path length in the current treeCore is larger than
        the previously set largestPathLengthInLevel, reassign the
        current path length to largestPathLengthInLevel */
        largestPathLengthInLevel = treeCore[index].path.length;
      }
      if (depthLevelCounter > maxDepthLevel) {
        maxDepthLevel = depthLevel;
      }
    } else {
      /* If depthLevel was not reached, recursively call function to
      go one depthLevel deeper by adding 1 to the depthLevelCounter */
      getLargestPathLengthInLevel(
        treeCore[index].treeCore,
        depthLevel,
        depthLevelCounter + 1,
      );
    }
  }
  if (maxDepthLevel < depthLevel) {
    return outOfBounds;
  }

  return largestPathLengthInLevel;
};

export default getLargestPathLengthInLevel;
