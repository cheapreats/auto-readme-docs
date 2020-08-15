import { WrapTagType } from "../tree/types";

/** Gets a string and a tag and wrap the string inside the tag
 * @param {string} text text to be wrapped
 * @param {string} tag tag to wrap the text
 * @param {WrapTagType} state when we need only open the tags
 * @returns {string} the wrapped text
 */

export const tagWrap = (
  text: string,
  tag: string,
  state: WrapTagType = WrapTagType.BOTH
): string => {
  let wrappedText = `${text}`;
  if (state !== WrapTagType.CLOSE) {
    wrappedText = `<${tag}>${wrappedText}`;
  }
  if (state !== WrapTagType.OPEN) {
    wrappedText = `${wrappedText}</${tag}>`;
  }

  return wrappedText;
};

export default tagWrap;
