import { Core, FileType } from '../../tree/types';
import { generateMarkDownTree } from '../generateMarkDownTree/generateMarkDownTree';
import { getFileTypeFromPath } from '../getFileTypeFromPath/getFileTypeFromPath';

/** Undoes the deletion of one deleted order in a given tree, unless
 * given an undoNumber
 * @param {Core[]} treeCore - entire tree that is inputted for analysis
 * @param {number} undoNumber - by default it is set to 1, indicates how many
 * deletions are to be undone
 * @returns {void} - doesn't return anything, simply undoes the deletions as
 * per undoNumber provided
 */

let highestDeletedOrder = -1;
const RESET_DELETE_ORDER = -1;

const recursivelySetDeletedOrder = (
  treeCore: Core[],
  deletedOrder: number,
): void => {
  for (let index = 0; index < treeCore.length; index += 1) {
    if (
      treeCore[index].deletedOrder === deletedOrder
      && getFileTypeFromPath(treeCore[index].path) !== FileType.FOLDER
    ) {
      treeCore[index].deletedOrder = RESET_DELETE_ORDER;
    }
    if (
      treeCore[index].deletedOrder === deletedOrder
      && getFileTypeFromPath(treeCore[index].path) === FileType.FOLDER
    ) {
      treeCore[index].deletedOrder = RESET_DELETE_ORDER;
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
  const rangeOfDeletionOrders: number[] = [];
  const newDeletedOrder = highestDeletedOrder - undoNumber;

  for (let i = highestDeletedOrder; i > newDeletedOrder; i -= 1) {
    rangeOfDeletionOrders.push(i);
  }

  for (let x = 0; x < rangeOfDeletionOrders.length; x += 1) {
    for (let y = 0; y < treeCore.length; y += 1) {
      if (
        treeCore[y].deletedOrder === rangeOfDeletionOrders[x] &&
        getFileTypeFromPath(treeCore[y].path) !== FileType.FOLDER
      ) {
        treeCore[y].deletedOrder = RESET_DELETE_ORDER;
      }
      if (
        treeCore[y].deletedOrder === rangeOfDeletionOrders[x] &&
        getFileTypeFromPath(treeCore[y].path) === FileType.FOLDER
      ) {
        treeCore[y].deletedOrder = RESET_DELETE_ORDER;
        recursivelySetDeletedOrder(
          treeCore[y].treeCore,
          rangeOfDeletionOrders[x],
        );
      } else {
        recursivelySetDeletedOrder(
          treeCore[y].treeCore,
          rangeOfDeletionOrders[x],
        );
      }
    }
  }

  highestDeletedOrder = RESET_DELETE_ORDER;

  generateMarkDownTree(treeCore);
};

export default undoDeletions;
