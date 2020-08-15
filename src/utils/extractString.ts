/** Given before and after of a specific piece, it extracts that piece of string from bigger piece of string
 * @param {string} content The bigger piece of string
 * @param {string} beforeStart The string right before our piece starts
 * @param {string} afterEnds The string right after our piece ends
 * @returns {string} - Returns the piece of string we need
 */
const extractString = (
  content: string,
  beforeStart: string,
  afterEnds: string
): string => {
  const start = content.indexOf(beforeStart) + beforeStart.length;
  const end = content.indexOf(afterEnds);
  let section = "";
  if (start > -1 && end > -1) {
    section = content.substring(start, end);
  }
  return section;
};
export default extractString;
