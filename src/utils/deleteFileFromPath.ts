import { getLargestPathLengthInLevel } from './getLargestPathLengthInLevel';
import { getFileTypeFromPath } from './getFileTypeFromPath';
import { Core, FileType } from '../tree/types';

let pathDepthLevel = 0;

const searchForDepthLevel = (
  treeCore: Core[],
  path: string,
  depthLevelCounter = 0,
): number => {
  for (let index = 0; index < treeCore.length; index += 1) {
    if (treeCore[index].path === path) {
      pathDepthLevel = depthLevelCounter;
    }
    searchForDepthLevel(treeCore[index].treeCore, path, depthLevelCounter + 1);
  }

  return pathDepthLevel;
};

export const deleteFileFromPath = (treeCore: Core[], path: string): void => {
  const largestPathLengthInLevel = getLargestPathLengthInLevel(
    treeCore,
    searchForDepthLevel(treeCore, path),
  );
  for (let index = 0; index < treeCore.length; index += 1) {
    if (
      treeCore[index].path === path
      && path.length < largestPathLengthInLevel
      && getFileTypeFromPath(path) !== FileType.FOLDER
    ) {
      treeCore[index].deletedOrder = 1;
    }
    deleteFileFromPath(treeCore[index].treeCore, path);
  }
};

export default deleteFileFromPath;
