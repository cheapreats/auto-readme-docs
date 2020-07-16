import { Core, FileType } from "../tree/types";
import { generateMarkDownTree } from "./generateMarkDownTree";
import { getFileTypeFromPath } from "./getFileTypeFromPath";

/** Undoes the deletion of one deleted order in a given tree, unless
 * given an undoNumber
 * @param {Core[]} treeCore - entire tree that is inputted for analysis
 * @param {number} undoNumber - by default it is set to 1, indicates how many
 * deletions are to be undone
 * @returns {void} - doesn't return anything, simply undoes the deletions as
 * per undoNumber provided
 */

let highestDeletedOrder = -1;

const recursivelySetDeletedOrder = (
  treeCore: Core[],
  deletedOrder: number,
  originalDeletedOrder = -1
): void => {
  for (let index = 0; index < treeCore.length; index += 1) {
    if (treeCore[index].deletedOrder === deletedOrder) {
      treeCore[index].deletedOrder = originalDeletedOrder;
    } else {
      recursivelySetDeletedOrder(treeCore[index].treeCore, deletedOrder);
    }
  }
};

const countLastDeletedOrder = (treeCore: Core[]): void => {
  // counts lastDeletedOrder of a tree and updates the value of lastDeletedOrder
  for (let index = 0; index < treeCore.length; index += 1) {
    if (treeCore[index].deletedOrder > highestDeletedOrder) {
      highestDeletedOrder = treeCore[index].deletedOrder;
    } else {
      countLastDeletedOrder(treeCore[index].treeCore);
    }
  }
};

export const undoDeletions = (treeCore: Core[], undoNumber = 1): void => {
  countLastDeletedOrder(treeCore);
  const resetDeletedOrder = -1;
  const rangeOfDeletionOrders = [] as number[];
  const newDeletedOrder = highestDeletedOrder - undoNumber;

  for (let i = highestDeletedOrder; i > newDeletedOrder; i -= 1) {
    rangeOfDeletionOrders.push(i);
  }

  for (let x = 0; x < rangeOfDeletionOrders.length; x += 1) {
    for (let y = 0; y < treeCore.length; y += 1) {
      if (
        treeCore[y].deletedOrder === rangeOfDeletionOrders[x]
        && getFileTypeFromPath(treeCore[y].path) !== FileType.FOLDER
      ) {
        treeCore[y].deletedOrder = resetDeletedOrder;
      }
      if (
        treeCore[y].deletedOrder === rangeOfDeletionOrders[x]
        && getFileTypeFromPath(treeCore[y].path) === FileType.FOLDER
      ) {
        treeCore[y].deletedOrder = resetDeletedOrder;
        recursivelySetDeletedOrder(
          treeCore[y].treeCore,
          rangeOfDeletionOrders[x],
        );
      } else {
        undoDeletions(treeCore[y].treeCore, undoNumber);
      }
    }
  }

  generateMarkDownTree(treeCore);
};

export default undoDeletions;
