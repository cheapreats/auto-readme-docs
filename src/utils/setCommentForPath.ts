import { TreeCore } from "../tree/types";
/**  Replaces the existing comment by a given string
 * @param {TreeCore} treeCore the whole tree
 * @param {string} path The path of a specific file
 * @param {string} comment any string
 * @returns {void}
 */

export const setCommentForPath = (
  treeCore: TreeCore[],
  path: string,
  comment: string
): void => {
  const pattern = /^((?![<>:"/\\|?* .])(([a-z0-9\s_@\-^!#$%&+={}\[\].]*)([/]?)))+[^/.]$/i;
  if (pattern.test(path)) {
    const index = treeCore.findIndex((address) => address.text === path);

    if (index > -1) {
      treeCore[index].comment = " # " + comment;
      console.log("INSIDE", treeCore);
    } else {
      throw new Error("Path is not available!");
    }
  } else {
    throw new Error("Invalid Path!");
  }
};

export default setCommentForPath;
