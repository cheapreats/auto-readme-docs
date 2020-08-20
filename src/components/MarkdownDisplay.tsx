import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Card from "./reusable/Card";
import CenteredCol from "./reusable/CenteredCol";
import CustomSecondaryButton from "./reusable/CustomSecondaryButton";
import MarkdownDisplayLine from "./MarkdownDisplayLine";
import getCopyToClipboardContents from "../utils/getCopyToClipboardContents/getCopyToClipboardContents";
import undoDeletions from "../utils/undoDeletions/undoDeletions";
import { Switch } from "../utils/Switch";
import filterChange from "../utils/filterChange";
import tagWrap from "../utils/tagWrap";
import { Core, FilterType } from "../tree/types";

const DETAILS_CLOSING_TAG = "</details>";
const BIG_TAG = "big";
const PRE_TAG = "pre";

interface Props {
  treeCore: Core[];
}

// delete any enter character after </details> tag
const makeClipboardContent = (content) => {
  return content.split(`${DETAILS_CLOSING_TAG}\n`).join(DETAILS_CLOSING_TAG);
};

const MarkdownDisplay: React.FC<Props> = ({ treeCore }): React.ReactElement => {
  const [filter, setFilter] = useState<FilterType>(FilterType.NULL);
  useEffect(() => {
    // Update the document title using the browser API
    setClipboardContent(getCopyToClipboardContents(treeCore, filter));
  }, [filter]);

  const [clipboardContent, setClipboardContent] = useState<string[]>(
    getCopyToClipboardContents(treeCore, filter)
  );

  return (
    <Card>
      <div className="row">
        <div className="col">
          <h2>Generated Tree</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2>
            <h5>Roots Only</h5>
          </h2>
        </div>
      </div>
      <div className="col" style={{ margin: "-30px 0px 10px 0px" }}>
        <CenteredCol>
          <Switch
            size={20}
            onChange={({ target }) => {
              setFilter(filterChange(target));
            }}
          />
        </CenteredCol>
      </div>
      <div className="row">
        <div className="col">
          <h2>
            <CustomSecondaryButton
              onClick={() => {
                undoDeletions(treeCore);
                setClipboardContent(
                  getCopyToClipboardContents(treeCore, filter)
                );
              }}
              type="submit"
              value="Undo"
            />
          </h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {clipboardContent.map((line, i) => (
            <MarkdownDisplayLine
              key={line + i}
              onChange={() => {
                setClipboardContent(
                  getCopyToClipboardContents(treeCore, filter)
                );
              }}
              isOddNumberedLine={i % 2 === 1}
              content={line}
              treeCore={treeCore}
            />
          ))}
        </div>
      </div>
      <div className="row">
        <CenteredCol className="col">
          <CopyToClipboard
            text={tagWrap(
              tagWrap(
                `\n${makeClipboardContent(clipboardContent.join("\n"))}\n`,
                PRE_TAG
              ),
              BIG_TAG
            )}
          >
            <CustomSecondaryButton type="submit" value="Copy to Clipboard" />
          </CopyToClipboard>
        </CenteredCol>
      </div>
    </Card>
  );
};

export default MarkdownDisplay;
// {`<big><pre>
// \n${makeClipboardContent(clipboardContent.join("\n"))}\n
//</pre></big>`}
