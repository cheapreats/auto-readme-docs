import React, { useState, useEffect, useMemo, useLayoutEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Card from "./reusable/Card";
import CenteredCol from "./reusable/CenteredCol";
import CustomSecondaryButton from "./reusable/CustomSecondaryButton";
import MarkdownDisplayLine from "./MarkdownDisplayLine";
import getCopyToClipboardContents from "../utils/getCopyToClipboardContents/getCopyToClipboardContents";
import generateMarkDownTree from "../utils/generateMarkDownTree/generateMarkDownTree";
import undoDeletions from "../utils/undoDeletions/undoDeletions";
import { Switch } from "../utils/Switch";
import filterChange from "../utils/filterChange";
import { selectRootCores } from "../utils/selectRootCores/selectRootCores";

import { Core, FilterType } from "../tree/types";

interface Props {
  treeCore: Core[];
}

const MarkdownDisplay: React.FC<Props> = ({ treeCore }): React.ReactElement => {
  const [filter, setFilter] = useState<FilterType>(FilterType.NULL);
  const filtering = (filter: FilterType): Function | null => {
    if (filter === FilterType.ROOT_ONLY) {
      return selectRootCores;
    } else {
      return null;
    }
  };

  useEffect(() => {
    // Update the document title using the browser API
    setClipboardContent(
      getCopyToClipboardContents(treeCore, filtering(filter))
    );
  }, [filter]);

  const [clipboardContent, setClipboardContent] = useState<string[]>(
    getCopyToClipboardContents(treeCore, filtering(filter))
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
                  getCopyToClipboardContents(treeCore, filtering(filter))
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
                  getCopyToClipboardContents(treeCore, filtering(filter))
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
