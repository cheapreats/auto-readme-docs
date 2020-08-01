import { Core } from "../tree/types";

/**  Will get a core from a treeCore
 * @param {string} path  The path of the Core
 * @returns {Core} The Core we are searching for
 */

export const getCoreFromTree = (treeCore: Core[], path: string): Core => {
  function iter(core: Core) {
    if (core.path === path) {
      result = core;
      return true;
    }
    return Array.isArray(core.treeCore) && core.treeCore.some(iter);
  }

  var result;
  treeCore.some(iter);
  return result;
};

export default getCoreFromTree;
