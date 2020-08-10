import { getFileTypeFromPath } from "../getFileTypeFromPath/getFileTypeFromPath";
import { Core, FileType } from "../../tree/types";

let lastDeletedOrder = -1;
const DELETION_INCREMENT = 1;
const NOT_DELETED = -1;

/** recursively Sets the Deleted Order inside the tree
 * @param {Core[]} treeCore - treeCore to go through recursively
 * @param {number} newDeletedOrder - The updated deleted order to be set to items
 * @returns {void} - doesn't return anything, simply does the action of setting the deleted order
 */
const recursivelySetDeletedOrder = (
  treeCore: Core[],
  newDeletedOrder: number
): void => {
  for (let index = 0; index < treeCore.length; index += 1) {
    if (treeCore[index].deletedOrder === NOT_DELETED) {
      treeCore[index].deletedOrder = newDeletedOrder + DELETION_INCREMENT;
    } else {
      recursivelySetDeletedOrder(
        treeCore[index].treeCore,
        newDeletedOrder + DELETION_INCREMENT
      );
    }
  }
};

/** Given a treeCore, counts lastDeletedOrder of a tree and updates the value of lastDeletedOrder
 * @param {Core[]} treeCore - tree that is inputted for analysis
 * @returns {void} - doesn't return anything, simply does the action of counting the lastdeletedorder and updates it
 */
const countLastDeletedOrder = (treeCore: Core[]): void => {
  for (let index = 0; index < treeCore.length; index += 1) {
    if (treeCore[index].deletedOrder > lastDeletedOrder) {
      lastDeletedOrder = treeCore[index].deletedOrder;
    } else {
      countLastDeletedOrder(treeCore[index].treeCore);
    }
  }
};

/** Given a path, delete the element required and generate the tree again
 * @param {Core[]} treeCore - entire that is inputted for analysis
 * @param {string} path - the path of element that needs to be deleted
 * @returns {void} - doesn't return anything, simply does the action of
 * deleting an element
 */
export const deleteFileFromPath = (treeCore: Core[], path: string): void => {
  countLastDeletedOrder(treeCore);

  for (let index = 0; index < treeCore.length; index += 1) {
    if (
      treeCore[index].path === path &&
      getFileTypeFromPath(path, !treeCore[index].treeCore) !== FileType.FOLDER
    ) {
      treeCore[index].deletedOrder = lastDeletedOrder + DELETION_INCREMENT;
    }
    if (
      treeCore[index].path === path &&
      getFileTypeFromPath(path, !treeCore[index].treeCore) === FileType.FOLDER
    ) {
      treeCore[index].deletedOrder = lastDeletedOrder + DELETION_INCREMENT;
      recursivelySetDeletedOrder(treeCore[index].treeCore, lastDeletedOrder);
    } else {
      deleteFileFromPath(treeCore[index].treeCore, path);
    }
  }
};

export default deleteFileFromPath;
