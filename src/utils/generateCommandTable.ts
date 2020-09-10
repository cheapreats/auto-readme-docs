import extractString from "./extractString";
import tableGenerator from "./tableGenerator";

const HEADERS = ["Command", "Description"];
const COMMAND_LINE_REGEX = /"\/\* .+ \*\/": ".+"/g;

const START_OF_COMMAND = '"/* ';
const END_OF_COMMAND = ' */": "';
const END_OF_LINE = '"';
const NO_DATA = "";

/**  generates a table of CoCommands and Descriptions from a package.json
 * @param {string} readmeContent - content of the package.json
 * @returns {string} - Table of Commands
 */

export const generateCommandTable = (readmeContent: string): string => {
  const data = new Array();
  readmeContent.match(COMMAND_LINE_REGEX)?.forEach((line) => {
    const command = extractString(line, START_OF_COMMAND, END_OF_COMMAND);
    const beforeDescription = START_OF_COMMAND + command + END_OF_COMMAND;

    const whereCommandEnds = line.indexOf(END_OF_COMMAND);
    const whereDescriptionStarts = whereCommandEnds + END_OF_COMMAND.length;

    const description = line.substr(
      whereDescriptionStarts,
      line.length - beforeDescription.length - END_OF_LINE.length
    );

    data.push({ command, description });
  });
  if (data.length) {
    const table = tableGenerator(HEADERS, data);
    return table;
  } else {
    return NO_DATA;
  }
};

export default generateCommandTable;
