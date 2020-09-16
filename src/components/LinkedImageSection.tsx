import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Card from "./reusable/Card";
import CenteredCol from "./reusable/CenteredCol";
import CustomSecondaryButton from "./reusable/CustomSecondaryButton";
import tagWrap from "../utils/tagWrap";
import { WrapTagType, LinkedImageType } from "../tree/types";

interface Props {
  content: LinkedImageType[];
  header: string;
}
const TD_TAG = "td";
const TR_TAG = "tr";
const TR_OPEN_TAG = "<tr>";
const TABLE_TAG = "table";
const B_TAG = "b";
const SUB_TAG = "sub";
const BR_TAG = "<br />";
const A_TAG = "a";
const NUMBER_OF_CELLS_PER_ROW = 5;
const IMAGE_FIELD = "image";
const ALIGN_TD = "center";
const IMAGE_SIZE = "100px;";
const URL_FIELD = "url";
const NAME_FIELD = "name";

const LinkedImageSection: React.FC<Props> = ({
  content,
  header,
}): React.ReactElement => {
  /**  Generates the details of the Table in cells in CellDesign mode
   * @param {object} item - item inside the cell
   * @returns {string} - Generated Cell
   */
  const generateCell = (item) => {
    let cell = `<td align=${ALIGN_TD}>`;
    cell += `<a href=${item[URL_FIELD]}><img src=${item[IMAGE_FIELD]} width=${IMAGE_SIZE}/>`;
    cell = tagWrap(cell, A_TAG, WrapTagType.CLOSE);
    cell += BR_TAG;
    let loginName = `${item[NAME_FIELD]}`;
    loginName = tagWrap(loginName, B_TAG);
    loginName = tagWrap(loginName, SUB_TAG);
    cell += loginName;
    cell += BR_TAG;
    cell = tagWrap(cell, TD_TAG, WrapTagType.CLOSE);
    return cell;
  };

  /**  Given data will generate a Table
   * @param {object[]} content - list of data
   * @returns {string} - Generated Table
   */
  const generateTable = (content: object[]): string => {
    let output = "";
    output = tagWrap(output, TR_TAG, WrapTagType.OPEN);
    content.map((item, key) => {
      output += generateCell(item);
      if ((key + 1) % NUMBER_OF_CELLS_PER_ROW === 0) {
        output = tagWrap(output, TR_TAG, WrapTagType.CLOSE);
        output += TR_OPEN_TAG;
      }
    });
    output = tagWrap(output, TABLE_TAG);

    return output;
  };

  return (
    <Card>
      <div className="row">
        <div className="col">
          <h2>{header}</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <table>
            <tr style={{ display: "flex", flexWrap: "wrap" }}>
              {content.map((item, key) => (
                <td align={ALIGN_TD}>
                  <a href={item.url}>
                    <img src={item.image} width={IMAGE_SIZE} />
                  </a>
                  <br />
                  <sub>
                    <b>{item.name}</b>
                  </sub>
                </td>
              ))}
            </tr>
          </table>
        </div>
      </div>
      <div className="row">
        <CenteredCol className="col">
          <CopyToClipboard text={`\n${generateTable(content)}\n`}>
            <CustomSecondaryButton type="submit" value="Copy to Clipboard" />
          </CopyToClipboard>
        </CenteredCol>
      </div>
    </Card>
  );
};

export default LinkedImageSection;
