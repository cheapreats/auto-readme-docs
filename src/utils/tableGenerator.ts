import tagWrap from "./tagWrap";

const TABLE_TAG = "table";
const TH_TAG = "th";
const TD_TAG = "td";
const TR_TAG = "tr";

/**  generates an HTML table of out of given headers and data
 * @param {string[]} headers - headers of table
 * @param {object[]} data - data of table
 * @returns {string} - HTML Table
 */

export const tableGenerator = (headers: string[], data: object[]): string => {
  let table = "";

  headers.forEach((header) => (table += tagWrap(header, TH_TAG)));
  table = tagWrap(table, TR_TAG);

  data.forEach((line) => {
    let row = "";
    const keys = Object.keys(line);
    keys.forEach((key) => {
      row += tagWrap(line[key], TD_TAG);
    });
    if (row) {
      table += tagWrap(row, TR_TAG);
    }
  });

  table = tagWrap(table, TABLE_TAG);
  return table;
};

export default tableGenerator;
