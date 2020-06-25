// import { generateMarkDownTree } from './generateMarkDownTree';
import { getLargestFileNameLengthInLevel } from './getLargestFileNameLengthInLevel';
import { getFileTypeFromPath } from './getFileTypeFromPath';
import { Core, FileType } from '../tree/types';

let pathDepthLevel = 0;
let lastDeletedOrder = -1;

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

const recursivelySetDeletedOrder = (
  treeCore: Core[],
  newDeletedOrder: number,
): void => {
  for (let index = 0; index < treeCore.length; index += 1) {
    if (treeCore[index].deletedOrder === -1) {
      treeCore[index].deletedOrder = newDeletedOrder;
    } else {
      recursivelySetDeletedOrder(treeCore[index].treeCore, newDeletedOrder);
    }
  }
};

export const deleteFileFromPath = (treeCore: Core[], path: string): void => {
  const largestFileNameLengthInLevel = getLargestFileNameLengthInLevel(
    treeCore,
    searchForDepthLevel(treeCore, path),
  );
  for (let index = 0; index < treeCore.length; index += 1) {
    /* if (
      path.split('/')[path.split('/').length - 1].length
      >= largestFileNameLengthInLevel
    ) {
      generateMarkDownTree(treeCore);
    } */
    if (
      treeCore[index].path === path
      && path.split('/')[path.split('/').length - 1].length
        < largestFileNameLengthInLevel
      && getFileTypeFromPath(path) !== FileType.FOLDER
    ) {
      lastDeletedOrder += 1;
      treeCore[index].deletedOrder = lastDeletedOrder;
    }
    if (
      treeCore[index].path === path
      && path.split('/')[path.split('/').length - 1].length
        < largestFileNameLengthInLevel
      && getFileTypeFromPath(path) === FileType.FOLDER
    ) {
      lastDeletedOrder += 1;
      treeCore[index].deletedOrder = lastDeletedOrder;
      recursivelySetDeletedOrder(treeCore[index].treeCore, lastDeletedOrder);
    }
    deleteFileFromPath(treeCore[index].treeCore, path);
  }
};

export default deleteFileFromPath;
