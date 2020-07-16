import { selectRootCores } from "./selectRootCores";

/**  Will be the MarkDownTree with only Folders
 * @param {Event} target  The whole MarkDownTree
 * @returns {Function|null} the Function used for filter
 */

export const filterChange = (target: any): string | null => {
  if (target.checked) {
    return "ROOT_ONLY";
  } else {
    return null;
  }
};

export default filterChange;
