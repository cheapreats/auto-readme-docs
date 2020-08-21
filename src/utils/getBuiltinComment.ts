const BEG_OF_FILE_COMMENT_PATTERN = "@";
const START_OF_COMMENT = "{";
const END_OF_FILE_COMMENT_PATTERN = "}";
const START_COMMENT_IN_PROJECT = " # ";

/**  Will get a builtin comment in format of @Preview{
 * comment } out of a file
 * @param {string} content  The content of the file
 * @returns {string} The comment
 */
export const getBuiltinComment = (
  content: string,
  keyword: string = "Preview"
): string => {
  const startKeyWord = `${BEG_OF_FILE_COMMENT_PATTERN}${keyword}${START_OF_COMMENT}`;
  const startOFComment = content.indexOf(startKeyWord);
  const endOfComment = content.indexOf(
    END_OF_FILE_COMMENT_PATTERN,
    startOFComment
  );
  if (startOFComment > -1 && endOfComment > -1) {
    const comment = content.substring(
      startOFComment + startKeyWord.length,
      endOfComment - 1
    );
    return START_COMMENT_IN_PROJECT + comment.trim();
  } else {
    return "";
  }
};
export default getBuiltinComment;
