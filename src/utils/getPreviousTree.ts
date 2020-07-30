import { Core } from "../tree/types";
/**  Will Divide The treecore into path and comment
 * @param {string[]} haveComments  The exsiting treeCore in Readme File
 * @returns {Object[]} Object array of path and comment
 */
interface oldTree {
  path: string | undefined;
  comment: string | undefined;
}

export const getPreviousTree = (haveComments: string[] | null): oldTree[] => {
  if (haveComments === null) {
    return [];
  }
  const haveCommentsArray: oldTree[] = [];
  haveComments.map((line, key) => {
    const firstHalf = line.match(/(\(\.\/.+\))/g)?.toString();
    const secondHalf = line.match(/(# .+)/g)?.toString();
    const path = firstHalf?.substring(1, firstHalf.length - 1);
    const comment = secondHalf?.substring(2, secondHalf.length);
    const haveCommentsOBJ = { path, comment };
    haveCommentsArray.push(haveCommentsOBJ);
  });
  return haveCommentsArray;
};
export default getPreviousTree;
