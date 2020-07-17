import { Core } from '../../tree/types';

/** Recursively traverses through a treeCore to find the largest file name
 * length for an inputted depthLevel so that comments can be aligned accordingly
 * @param {Core[]} treeCore - entire tree that is input for analysis
 * @param {number} depthLevel - level of nesting in the treeCore
 * @returns {number} - the largest file name length in the level or -1 if the
 * depth level inputted was greater than the max depth level of the treeCore
*/

let maxDepthLevel = 0; // Deepness of entire treeCore

const traverseThroughTree = (
  /* Recursively traverses through the treeCore and adds paths
  to pathsInDepthLevel if they're in the inputted depthLevel of getLargestFileNameInLevel */
  treeCore: Core[],
  depthLevel: number,
  depthLevelCounter = 0,
  arrayOfPaths: string[],
): void => {
  for (let index = 0; index < treeCore.length; index += 1) {
    if (depthLevel === depthLevelCounter) {
      // Add path to array if in depthLevel
      arrayOfPaths.push(treeCore[index].path);
      if (depthLevelCounter > maxDepthLevel) {
        // Set the max depth level reached during traversal of tree
        maxDepthLevel = depthLevel;
      }
    } else {
      /* If depthLevel was not reached, recursively call function to
      go one depthLevel deeper by adding 1 to the depthLevelCounter */
      traverseThroughTree(
        treeCore[index].treeCore,
        depthLevel,
        depthLevelCounter + 1,
        arrayOfPaths,
      );
    }
  }
};

export const getLargestFileNameLengthInLevel = (
  treeCore: Core[],
  depthLevel: number,
): number => {
  /* Default largestFileNameLengthInLevel is set to 0 indicating no such
  depth level exists in the treeCore -- meaning no such file name was the
  largest */
  let largestFileNameLengthInLevel = 0;
  // depthLevel is greater than maxDepthLevel of treeCore
  const outOfBounds = -1;
  // Paths in the specific depthLevel inputted
  const pathsInDepthLevel: string[] = [];

  traverseThroughTree(treeCore, depthLevel, 0, pathsInDepthLevel);

  for (let index = 0; index < pathsInDepthLevel.length; index += 1) {
    // Array of strings filtered by forward slash
    const filteredPath = pathsInDepthLevel[index].split('/');
    if (
      filteredPath[filteredPath.length - 1].length
      > largestFileNameLengthInLevel
    ) {
      /* If the file name length in the current treeCore is larger than
        the previously set largestFileNameLengthInLevel, reassign the
        current file name length to largestFileNameLengthInLevel */
      largestFileNameLengthInLevel = filteredPath[filteredPath.length - 1].length;
    }
  }
  if (maxDepthLevel < depthLevel) {
    return outOfBounds;
  }

  return largestFileNameLengthInLevel;
};

export default getLargestFileNameLengthInLevel;
