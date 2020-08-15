/** Gets a string and a tag and wrap the string inside the tag
 * @param {string} text text to be wrapped
 * @param {string} tag tag to wrap the text
 * @param {boolean} isJustOpen when we need only open the tags
 * @param {boolean} isJustClose when we need only to close the tags
 * @returns {string} the wrapped text
 */

export const tagWrap = (
  text: string,
  tag: string,
  isJustOpen: boolean = false,
  isJustClose: boolean = false
): string => {
  let wrappedText = `${text}`;
  if (!isJustClose) {
    wrappedText = `<${tag}>${wrappedText}`;
  }
  if (!isJustOpen) {
    wrappedText = `${wrappedText}</${tag}>`;
  }

  return wrappedText;
};

export default tagWrap;
