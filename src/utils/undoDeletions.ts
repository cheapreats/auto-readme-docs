import { Core, FileType } from "../tree/types";
import { generateMarkDownTree } from "./generateMarkDownTree";
import { getFileTypeFromPath } from "./getFileTypeFromPath";

/** Undoes the deletion of one deleted order in a given tree, unless
 * given an undoNumber
 * @param {Core[]} treeCore - entire tree that is inputted for analysis
 * @param {number} undoNumber - by default it is set to 1, indicates how many
 * deletions are to be undone
 */

let lastDeletedOrder = -1;

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
    if (treeCore[index].deletedOrder > lastDeletedOrder) {
      lastDeletedOrder = treeCore[index].deletedOrder;
    } else {
      countLastDeletedOrder(treeCore[index].treeCore);
    }
  }
};

export const undoDeletions = (treeCore: Core[], undoNumber = 1): void => {
  countLastDeletedOrder(treeCore);
  const resetDeletedOrder = -1;
  const range = [] as number[];
  const newDeletedOrder = lastDeletedOrder - undoNumber;

  for (let i = newDeletedOrder; i <= lastDeletedOrder; i += 1) {
    range.push(i);
  }

  for (let x = 0; x < range.length; x += 1) {
    for (let y = 0; y < treeCore.length; y += 1) {
      if (
        treeCore[y].deletedOrder === range[x] &&
        getFileTypeFromPath(treeCore[y].path) !== FileType.FOLDER
      ) {
        treeCore[y].deletedOrder = resetDeletedOrder;
      }
      if (
        treeCore[y].deletedOrder === range[x] &&
        getFileTypeFromPath(treeCore[y].path) === FileType.FOLDER
      ) {
        treeCore[y].deletedOrder = resetDeletedOrder;
        recursivelySetDeletedOrder(treeCore[y].treeCore, range[x]);
      }
      undoDeletions(treeCore[y].treeCore, undoNumber);
    }
  }

  lastDeletedOrder = newDeletedOrder;

  generateMarkDownTree(treeCore);
};

export default undoDeletions;
