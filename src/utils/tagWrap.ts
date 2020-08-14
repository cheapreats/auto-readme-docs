/** Gets a string and a tag and wrap the string inside the tag
 * @param {string} text text to be wrapped
 * @param {string} tag tag to wrap the text with
 * @returns {string} the wrapped text
 */

export const tagWrap = (text: string, tag: string): string => {
  const wrappedText = `<${tag}>text</${tag}>`;
  return wrappedText;
};

export default tagWrap;
