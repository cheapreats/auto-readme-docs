import { Core } from '../tree/types';

/** Recursively traverses through a treeCore to find the largest file name
 * length for an inputted depthLevel so that comments can be aligned accordingly
 * @param {Core[]} treeCore - entire tree that is input for analysis
 * @param {number} depthLevel - level of nesting in the treeCore
 * @param {number} depthLevelCounter - set to 0 by default meaning root
 * treeCore
 * @returns {number} - the largest file name length in the level or -1 if the
 * depth level inputted was greater than the max depth level of the treeCore
 */

/* Default largestFileNameLengthInLevel is set to 0 indicating no such
  depth level exists in the treeCore -- meaning no such file name was the
  largest */
let largestFileNameLengthInLevel = 0;
let maxDepthLevel = 0; // Deepness of entire treeCore

export const getLargestFileNameLengthInLevel = (
  treeCore: Core[],
  depthLevel: number,
  depthLevelCounter = 0,
): number => {
  // depthLevel is greater than maxDepthLevel of treeCore
  const outOfBounds = -1;

  for (let index = 0; index < treeCore.length; index += 1) {
    if (depthLevel === depthLevelCounter) {
      // Filtered path such that all forward slashes in path are taken out
      const forwardSlashFilteredPath = treeCore[index].path.split('/');
      // The last element in the path (file, folder, or config file)
      const lastElement = forwardSlashFilteredPath[forwardSlashFilteredPath.length - 1];
      if (lastElement.length > largestFileNameLengthInLevel) {
        /* If the file name length in the current treeCore is larger than
        the previously set largestFileNameLengthInLevel, reassign the
        current path length to largestFileNameLengthInLevel */
        largestFileNameLengthInLevel = lastElement.length;
      }
      if (depthLevelCounter > maxDepthLevel) {
        maxDepthLevel = depthLevel;
      }
    } else {
      /* If depthLevel was not reached, recursively call function to
      go one depthLevel deeper by adding 1 to the depthLevelCounter */
      getLargestFileNameLengthInLevel(
        treeCore[index].treeCore,
        depthLevel,
        depthLevelCounter + 1,
      );
    }
  }
  if (maxDepthLevel < depthLevel) {
    return outOfBounds;
  }

  return largestFileNameLengthInLevel;
};

export default getLargestFileNameLengthInLevel;
