import { WrapTagType } from "../tree/types";

/** Gets a string and a tag and wrap the string inside the tag
 * @param {string} text text to be wrapped
 * @param {string} tag tag to wrap the text
 * @param {WrapTagType} state To know whether we need the tags to be only open,close or both
 * @returns {string} the wrapped text
 */

export const tagWrap = (
  text: string,
  tag: string,
  state: WrapTagType = WrapTagType.BOTH
): string => {
  let wrappedText = `${text}`;
  const openTag = tag ? `<${tag}>` : "";
  const closeTag = tag ? `</${tag}>` : "";

  if (state !== WrapTagType.CLOSE) {
    wrappedText = `${openTag}${wrappedText}`;
  }
  if (state !== WrapTagType.OPEN) {
    wrappedText = `${wrappedText}${closeTag}`;
  }

  return wrappedText;
};

export default tagWrap;
