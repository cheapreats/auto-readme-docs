import { Core, FileType } from "../../tree/types";
import { generateMarkDownTree } from "../generateMarkDownTree/generateMarkDownTree";
import { getFileTypeFromPath } from "../getFileTypeFromPath/getFileTypeFromPath";

let highestDeletedOrder = -1;
const RESET_DELETE_ORDER = -1;

/** Undoes the deletion of one deleted order in a given tree
 * @param {Core[]} treeCore - TreeCore to find the deleted orders inside of it
 * @param {number} deletedOrder - The Deletedorder of the deleted item
 * @returns {void} - doesn't return anything, simply undoes the deletions as
 * per undoNumber provided
 */
const recursivelySetDeletedOrder = (
  treeCore: Core[],
  deletedOrder: number
): void => {
  for (let index = 0; index < treeCore.length; index += 1) {
    if (treeCore[index].deletedOrder === deletedOrder) {
      treeCore[index].deletedOrder = RESET_DELETE_ORDER;
    }
    if (
      getFileTypeFromPath(treeCore[index].path, !treeCore[index].treeCore) ===
      FileType.FOLDER
    ) {
      recursivelySetDeletedOrder(treeCore[index].treeCore, deletedOrder);
    }
  }
};

/** Given a treeCore, counts the last deleted order inside it
 * @param {Core[]} treeCore - TreeCore to find the last deleted order inside it
 * @returns {void} - doesn't return anything, simply counts the last deleted order
 */
const countLastDeletedOrder = (treeCore: Core[]): void => {
  for (let index = 0; index < treeCore.length; index += 1) {
    if (treeCore[index].deletedOrder > highestDeletedOrder) {
      highestDeletedOrder = treeCore[index].deletedOrder;
    } else {
      countLastDeletedOrder(treeCore[index].treeCore);
    }
  }
};

/** Undoes the deletion of one deleted order in a given tree, unless
 * given an undoNumber
 * @param {Core[]} treeCore - entire tree that is inputted for analysis
 * @param {number} undoNumber - by default it is set to 1, indicates how many
 * deletions are to be undone
 * @returns {void} - doesn't return anything, simply undoes the deletions as
 * per undoNumber provided
 */

export const undoDeletions = (treeCore: Core[], undoNumber = 1): void => {
  countLastDeletedOrder(treeCore);
  const rangeOfDeletionOrders: number[] = [];
  const newDeletedOrder = highestDeletedOrder - undoNumber;
  for (let i = highestDeletedOrder; i > newDeletedOrder; i -= 1) {
    rangeOfDeletionOrders.push(i);
  }

  for (let x = 0; x < rangeOfDeletionOrders.length; x += 1) {
    recursivelySetDeletedOrder(treeCore, rangeOfDeletionOrders[x]);
  }

  highestDeletedOrder = RESET_DELETE_ORDER;

  generateMarkDownTree(treeCore);
};

export default undoDeletions;
