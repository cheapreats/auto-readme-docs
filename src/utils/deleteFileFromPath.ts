import { generateMarkDownTree } from './generateMarkDownTree';
import { getFileTypeFromPath } from './getFileTypeFromPath';
import { Core, FileType } from '../tree/types';

let lastDeletedOrder = -1;

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
  for (let index = 0; index < treeCore.length; index += 1) {
    if (
      treeCore[index].path === path
      && getFileTypeFromPath(path) !== FileType.FOLDER
    ) {
      lastDeletedOrder += 1;
      treeCore[index].deletedOrder = lastDeletedOrder;
    }
    if (
      treeCore[index].path === path
      && getFileTypeFromPath(path) === FileType.FOLDER
    ) {
      lastDeletedOrder += 1;
      treeCore[index].deletedOrder = lastDeletedOrder;
      recursivelySetDeletedOrder(treeCore[index].treeCore, lastDeletedOrder);
    }
    deleteFileFromPath(treeCore[index].treeCore, path);
  }

  generateMarkDownTree(treeCore);
};

export default deleteFileFromPath;
