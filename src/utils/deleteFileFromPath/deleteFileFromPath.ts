import { generateMarkDownTree } from "../generateMarkDownTree/generateMarkDownTree";
import { getFileTypeFromPath } from "../getFileTypeFromPath/getFileTypeFromPath";
import { Core, FileType } from "../../tree/types";

/** Given a path, delete the element required and generate the tree again
 * @param {Core[]} treeCore - entire that is inputted for analysis
 * @param {string} path - the path of element that needs to be deleted
 * @returns {void} - doesn't return anything, simply does the action of
 * deleting an element
 */

let lastDeletedOrder = -1;

const recursivelySetDeletedOrder = (
  treeCore: Core[],
  newDeletedOrder: number
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
      treeCore[index].path === path &&
      getFileTypeFromPath(path) !== FileType.FOLDER
    ) {
      lastDeletedOrder += 1;
      treeCore[index].deletedOrder = lastDeletedOrder;
    }
    if (
      treeCore[index].path === path &&
      getFileTypeFromPath(path) === FileType.FOLDER
    ) {
      lastDeletedOrder += 1;
      treeCore[index].deletedOrder = lastDeletedOrder;
      recursivelySetDeletedOrder(treeCore[index].treeCore, lastDeletedOrder);
    }
    deleteFileFromPath(treeCore[index].treeCore, path);
  }

  // generateMarkDownTree(treeCore);
};

export default deleteFileFromPath;
