import { selectRootCores } from "./selectRootCores";
import { Core, FileType } from "../tree/types";

/**  Will be the MarkDownTree with only Folders
 * @param {Event} target  The whole MarkDownTree
 * @returns {Function|null} the Function used for filter
 */

export const filterChange = (target: any): Function | null => {
  if (target.checked) {
    return selectRootCores;
  } else {
    return null;
  }
};

export default filterChange;
