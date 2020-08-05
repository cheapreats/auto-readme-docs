import { Core } from "../../tree/types";

/** Recursively traverses through a treeCore to find the largest file name
 * length for an inputted depthLevel so that comments can be aligned accordingly
 * @param {Core[]} treeCore - entire tree that is input for analysis
 * @param {number} depthLevel - level of nesting in the treeCore
 * @returns {number} - the largest file name length in the level or -1 if the
 * depth level inputted was greater than the max depth level of the treeCore
 */

let maxDepthLevel = 0;

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

export const getLargestFileNameLengthInLevel = (
  treeCore: Core[],
  depthLevel: number
): number => {
  let largestFileNameLengthInLevel = 0;
  // depthLevel is greater than maxDepthLevel of treeCore
  const OUTOFBOUNDS = -1;
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
    return OUTOFBOUNDS;
  }

  return largestFileNameLengthInLevel;
};

export default getLargestFileNameLengthInLevel;
