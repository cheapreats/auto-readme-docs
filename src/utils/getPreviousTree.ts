interface oldTree {
  path: string | undefined;
  comment: string | undefined;
}
const PATH_SECTION_PATTERN = /(\(\.\/.+\))/g;
const COMMENT_SECTION_PATTERN = /(# .+)/g;

/**  Will Divide The treecore into path and comment
 * @param {string[]} haveComments  The exsiting treeCore in Readme File
 * @returns {Object[]} Object array of path and comment
 */
export const getPreviousTree = (
  haveComments: string[] | null,
  isBuiltin: boolean = false
): oldTree[] => {
  if (haveComments === null) {
    return [];
  }
  const haveCommentsArray: oldTree[] = [];
  haveComments.map((line, key) => {
    const firstHalf = line.match(PATH_SECTION_PATTERN)?.toString();
    const secondHalf = line.match(COMMENT_SECTION_PATTERN)?.toString();
    const path = firstHalf?.substring(1, firstHalf.length - 1);
    const comment = secondHalf?.substring(2, secondHalf.length);
    const haveCommentsObject = { path, comment };
    haveCommentsArray.push(haveCommentsObject);
  });
  return haveCommentsArray;
};
export default getPreviousTree;
