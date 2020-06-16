import { TreeCore } from "../tree/types";
/**  Replaces the existing comment by a given string
 * @param {TreeCore} treeCore - the whole tree
 * @param {string} path - The path of a specific file
 * @param {string} comment - any string
 * @returns {TreeCore} - New treeCore with replaced comment
 */

export const setCommentForPath = (
  treeCore: TreeCore[],
  path: string,
  comment: string
): TreeCore[] => {
  const pattern = /^((?![<>:"/\\|?* .])(([a-z0-9\s_@\-^!#$%&+={}\[\].]*)([/]?)))+[^/.]$/i;
  if (pattern.test(path)) {
    const index = treeCore.findIndex((core) => core.text === path);
    if (index > -1) {
      treeCore[index].comment = comment ? " # " + comment : "";
      return treeCore;
    } else {
      throw new Error("Path is not available!");
    }
  } else {
    throw new Error("Invalid Path!");
  }
};

export default setCommentForPath;
