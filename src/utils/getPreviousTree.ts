import extractString from "./extractString";

interface oldTree {
  path: string | undefined;
  comment: string | undefined;
}
const RIGHT_BEFORE_COMMENT_STARTS = "<span># ";
const RIGHT_AFTER_COMMENT_ENDS = "</span>";
const RIGHT_BEFORE_PATH_STARTS = '<a href="./';
const RIGHT_AFTER_PATH_ENDS = '">';

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
    const path = extractString(
      line,
      RIGHT_BEFORE_PATH_STARTS,
      RIGHT_AFTER_PATH_ENDS
    );
    const comment = extractString(
      line,
      RIGHT_BEFORE_COMMENT_STARTS,
      RIGHT_AFTER_COMMENT_ENDS
    );
    const haveCommentsObject = { path, comment };
    haveCommentsArray.push(haveCommentsObject);
  });
  return haveCommentsArray;
};
export default getPreviousTree;
