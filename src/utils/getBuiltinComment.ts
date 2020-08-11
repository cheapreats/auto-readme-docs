const START_COMMENT = "@Preview{";
const END_COMMENT = "}";
const START_COMMENT_IN_PROJECT = " # ";

/**  Will get a builtin comment in format of @Preview{
 * comment } out of a file
 * @param {string} content  The content of the file
 * @returns {string} The comment
 */
export const getBuiltinComment = (content: string): string => {
  const startOFComment = content.indexOf(START_COMMENT);
  const endOfComment = content.indexOf(END_COMMENT);
  if (startOFComment > -1 && endOfComment > -1) {
    const comment = content.substring(
      startOFComment + START_COMMENT.length,
      endOfComment - 1
    );
    return START_COMMENT_IN_PROJECT + comment.trim();
  } else {
    return "";
  }
};
export default getBuiltinComment;
