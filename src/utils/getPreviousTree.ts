interface oldTree {
  path: string | undefined;
  comment: string | undefined;
}
const WORDSINSIDEPARENTHESES = /(\(\.\/.+\))/g;
const WORDSAFTERHASHSYMBOL = /(# .+)/g;

/**  Will Divide The treecore into path and comment
 * @param {string[]} haveComments  The exsiting treeCore in Readme File
 * @returns {Object[]} Object array of path and comment
 */
export const getPreviousTree = (haveComments: string[] | null): oldTree[] => {
  if (haveComments === null) {
    return [];
  }
  const haveCommentsArray: oldTree[] = [];
  haveComments.map((line, key) => {
    const firstHalf = line.match(WORDSINSIDEPARENTHESES)?.toString();
    const secondHalf = line.match(WORDSAFTERHASHSYMBOL)?.toString();
    const path = firstHalf?.substring(1, firstHalf.length - 1);
    const comment = secondHalf?.substring(2, secondHalf.length);
    const haveCommentsObject = { path, comment };
    haveCommentsArray.push(haveCommentsObject);
  });
  return haveCommentsArray;
};
export default getPreviousTree;
