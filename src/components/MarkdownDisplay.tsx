import React, { useState, useEffect, useMemo } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Card from "./reusable/Card";
import CenteredCol from "./reusable/CenteredCol";
import CustomSecondaryButton from "./reusable/CustomSecondaryButton";
import MarkdownDisplayLine from "./MarkdownDisplayLine";
import getCopyToClipboardContents from "../utils/getCopyToClipboardContents";
import generateMarkDownTree from "../utils/generateMarkDownTree";
import undoDeletions from "../utils/undoDeletions";

import { Core } from "../tree/types";

interface Props {
  treeCore: Core[];
}

const MarkdownDisplay: React.FC<Props> = ({ treeCore }): React.ReactElement => {
  const [markDownTree, setMarkDownTree] = useState<string[]>(
    generateMarkDownTree(treeCore)
  );
  const [clipboardContent, setClipboardContent] = useState<string[]>(
    getCopyToClipboardContents(treeCore)
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
            <CustomSecondaryButton
              onClick={() => {
                undoDeletions(treeCore);
                setMarkDownTree(generateMarkDownTree(treeCore));
                setClipboardContent(getCopyToClipboardContents(treeCore));
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
                // setTreeCore(treeCore);
                console.log(treeCore);
                // console.log(markDownTree);
                // setMarkDownTree(generateMarkDownTree(treeCore));
                setClipboardContent(getCopyToClipboardContents(treeCore));
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
            text={`<big><pre>\n${clipboardContent.join("\n")}\n</pre></big>`}
          >
            <CustomSecondaryButton type="submit" value="Copy to Clipboard" />
          </CopyToClipboard>
        </CenteredCol>
      </div>
    </Card>
  );
};
export default MarkdownDisplay;
