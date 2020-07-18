/**  Replaces the existing comment by a given string
 * @param {TreeCore} treeCore - the whole tree
 * @param {string} path - The path of a specific file
 * @param {string} comment - any string
 * @returns {TreeCore} - New treeCore with replaced comment
*/

interface Core {
  comment: string;
  path: string;
  deletedOrder: number;
  treeCore: Core[];
}

const searchRecursiveCore = (
  treeCore: Core[],
  path: string,
  comment: string,
): Core[] => {
  treeCore.forEach((core) => {
    if (core.treeCore) {
      core.treeCore = searchRecursiveCore(core.treeCore, path, comment);
    }
  });
  const index = treeCore.findIndex((core) => core.path === path);
  if (index > -1) {
    treeCore[index].comment = comment ? ` # ${comment}` : '';
  }
  return treeCore;
};

export const setCommentForPath = (
  treeCore: Core[],
  path: string,
  comment: string,
): Core[] => {
  const pattern = /^((?![<>:"/\\|?* ])(([a-z0-9\s_@\-^!#$%&+={}\\[\].]*)([/]?)))+[^/.]$/i;

  if (pattern.test(path)) {
    treeCore.forEach((core) => {
      if (core.treeCore) {
        core.treeCore = searchRecursiveCore(core.treeCore, path, comment);
      }
    });
    const index = treeCore.findIndex((core) => core.path === path);
    if (index > -1) {
      treeCore[index].comment = comment ? ` # ${comment}` : '';
    }
    return treeCore;
  }
  throw new Error('Invalid Path!');
};

export default setCommentForPath;
