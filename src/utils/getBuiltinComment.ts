const BEG_OF_FILE_COMMENT_PATTERN = "@Preview{";
const END_OF_FILE_COMMENT_PATTERN = "}";
const START_COMMENT_IN_PROJECT = " # ";

/**  Will get a builtin comment in format of @Preview{
 * comment } out of a file
 * @param {string} content  The content of the file
 * @returns {string} The comment
 */
export const getBuiltinComment = (content: string): string => {
  const startOFComment = content.indexOf(BEG_OF_FILE_COMMENT_PATTERN);
  const endOfComment = content.indexOf(END_OF_FILE_COMMENT_PATTERN);
  if (startOFComment > -1 && endOfComment > -1) {
    const comment = content.substring(
      startOFComment + BEG_OF_FILE_COMMENT_PATTERN.length,
      endOfComment - 1
    );
    return START_COMMENT_IN_PROJECT + comment.trim();
  } else {
    return "";
  }
};
export default getBuiltinComment;
