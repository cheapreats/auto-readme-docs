import { Core } from "../../tree/types";

/**  Will be the MarkDownTree without the deletedCore's (Any core with deletedOrder > -1)
 * @param {Core[]} treeCore  The whole MarkDownTree
 * @returns {Core[] | null} the treeCore of only root
 */

export const selectRootCores = (treeCore: Core[]): Core[] | null => {
  if (treeCore) {
    const rootCores: Core[] = [];
    treeCore.forEach((core) => {
      if (core.treeCore) {
        core.treeCore = [];
      }
      rootCores.push(core);
    });
    return rootCores;
  }
  return null;
};

export default selectRootCores;
