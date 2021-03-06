import { Core } from "../../tree/types";

let maxDepthLevel = 0;

/** Recursively traverses through a treeCore to find the largest file name
 * @param {Core[]} treeCore - Tree to traverse through
 * @param {number} depthLevel - Level of nesting in the treeCore
 * @param {number} depthLevelCounter - Next depth level
 * @param {string[]} arrayOfPaths - List of paths in certain depth level
 * @returns {void} - Doesn't return anything
 */

const traverseThroughTree = (
  /* Recursively traverses through the treeCore and adds paths
  to pathsInDepthLevel if they're in the inputted depthLevel of getLargestFileNameInLevel */
  treeCore: Core[],
  depthLevel: number,
  depthLevelCounter = 0,
  arrayOfPaths: string[]
): void => {
  for (let index = 0; index < treeCore.length; index += 1) {
    if (depthLevel === depthLevelCounter) {
      arrayOfPaths.push(treeCore[index].path);
      if (depthLevelCounter > maxDepthLevel) {
        maxDepthLevel = depthLevel;
      }
    } else {
      /* If depthLevel was not reached, recursively call function to
      go one depthLevel deeper by adding 1 to the depthLevelCounter */
      traverseThroughTree(
        treeCore[index].treeCore,
        depthLevel,
        depthLevelCounter + 1,
        arrayOfPaths
      );
    }
  }
};

/** Recursively traverses through a treeCore to find the largest file name
 * length for an inputted depthLevel so that comments can be aligned accordingly
 * @param {Core[]} treeCore - entire tree that is input for analysis
 * @param {number} depthLevel - level of nesting in the treeCore
 * @returns {number} - the largest file name length in the level or -1 if the
 * depth level inputted was greater than the max depth level of the treeCore
 */

export const getLargestFileNameLengthInLevel = (
  treeCore: Core[],
  depthLevel: number
): number => {
  let largestFileNameLengthInLevel = 0;
  // depthLevel is greater than maxDepthLevel of treeCore
  const OUT_OF_BOUNDS = -1;
  const pathsInDepthLevel: string[] = [];

  traverseThroughTree(treeCore, depthLevel, 0, pathsInDepthLevel);

  for (let index = 0; index < pathsInDepthLevel.length; index += 1) {
    const filteredPath = pathsInDepthLevel[index].split("/");
    if (
      filteredPath[filteredPath.length - 1].length >
      largestFileNameLengthInLevel
    ) {
      largestFileNameLengthInLevel =
        filteredPath[filteredPath.length - 1].length;
    }
  }
  if (maxDepthLevel < depthLevel) {
    return OUT_OF_BOUNDS;
  }

  return largestFileNameLengthInLevel;
};

export default getLargestFileNameLengthInLevel;
