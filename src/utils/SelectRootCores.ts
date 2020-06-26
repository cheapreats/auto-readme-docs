import generateMarkDownTree from "./generateMarkDownTree";
import { Core } from "../tree/types";

/**  Will be the MarkDownTree without the deletedCore's (Any core with deletedOrder > -1)
 * @param {Core[]} treeCore  The whole MarkDownTree
 * @returns {string} the MarkDownTree without the deletedCore's
 */

export const SelectRootCores = (treeCore: Core[]): string[] => {
  const rootCores: Core[] = [];
  treeCore.forEach((core) => {
    if (core.treeCore) {
      core.treeCore = [];
    }
    rootCores.push(core);
  });
  const output = generateMarkDownTree(rootCores);
  return output;
};
export default SelectRootCores;
