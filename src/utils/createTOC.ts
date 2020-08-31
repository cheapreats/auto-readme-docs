import extractString from "./extractString";

const TITLE_OF_TABLE = "# Table Of Contents";
const HEADERS_IN_CONTENT_REGEX = /^(#+) (.+)\n/gm;
const SPACE_CHAR_REGEX = /\s/g;
const NUMBERSIGN_CHAR_REGEX = /#/g;
const ENTER_CHAR_REGEX = /\n/g;
const DASH_CHAR = "-";
const SPACE_CHAR = " ";
const EMPTY_CHAR = "";
const START_OF_CONTENT = "# ";
const END_OF_CONTENT = "\n";

/**  generates a table of Content from a readme.md
 * @param {string} readmeContent - content of the Readme File
 * @returns {string} - Table of Content
 */

export const createTOC = (readmeContent: string): string[] => {
  let newHeaders = [TITLE_OF_TABLE];
  const headersInContent = readmeContent.match(HEADERS_IN_CONTENT_REGEX);
  headersInContent?.forEach((headerInContent) => {
    const content = extractString(
      headerInContent,
      START_OF_CONTENT,
      END_OF_CONTENT
    );
    if (content) {
      const contentWithNoSpace = content.replace(SPACE_CHAR_REGEX, DASH_CHAR);
      const replacedNumbersignsContent = headerInContent.replace(
        NUMBERSIGN_CHAR_REGEX,
        SPACE_CHAR
      );
      const noEnterContent = replacedNumbersignsContent.replace(
        ENTER_CHAR_REGEX,
        EMPTY_CHAR
      );
      newHeaders.push(
        noEnterContent.replace(
          content,
          `* [${content}](#${contentWithNoSpace})`
        )
      );
    }
  });

  return newHeaders;
};

export default createTOC;
