import { getFileTypeFromPath } from '../getFileTypeFromPath/getFileTypeFromPath';
import { Core, FileType } from '../../tree/types';

/** Given a path, delete the element required and generate the tree again
 * @param {Core[]} treeCore - entire that is inputted for analysis
 * @param {string} path - the path of element that needs to be deleted
 * @returns {void} - doesn't return anything, simply does the action of
 * deleting an element
*/

let lastDeletedOrder = -1;

const recursivelySetDeletedOrder = (
  treeCore: Core[],
  newDeletedOrder: number,
): void => {
  for (let index = 0; index < treeCore.length; index += 1) {
    if (treeCore[index].deletedOrder === -1) {
      treeCore[index].deletedOrder = newDeletedOrder + 1;
    } else {
      recursivelySetDeletedOrder(treeCore[index].treeCore, newDeletedOrder + 1);
    }
  }
};

const countLastDeletedOrder = (treeCore: Core[]): void => {
  // counts lastDeletedOrder of a tree and updates the value of lastDeletedOrder
  for (let index = 0; index < treeCore.length; index += 1) {
    if (treeCore[index].deletedOrder > lastDeletedOrder) {
      lastDeletedOrder = treeCore[index].deletedOrder;
    } else {
      countLastDeletedOrder(treeCore[index].treeCore);
    }
  }
};

export const deleteFileFromPath = (treeCore: Core[], path: string): void => {
  countLastDeletedOrder(treeCore);

  for (let index = 0; index < treeCore.length; index += 1) {
    if (
      treeCore[index].path === path
      && getFileTypeFromPath(path) !== FileType.FOLDER
    ) {
      treeCore[index].deletedOrder = lastDeletedOrder + 1;
    }
    if (
      treeCore[index].path === path
      && getFileTypeFromPath(path) === FileType.FOLDER
    ) {
      treeCore[index].deletedOrder = lastDeletedOrder + 1;
      recursivelySetDeletedOrder(treeCore[index].treeCore, lastDeletedOrder);
    } else {
      deleteFileFromPath(treeCore[index].treeCore, path);
    }
  }
};

export default deleteFileFromPath;
